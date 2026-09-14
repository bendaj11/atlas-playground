import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "ui-text",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span>{{ text() }}</span>`,
  styleUrl: "./text.component.scss",
})
export class TextComponent {
  readonly text = input.required<string>();
}
