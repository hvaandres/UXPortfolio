/* ============================================
   GSAP Animations for Modern Portfolio
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);
  
  /* ============================================
     Hero Section Animations - Modern Text Reveal
     ============================================ */
  
  function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate "Hello People" bubble entrance
    tl.from('.banner-content .me', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      onComplete: () => {
        // Continuous bobbing animation
        gsap.to('.banner-content .me', {
          y: -10,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
        
        // Subtle pulse
        gsap.to('.banner-content .me', {
          boxShadow: '0 0 20px rgba(79, 70, 229, 0.6)',
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      }
    });
    
    // Animate "My name is"
    tl.from('.intro-text', {
      y: 20,
      opacity: 0,
      duration: 0.8
    }, '-=0.4');
    
    // Animate Name "Andres Haro" - Big Impact
    tl.from('.name-highlight', {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    }, '-=0.5');
    
    // Animate designation
    tl.from('.banner-content .designation', {
      y: 20,
      opacity: 0,
      duration: 0.8
    }, '-=0.6');
    
    // Animate CTA button
    tl.from('.banner-content .primary-btn', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      scale: 0.9
    }, '-=0.5');
  }

  /* ============================================
     Background Animation - Interactive & Organic
     ============================================ */
  function initBackgroundAnimation() {
    const container = document.querySelector('.banner-background');
    if (!container) return;
    
    // Clear existing
    container.innerHTML = '';
    
    // Create random shapes with more variety
    const colors = ['#4F46E5', '#7C3AED', '#2563EB', '#DB2777', '#10B981'];
    
    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        shape.classList.add('floating-shape');
        
        // Random properties
        const size = Math.random() * 400 + 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.background = color;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.borderRadius = Math.random() > 0.5 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%'; // Organic blobs
        shape.style.opacity = Math.random() * 0.3 + 0.1;
        shape.style.filter = `blur(${Math.random() * 60 + 20}px)`;
        
        container.appendChild(shape);
        
        // Complex Organic Movement
        gsap.to(shape, {
            x: Math.random() * 600 - 300,
            y: Math.random() * 600 - 300,
            rotation: Math.random() * 360,
            scale: Math.random() * 0.5 + 0.8,
            duration: Math.random() * 20 + 15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        // Subtle Pulse
        gsap.to(shape, {
            opacity: Math.random() * 0.5 + 0.2,
            duration: Math.random() * 5 + 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
    
    // Mouse Interaction (Parallax)
    container.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.floating-shape');
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        
        gsap.to(shapes, {
            x: `+=${x}`,
            y: `+=${y}`,
            duration: 2,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    });
  }
  
  /* ============================================
     Typing Animation for Role/Designation
     ============================================ */
  
  function initTypingAnimation() {
    const designationElement = document.querySelector('.designation');
    if (!designationElement) return;
    
    // Store original text
    const originalHTML = designationElement.innerHTML;
    
    // Create typing effect with GSAP
    const roles = ['Seamless', 'Creative', 'Powerful', 'User-Centric', 'Digital'];
    let currentIndex = 0;
    
    function typeRole() {
      const role = roles[currentIndex];
      const spans = designationElement.querySelectorAll('.designer'); 
      
      if (spans.length > 0) {
        // Animate out
        gsap.to(spans, {
          opacity: 0,
          y: -10,
          duration: 0.4,
          onComplete: () => {
            // Change text
            spans.forEach(span => {
                span.textContent = role;
            });
            
            // Animate in
            gsap.to(spans, { 
                opacity: 1, 
                y: 0, 
                duration: 0.4,
                ease: 'power2.out',
                onComplete: () => {
                  currentIndex = (currentIndex + 1) % roles.length;
                  setTimeout(typeRole, 2500); // Wait before next cycle
                }
            });
          }
        });
      }
    }
    
    // Start typing animation after initial load
    setTimeout(typeRole, 2000);
  }
  
  /* ============================================
     Scroll-triggered Animations
     ============================================ */
  
  function initScrollAnimations() {
    
    // Animate section titles
    gsap.utils.toArray('.section-title h2').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 1
        },
        x: -100,
        opacity: 0,
        duration: 1
      });
    });
    
    // Animate cards on scroll
    gsap.utils.toArray('.single-work').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          end: 'top 60%',
          toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1
      });
    });
    
    // Animate job history cards - Dynamic Scroll Effect (Like Latest Work)
    gsap.utils.toArray('.single-job').forEach((job, index) => {
      gsap.fromTo(job, 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.9
        },
        {
          scrollTrigger: {
            trigger: job,
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse', // Play on enter, reverse on leave
            scrub: false
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    });
    
    // Animate service cards - Modern Staggered Entrance
    ScrollTrigger.batch('.single-service', {
      onEnter: batch => gsap.to(batch, {
        opacity: 1, 
        y: 0, 
        scale: 1, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: 'back.out(1.2)', 
        overwrite: true
      }),
      start: 'top 85%',
    });
    
    // Set initial state for batch animation
    gsap.set('.single-service', { y: 60, opacity: 0, scale: 0.9 });
    
    // Add continuous floating animation to service and job cards
    gsap.utils.toArray('.single-service, .single-job').forEach((card, i) => {
        // Randomize delay and duration for organic feel
        const delay = Math.random() * 2;
        const duration = 3 + Math.random() * 2;
        
        gsap.to(card, {
            y: '-=10', // Float up slightly
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: delay
        });
        
        // Add subtle pulse to the icon
        const icon = card.querySelector('.lnr');
        if (icon) {
             gsap.to(icon, {
                boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)',
                scale: 1.05,
                duration: duration * 0.8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: delay
            });
        }
    });
    
    // Animate about section elements
    gsap.from('.about-left img', {
      scrollTrigger: {
        trigger: '.about-area',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
    
    gsap.from('.about-right', {
      scrollTrigger: {
        trigger: '.about-area',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }
  
  /* ============================================
     Parallax Effect for Sections
     ============================================ */
  
  function initParallaxEffects() {
    // Parallax for banner background
    gsap.to('.home-banner-area', {
      backgroundPosition: '50% 100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.home-banner-area',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
  
  /* ============================================
     Hover Animations for Cards
     ============================================ */
  
  function initHoverAnimations() {
    // Project and Job cards hover effect
    document.querySelectorAll('.single-work, .single-service, .single-job').forEach(card => {
      card.addEventListener('mouseenter', function() {
        gsap.to(this, {
          y: -12,
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out',
          boxShadow: '0 25px 50px rgba(79, 70, 229, 0.2)'
        });
      });
      
      card.addEventListener('mouseleave', function() {
        gsap.to(this, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        });
      });
      
      // 3D Tilt Effect on Mouse Move
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
        const rotateY = ((x - centerX) / centerX) * 5;
        
        gsap.to(this, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power1.out'
        });
      });
      
      // Reset rotation on leave
      card.addEventListener('mouseleave', function() {
        gsap.to(this, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
    
    // Button hover animations
    document.querySelectorAll('.btn-modern, .btn-gradient').forEach(btn => {
      btn.addEventListener('mouseenter', function() {
        gsap.to(this, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
      
      btn.addEventListener('mouseleave', function() {
        gsap.to(this, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
    });
  }
  
  /* ============================================
     Scroll Progress Bar
     ============================================ */
  
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
      // Create progress bar if it doesn't exist
      const bar = document.createElement('div');
      bar.className = 'scroll-progress';
      document.body.appendChild(bar);
    }
    
    gsap.to('.scroll-progress', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });
  }
  
  /* ============================================
     Smooth Scroll to Sections
     ============================================ */
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (href === '#' || !href || href === '#!') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: target,
              offsetY: 80 // Offset for fixed header
            },
            ease: 'power3.inOut'
          });
        }
      });
    });
  }
  
  /* ============================================
     Stagger Animation for Brand Logos
     ============================================ */
  
  function initBrandAnimations() {
    gsap.from('.single-brand', {
      scrollTrigger: {
        trigger: '.brands-area',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)'
    });
  }
  
  /* ============================================
     Page Load Animation
     ============================================ */
  
  function initPageLoadAnimation() {
    // Fade out preloader with GSAP
    const preloader = document.querySelector('.preloader-area');
    if (preloader) {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        onComplete: () => {
          preloader.style.display = 'none';
        }
      });
    }
  }
  
  /* ============================================
     Testimonial Slider Enhancement
     ============================================ */
  
  function enhanceTestimonials() {
    // Disable GSAP hiding for testimonials to ensure visibility
    // We rely on CSS for styling.
    gsap.set('.testi_item', { opacity: 1, y: 0, visibility: 'visible' });
  }
  
  /* ============================================
     Contact Section Animation
     ============================================ */
  
  function initContactAnimations() {
    // Note: an elastic scale(0) -> scale(1) pop-in was tried here for the
    // contact icons, but GSAP's transform scale reliably got stuck at 0 on
    // this element (opacity finished animating, scale never did), leaving
    // the icons permanently invisible. Removed rather than ship a coin-flip
    // animation - the icons are simply visible by default now, with the
    // existing CSS hover treatment for interactivity.

    // Animate text below icons
    gsap.from('.contact-box h4', {
      scrollTrigger: {
        trigger: '.contact-area',
        start: 'top 80%',
      },
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out'
    });
    
    // Remove old float animation
    gsap.killTweensOf('.contact-box');
  }
  
  /* ============================================
     Stat Counter Animation
     ============================================ */
  
  function initStatCounterAnimations() {
    const statsSection = document.querySelector('.stats-container');
    if (!statsSection) return;

    // Note: a y:30 -> 0 entry animation used to live here, gated on the same
    // scrollTrigger("play ... reverse") pattern that left the contact icons
    // and skill cards stuck invisible elsewhere in this file. Here it left a
    // stuck `transform: translate(0, 30px)` inline style on .stat-card,
    // which broke the vertical centering of the stat numbers/labels. Removed -
    // the cards are simply visible by default now.

    // Animated numbers
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const originalText = stat.innerText;
      const targetValue = parseInt(originalText.replace(/[^0-9]/g, ''));
      const suffix = originalText.replace(/[0-9]/g, '');
      
      if (isNaN(targetValue)) return; // Skip if no number

      ScrollTrigger.create({
        trigger: '.stats-container',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          // Set starting value
          stat.innerText = "0" + suffix;
          
          const counter = { val: 0 };
          gsap.to(counter, {
            val: targetValue,
            duration: 2.5,
            ease: 'circ.out',
            onUpdate: function() {
              stat.innerText = Math.ceil(counter.val) + suffix;
            },
            onComplete: function() {
              // Cool pop effect when done
              gsap.fromTo(stat, 
                { scale: 1.5, color: "#7C3AED" },
                { scale: 1, color: "#4F46E5", duration: 0.4, ease: "elastic.out(1, 0.3)" }
              );
            }
          });
        }
      });
    });
  }

  /* ============================================
     Mobile Menu Animation Enhancement
     ============================================ */
  function initMobileMenuAnimation() {
    const toggleBtn = document.querySelector('#mobile-nav-toggle');
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function() {
        // Wait for the menu to be inserted/visible
        setTimeout(() => {
          const mobileNav = document.querySelector('#mobile-nav');
          if (document.body.classList.contains('mobile-nav-active') && mobileNav) {
            
            // Reset items for animation
            const items = mobileNav.querySelectorAll('li');
            gsap.set(items, { opacity: 0, x: -20 });
            
            // Animate items in
            gsap.to(items, {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.05,
              ease: 'power2.out',
              delay: 0.2
            });
            
            // Ensure menu background looks good
            gsap.fromTo(mobileNav, 
              { backgroundColor: 'rgba(0, 0, 0, 0)' },
              { backgroundColor: 'rgba(0, 0, 0, 0.9)', duration: 0.3 }
            );
          }
        }, 50); // Small delay to let main.js do its DOM manipulation
      });
    }
  }

  /* ============================================
     Initialize All Animations
     ============================================ */
  
  function initAllAnimations() {
    initPageLoadAnimation();
    initHeroAnimations();
    initBackgroundAnimation(); // Add background animation start
    initTypingAnimation();
    initScrollAnimations();
    initParallaxEffects();
    initHoverAnimations();
    initScrollProgress();
    initSmoothScroll();
    initBrandAnimations();
    enhanceTestimonials();
    initContactAnimations();
    initStatCounterAnimations();
    initMobileMenuAnimation(); // Add this
  }
  
  // Start all animations
  initAllAnimations();
  
  /* ============================================
     Refresh ScrollTrigger on Resize
     ============================================ */
  
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });

  // Trigger positions are calculated at DOMContentLoaded, before images
  // (about illustration, brand logos, etc.) finish loading and shift the
  // layout below them. Without this, later one-shot ScrollTriggers - like
  // the contact icon pop-in - can end up with stale start positions and
  // never fire, leaving elements stuck at their "from" (invisible) state.
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

});

/* ============================================
   Export functions for external use (if needed)
   ============================================ */

window.PortfolioAnimations = {
  refresh: () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }
};
