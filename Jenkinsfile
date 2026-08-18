/*
 * Repository requirements
 * - Every Atlas app defines atlas:publish. Do not give Atlas apps a container deploy target.
 * - Every Atlas host defines docker:build and deploy. Its Dockerfile serves dist/bootstrap.
 * - Every ordinary app/service that runs on OpenShift defines docker:build and deploy.
 *   docker:build builds and pushes its own image; deploy applies its own k8s/ configuration
 *   and waits for its rollout. Packages without either script are skipped by pnpm.
 *
 * Jenkins agent requirements
 * - Label: node-20; tools: Node.js 20+, Corepack, Git, Docker Buildx, and oc.
 * - This is an air-gapped agent: bake the repository's exact packageManager version of pnpm
 *   into the agent image/Corepack cache. Corepack otherwise tries to download it from the
 *   public internet on a fresh agent.
 * - Configure the repository .npmrc or the Jenkins job's NPM_CONFIG_REGISTRY to use the
 *   internal npm proxy/registry. Mirror every public package used by pnpm-lock.yaml there.
 *   `--prefer-offline` uses a cache when available, then falls back only to this registry.
 * - Mirror Dockerfile base images and build-tool images into the internal container registry;
 *   Dockerfiles must reference those internal image names. Jenkins needs no internet access.
 * - Configure an OpenShift service-account KUBECONFIG and an image-registry credential.
 *   Expose only the variables consumed by package docker:build/deploy scripts, for example
 *   KUBECONFIG, OPENSHIFT_NAMESPACE, DOCKER_REGISTRY, and registry login credentials.
 * - Configure Atlas storage values in Jenkins folder/job environment: ATLAS_STORAGE,
 *   ATLAS_S3_BUCKET, ATLAS_S3_REGION, ATLAS_REGISTRY_URL, ATLAS_RUNTIME_URLS, and bind
 *   write credentials as ATLAS_STORAGE_ACCESS_KEY_ID / ATLAS_STORAGE_SECRET_ACCESS_KEY.
 * - This agent is destroyed after each job. Workspace .pnpm-store and .turbo caches therefore
 *   help only within one run. For cross-job speed, mount a persistent, writable pnpm store at
 *   the same path as PNPM_STORE_DIR, or pre-warm it in the agent image. Use an internally
 *   reachable Turbo Remote Cache (TURBO_API, TURBO_TEAM, and TURBO_TOKEN); do not configure
 *   the public Turbo service. The pipeline also works without a Remote Cache.
 *
 * Jenkins + GitLab multibranch requirements
 * - Enable merge-request discovery so Jenkins sets BRANCH_NAME, CHANGE_ID, CHANGE_BRANCH,
 *   and CHANGE_FORK. Jenkins must fetch refs/merge-requests/<id>/head from the internal GitLab
 *   origin, and CI_API_V4_URL must resolve to that same internally reachable GitLab instance.
 * - For trusted merge-request publication, configure CI_PROJECT_ID, CI_API_V4_URL, and bind a
 *   GitLab read-api token as ATLAS_GIT_TOKEN. Never expose these credentials to fork MRs.
 * - Add separate trusted jobs for MR close/merge (atlas remove-pr) and scheduled cleanup
 *   (atlas prune-prs). They are intentionally outside this build-and-deploy pipeline.
 */
// The repository's protected integration branch is "master".
def runBash(String script) {
  sh """#!/usr/bin/env bash
set -euo pipefail
${script}
"""
}

