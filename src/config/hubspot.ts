export const HUBSPOT_CONFIG = {
  portalId: import.meta.env.HUBSPOT_PORTAL_ID || 'YOUR_PORTAL_ID',
  formIds: {
    contact: import.meta.env.HUBSPOT_CONTACT_FORM_ID || 'YOUR_CONTACT_FORM_ID',
    demo: import.meta.env.HUBSPOT_DEMO_FORM_ID || 'YOUR_DEMO_FORM_ID',
    newsletter: import.meta.env.HUBSPOT_NEWSLETTER_FORM_ID || 'YOUR_NEWSLETTER_FORM_ID',
    download: import.meta.env.HUBSPOT_DOWNLOAD_FORM_ID || 'YOUR_DOWNLOAD_FORM_ID',
    license: import.meta.env.HUBSPOT_LICENSE_FORM_ID || 'YOUR_LICENSE_FORM_ID',
    application: import.meta.env.HUBSPOT_APPLICATION_FORM_ID || 'YOUR_APPLICATION_FORM_ID',
  }
};
