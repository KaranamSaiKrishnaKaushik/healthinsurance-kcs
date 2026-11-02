import { siteConfig } from '../data/site.config';

export function whatsappLink(message = siteConfig.contact.whatsappMessage): string {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function emailLink(): string {
  const { email, emailSubject, emailBody } = siteConfig.contact;
  return `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
}
