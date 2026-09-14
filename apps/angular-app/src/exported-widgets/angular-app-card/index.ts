import { Component, input } from "@angular/core";
import { CardComponent } from "@atlas/angular-ui";

@Component({
  selector: "atlas-angular-app-card-widget",
  standalone: true,
  template: `
    <ui-card title="This is Angular Card Widget!" [subtitle]="subtitle()" />
  `,
  imports: [CardComponent],
})
export default class AngularAppCardWidget {
  readonly subtitle = input("Angular App Card");
}
