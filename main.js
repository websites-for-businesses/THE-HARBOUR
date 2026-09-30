// The Harbour — site interactions (nav, scrollspy, tabs, gallery filter, lightbox, reveal, header state)
document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Header scroll state */
  var header = document.getElementById('site-header');
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ScrollSpy for Navigation */
  var navLinks = document.querySelectorAll('.main-nav a[data-nav]');
  var sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 160;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* Mobile nav toggle */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    function setNavState(open) {
      nav.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      var open = !nav.classList.contains('open');
      setNavState(open);
    });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        setNavState(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setNavState(false);
      }
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* Residence tabs */
  var tabs = document.querySelectorAll('.res-tab');
  var panels = document.querySelectorAll('.res-panel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      var target = tab.getAttribute('data-tab');
      var panel = document.querySelector('.res-panel[data-panel="' + target + '"]');
      if (panel) panel.classList.add('active');
    });
  });

  /* Gallery filters */
  var filters = document.querySelectorAll('.gfilter');
  var items = document.querySelectorAll('.g-item');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      items.forEach(function (item) {
        var cat = item.getAttribute('data-cat');
        item.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
      });
    });
  });

  /* Lightbox */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCaption = document.getElementById('lb-caption');
  var lbClose = document.getElementById('lb-close');
  var lbPrev = document.getElementById('lb-prev');
  var lbNext = document.getElementById('lb-next');
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  var currentIndex = 0;

  function visibleItems() {
    return galleryItems.filter(function (i) { return i.style.display !== 'none'; });
  }

  function openLightbox(index) {
    var list = visibleItems();
    if (!list.length) return;
    currentIndex = index;
    var item = list[currentIndex];
    var img = item.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showRelative(delta) {
    var list = visibleItems();
    if (!list.length) return;
    currentIndex = (currentIndex + delta + list.length) % list.length;
    var img = list[currentIndex].querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = img.alt;
  }

  galleryItems.forEach(function (item, idx) {
    item.addEventListener('click', function () {
      var list = visibleItems();
      var indexInVisible = list.indexOf(item);
      openLightbox(indexInVisible >= 0 ? indexInVisible : 0);
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', function () { showRelative(-1); });
  if (lbNext) lbNext.addEventListener('click', function () { showRelative(1); });
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showRelative(-1);
    if (e.key === 'ArrowRight') showRelative(1);
  });

  /* Contact form (client-side demo validation) */
  var form = document.getElementById('inquiry-form');
  var success = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (success) {
        success.style.display = 'block';
        success.style.opacity = '1';
      }
      form.reset();
    });
  }
});
