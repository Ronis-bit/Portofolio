document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.getElementById('typingText');
    const textToType = 'Mathematics Student | Electronics Enthusiast';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < textToType.length) {
            typingText.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(() => {
        typeWriter();
    }, 500);

    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX - 20 + 'px';
        cursorOutline.style.top = outlineY - 20 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    const clickableElements = document.querySelectorAll('a, button, .card, .gallery-item, .contact-btn');
    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('active');
            cursorOutline.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('active');
            cursorOutline.classList.remove('active');
        });
    });

    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = progress + '%';
    });

    const canvas = document.getElementById('aiBackground');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', () => {
        setTimeout(resizeCanvas, 100);
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 2.5 + 0.5;
            this.color = Math.random() > 0.5 ? 'rgba(0, 243, 255, 0.8)' : 'rgba(123, 44, 191, 0.6)';
            this.pulse = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.pulse += 0.02;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            const pulseSize = this.radius + Math.sin(this.pulse) * 0.5;
            ctx.beginPath();
            ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.shadowBlur = 15 + Math.sin(this.pulse) * 5;
            ctx.shadowColor = this.color;
        }
    }
    
    const particles = [];
    const particleCount = isMobile ? 50 : 100;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 180) {
                    const opacity = 0.4 * (1 - distance / 180);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 243, 255, ${opacity})`;
                    ctx.lineWidth = 1.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(123, 44, 191, ${opacity * 0.5})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        }
    }
    
    function animateNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        
        requestAnimationFrame(animateNetwork);
    }
    
    animateNetwork();


    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        section.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(section);
    });

    const expertiseCards = document.querySelectorAll('.expertise .card');
    expertiseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.6s ease-out';
        card.style.transitionDelay = `${index * 0.2}s`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            });
        }, { threshold: 0.2 });
        
        cardObserver.observe(card);
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const isEven = index % 2 === 0;
        item.style.opacity = '0';
        item.style.transform = isEven ? 'translateX(-100px)' : 'translateX(100px)';
        item.style.transition = 'all 0.8s ease-out';
        item.style.transitionDelay = `${index * 0.2}s`;
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.3 });
        
        timelineObserver.observe(item);
    });

    const photoCards = document.querySelectorAll('.photo-card');
    photoCards.forEach((card, index) => {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        
        cardObserver.observe(card);

        if (!isMobile) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 20;
                const rotateX = (centerY - y) / 20;
                
                const cardInner = card.querySelector('.photo-card-inner');
                if (cardInner && !card.classList.contains('flipped')) {
                    cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const cardInner = card.querySelector('.photo-card-inner');
                if (cardInner && !card.classList.contains('flipped')) {
                    cardInner.style.transform = '';
                }
            });

            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
                const cardInner = card.querySelector('.photo-card-inner');
                if (card.classList.contains('flipped')) {
                    cardInner.style.transform = 'rotateY(180deg)';
                } else {
                    cardInner.style.transform = '';
                }
            });
        } else {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
                const cardInner = card.querySelector('.photo-card-inner');
                if (card.classList.contains('flipped')) {
                    cardInner.style.transform = 'rotateY(180deg)';
                } else {
                    cardInner.style.transform = '';
                }
            });
        }
    });

    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = 1 - scrolled / 500;
            }
            
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                if (scrollPercent > 0 && scrollPercent < 1) {
                    const translateY = (1 - scrollPercent) * 50;
                    card.style.transform = `translateY(${translateY}px)`;
                }
            });
        });
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    if (!isMobile) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth - 0.5;
            mouseY = e.clientY / window.innerHeight - 0.5;
        });

        function animate() {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            
            const cards = document.querySelectorAll('.card');
            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const cardX = (rect.left + rect.width / 2) / window.innerWidth - 0.5;
                const cardY = (rect.top + rect.height / 2) / window.innerHeight - 0.5;
                
                const deltaX = (currentX - cardX) * 20;
                const deltaY = (currentY - cardY) * 20;
                
                card.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
            });
            
            requestAnimationFrame(animate);
        }
        animate();
    }

    const createParticle = () => {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(0, 243, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = '-10px';
        particle.style.zIndex = '999';
        
        document.body.appendChild(particle);
        
        const duration = 3000 + Math.random() * 2000;
        const startTime = Date.now();
        
        const animateParticle = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const y = progress * window.innerHeight;
                particle.style.top = y + 'px';
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        };
        
        animateParticle();
    };
    
    if (!isMobile) {
        setInterval(createParticle, 500);
    } else {
        setInterval(createParticle, 1000);
    }



    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    const rippleElements = document.querySelectorAll('.contact-btn, .card, .showcase-image');
    rippleElements.forEach(element => {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.addEventListener('click', createRipple);
    });

    // ========================================
    // CAROUSEL INFINITE HORIZONTAL SCROLL
    // ========================================
    
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselDots = document.getElementById('carouselDots');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (carouselContainer && carouselDots) {
        const allSlides = document.querySelectorAll('.carousel-slide');
        const originalSlides = document.querySelectorAll('.carousel-slide:not(.carousel-slide-clone)');
        const totalOriginalSlides = originalSlides.length;
        let autoScrollInterval;
        let isUserScrolling = false;
        let scrollTimeout;
        let currentSlideIndex = 0;
        let isTransitioning = false;
        
        // Create dots only for original slides
        originalSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => scrollToSlide(index));
            carouselDots.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.carousel-dot');
        
        // Function to scroll to specific slide
        function scrollToSlide(index, smooth = true) {
            const slideWidth = allSlides[0].offsetWidth;
            carouselContainer.scrollTo({
                left: slideWidth * index,
                behavior: smooth ? 'smooth' : 'auto'
            });
            updateActiveSlide(index % totalOriginalSlides);
        }
        
        // Function to update active states (uses modulo for infinite)
        function updateActiveSlide(index) {
            currentSlideIndex = index % totalOriginalSlides;
            
            // Update slides
            allSlides.forEach((slide, i) => {
                const slideIndex = parseInt(slide.getAttribute('data-index')) - 1;
                slide.classList.toggle('active', slideIndex === currentSlideIndex);
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlideIndex);
            });
        }
        
        // Function to get current slide based on scroll position
        function getCurrentSlideIndex() {
            const scrollLeft = carouselContainer.scrollLeft;
            const slideWidth = allSlides[0].offsetWidth;
            const index = Math.round(scrollLeft / slideWidth);
            return index;
        }
        
        // Check and handle infinite loop
        function checkInfiniteLoop() {
            if (isTransitioning) return;
            
            const scrollLeft = carouselContainer.scrollLeft;
            const slideWidth = allSlides[0].offsetWidth;
            const currentIndex = Math.round(scrollLeft / slideWidth);
            
            // If we're at the cloned slides (after last original), jump to beginning
            if (currentIndex >= totalOriginalSlides) {
                isTransitioning = true;
                const realIndex = currentIndex % totalOriginalSlides;
                
                setTimeout(() => {
                    carouselContainer.style.scrollBehavior = 'auto';
                    carouselContainer.scrollLeft = realIndex * slideWidth;
                    carouselContainer.style.scrollBehavior = 'smooth';
                    updateActiveSlide(realIndex);
                    isTransitioning = false;
                }, 100);
            }
        }
        
        // Auto scroll function
        function autoScroll() {
            if (isUserScrolling || isTransitioning) return;
            
            const currentIndex = getCurrentSlideIndex();
            scrollToSlide(currentIndex + 1);
        }
        
        // Start auto scroll
        function startAutoScroll() {
            stopAutoScroll();
            autoScrollInterval = setInterval(autoScroll, 1500);
        }
        
        // Stop auto scroll
        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }

        // Handle user interaction start
        function handleInteractionStart() {
            isUserScrolling = true;
            stopAutoScroll();
            clearTimeout(scrollTimeout);
        }

        // Handle user interaction end
        function handleInteractionEnd() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isUserScrolling = false;
                startAutoScroll();
            }, 2000);
        }
        
        // Handle manual scroll (ONLY for infinite loop check and active state)
        carouselContainer.addEventListener('scroll', () => {
            // Check for infinite loop transition
            checkInfiniteLoop();
            
            // Update active slide based on scroll position
            const currentIndex = getCurrentSlideIndex();
            const displayIndex = currentIndex % totalOriginalSlides;
            if (displayIndex !== currentSlideIndex) {
                updateActiveSlide(displayIndex);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                handleInteractionStart();
                
                const currentIndex = getCurrentSlideIndex();
                if (e.key === 'ArrowLeft') {
                    scrollToSlide(currentIndex - 1);
                } else {
                    scrollToSlide(currentIndex + 1);
                }
                
                handleInteractionEnd();
            }
        });
        
        // Mouse wheel horizontal scroll
        carouselContainer.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                return;
            }
            // Only stop if they are actually scrolling the carousel
            handleInteractionStart();
            e.preventDefault();
            carouselContainer.scrollLeft += e.deltaY;
            handleInteractionEnd();
        }, { passive: false });
        
        // Touch/drag scroll handling
        let isDragging = false;
        let startX;
        let scrollLeft;
        
        carouselContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            handleInteractionStart();
            
            startX = e.pageX - carouselContainer.offsetLeft;
            scrollLeft = carouselContainer.scrollLeft;
            carouselContainer.style.cursor = 'grabbing';
            carouselContainer.style.userSelect = 'none';
        });

        // Touch support
        carouselContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            handleInteractionStart();
            
            startX = e.touches[0].pageX - carouselContainer.offsetLeft;
            scrollLeft = carouselContainer.scrollLeft;
        }, { passive: true });
        
        carouselContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - carouselContainer.offsetLeft;
            const walk = (x - startX) * 2;
            carouselContainer.scrollLeft = scrollLeft - walk;
        });

        carouselContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            // Don't prevent default on touch to allow vertical scrolling
            const x = e.touches[0].pageX - carouselContainer.offsetLeft;
            const walk = (x - startX) * 2;
            carouselContainer.scrollLeft = scrollLeft - walk;
        }, { passive: true });
        
        carouselContainer.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                carouselContainer.style.cursor = 'grab';
                carouselContainer.style.userSelect = 'auto';
                handleInteractionEnd();
            }
        });

        carouselContainer.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                handleInteractionEnd();
            }
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                carouselContainer.style.cursor = 'grab';
                carouselContainer.style.userSelect = 'auto';
                handleInteractionEnd();
            }
        });
        
        // Initialize
        allSlides[0].classList.add('active');
        carouselContainer.style.cursor = 'grab';
        startAutoScroll();
        
        // Update on window resize
        window.addEventListener('resize', () => {
            const currentIndex = getCurrentSlideIndex();
            const displayIndex = currentIndex % totalOriginalSlides;
            updateActiveSlide(displayIndex);
        });
    }

    console.log('%c🔮 Portfolio Loaded Successfully', 'color: #00f3ff; font-size: 20px; font-weight: bold;');
    console.log('%cMathematics × Electronics = Innovation', 'color: #7b2cbf; font-size: 14px;');
});
