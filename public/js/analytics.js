/* Basic audience measurement, with no advertising features or banner. */
(function () {
  'use strict';
  var id = 'G-QELS3YZTBT';
  if (!/^(www\.)?nicolassommer\.com$/.test(window.location.hostname)) return;
  var key = 'ns-analytics-consent-v1';
  var off = window.location.hash === '#analytics-off';
  try {
    var saved = JSON.parse(window.localStorage.getItem(key));
    if (saved && saved.choice === 'refused') off = true;
  } catch (ignore) { off = true; }

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

  function disable() {
    clearCookies();
    window['ga-disable-' + id] = true;
    try { window.localStorage.setItem(key, JSON.stringify({choice: 'refused', time: Date.now()})); } catch (ignore) {}
    window.location.hash = 'analytics-off';
    window.location.reload();
  }
  var button = document.getElementById('analytics-opt-out');
  if (button) {
    button.addEventListener('click', disable);
    if (off) { button.textContent = 'Analytics is disabled in this browser'; button.disabled = true; }
  }
  window.addEventListener('storage', function (event) {
    if (event.key === key || event.key === null) {
      try {
        var choice = JSON.parse(window.localStorage.getItem(key));
        if (choice && choice.choice === 'refused') {
          window['ga-disable-' + id] = true;
          window.location.reload();
        }
      } catch (ignore) { window['ga-disable-' + id] = true; }
    }
  });
  if (off) { window['ga-disable-' + id] = true; clearCookies(); return; }
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  // Do not represent visitor consent as granted.
  window.gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
  });
  window.gtag('js', new Date());
  window.gtag('config', id, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: 15552000,
    cookie_update: false,
    page_location: window.location.origin + window.location.pathname,
    page_referrer: document.referrer ? document.referrer.split(/[?#]/)[0] : ''
  });
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(tag);
}());
