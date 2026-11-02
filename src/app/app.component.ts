import { Component, DOCUMENT, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { siteConfig } from './data/site.config';
import { whatsappLink } from './core/contact';
import { RevealDirective } from './core/reveal.directive';
import { HeaderComponent } from './components/header.component';
import { IconComponent } from './components/icon.component';
import { ContactButtonsComponent } from './components/contact-buttons.component';
import { InsurerCardComponent } from './components/insurer-card.component';

@Component({
  selector: 'app-root', standalone: true,
  imports: [HeaderComponent, IconComponent, ContactButtonsComponent, InsurerCardComponent, RevealDirective],
  templateUrl: './app.component.html', styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly site = siteConfig;
  readonly whatsapp = whatsappLink();
  readonly year = new Date().getFullYear();
  private readonly document = inject(DOCUMENT);

  constructor() {
    const title = `${siteConfig.agent.name} | Independent Insurance Advisor`;
    inject(Title).setTitle(title);
    const meta = inject(Meta);
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ name: 'description', content: `Speak with ${siteConfig.agent.name} about health and life insurance options for you and your family. Connect directly on WhatsApp or email.` });
    const schema = this.document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'InsuranceAgency',
      name: siteConfig.agent.name, telephone: siteConfig.contact.displayPhone,
      email: siteConfig.contact.email,
      description: siteConfig.tagline,
      ...(siteConfig.agent.locationVerified ? { address: { '@type': 'PostalAddress', addressLocality: siteConfig.agent.location, addressCountry: 'IN' } } : {})
    });
    this.document.head.appendChild(schema);
  }
}
