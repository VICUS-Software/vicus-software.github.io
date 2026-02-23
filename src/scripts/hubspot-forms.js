/**
 * HubSpot Forms API integration.
 *
 * Automatically handles submission for any <form> with
 * data-hubspot-portal and data-hubspot-form attributes.
 *
 * Additional data attributes on the form:
 *   data-success-de / data-success-en  — success message per language
 *   data-error-de   / data-error-en    — error message per language
 *   data-btn-de     / data-btn-en      — button label per language
 *
 * HubSpot Forms API (no auth required):
 *   POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formId}
 */
(function () {
  'use strict';

  var HUBSPOT_API = 'https://api.hsforms.com/submissions/v3/integration/submit';

  // Fields to skip (not sent to HubSpot)
  var SKIP_FIELDS = ['privacy'];

  function getLang() {
    return document.documentElement.lang === 'de' ? 'de' : 'en';
  }

  function getHubSpotCookie() {
    var match = document.cookie.match(/hubspotutk=([^;]+)/);
    return match ? match[1] : '';
  }

  /**
   * Collect form fields into HubSpot format.
   * Returns an array of { objectTypeId, name, value } objects.
   */
  function collectFields(form) {
    var fields = [];
    var seen = {};
    var elements = form.elements;

    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var name = el.name;
      if (!name || SKIP_FIELDS.indexOf(name) !== -1) continue;
      if (el.type === 'submit' || el.type === 'button' || el.type === 'file') continue;

      // Checkboxes with same name → collect all checked values
      if (el.type === 'checkbox') {
        if (seen[name]) continue;
        seen[name] = true;
        var checkboxes = form.querySelectorAll('input[name="' + name + '"]');
        var values = [];
        checkboxes.forEach(function (cb) {
          if (cb.checked) values.push(cb.value === 'on' ? 'true' : cb.value);
        });
        if (values.length > 0) {
          fields.push({
            objectTypeId: '0-1',
            name: name,
            value: values.join(';'),
          });
        }
        continue;
      }

      // Radio buttons
      if (el.type === 'radio') {
        if (seen[name]) continue;
        seen[name] = true;
        var checked = form.querySelector('input[name="' + name + '"]:checked');
        if (checked) {
          fields.push({ objectTypeId: '0-1', name: name, value: checked.value });
        }
        continue;
      }

      // Regular inputs, selects, textareas
      if (el.value) {
        fields.push({ objectTypeId: '0-1', name: name, value: el.value });
      }
    }

    return fields;
  }

  /**
   * Submit form data to HubSpot Forms API.
   */
  async function submitToHubSpot(form) {
    var portalId = form.dataset.hubspotPortal;
    var formId = form.dataset.hubspotForm;

    if (!portalId || !formId || portalId === 'YOUR_PORTAL_ID' || formId.startsWith('YOUR_')) {
      // Config not set — fall back to mock success for development
      console.warn('[HubSpot] Portal or Form ID not configured, simulating submission.');
      await new Promise(function (r) { setTimeout(r, 800); });
      return;
    }

    var fields = collectFields(form);
    var hutk = getHubSpotCookie();

    var payload = {
      fields: fields,
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    if (hutk) {
      payload.context.hutk = hutk;
    }

    var url = HUBSPOT_API + '/' + portalId + '/' + formId;

    var response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      var error = {};
      try { error = await response.json(); } catch (_) {}
      throw new Error(error.message || 'Submission failed (' + response.status + ')');
    }
  }

  /**
   * Auto-bind to all HubSpot forms on the page.
   */
  document.querySelectorAll('form[data-hubspot-portal]').forEach(function (form) {
    // Find the status element (convention: #<form-id>-status or element with matching id)
    var formId = form.id;
    var statusEl = document.getElementById(formId.replace('-form', '') + '-form-status')
      || document.getElementById(formId + '-status')
      || form.querySelector('[id$="-status"]');
    var submitBtn = form.querySelector('button[type="submit"]');
    var originalBtnText = submitBtn ? submitBtn.textContent : '';

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      var lang = getLang();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '...';
      }
      if (statusEl) statusEl.classList.add('hidden');

      try {
        await submitToHubSpot(form);

        // Success
        if (statusEl) {
          statusEl.className = 'p-4 rounded-lg bg-primary/20 text-primary';
          statusEl.textContent = form.dataset['success' + lang.charAt(0).toUpperCase() + lang.slice(1)]
            || (lang === 'de'
              ? 'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet.'
              : 'Thank you! Your request has been submitted successfully.');
          statusEl.classList.remove('hidden');
        }
        form.reset();
      } catch (err) {
        console.error('[HubSpot] Submission error:', err);
        if (statusEl) {
          statusEl.className = 'p-4 rounded-lg bg-red-500/20 text-red-400';
          statusEl.textContent = form.dataset['error' + lang.charAt(0).toUpperCase() + lang.slice(1)]
            || (lang === 'de'
              ? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
              : 'An error occurred. Please try again.');
          statusEl.classList.remove('hidden');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  });
})();
