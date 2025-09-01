// Portfolio App JavaScript
class AIPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupPreloader();
        this.setupCustomCursor();
        this.setupNavigation();
        this.setupScrollProgress();
        this.setupHeroAnimations();
        this.setupScrollAnimations();
        this.setupSkillsAnimations();
        this.setupProjectFilters();
        this.setupTimelineAnimations();
        this.setupContactForm();
        this.setupParallaxEffects();
    }

    // Preloader
    setupPreloader() {
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }, 2000);
        });
    }

    // Custom Cursor
    setupCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const cursorTrail = document.querySelector('.cursor-trail');

        if (!cursor || !cursorTrail) return;

        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth trail animation
        const animateTrail = () => {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            
            requestAnimationFrame(animateTrail);
        };
        animateTrail();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .cta-button');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorTrail.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorTrail.style.transform = 'scale(1)';
            });
        });
    }

    // Navigation
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Smooth scroll and active states
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                // Handle different target sections
                let targetSection;
                if (targetId === '#hero' || targetId === '#home') {
                    targetSection = document.querySelector('#hero');
                } else {
                    targetSection = document.querySelector(targetId);
                }
                
                if (targetSection) {
                    // Use more reliable scroll method
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active states immediately
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }

                // Close mobile menu
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            }
        });

        // Active navigation states with improved detection
        const sections = document.querySelectorAll('section');
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-70px 0px -30% 0px' // Account for navbar height
        };

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                    
                    // Clear all active states
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Set active state for current section
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => navObserver.observe(section));

        // Handle CTA buttons in hero section
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const href = button.getAttribute('href');
                
                if (href === '#about') {
                    const aboutSection = document.querySelector('#about');
                    if (aboutSection) {
                        const offsetTop = aboutSection.offsetTop - 70;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                } else if (href === '#contact') {
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                        const offsetTop = contactSection.offsetTop - 70;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Scroll Progress
    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // Hero Animations - Updated for Split Layout
    setupHeroAnimations() {
        const typingText = document.getElementById('typing-text');
        const heroSubtitle = document.getElementById('hero-subtitle');
        
        const name = "Shruti Subhadarshini Nayak";
        
        let charIndex = 0;
        let typeSpeed = 100;

        const typeText = () => {
            if (charIndex < name.length) {
                typingText.textContent = name.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeText, typeSpeed);
            } else {
                // Name typing complete, show subtitle
                setTimeout(() => {
                    if (heroSubtitle) {
                        heroSubtitle.style.opacity = '1';
                    }
                }, 500);
            }
        };

        // Start typing animation after preloader
        setTimeout(() => {
            typeText();
            
            // Animate AI elements in the visual section
            this.animateAIElements();
        }, 3000);
    }

    // AI Elements Animation
    animateAIElements() {
        const neuralNodes = document.querySelectorAll('.neural-node');
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        // Animate neural nodes with delay
        neuralNodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.opacity = '1';
                node.style.transform = 'scale(1)';
            }, index * 200);
        });

        // Animate floating icons
        floatingIcons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.opacity = '1';
                icon.style.transform = 'translateY(0)';
            }, index * 300 + 1000);
        });

        // Setup neural connections animation
        this.setupNeuralConnections();
    }

    // Neural Network Connections
    setupNeuralConnections() {
        const connections = document.querySelectorAll('.neural-connection');
        
        connections.forEach((connection, index) => {
            const startNode = connection.getAttribute('data-start');
            const endNode = connection.getAttribute('data-end');
            
            // Position connections between nodes
            setTimeout(() => {
                connection.style.opacity = '0.7';
                connection.style.animation = `dataFlow 3s infinite linear ${index * 0.5}s`;
            }, 2000 + index * 500);
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.about-content, .section-title, .highlight-item, .skill-category, .project-card, .contact-item');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            animationObserver.observe(el);
        });
    }

    // Skills Animations
    setupSkillsAnimations() {
        const skillsSection = document.getElementById('skills');
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach((bar, index) => {
                        setTimeout(() => {
                            const width = bar.getAttribute('data-width');
                            bar.style.width = width + '%';
                        }, index * 200);
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
    }

    // Project Filters
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Filter projects
                projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, index * 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Handle coming soon links
        const comingSoonLinks = document.querySelectorAll('.coming-soon');
        comingSoonLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showNotification('GitHub and live demo links coming soon!', 'info');
            });
        });
    }

    // Timeline Animations
    setupTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    // Contact Form
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');

        if (!contactForm) return;

        // Floating labels
        const formControls = contactForm.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.setAttribute('placeholder', ' ');
            
            control.addEventListener('focus', () => {
                control.parentElement.classList.add('focused');
            });
            
            control.addEventListener('blur', () => {
                if (control.value === '') {
                    control.parentElement.classList.remove('focused');
                }
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Validate form
            if (!this.validateForm(data)) {
                this.showFormStatus('Please fill in all required fields.', 'error');
                return;
            }

            // Simulate form submission
            this.submitForm(data);
        });
    }

    validateForm(data) {
        return data.name && data.email && data.subject && data.message;
    }

    async submitForm(data) {
        const formStatus = document.getElementById('form-status');
        const submitBtn = document.querySelector('#contact-form button[type="submit"]');
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Create mailto link as fallback
            const mailtoLink = `mailto:shrutishubhadarshini11@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
            window.open(mailtoLink, '_blank');
            
            this.showFormStatus('Thank you for your message! Your email client should open with the pre-filled message.', 'success');
            document.getElementById('contact-form').reset();
        } catch (error) {
            this.showFormStatus('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        }
    }

    showFormStatus(message, type) {
        const formStatus = document.getElementById('form-status');
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 5000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(26, 26, 46, 0.9);
            backdrop-filter: blur(10px);
            color: var(--color-text);
            padding: 1rem 1.5rem;
            border-radius: var(--radius-base);
            border: 1px solid rgba(31, 184, 205, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Parallax Effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.particles, .neural-bg, .contact-particles');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(el => {
                el.style.transform = `translateY(${rate}px)`;
            });
        });

        // Mouse parallax for hero section
        const heroSplit = document.querySelector('.hero-split');
        const heroVisual = document.querySelector('.hero-visual-content');
        
        if (heroSplit && heroVisual) {
            heroSplit.addEventListener('mousemove', (e) => {
                const rect = heroSplit.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.02;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.02;
                
                heroVisual.style.transform = `translate(${x}px, ${y}px)`;
                
                // Animate floating icons on mouse move
                const floatingIcons = document.querySelectorAll('.floating-icon');
                floatingIcons.forEach((icon, index) => {
                    const multiplier = (index + 1) * 0.01;
                    const iconX = x * multiplier * (index % 2 === 0 ? 1 : -1);
                    const iconY = y * multiplier * (index % 2 === 0 ? -1 : 1);
                    icon.style.transform += ` translate(${iconX}px, ${iconY}px)`;
                });
            });

            heroSplit.addEventListener('mouseleave', () => {
                heroVisual.style.transform = 'translate(0px, 0px)';
                
                const floatingIcons = document.querySelectorAll('.floating-icon');
                floatingIcons.forEach(icon => {
                    icon.style.transform = icon.style.transform.replace(/translate\([^)]*\)/, '');
                });
            });
        }
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const optimizedScroll = throttle(() => {
    // Handle scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIPortfolio();
    
    // Set initial styles for animated elements
    const neuralNodes = document.querySelectorAll('.neural-node');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const connections = document.querySelectorAll('.neural-connection');
    
    // Hide elements initially for animation
    neuralNodes.forEach(node => {
        node.style.opacity = '0';
        node.style.transform = 'scale(0)';
        node.style.transition = 'all 0.5s ease-out';
    });
    
    floatingIcons.forEach(icon => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        icon.style.transition = 'all 0.8s ease-out';
    });
    
    connections.forEach(connection => {
        connection.style.opacity = '0';
        connection.style.transition = 'opacity 0.5s ease-out';
    });
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15.0.0/dist/smooth-scroll.polyfills.min.js';
    document.head.appendChild(script);
}

// Add loading states for images (if any were to be added later)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// Handle reduced motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});

// Service worker registration for PWA capabilities (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Could register a service worker here for offline capabilities
    });
}