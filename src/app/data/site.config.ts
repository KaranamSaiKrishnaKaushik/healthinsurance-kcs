export interface Insurer {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly type: string;
  readonly accent: string;
  readonly icon: string;
  readonly description: string;
  readonly categories: readonly string[];
  readonly logo: string | null;
  readonly certificationVerified: boolean;
  readonly quoteMessage: string;
}

export interface SiteConfig {
  readonly agent: {
    readonly name: string; readonly title: string; readonly initials: string;
    readonly location: string; readonly locationVerified: boolean;
    readonly bio: string; readonly photo: string | null;
    readonly licence: string; readonly licenceVerified: boolean;
  };
  readonly contact: {
    readonly whatsappNumber: string; readonly displayPhone: string;
    readonly email: string; readonly whatsappMessage: string;
    readonly emailSubject: string; readonly emailBody: string;
  };
  readonly visuals: {
    readonly visitingCard: string;
    readonly consultationAnimation: string;
    readonly consultationStill: string;
  };
  readonly tagline: string;
  readonly trustPoints: readonly string[];
  readonly whyChoose: readonly string[];
  readonly insurers: readonly Insurer[];
  readonly disclaimer: string;
}

export const siteConfig: SiteConfig = {
  agent: {
    name: 'Chandra Sekhar Rao Karanam',
    title: 'Authorised Insurance Advisor',
    initials: 'KCS',
    location: 'Hyderabad',
    locationVerified: false,
    bio: '[Editable bio] I help individuals and families understand their health and life insurance options. My approach is to listen to your needs, explain policy terms in plain language, and help you make an informed choice.',
    photo: null,
    licence: '[Add IRDAI agent licence number]',
    licenceVerified: false
  },
  contact: {
    whatsappNumber: '919908522456', displayPhone: '+91 9908522456',
    email: 'kcsrao.hyd.karanam@gmail.com',
    whatsappMessage: 'Hello Mr. Karanam, I would like to discuss insurance options for me and my family.',
    emailSubject: 'Insurance enquiry — Chandra Sekhar Rao Karanam',
    emailBody: 'Hello Mr. Karanam,\n\nI would like to understand my insurance options. Please let me know a convenient time to connect.\n\nMy name:\nPreferred contact time:\n\nThank you.'
  },
  visuals: {
    visitingCard: 'assets/images/agent-visiting-card.jpeg',
    consultationAnimation: 'assets/images/agent-consultation-animated.svg',
    consultationStill: 'assets/images/agent-consultation-static.svg'
  },
  tagline: 'Protecting you and your family, with honest advice',
  trustPoints: ['[Confirm] Guidance based on your needs', '[Confirm] Clear explanations of policy terms', '[Confirm] Help with policy documentation'],
  whyChoose: ['[Confirm] One person to speak with', '[Confirm] Help understanding your choices', '[Confirm] Support through the application'],
  insurers: [
    {
      id: 'niva-bupa', name: 'Niva Bupa Health Insurance', shortName: 'Niva Bupa', type: 'HEALTH INSURANCE',
      accent: '#08746e', icon: 'health_and_safety',
      description: 'Explore health cover for different life stages and family needs.',
      categories: ['Individual', 'Family Floater', 'Senior Citizens', 'Top-up'],
      logo: 'assets/logos/niva-bupa.svg', certificationVerified: false,
      quoteMessage: 'Hello Mr. Karanam, I would like a quote for Niva Bupa Health Insurance. Could you help me understand the available plans?'
    },
    {
      id: 'tata-aig', name: 'Tata AIG Health Insurance', shortName: 'Tata AIG', type: 'HEALTH INSURANCE',
      accent: '#255d98', icon: 'favorite',
      description: 'Understand health insurance options that fit your priorities.',
      categories: ['Individual', 'Family Floater', 'Senior Citizens', 'Top-up'],
      logo: 'assets/logos/tata-aig.png', certificationVerified: false,
      quoteMessage: 'Hello Mr. Karanam, I would like a quote for Tata AIG Health Insurance. Could you help me compare the available options?'
    },
    {
      id: 'lic', name: 'Life Insurance Corporation of India (LIC)', shortName: 'LIC of India', type: 'LIFE INSURANCE',
      accent: '#8a4a36', icon: 'diversity_1',
      description: 'Consider life insurance for the people and milestones that matter.',
      categories: ['Term', 'Endowment', 'Pension', 'Child plans'],
      logo: 'assets/logos/lic.svg', certificationVerified: false,
      quoteMessage: 'Hello Mr. Karanam, I would like to discuss Life Insurance Corporation of India (LIC) plans. Could you help me find suitable options?'
    }
  ],
  disclaimer: "Insurance is the subject matter of solicitation. This is an independent agent's website, not the official website of any insurer. Plan details are indicative; refer to the official policy documents."
};
