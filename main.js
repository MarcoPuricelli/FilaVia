document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
  
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
  
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Change icon between menu and close
        const icon = menuToggle.querySelector('svg');
        if (mobileMenu.classList.contains('active')) {
          icon.innerHTML = `
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          `;
        } else {
          icon.innerHTML = `
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          `;
        }
      });
    }
  
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      
      header.addEventListener('click', () => {
        // Close all other accordion items
        accordionItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.accordion-content').style.maxHeight = null;
          }
        });
        
        // Toggle current accordion item
        item.classList.toggle('active');
        
        if (item.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = null;
        }
      });
    });
  
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    const successMessage = document.getElementById('newsletter-success');
    
    if (newsletterForm && successMessage) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        newsletterForm.style.display = 'none';
        successMessage.style.display = 'block';
      });
    }
  
    // Blog newsletter form
    const blogNewsletterForm = document.getElementById('blog-newsletter-form');
    const blogSuccessMessage = document.getElementById('blog-newsletter-success');
    
    if (blogNewsletterForm && blogSuccessMessage) {
      blogNewsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        blogNewsletterForm.style.display = 'none';
        blogSuccessMessage.style.display = 'block';
      });
    }
  
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');
    
    if (contactForm && contactSuccess) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        contactForm.style.display = 'none';
        contactSuccess.style.display = 'block';
      });
    }
  
    // Intersection Observer for animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = element.dataset.delay || 0;
          
          setTimeout(() => {
            if (element.classList.contains('animate-text')) {
              animateText(element);
            } else if (element.classList.contains('animate-fade-in')) {
              element.style.animation = `fadeIn 0.6s forwards`;
            } else if (element.classList.contains('animate-from-left')) {
              element.style.animation = `slideInLeft 0.7s forwards`;
            } else if (element.classList.contains('animate-from-right')) {
              element.style.animation = `slideInRight 0.7s forwards`;
            } else if (element.classList.contains('animate-feature')) {
              element.style.animation = `fadeInUp 0.6s forwards`;
            } else if (element.classList.contains('animate-testimonial')) {
              element.style.animation = `fadeInUp 0.6s forwards`;
            } else if (element.classList.contains('animate-list-item')) {
              element.style.animation = `slideInRight 0.5s forwards`;
            }
          }, delay * 1000);
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);
  
    // Observe all animated elements
    document.querySelectorAll('.animate-text, .animate-fade-in, .animate-from-left, .animate-from-right, .animate-feature, .animate-testimonial, .animate-list-item').forEach(element => {
      observer.observe(element);
    });
  
    // Animate counter numbers
    const animateCounter = (element) => {
      const target = parseInt(element.dataset.count);
      const suffix = element.dataset.suffix || '';
      const duration = 2000; // 2 seconds
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;
      
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(progress * target);
        
        element.textContent = currentCount + suffix;
        
        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    };
  
    // Animate text word by word
    const animateText = (element) => {
      const text = element.textContent;
      const words = text.split(' ');
      
      element.textContent = '';
      element.style.opacity = 1;
      
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.opacity = 0;
        span.style.transform = 'translateY(20px)';
        span.style.display = 'inline-block';
        span.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        element.appendChild(span);
        
        setTimeout(() => {
          span.style.opacity = 1;
          span.style.transform = 'translateY(0)';
        }, 100 * index);
      });
    };
  
    // Parallax effect for sections
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    if (parallaxSections.length > 0) {
      window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
          const scrollY = window.scrollY;
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          // Check if section is in viewport
          if (scrollY > sectionTop - window.innerHeight && scrollY < sectionTop + sectionHeight) {
            const speed = 0.2;
            const yPos = (scrollY - sectionTop) * speed;
            section.style.backgroundPositionY = `${yPos}px`;
          }
        });
      });
    }
  
    // Observe counter elements
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = parseFloat(element.dataset.delay) || 0;
          
          setTimeout(() => {
            animateCounter(element);
          }, delay * 1000);
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);
  
    // Observe all counter elements
    document.querySelectorAll('.stat-number').forEach(element => {
      counterObserver.observe(element);
    });
  });