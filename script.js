document.addEventListener('DOMContentLoaded', () => {

  const animationSetup = () => {
     document.body.classList.add('animations-ready');
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
    setTimeout(() => {
        AOS.init({
          duration: 800,
          once: true,
          offset: 100,
          easing: 'ease-out-cubic'
        });
    }, 100);
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
        if(!el.dataset.baseTransform && existingTransform.includes('rotate')) {
            el.dataset.baseTransform = existingTransform;
        }
        const base = el.dataset.baseTransform || '';
        
        el.style.transform = `${base} translate(${translateX}px, ${translateY}px)`.trim();
      });
    };

    const onMouseLeave = () => {
      elements.forEach(el => {
        const base = el.dataset.baseTransform || '';
        el.style.transform = `${base} translate(0px, 0px)`.trim();
      });
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
  });
        


        const parallaxItems = document.querySelectorAll('.parallax-item');
        const parallaxBgs = document.querySelectorAll('.parallax-bg');
        
        if (parallaxItems.length > 0 || parallaxBgs.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;
                const windowHeight = window.innerHeight;

                parallaxItems.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < windowHeight && rect.bottom > 0) {
                        const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.1;
                        const yPos = -(rect.top * speed); 
                        el.style.transform = `translateY(${yPos}px)`;
                    }
                });

                parallaxBgs.forEach(bg => {
                    const rect = bg.getBoundingClientRect();
                    if (rect.top < windowHeight && rect.bottom > 0) {
                        const speed = 0.3;
                        const yPos = -(scrolled * speed);
                        bg.style.backgroundPosition = `center ${yPos}px`;
                    }
                });
            }, { passive: true });
            
            const style = document.createElement('style');
            style.innerHTML = `
                .parallax-item { will-change: transform; transition: transform 0.1s cubic-bezier(0,0,0.2,1); }
            `;
            document.head.appendChild(style);
        }
        


    const disclaimerModal = document.getElementById('disclaimerPopup');
    if (disclaimerModal) {
        const isAccepted = localStorage.getItem('site_disclaimer_accepted');
        if (!isAccepted) {
            setTimeout(() => {
                disclaimerModal.classList.add('show');
            }, 500);
        }

        const acceptBtn = document.getElementById('acceptDisclaimer');
        const closeBtn = document.getElementById('closeDisclaimer');
        const readMoreBtn = document.getElementById('readMoreDisclaimer');
        const fullTextDiv = document.getElementById('disclaimerFullText');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('site_disclaimer_accepted', 'true');
                disclaimerModal.classList.remove('show');
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                disclaimerModal.classList.remove('show');
            });
        }

        if (readMoreBtn && fullTextDiv) {
            readMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const isHidden = getComputedStyle(fullTextDiv).display === 'none';
                if (isHidden) {
                    fullTextDiv.style.display = 'block';
                    readMoreBtn.textContent = 'Read less';
                } else {
                    fullTextDiv.style.display = 'none';
                    readMoreBtn.textContent = 'Read more';
                }
            });
        }
    }
    
});
