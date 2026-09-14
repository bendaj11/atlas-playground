import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from "@angular/core";
import {
  MatCard,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from "@angular/material/card";

@Component({
  selector: "ui-card",
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <mat-card appearance="outlined" class="ui-card">
      <mat-card-header>
        <mat-card-title>{{ title() }}</mat-card-title>
        <mat-card-subtitle>{{ subtitle() }}</mat-card-subtitle>
      </mat-card-header>
    </mat-card>
  `,
  styleUrl: "./card.component.scss",
})
export class CardComponent {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
}
