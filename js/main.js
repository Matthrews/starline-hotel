(function () {
  'use strict';

  const galleryImages = [
    { src: 'images/reception.jpg', alt: 'Starline Hotel reception desk' },
    { src: 'images/exterior-night-1.jpg', alt: 'Starline Hotel exterior at night — aerial view' },
    { src: 'images/exterior-night-2.jpg', alt: 'Starline Hotel building illuminated at night' },
    { src: 'images/exterior-night-3.jpg', alt: 'Starline Hotel courtyard at night' },
    { src: 'images/exterior-day-1.jpg', alt: 'Starline Hotel daytime exterior' },
    { src: 'images/exterior-day-2.jpg', alt: 'Starline Hotel building with rooftop signage' },
    { src: 'images/exterior-day-3.jpg', alt: 'Starline Hotel facade in daylight' },
    { src: 'images/exterior-day-4.jpg', alt: 'Starline Hotel entrance and gate' },
    { src: 'images/entrance.jpg', alt: 'Starline Hotel entrance at night' },
    { src: 'images/lobby-1.jpg', alt: 'Hotel lobby lounge area' },
    { src: 'images/lobby-2.jpg', alt: 'Hotel lobby seating' },
    { src: 'images/gym-1.jpg', alt: 'Fitness center with treadmills and cardio equipment' },
    { src: 'images/gym-2.jpg', alt: 'Gym with spin bike and rest area' },
    { src: 'images/restaurant-1.jpg', alt: 'Breakfast buffet station' },
    { src: 'images/restaurant-5.jpg', alt: 'Restaurant buffet counter' },
    { src: 'images/restaurant-6.jpg', alt: 'Restaurant dining hall' },
    { src: 'images/restaurant-2.jpg', alt: 'Complimentary breakfast spread' },
    { src: 'images/restaurant-3.jpg', alt: 'Restaurant dining area' },
    { src: 'images/restaurant-4.jpg', alt: 'Fresh breakfast plate' },
    { src: 'images/food-1.jpg', alt: 'Heart-shaped egg and ham breakfast' },
    { src: 'images/food-2.jpg', alt: 'Fresh papaya fruit' },
    { src: 'images/food-3.jpg', alt: 'Fresh watermelon slices' },
    { src: 'images/conference-1.jpg', alt: 'Conference room with meeting table' },
    { src: 'images/conference-2.jpg', alt: 'Business meeting room' },
    { src: 'images/room-standard.jpg', alt: 'Standard guest room' },
    { src: 'images/room-deluxe.jpg', alt: 'Deluxe room with seating area' },
    { src: 'images/room-luxury.jpg', alt: 'Luxury room with city view' },
    { src: 'images/room-studio-suite.jpg', alt: 'Deluxe studio suite' },
    { src: 'images/room-suite.jpg', alt: 'Suite with spacious layout' },
    { src: 'images/bathroom-1.jpg', alt: 'Modern bathroom with freestanding tub' },
    { src: 'images/bathroom-2.jpg', alt: 'Bathroom with vanity and shower' },
    { src: 'images/lounge-3.jpg', alt: 'Hotel lounge and dining area' },
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
