/* ============================================
   Phase 2 Interactive Features
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  /* ============================================
     Copy to Clipboard Functionality
     ============================================ */
  
  function initCopyToClipboard() {
    // Add copy buttons to contact boxes
    const contactBoxes = document.querySelectorAll('.contact-box');
    
    contactBoxes.forEach(box => {
      const text = box.querySelector('h4').textContent.trim();
      
      // Skip if it's a URL or doesn't look like copyable content
      if (text.startsWith('http')) return;
      
      // Create copy button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.setAttribute('aria-label', 'Copy to clipboard');
      copyBtn.innerHTML = '<i class="fa fa-copy"></i>';
      
      // Add click handler
      copyBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        copyToClipboard(text, copyBtn);
      });
      
      box.appendChild(copyBtn);
    });
  }
  
  function copyToClipboard(text, button) {
    // Use modern Clipboard API if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showCopiedNotification(text);
        animateCopyButton(button);
      }).catch(err => {
        console.error('Failed to copy:', err);
        fallbackCopy(text, button);
      });
    } else {
      fallbackCopy(text, button);
    }
  }
  
  function fallbackCopy(text, button) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      showCopiedNotification(text);
      animateCopyButton(button);
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
  }
  
  function showCopiedNotification(text) {
    // Remove existing notification if any
    const existing = document.querySelector('.copied-notification');
    if (existing) {
      existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'copied-notification';
    notification.innerHTML = `
      <i class="fa fa-check-circle"></i>
      <span>Copied to clipboard!</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after animation
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  
  function animateCopyButton(button) {
    const icon = button.querySelector('i');
    
    // Change to check icon temporarily
    icon.classList.remove('fa-copy');
    icon.classList.add('fa-check');
    
    // Revert after delay
    setTimeout(() => {
      icon.classList.remove('fa-check');
      icon.classList.add('fa-copy');
    }, 2000);
  }
  
  /* ============================================
     Enhanced Project Card Interactions
     ============================================ */
  
  function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.single-work');
    
    projectCards.forEach(card => {
      // Prevent default anchor behavior if we're adding interactive elements
      const overlay = card.querySelector('.overlay');
      if (overlay) {
        overlay.addEventListener('click', function(e) {
          // Allow project buttons to work
          if (e.target.closest('.project-btn')) {
            e.preventDefault();
            e.stopPropagation();
          }
        });
      }
    });
  }
  
  /* ============================================
     Dynamic Stats Counter Animation
     ============================================ */
  
  function animateStatCounters() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector('.stat-number');
          if (statNumber && !statNumber.classList.contains('animated')) {
            const targetValue = parseInt(statNumber.textContent.replace(/[^0-9]/g, ''));
            const suffix = statNumber.textContent.replace(/[0-9]/g, '');
            
            animateCounter(statNumber, 0, targetValue, 2000, suffix);
            statNumber.classList.add('animated');
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);
    
    statCards.forEach(card => observer.observe(card));
  }
  
  function animateCounter(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 16);
  }
  
  /* ============================================
     Skills Grid Stagger Animation
     ============================================ */
  
  function initSkillsAnimation() {
    const skills = document.querySelectorAll('.skill-item');
    
    if (skills.length === 0 || typeof gsap === 'undefined') return;
    
    gsap.from(skills, {
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      scale: 0,
      opacity: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: 'back.out(1.5)'
    });
  }
  
  /* ============================================
     Job History Skills Tags
     ============================================ */
  
  function enhanceJobCards() {
    const jobs = document.querySelectorAll('.single-job');
    
    jobs.forEach((job, index) => {
      // Add subtle pulse animation on hover
      job.addEventListener('mouseenter', function() {
        const dot = this.querySelector('::before');
        if (typeof gsap !== 'undefined') {
          gsap.to(this, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
      
      job.addEventListener('mouseleave', function() {
        if (typeof gsap !== 'undefined') {
          gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    });
  }
  
  /* ============================================
     Social Icons Animation
     ============================================ */
  
  function enhanceSocialIcons() {
    const socialLinks = document.querySelectorAll('.footer-social a');
    
    socialLinks.forEach(link => {
      link.addEventListener('mouseenter', function() {
        if (typeof gsap !== 'undefined') {
          gsap.to(this, {
            y: -5,
            scale: 1.2,
            duration: 0.3,
            ease: 'back.out(1.5)'
          });
        }
      });
      
      link.addEventListener('mouseleave', function() {
        if (typeof gsap !== 'undefined') {
          gsap.to(this, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    });
  }
  
  /* ============================================
     Filter Animation Enhancement
     ============================================ */
  
  function enhanceFilters() {
    const filters = document.querySelectorAll('.filters ul li');
    
    filters.forEach(filter => {
      filter.addEventListener('click', function() {
        // Add ripple effect
        createRipple(this, event);
        
        // Animate filter change
        if (typeof gsap !== 'undefined') {
          gsap.to(this, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
          });
        }
      });
    });
  }
  
  function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }
  
  /* ============================================
     Testimonial Enhancement
     ============================================ */
  
  function enhanceTestimonials() {
    // Add keyboard navigation for testimonials
    const owlCarousel = document.querySelector('.testi_slider');
    
    if (owlCarousel) {
      document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
          const prevBtn = owlCarousel.querySelector('.owl-prev');
          if (prevBtn) prevBtn.click();
        } else if (e.key === 'ArrowRight') {
          const nextBtn = owlCarousel.querySelector('.owl-next');
          if (nextBtn) nextBtn.click();
        }
      });
    }
  }
  
  /* ============================================
     Initialize All Phase 2 Features
     ============================================ */
  
  function initPhase2() {
    initCopyToClipboard();
    enhanceProjectCards();
    animateStatCounters();
    initSkillsAnimation();
    enhanceJobCards();
    enhanceSocialIcons();
    enhanceFilters();
    enhanceTestimonials();
  }
  
  // Initialize
  initPhase2();
  
  // Add ripple animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-animation {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
});

/* ============================================
   Export for external use
   ============================================ */

window.Phase2Interactions = {
  refresh: () => {
    // Refresh interactions if needed
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }
};
