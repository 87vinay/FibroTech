 const mobileToggle = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('nav ul');
        const body = document.body;

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Hero Particles Animation
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random position
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                particle.style.left = posX + '%';
                particle.style.top = posY + '%';
                
                // Random size
                const size = Math.random() * 5 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                // Random opacity
                particle.style.opacity = Math.random() * 0.5 + 0.2;
                
                particlesContainer.appendChild(particle);
                
                // Animation
                floatParticle(particle);
            }
        }
        
        function floatParticle(particle) {
            const duration = Math.random() * 10 + 10;
            const moveX = Math.random() * 100 - 50;
            const moveY = Math.random() * 100 - 50;
            
            particle.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
            
            setTimeout(() => {
                particle.style.opacity = 0;
                
                setTimeout(() => {
                    // Reset position
                    particle.style.transition = 'none';
                    particle.style.transform = 'translate(0, 0)';
                    particle.style.opacity = Math.random() * 0.5 + 0.2;
                    
                    // Start again
                    setTimeout(() => {
                        floatParticle(particle);
                    }, 100);
                }, duration * 1000);
            }, duration * 800);
        }
        
        // Initialize particles
        createParticles();

        // GSAP Animations
        document.addEventListener('DOMContentLoaded', () => {
            // Register ScrollTrigger
            gsap.registerPlugin(ScrollTrigger);
            
            // Hero animations
            gsap.to('.hero h1', {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.3
            });
            
            gsap.to('.hero p', {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.6
            });
            
            gsap.to('.cta-button', {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.9
            });
            
            gsap.to('.hero-image', {
                opacity: 1,
                x: 0,
                duration: 1.2,
                delay: 0.6
            });
            
            // About section
            gsap.to('.about-image', {
                scrollTrigger: {
                    trigger: '.about-image',
                    start: 'top 80%'
                },
                opacity: 1,
                y: 0,
                duration: 1
            });
            
            // Products
            gsap.utils.toArray('.product-category').forEach((product, i) => {
                gsap.to(product, {
                    scrollTrigger: {
                        trigger: product,
                        start: 'top 85%'
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: i * 0.15
                });
            });
            
            // Stats counter
            gsap.utils.toArray('.stat-item').forEach((stat, i) => {
                const countElement = stat.querySelector('.stat-number');
                const finalValue = parseInt(countElement.dataset.count);
                
                gsap.to(stat, {
                    scrollTrigger: {
                        trigger: '.stats',
                        start: 'top 80%'
                    },
                    opacity: 1,
                    duration: 0.5,
                    delay: i * 0.1,
                    onComplete: () => {
                        // Count up animation
                        let currentValue = 0;
                        const duration = 2000;
                        const increment = 1000 / 60;
                        const step = finalValue / (duration / increment);
                        
                        const counter = setInterval(() => {
                            currentValue += step;
                            
                            if (currentValue >= finalValue) {
                                currentValue = finalValue;
                                clearInterval(counter);
                            }
                            
                            countElement.textContent = Math.floor(currentValue);
                        }, increment);
                    }
                });
            });
            
            // Testimonials
            gsap.utils.toArray('.testimonial').forEach((testimonial, i) => {
                gsap.to(testimonial, {
                    scrollTrigger: {
                        trigger: '.testimonials',
                        start: 'top 70%'
                    },
                    opacity: 1,
                    duration: 0.8,
                    delay: i * 0.2
                });
            });
            
            // Contact info items
            gsap.utils.toArray('.info-item').forEach((item, i) => {
                gsap.to(item, {
                    scrollTrigger: {
                        trigger: '.contact',
                        start: 'top 70%'
                    },
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    delay: i * 0.15
                });
            });
            
            // Contact form
            gsap.to('.contact-form', {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top 70%'
                },
                opacity: 1,
                x: 0,
                duration: 0.8
            });
        });

        // Testimonial Slider
        const testimonialTrack = document.querySelector('.testimonial-track');
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        let currentIndex = 0;
        
        function slideTo(index) {
            if (index < 0) index = testimonials.length - 1;
            if (index >= testimonials.length) index = 0;
            
            currentIndex = index;
            const translateValue = -currentIndex * 100 + '%';
            testimonialTrack.style.transform = `translateX(${translateValue})`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
        
        // Add click event to dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                slideTo(i);
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(() => {
            slideTo(currentIndex + 1);
        }, 5000);
        
        // Form submission
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Normally you would send data to server here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });