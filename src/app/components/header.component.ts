import { Component, HostListener, signal } from '@angular/core';
import { siteConfig } from '../data/site.config';
import { whatsappLink } from '../core/contact';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-header', standalone: true, imports: [IconComponent],
  template: `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="#home" (click)="close()" [attr.aria-label]="site.agent.name + ' — home'">
          <span class="brand-mark"><app-icon name="shield" /></span>
          <span><strong>KCS<span class="brand-dot">.</span> Insurance</strong><small>PERSONAL ADVICE. LASTING PEACE OF MIND.</small></span>
        </a>
        <button class="menu-toggle" type="button" (click)="open.set(!open())" [attr.aria-expanded]="open()" aria-controls="main-nav" [attr.aria-label]="open() ? 'Close navigation' : 'Open navigation'"><app-icon [name]="open() ? 'close' : 'menu'" /></button>
        <nav id="main-nav" aria-label="Main navigation" [class.is-open]="open()">
          <a href="#about" (click)="close()">About</a><a href="#partners" (click)="close()">Insurance partners</a><a href="#process" (click)="close()">How it works</a><a href="#contact" (click)="close()">Contact</a>
          <a class="button button-small button-primary" [href]="whatsapp" target="_blank" rel="noopener noreferrer" (click)="close()">Let’s talk<app-icon name="north_east" /></a>
        </nav>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly site = siteConfig; readonly whatsapp = whatsappLink(); readonly open = signal(false);
  close(): void { this.open.set(false); }
  @HostListener('document:keydown.escape') onEscape(): void { this.close(); }
}
