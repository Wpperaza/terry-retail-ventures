/* ==========================================================================
   Terry Retail Ventures — site scripts
   Vanilla JS, no dependencies, no browser storage.
   Handles: mobile navigation, sticky-header state, scroll reveal,
            current-page marking, footer year, vendor form validation.
   ========================================================================== */
(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     CONTACT ADDRESSES
     Vendor / purchasing enquiries are handled by purchasing@; general and
     privacy enquiries by info@. If either address changes, update it here AND
     in the HTML (see README, "Replacing contact information").
     ----------------------------------------------------------------------- */
  var PURCHASING_EMAIL = 'purchasing@terryretailventures.com';

  var doc = document;

  /* ---------- Mobile navigation ---------- */
  var toggle = doc.querySelector('.nav-toggle');
  var nav = doc.getElementById('primary-nav');
  var header = doc.querySelector('.site-header');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });

    doc.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (!e.target.closest('.nav-bar')) closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 780) closeNav();
    });
  }

  /* ---------- Sticky header state ---------- */
  if (header) {
    var setStuck = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    setStuck();
    window.addEventListener('scroll', setStuck, { passive: true });
  }

  /* ---------- Mark the current page in the navigation ---------- */
  var here = window.location.pathname.split('/').pop() || 'index.html';
  Array.prototype.forEach.call(doc.querySelectorAll('.nav a'), function (link) {
    var href = link.getAttribute('href') || '';
    if (href === here && !link.classList.contains('nav-cta')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ---------- Scroll reveal ---------- */
  var revealables = doc.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!revealables.length) {
    /* nothing to do */
  } else if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px' });
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  }

  /* ---------- Footer year ---------- */
  Array.prototype.forEach.call(doc.querySelectorAll('[data-current-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Vendor inquiry form ---------- */
  var form = doc.getElementById('vendor-inquiry-form');
  if (!form) return;

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function fieldWrap(el) { return el.closest('.field'); }

  function setError(el, message) {
    var wrap = fieldWrap(el);
    if (!wrap) return;
    wrap.classList.add('has-error');
    var msg = wrap.querySelector('.field-error');
    if (msg && message) msg.textContent = message;
    el.setAttribute('aria-invalid', 'true');
  }

  function clearError(el) {
    var wrap = fieldWrap(el);
    if (!wrap) return;
    wrap.classList.remove('has-error');
    el.removeAttribute('aria-invalid');
  }

  function validate(el) {
    if (el.type === 'checkbox' || el.type === 'hidden' || el.name === 'company-website-url') return true;
    var value = (el.value || '').trim();

    if (el.hasAttribute('required') && !value) {
      setError(el, el.getAttribute('data-error-empty') || 'This field is required.');
      return false;
    }
    if (!value) { clearError(el); return true; }

    if (el.type === 'email' && !EMAIL_RE.test(value)) {
      setError(el, 'Please enter a valid email address.');
      return false;
    }
    if (el.type === 'url' && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(value)) {
      setError(el, 'Please enter a valid website address, for example example.com');
      return false;
    }
    if (el.type === 'tel' && !/^[\d\s()+.\-x]{7,}$/i.test(value)) {
      setError(el, 'Please enter a valid phone number.');
      return false;
    }
    clearError(el);
    return true;
  }

  var fields = form.querySelectorAll('input, textarea, select');
  Array.prototype.forEach.call(fields, function (el) {
    el.addEventListener('blur', function () { validate(el); });
    el.addEventListener('input', function () {
      if (fieldWrap(el) && fieldWrap(el).classList.contains('has-error')) validate(el);
    });
  });

  var LABELS = {
    'company': 'Company',
    'contact-name': 'Contact name',
    'role': 'Role',
    'email': 'Email',
    'phone': 'Phone',
    'website': 'Website',
    'relationship': 'Relationship type',
    'message': 'Details'
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    /* Honeypot: silently ignore automated submissions. */
    var trap = form.querySelector('input[name="company-website-url"]');
    if (trap && trap.value) return;

    var valid = true;
    Array.prototype.forEach.call(fields, function (el) {
      if (!validate(el)) valid = false;
    });

    if (!valid) {
      var firstBad = form.querySelector('.has-error input, .has-error textarea, .has-error select');
      if (firstBad) firstBad.focus();
      return;
    }

    /* No hosted form service is connected yet, so the validated submission is
       handed to the visitor's email client. See README to wire up a form
       backend (Cloudflare Pages Functions, Web3Forms, Formspree, ...). */
    var data = new FormData(form);
    var lines = ['Vendor inquiry submitted from terryretailventures.com', ''];

    Object.keys(LABELS).forEach(function (key) {
      if (key === 'message') return;
      var value = (data.get(key) || '').toString().trim();
      if (value) lines.push(LABELS[key] + ': ' + value);
    });

    var categories = data.getAll('categories');
    if (categories.length) lines.push('Categories: ' + categories.join(', '));

    var message = (data.get('message') || '').toString().trim();
    if (message) lines.push('', 'Details:', message);

    var href = 'mailto:' + PURCHASING_EMAIL +
      '?subject=' + encodeURIComponent('Vendor inquiry - ' + (data.get('company') || 'New supplier')) +
      '&body=' + encodeURIComponent(lines.join('\n'));

    var status = doc.getElementById('form-status');
    if (status) {
      status.classList.add('is-visible');
      status.setAttribute('tabindex', '-1');
      status.focus();
    }

    window.location.href = href;
  });
})();
