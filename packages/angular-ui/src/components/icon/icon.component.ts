import { Component, input } from "@angular/core";

@Component({
  standalone: true,
  selector: "example-icon",
  template: `<div>!!{{ icon() }}??</div>`,
})
export class IconComponent {
  icon = input.required<string>();
}
