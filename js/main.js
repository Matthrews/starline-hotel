(function () {
  'use strict';

  // Gallery images — replace with real hotel photos
  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80', alt: 'Hotel exterior' },
    { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', alt: 'Guest room' },
    { src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', alt: 'Suite living area' },
    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Restaurant dining' },
    { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', alt: 'Bar and lounge' },
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', alt: 'Conference hall' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', alt: 'Meeting setup' },
    { src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80', alt: 'Deluxe room' },
    { src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80', alt: 'Luxury room' },
    { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', alt: 'Pool area' },
    { src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', alt: 'Hotel lobby' },
    { src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', alt: 'Hotel facade' },
    { src: 'https://images.unsplash.com/photo-1591088390512-2c049524296b?w=800&q=80', alt: 'Room amenities' },
    { src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80', alt: 'Breakfast buffet' },
    { src: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80', alt: 'City view' },
    { src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', alt: 'Cozy bedroom' },
    { src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80', alt: 'Modern bathroom' },
    { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', alt: 'Business workspace' },
    { src: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2f3?w=800&q=80', alt: 'Event space' },
    { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', alt: 'Hotel grounds' },
  ];

  // Build gallery
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

  // Lightbox
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

  // Header scroll effect
  var header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
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

  // Fade-in on scroll
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
