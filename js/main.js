(function () {
  'use strict';

  const galleryImages = [
    { src: 'images/gallery-01.jpg', alt: 'Hotel exterior' },
    { src: 'images/gallery-02.jpg', alt: 'Guest room' },
    { src: 'images/gallery-03.jpg', alt: 'Suite living area' },
    { src: 'images/gallery-04.jpg', alt: 'Restaurant dining' },
    { src: 'images/gallery-05.jpg', alt: 'Bar and lounge' },
    { src: 'images/gallery-06.jpg', alt: 'Conference hall' },
    { src: 'images/gallery-07.jpg', alt: 'Meeting setup' },
    { src: 'images/gallery-08.jpg', alt: 'Deluxe room' },
    { src: 'images/gallery-09.jpg', alt: 'Luxury room' },
    { src: 'images/gallery-10.jpg', alt: 'Pool area' },
    { src: 'images/gallery-11.jpg', alt: 'Hotel facade' },
    { src: 'images/gallery-12.jpg', alt: 'Room amenities' },
    { src: 'images/gallery-13.jpg', alt: 'Breakfast buffet' },
    { src: 'images/gallery-14.jpg', alt: 'City view' },
    { src: 'images/gallery-15.jpg', alt: 'Cozy bedroom' },
    { src: 'images/gallery-16.jpg', alt: 'Modern bathroom' },
    { src: 'images/gallery-17.jpg', alt: 'Business workspace' },
    { src: 'images/gallery-18.jpg', alt: 'Event space' },
    { src: 'images/gallery-19.jpg', alt: 'Hotel grounds' },
    { src: 'images/gallery-20.jpg', alt: 'Hotel lobby' },
  ];

  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid) {
    galleryImages.forEach(function (img, i) {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('data-index', i);
      item.innerHTML = '<img src="' + img.src + '" alt="' + img.alt + '" loading="lazy">';
      item.addEventListener('click', function () { openLightbox(i); });
      galleryGrid.appendChild(item);
    });
  }

  var currentIndex = 0;
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
  }

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', showPrev);
  document.getElementById('lightboxNext').addEventListener('click', showNext);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  var header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.room-card, .feature-split, .location-card, .gallery-item').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  var style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
})();
