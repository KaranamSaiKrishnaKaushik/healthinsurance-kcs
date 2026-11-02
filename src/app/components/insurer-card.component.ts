import { Component, input } from '@angular/core';
import { Insurer } from '../data/site.config';
import { whatsappLink } from '../core/contact';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-insurer-card', standalone: true, imports: [IconComponent],
  template: `
    <article class="insurer-card" [style.--card-accent]="insurer().accent" [attr.aria-labelledby]="insurer().id + '-title'">
      <div class="card-top"><span class="insurance-type">{{ insurer().type }}</span><app-icon [name]="insurer().icon" /></div>
      <div class="logo-slot">
        @if (insurer().logo; as logo) { <img [src]="logo" [alt]="insurer().name + ' logo'" loading="lazy" width="180" height="64"> }
        @else { <span class="name-badge">{{ insurer().shortName }}</span><small>OFFICIAL LOGO PLACEHOLDER</small> }
      </div>
      <h3 [id]="insurer().id + '-title'">{{ insurer().name }}</h3>
      <span class="partner-badge"><app-icon [name]="insurer().certificationVerified ? 'verified' : 'info'" />{{ insurer().certificationVerified ? 'Certified partner' : 'Certified partner · placeholder' }}</span>
      <p class="card-description">{{ insurer().description }}</p>
      <p class="category-label">COVER OPTIONS <span>· illustrative</span></p>
      <ul>@for (category of insurer().categories; track category) { <li><app-icon name="check_circle" />{{ category }}</li> }</ul>
      <a class="button quote-button" [href]="quoteLink()" target="_blank" rel="noopener noreferrer" [attr.aria-label]="'Get a quote for ' + insurer().name + ' on WhatsApp (opens in a new tab)'">Get a quote<app-icon name="north_east" /></a>
    </article>
  `,
  styleUrl: './insurer-card.component.scss'
})
export class InsurerCardComponent {
  readonly insurer = input.required<Insurer>();
  quoteLink(): string { return whatsappLink(this.insurer().quoteMessage); }
}
