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
})();
