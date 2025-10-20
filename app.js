document.addEventListener('DOMContentLoaded', function() {

    // Loading Screen
    const loaderWrapper = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loaderWrapper.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1500);
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Logo click to scroll to top
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        navLinks.forEach(l => l.classList.remove('active'));
        navLinks[0].classList.add('active');
    });

    // Product Gallery Image Switcher
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-product-image img');
    const mainImageContainer = document.querySelector('.main-product-image');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                thumbnail.classList.add('active');
                
                // Get the image source from thumbnail
                const thumbnailImg = thumbnail.querySelector('img');
                const newSrc = thumbnailImg.src.replace('w=200&h=150', 'w=800&h=600');
                
                // Fade out main image
                mainImage.style.opacity = '0';
                
                // Update main image after fade out
                setTimeout(() => {
                    mainImage.src = newSrc;
                    mainImage.style.opacity = '1';
                }, 300);
            });
        });
    }

    // Lightbox Modal
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (mainImageContainer && lightbox && lightboxImg) {
        mainImageContainer.addEventListener('click', () => {
            lightboxImg.src = mainImage.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Initialize Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#f39c12'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#f39c12',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        cursorOutline.style.left = mouseX - 20 + 'px';
        cursorOutline.style.top = mouseY - 20 + 'px';
    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .cta-button, .problem-item, .feature-item, .testimonial-card, .stat-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'scale(1.5)';
            cursorOutline.style.borderColor = '#f39c12';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'scale(1)';
            cursorOutline.style.borderColor = '#f39c12';
        });
    });

    // Smooth scroll for the main CTA button
    const mainCtaButton = document.querySelector('.hero .cta-button');
    const orderFormSection = document.getElementById('order-form');
    
    mainCtaButton.addEventListener('click', function(e) {
        e.preventDefault();
        orderFormSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    const allSections = document.querySelectorAll('section');
    allSections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.maxHeight = null;
            });
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });

            // Open the clicked answer if it was closed
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Form Validation and Submission
    const form = document.getElementById('main-form');
    // Removed successMessage as we are now redirecting
    // const successMessage = document.getElementById('form-success-message'); 
    const phoneInput = document.getElementById('phone');
    const submitButton = form.querySelector('.form-button');

    // JSONBin Configuration
    const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/68f6130f43b1c97be9732e32';
    const MASTER_KEY = '$2a$10$W7Y1w05rI7FhqCSUCB/tRuDJYO2fRlTwgv2s3je3OlExS3oOz9UzG';

    // Phone number validation
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });

    // Function to handle form submission (sends data to JSONBin)
    async function handleFormSubmission(e) {
        e.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = 'جاري الإرسال...';
        submitButton.style.opacity = '0.7';

        // Get form data
        const newOrder = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            city: document.getElementById('city').value.trim(),
            date: new Date().toISOString()
        };

        // Basic validation
        if (newOrder.phone.length < 10) {
            alert('يرجى إدخال رقم هاتف صحيح (10 أرقام على الأقل)');
            submitButton.disabled = false;
            submitButton.textContent = 'اضغط هنا لتأكيد الطلب';
            submitButton.style.opacity = '1';
            return;
        }

        try {
            // 1. Fetch current data from JSONBin
            let currentData = await fetch(JSONBIN_URL, {
                method: 'GET',
                headers: {
                    'X-Master-Key': MASTER_KEY
                }
            });

            if (!currentData.ok) {
                // If the bin is empty or new, the response might not have a 'record'
                // But we still need a valid starting point.
                // We'll proceed and check the response data below.
                console.warn('Could not fetch existing data. Assuming bin is new or empty.');
            }

            let orders = [];
            try {
                let jsonResponse = await currentData.json();
                // JSONBin wraps data in a 'record' object, handle case where it's an array directly
                orders = jsonResponse.record || jsonResponse || []; 
            } catch (error) {
                console.warn('Error parsing JSON response. Assuming bin is empty:', error);
                orders = [];
            }


            // Ensure 'orders' is an array, if the bin was empty
            if (!Array.isArray(orders)) {
                console.warn('JSONBin record is not an array, initializing a new one.');
                orders = [];
            }
            
            // 2. Add the new order to the array
            orders.push(newOrder);

            // 3. Update the data on JSONBin
            let updateResponse = await fetch(JSONBIN_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': MASTER_KEY,
                    'X-Bin-Versioning': 'false' // Optional: keep the bin from creating multiple versions
                },
                body: JSON.stringify(orders)
            });

            if (!updateResponse.ok) {
                 throw new Error(`Failed to update data: ${updateResponse.statusText}`);
            }

            // Success: Redirect to the thank you page
            setTimeout(() => {
                window.location.href = 'thankyou.html';
            }, 500);
            
            console.log('Order submitted successfully:', newOrder);

        } catch (error) {
            console.error('Submission Error:', error);
            alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
            submitButton.disabled = false;
            submitButton.textContent = 'اضغط هنا لتأكيد الطلب';
            submitButton.style.opacity = '1';
        }
    }

    form.addEventListener('submit', handleFormSubmission);
    // End of Form Validation and Submission

    // Add loading state to CTA button (kept for general buttons, form button handled above)
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        if (button.type !== 'submit') {
            button.addEventListener('click', function() {
                // Not applying loading state for non-form CTAs
            });
        }
    });

    // Animated Counter for Stats
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };

    // Observe stats section for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Scroll Progress Bar
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 500);
        }
    });

    // Add ripple effect to buttons
    const createRipple = (e) => {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    };

    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // 3D Tilt Effect for Cards
    const cards = document.querySelectorAll('.problem-item, .feature-item, .testimonial-card, .stat-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Add entrance animation to elements
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all cards and items
    const animatedElements = document.querySelectorAll('.problem-item, .feature-item, .testimonial-card, .stat-item, .faq-item, .highlight-card, .thumbnail');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });

    // Add smooth reveal animation to sections
    const allPageSections = document.querySelectorAll('section');
    allPageSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    setTimeout(() => {
        allPageSections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 2000);

});