document.addEventListener('DOMContentLoaded', () => {

  const animationSetup = () => {
  };
  animationSetup();
  
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
      img.classList.add('lazy-loaded');
      if (img.complete) {
          img.classList.add('loaded');
          img.classList.remove('img-loading');
      } else {
          img.addEventListener('load', () => {
              img.classList.add('loaded');
              img.classList.remove('img-loading');
          });
          img.addEventListener('error', () => {
              img.classList.remove('img-loading');
          });
      }
  });
  


  const header = document.querySelector('.main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }


  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }


  if (typeof Swiper !== 'undefined') {
    document.querySelectorAll('.swiper:not(.hero-carousel)').forEach(function (swiperContainer) {
      const slides = swiperContainer.querySelectorAll('.swiper-slide');
      const isLoopingEnabled = slides.length > 3;

      new Swiper(swiperContainer, {
        loop: isLoopingEnabled,
        spaceBetween: 30,
        slidesPerView: 1,
        pagination: {
          el: swiperContainer.querySelector('.swiper-pagination'),
          clickable: true,
        },
        navigation: {
            nextEl: swiperContainer.querySelector('.swiper-button-next'),
            prevEl: swiperContainer.querySelector('.swiper-button-prev'),
        },
        breakpoints: {
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 }
        },
        on: {
          init: function (swiper) {
            swiper.el.style.paddingBottom = '3.5rem';
          },
          resize: function (swiper) {
            swiper.el.style.paddingBottom = '3.5rem';
          }
        }
      });
    });

    if (document.querySelector('.hero-carousel')) {
        new Swiper('.hero-carousel', {
            loop: true,
            speed: 5000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false
            },
            slidesPerView: 'auto',
            spaceBetween: 30,
            allowTouchMove: false,
            freeMode: true
        });
    }
  }


  document.querySelectorAll('.mouse-track-container').forEach(container => {
    const elements = container.querySelectorAll('.mouse-track-element');
    if (elements.length === 0) return;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      elements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 20;
        const translateX = -(x * speed);
        const translateY = -(y * speed);
        
        let existingTransform = el.style.transform || '';
        
        existingTransform = existingTransform.replace(/translate\([^)]*\)/g, '');
        
        el.style.transform = `translate(${translateX}px, ${translateY}px) ${existingTransform}`.trim();
      });
    };

    const onMouseLeave = () => {
      elements.forEach(el => {
        let existingTransform = el.style.transform || '';
        existingTransform = existingTransform.replace(/translate\([^)]*\)/g, '');
        el.style.transform = `translate(0px, 0px) ${existingTransform}`.trim();
      });
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
  });
        
});