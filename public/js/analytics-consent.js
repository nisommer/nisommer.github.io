/* Basic consent mode: do not load Google Analytics until an explicit acceptance. */
(function () {
  'use strict';
  var script = document.getElementById('analytics-consent-script');
  var id = script && script.getAttribute('data-measurement-id');
  var production = /^(www\.)?nicolassommer\.com$/.test(window.location.hostname);
  if (!production || !/^G-[A-Z0-9]+$/.test(id || '')) return;

  var key = 'ns-analytics-consent-v1';
  var lifetime = 180 * 24 * 60 * 60 * 1000;
  var panel = document.getElementById('analytics-consent');
  var settings = document.getElementById('analytics-settings');
  var status = document.getElementById('analytics-status');
  var started = false;
  var accepted = false;
  var tag;
  var returnFocus = false;

  function readChoice() {
    try {
      var raw = window.localStorage.getItem(key);
      var value = JSON.parse(raw);
      if (value && (value.choice === 'accepted' || value.choice === 'refused') &&
          typeof value.time === 'number' && Date.now() - value.time >= 0 &&
          Date.now() - value.time < lifetime) {
        // Never reuse an acceptance if storage has become read-only: withdrawal must be savable.
        if (value.choice === 'accepted') window.localStorage.setItem(key, raw);
        return value.choice;
      }
    } catch (ignore) { /* Storage can be unavailable; default to no analytics. */ }
    return null;
  }

  function saveChoice(choice) {
    try {
      var value = JSON.stringify({ choice: choice, time: Date.now() });
      window.localStorage.setItem(key, value);
      return window.localStorage.getItem(key) === value;
    } catch (ignore) { return false; }
  }

  function showPanel() {
    panel.hidden = false;
    settings.setAttribute('aria-expanded', 'true');
  }

  function hidePanel() {
    panel.hidden = true;
    settings.setAttribute('aria-expanded', 'false');
    if (returnFocus || document.activeElement === document.getElementById('analytics-accept') ||
        document.activeElement === document.getElementById('analytics-refuse')) settings.focus();
    returnFocus = false;
  }

  function clearCookies() {
    var names = document.cookie.split(';').map(function (part) {
      return part.split('=')[0].trim();
    }).filter(function (name) { return /^(_ga(?:_|$)|_gid$|_gat(?:_|$)|__utm)/.test(name); });
    var domains = ['', window.location.hostname, '.' + window.location.hostname,
      'nicolassommer.com', '.nicolassommer.com'];
    var parts = window.location.pathname.split('/');
    var paths = ['/'];
    for (var i = 1; i < parts.length; i++) {
      var path = parts.slice(0, i + 1).join('/');
      paths.push(path, path + '/');
    }
    names.forEach(function (name) {
      domains.forEach(function (domain) {
        paths.forEach(function (path) {
          document.cookie = name + '=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=' + path +
            (domain ? '; domain=' + domain : '') + '; SameSite=Lax';
        });
      });
    });
  }

  function start() {
    if (started || !accepted) return;
    started = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      if (accepted) window.dataLayer.push(arguments);
    };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 15552000,
      cookie_update: false,
      // Do not send URL query strings or fragments, which may contain personal data.
      page_location: window.location.origin + window.location.pathname,
      page_referrer: document.referrer ? document.referrer.split(/[?#]/)[0] : ''
    });
    tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(tag);
  }

  function refuse(persist) {
    var wasStarted = started;
    accepted = false;
    window['ga-disable-' + id] = true;
    // Do not issue consent-update pings after withdrawal. The opt-out flag blocks collection.
    window.gtag = function () {};
    if (window.dataLayer) window.dataLayer.length = 0;
    if (tag && tag.parentNode) tag.parentNode.removeChild(tag);
    clearCookies();
    var saved = persist ? saveChoice('refused') : true;
    if (!saved) {
      // Best effort: discard any old acceptance rather than leaving it authoritative.
      try { window.localStorage.removeItem(key); } catch (ignore) {}
    }
    hidePanel();
    status.textContent = saved ? 'Analytics is off.' : 'Analytics is off. Your browser could not save this choice.';
    if (wasStarted) {
      // A fragment is a fail-closed fallback if storage is blocked or fails during withdrawal.
      // It is not sent to the server, and is removed after the next explicit acceptance.
      if (!saved) window.location.hash = 'analytics-off';
      window.location.reload();
    }
  }

  document.getElementById('analytics-accept').addEventListener('click', function () {
    if (window.location.hash === '#analytics-off') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    accepted = true;
    var saved = saveChoice('accepted');
    hidePanel();
    status.textContent = saved ? 'Analytics is on. You can change your choice at any time.' :
      'Analytics is on for this page only. Your browser could not save this choice.';
    start();
  });
  document.getElementById('analytics-refuse').addEventListener('click', function () { refuse(true); });
  settings.addEventListener('click', function () {
    returnFocus = true;
    showPanel();
    document.getElementById('analytics-accept').focus();
  });
  // Withdrawal in another open tab applies here too. Granting elsewhere never opts this tab in.
  window.addEventListener('storage', function (event) {
    if ((event.key === key || event.key === null) && readChoice() !== 'accepted') refuse(false);
  });
  settings.hidden = false;
  var choice = readChoice();
  if (window.location.hash === '#analytics-off') choice = 'refused';
  if (choice === 'accepted') {
    accepted = true;
    start();
  } else {
    window['ga-disable-' + id] = true;
    clearCookies();
    if (!choice) showPanel();
  }
}());
