import { Component } from '@angular/core';
import { emailLink, whatsappLink } from '../core/contact';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-contact-buttons', standalone: true, imports: [IconComponent],
  template: `
    <a class="button button-primary" [href]="whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp (opens in a new tab)"><app-icon name="chat_bubble" />Chat on WhatsApp<app-icon name="north_east" /></a>
    <a class="button button-outline" [href]="email"><app-icon name="mail" />Send email</a>
  `,
  styles: [':host { display: flex; flex-wrap: wrap; gap: .75rem; }']
})
export class ContactButtonsComponent { readonly whatsapp = whatsappLink(); readonly email = emailLink(); }
