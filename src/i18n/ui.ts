export const ui = {
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.software': 'Software',
    'nav.buildings': 'VICUS BUILDINGS',
    'nav.districts': 'VICUS DISTRICTS',
    'nav.tutorials': 'Tutorials & Hilfe',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontakt',
    'nav.demo': 'Demo buchen',
    'nav.careers': 'Karriere',

    // Buttons
    'btn.demo': 'Demo buchen',
    'btn.download': 'Download',
    'btn.contact': 'Kontakt aufnehmen',
    'btn.learnMore': 'Mehr erfahren',
    'btn.submit': 'Absenden',
    'btn.apply': 'Jetzt bewerben',
    'btn.subscribe': 'Anmelden',
    'btn.readMore': 'Weiterlesen',

    // Hero
    'hero.tagline': 'Nachhaltige Planung mit Simulation',
    'hero.subtitle': 'Professionelle Software für Gebäudesimulation und Quartiersplanung',

    // Footer
    'footer.products': 'Produkte',
    'footer.company': 'Unternehmen',
    'footer.legal': 'Rechtliches',
    'footer.impressum': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.newsletter': 'Newsletter',
    'footer.copyright': '© {year} VICUS Software. Alle Rechte vorbehalten.',

    // Forms
    'form.name': 'Name',
    'form.email': 'E-Mail',
    'form.company': 'Firma',
    'form.phone': 'Telefon',
    'form.message': 'Nachricht',
    'form.subject': 'Betreff',
    'form.file': 'Datei hochladen',
    'form.position': 'Position',
    'form.required': 'Pflichtfeld',
    'form.success': 'Ihre Nachricht wurde erfolgreich gesendet.',
    'form.error': 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',

    // Pages
    'page.tutorials.title': 'Tutorials & Hilfe',
    'page.contact.title': 'Kontakt',
    'page.demo.title': 'Demo buchen',
    'page.careers.title': 'Karriere',
    'page.blog.title': 'Blog',
    'page.impressum.title': 'Impressum',
    'page.privacy.title': 'Datenschutz',
    'page.newsletter.title': 'Newsletter',
    'page.application.title': 'Bewerbung',

    // Misc
    'misc.postedOn': 'Veröffentlicht am',
    'misc.readTime': '{min} Min. Lesezeit',
    'misc.backToBlog': 'Zurück zum Blog',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.software': 'Software',
    'nav.buildings': 'VICUS BUILDINGS',
    'nav.districts': 'VICUS DISTRICTS',
    'nav.tutorials': 'Tutorials & Help',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.demo': 'Book Demo',
    'nav.careers': 'Careers',

    // Buttons
    'btn.demo': 'Book Demo',
    'btn.download': 'Download',
    'btn.contact': 'Get in Touch',
    'btn.learnMore': 'Learn More',
    'btn.submit': 'Submit',
    'btn.apply': 'Apply Now',
    'btn.subscribe': 'Subscribe',
    'btn.readMore': 'Read More',

    // Hero
    'hero.tagline': 'Sustainable Planning with Simulation',
    'hero.subtitle': 'Professional software for building simulation and district planning',

    // Footer
    'footer.products': 'Products',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.impressum': 'Imprint',
    'footer.privacy': 'Privacy Policy',
    'footer.newsletter': 'Newsletter',
    'footer.copyright': '© {year} VICUS Software. All rights reserved.',

    // Forms
    'form.name': 'Name',
    'form.email': 'Email',
    'form.company': 'Company',
    'form.phone': 'Phone',
    'form.message': 'Message',
    'form.subject': 'Subject',
    'form.file': 'Upload File',
    'form.position': 'Position',
    'form.required': 'Required',
    'form.success': 'Your message has been sent successfully.',
    'form.error': 'An error occurred. Please try again.',

    // Pages
    'page.tutorials.title': 'Tutorials & Help',
    'page.contact.title': 'Contact',
    'page.demo.title': 'Book Demo',
    'page.careers.title': 'Careers',
    'page.blog.title': 'Blog',
    'page.impressum.title': 'Imprint',
    'page.privacy.title': 'Privacy Policy',
    'page.newsletter.title': 'Newsletter',
    'page.application.title': 'Application',

    // Misc
    'misc.postedOn': 'Posted on',
    'misc.readTime': '{min} min read',
    'misc.backToBlog': 'Back to Blog',
  },
} as const;

export type UIKey = keyof typeof ui.de;
