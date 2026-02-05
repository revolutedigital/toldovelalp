// Toldo Vela - Landing Page
(function () {
  'use strict';

  // Header scroll effect
  var header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('header--scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // Intersection Observer for scroll animations
  var els = document.querySelectorAll('[data-animate]');
  if (els.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var siblings = e.target.parentElement.querySelectorAll('[data-animate]');
            var idx = Array.prototype.indexOf.call(siblings, e.target);
            e.target.style.transitionDelay = (idx * 100) + 'ms';
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  // Counter animation for solution card numbers
  var numbers = document.querySelectorAll('.solution-card__number');
  if (numbers.length) {
    var numIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          numIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    numbers.forEach(function (n) { numIO.observe(n); });
  }

  // FAQ Accordion
  var faqQuestions = document.querySelectorAll('.faq__question');
  faqQuestions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = btn.nextElementSibling;

      // Close all others
      faqQuestions.forEach(function (other) {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', !expanded);
      if (!expanded) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = null;
      }
    });
  });

  // Lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCurrent = document.getElementById('lightbox-current');
  var lightboxTotal = document.getElementById('lightbox-total');
  var bentoItems = document.querySelectorAll('[data-lightbox]');
  var currentIndex = 0;
  var images = [];

  if (bentoItems.length && lightbox) {
    // Build images array
    bentoItems.forEach(function (item) {
      images.push(item.getAttribute('data-lightbox'));
    });
    lightboxTotal.textContent = images.length;

    // Open lightbox
    bentoItems.forEach(function (item, index) {
      item.addEventListener('click', function () {
        currentIndex = index;
        openLightbox();
      });
    });

    function openLightbox() {
      lightboxImg.src = images[currentIndex];
      lightboxCurrent.textContent = currentIndex + 1;
      lightbox.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex];
      lightboxCurrent.textContent = currentIndex + 1;
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex];
      lightboxCurrent.textContent = currentIndex + 1;
    }

    // Event listeners
    lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox__next').addEventListener('click', nextImage);
    lightbox.querySelector('.lightbox__prev').addEventListener('click', prevImage);

    // Close on background click
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox__content')) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    });
  }
})();