pipeline {
  agent { label 'node-20' }

  options {
    skipDefaultCheckout()
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  parameters {
    booleanParam(
      name: 'DEPLOY',
      defaultValue: false,
      description: 'Deploy the master branch after all checks and builds succeed.'
    )
  }

  environment {
    CI = 'true'
    COREPACK_ENABLE_DOWNLOAD_PROMPT = '0'
    PNPM_STORE_DIR = "${WORKSPACE}/.pnpm-store"
    TURBO_CACHE_DIR = "${WORKSPACE}/.turbo"
    TURBO_SCM_BASE = 'origin/master'
    TURBO_SCM_HEAD = 'HEAD'
    ATLAS_DEFAULT_BRANCH = 'master'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        runBash '''
          # --affected needs the merge-base between this revision and master.
          # Convert a shallow Jenkins checkout to a full one when necessary.
          if [ "$(git rev-parse --is-shallow-repository)" = 'true' ]; then
            git fetch --no-tags --unshallow origin
          fi
          git fetch --no-tags origin +refs/heads/master:refs/remotes/origin/master
        '''
      }
    }

    stage('Install') {
      options {
        retry(2)
        timeout(time: 15, unit: 'MINUTES')
      }
      steps {
        runBash '''
          corepack pnpm --version
          corepack pnpm install --frozen-lockfile --prefer-offline --store-dir "$PNPM_STORE_DIR"
        '''
      }
    }

    stage('Quality') {
      steps {
        runBash '''
          if [ "${BRANCH_NAME:-}" = 'master' ]; then
            turbo_scope=''
          else
            turbo_scope='--affected'
          fi

          # Turbo skips task names that are not implemented by a workspace.
          corepack pnpm exec turbo run lint check-types ${turbo_scope:+"$turbo_scope"} --cache-dir="$TURBO_CACHE_DIR"
        '''
      }
    }

    stage('Build') {
      steps {
        runBash '''
          if [ "${BRANCH_NAME:-}" = 'master' ]; then
            turbo_scope=''
          else
            turbo_scope='--affected'
          fi

          # atlas:bootstrap needs ATLAS_REGISTRY_URL to generate host runtime configuration.
          # It is intentionally not declared in turbo.json because this pipeline is the only
          # file we may change; loose mode passes Jenkins-provided Atlas variables through.
          # If ATLAS_REGISTRY_URL changes, clear the Turbo cache once before the next build.
          # Turbo still selects only affected Atlas and non-Atlas workspaces.
          corepack pnpm exec turbo run build atlas:bootstrap ${turbo_scope:+"$turbo_scope"} --env-mode=loose --cache-dir="$TURBO_CACHE_DIR"
        '''
      }
    }

    stage('Test') {
      steps {
        runBash '''
          # Add a test script to each package that has tests. pnpm skips the rest.
          # Test selection is package-native because this repository has no Turbo test task.
          corepack pnpm --recursive --if-present run test
        '''
      }
    }

    stage('Deploy') {
      when {
        anyOf {
          allOf {
            changeRequest()
            // Never expose publication credentials to untrusted fork code.
            expression { !env.CHANGE_FORK }
          }
          allOf {
            branch 'master'
            expression { params.DEPLOY }
          }
        }
      }
      stages {
        stage('Publish Atlas PR') {
          when {
            changeRequest()
          }
          steps {
            runBash '''
              # Atlas verifies GitLab reports this merge request as opened and still
              # pointing at this exact head SHA immediately before publication.
              : "${CI_PROJECT_ID:?Set CI_PROJECT_ID for the GitLab project.}"
              : "${CI_API_V4_URL:?Set CI_API_V4_URL for the GitLab API.}"
              : "${ATLAS_GIT_TOKEN:?Bind a GitLab API token as ATLAS_GIT_TOKEN.}"

              # Jenkins commonly checks out a synthetic merge commit. GitLab's MR ref
              # provides the source head SHA that Atlas must use for freshness checks.
              git fetch --no-tags origin "+refs/merge-requests/${CHANGE_ID}/head:refs/remotes/origin/merge-requests/${CHANGE_ID}/head"
              export ATLAS_PR_NUMBER="$CHANGE_ID"
              export ATLAS_GIT_BRANCH="$CHANGE_BRANCH"
              export ATLAS_GIT_SHA="$(git rev-parse "refs/remotes/origin/merge-requests/${CHANGE_ID}/head")"
              export ATLAS_GIT_COMMIT_TITLE="$(git log -1 --format=%s "$ATLAS_GIT_SHA")"
              export ATLAS_REQUIRE_PUBLICATION=true

              corepack pnpm exec turbo run atlas:publish --affected --cache-dir="$TURBO_CACHE_DIR"
            '''
          }
        }

        stage('Publish Atlas Master') {
          when {
            branch 'master'
          }
          steps {
            runBash '''
              export ATLAS_GIT_BRANCH=master
              export ATLAS_REQUIRE_PUBLICATION=true
              corepack pnpm exec turbo run atlas:publish --cache-dir="$TURBO_CACHE_DIR"
            '''
          }
        }

        stage('Deploy Containers') {
          when {
            branch 'master'
          }
          steps {
            runBash '''
              # Package-owned docker:build scripts build/push images; deploy scripts apply
              # their package k8s/ OpenShift configuration and wait for rollout completion.
              # pnpm skips packages that do not implement either task.
              corepack pnpm --recursive --if-present run docker:build
              corepack pnpm --recursive --if-present run deploy
            '''
          }
        }

        stage('Verify Atlas') {
          when {
            branch 'master'
          }
          steps {
            runBash '''
              : "${ATLAS_RUNTIME_URLS:?Set the deployed host atlas.runtime.json URL or URLs.}"
              corepack pnpm exec atlas verify
            '''
          }
        }
      }
    }
  }
}
