(function () {
  'use strict';

  var STORAGE_KEY = 'bc_cookie_consent';

  function getConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setConsent(consent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (e) {}
  }

  function hideBanner() {
    var banner = document.getElementById('cookieBanner');
    if (!banner) return;
    banner.classList.remove('cookie-banner--visible');
    banner.classList.add('cookie-banner--hidden');
  }

  function showBanner() {
    var banner = document.getElementById('cookieBanner');
    if (!banner) return;
    banner.classList.add('cookie-banner--visible');
  }

  function openModal() {
    var modal = document.getElementById('cookieModal');
    if (!modal) return;
    modal.classList.add('cookie-modal--open');
    document.body.style.overflow = 'hidden';
    // Sync toggles to current saved state
    var consent = getConsent();
    if (consent) {
      setToggle('ck-analytics', consent.analytics);
      setToggle('ck-marketing', consent.marketing);
      setToggle('ck-personalization', consent.personalization);
    }
  }

  function closeModal() {
    var modal = document.getElementById('cookieModal');
    if (!modal) return;
    modal.classList.remove('cookie-modal--open');
    document.body.style.overflow = '';
  }

  function setToggle(id, val) {
    var el = document.getElementById(id);
    if (el) el.checked = !!val;
  }

  function getToggle(id) {
    var el = document.getElementById(id);
    return el ? el.checked : false;
  }

  function acceptAll() {
    setConsent({ essential: true, analytics: true, marketing: true, personalization: true });
    hideBanner();
    closeModal();
  }

  function denyAll() {
    setConsent({ essential: true, analytics: false, marketing: false, personalization: false });
    hideBanner();
    closeModal();
  }

  function saveSelection() {
    setConsent({
      essential: true,
      analytics: getToggle('ck-analytics'),
      marketing: getToggle('ck-marketing'),
      personalization: getToggle('ck-personalization'),
    });
    hideBanner();
    closeModal();
  }

  function on(id, event, fn) {
    var el = document.getElementById(id);
    if (el) el.addEventListener(event, fn);
  }

  function init() {
    var existing = getConsent();
    if (!existing) {
      // First visit — show banner after short delay
      setTimeout(showBanner, 900);
    }

    on('cookieAcceptAll', 'click', acceptAll);
    on('cookieDeny', 'click', denyAll);
    on('cookieSettings', 'click', openModal);
    on('cookieModalClose', 'click', closeModal);
    on('cookieModalBackdrop', 'click', closeModal);
    on('cookieModalAcceptAll', 'click', acceptAll);
    on('cookieModalSave', 'click', saveSelection);

    // Escape key closes modal
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
