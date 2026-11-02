import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon', standalone: true,
  template: `<span class="material-symbols-outlined" aria-hidden="true">{{ name() }}</span>`,
  styles: [':host { display: inline-flex; flex-shrink: 0; vertical-align: middle; } span { font-size: inherit; line-height: 1; }']
})
export class IconComponent { readonly name = input.required<string>(); }
