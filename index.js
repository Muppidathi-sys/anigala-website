// Mobile navigation toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu when link is clicked, and set active link highlight
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });

    // Change navbar styling and update active link highlighting on scroll
    const mainHeader = document.getElementById('mainHeader');
    const sections = document.querySelectorAll('section');

    function updateActiveLinkOnScroll() {
      let currentSectionId = 'home';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 160)) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
      updateActiveLinkOnScroll();
    });

    window.addEventListener('load', updateActiveLinkOnScroll);

    // Testimonial slider functionality (dot click, arrow click & scroll tracking)
    const testimonialGrid = document.querySelector('.testimonials-grid');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function scrollToTestimonial(index) {
      if (testimonialGrid && testimonialGrid.children[index]) {
        const card = testimonialGrid.children[index];
        // Scroll container to the card's offset position
        testimonialGrid.scrollTo({
          left: card.offsetLeft,
          behavior: 'smooth'
        });
        // Immediately highlight the active dot
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === index);
        });
      }
    }

    // Click dots to navigate
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        scrollToTestimonial(index);
      });
    });

    // Click arrows to navigate
    if (prevBtn && nextBtn && testimonialGrid) {
      prevBtn.addEventListener('click', () => {
        const cardWidth = testimonialGrid.clientWidth;
        let activeIndex = Math.round(testimonialGrid.scrollLeft / cardWidth);
        const prevIndex = activeIndex > 0 ? activeIndex - 1 : dots.length - 1;
        scrollToTestimonial(prevIndex);
      });

      nextBtn.addEventListener('click', () => {
        const cardWidth = testimonialGrid.clientWidth;
        let activeIndex = Math.round(testimonialGrid.scrollLeft / cardWidth);
        const nextIndex = activeIndex < dots.length - 1 ? activeIndex + 1 : 0;
        scrollToTestimonial(nextIndex);
      });
    }

    // Update dots actively during swipe scrolls
    if (testimonialGrid) {
      testimonialGrid.addEventListener('scroll', () => {
        const cardWidth = testimonialGrid.clientWidth;
        const activeIndex = Math.round(testimonialGrid.scrollLeft / cardWidth);
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === activeIndex);
        });
      });
    }

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-quad',
        once: true,
        offset: 100
      });
    }