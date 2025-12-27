document.addEventListener('DOMContentLoaded', function () {

    // === SLIDER ===
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let autoSlideInterval;

    if (slides.length > 0 && dotsContainer) {
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll('.dot');

        function goToSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            resetAutoSlide();
        }

        nextBtn?.addEventListener('click', () => {
            goToSlide((currentSlide + 1) % slides.length);
        });

        prevBtn?.addEventListener('click', () => {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        });

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                goToSlide((currentSlide + 1) % slides.length);
            }, 5000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        goToSlide(0);
        startAutoSlide();
    }

    // === SSS (Akordeon) ===
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.faq-answer').style.maxHeight = 0;
                });
                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // === SSS Daha Fazla Göster ===
    const loadMoreBtn = document.getElementById('loadMoreFaq');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            const hiddenFaqs = document.querySelectorAll('.faq-item.hidden');
            hiddenFaqs.forEach(faq => {
                faq.classList.remove('hidden');
                faq.style.display = 'block';
                faq.style.opacity = 0;
                setTimeout(() => {
                    faq.style.opacity = 1;
                }, 10);
            });
            loadMoreBtn.style.display = 'none';
        });
    }

    // === SAYMA ANİMASYONU ===
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });

    // === AÇILIR MENÜ ÇAKIŞMA GİDERİCİ ===
    const desktopDropdowns = document.querySelectorAll('.main-nav .dropdown');
    desktopDropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            document.querySelector('.main-header')?.classList.add('menu-open');
        });
        dropdown.addEventListener('mouseleave', () => {
            document.querySelector('.main-header')?.classList.remove('menu-open');
        });
    });

    // === MOBİL MENÜ ===
    const nav = document.querySelector('.main-nav');
    const openBtn = document.querySelector('.nav-open-btn');
    const closeBtn = document.querySelector('.nav-close-btn');
    const mobileDropdowns = document.querySelectorAll('.dropdown > a');
    
    openBtn?.addEventListener('click', () => {
        nav.classList.add('menu-open');
        openBtn.style.display = 'none';
        closeBtn.style.display = 'block';
    });
    
    closeBtn?.addEventListener('click', () => {
        nav.classList.remove('menu-open');
        closeBtn.style.display = 'none';
        openBtn.style.display = 'block';
    });
    
    // MOBİL DROPDOWN - DÜZELTME
    mobileDropdowns.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                e.stopPropagation();
                const parentLi = link.parentElement;
                parentLi.classList.toggle('active');
            }
        });
    });

    // Alt kategoriye tıklayınca menü kapanmasını engelle
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 991) {
            if (e.target.closest('.dropdown ul')) {
                e.stopPropagation();
            }
        }
    });
    // Alt kategoriye tıklayınca menü kapanmasını engelle
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 991) {
        // Eğer dropdown menü içindeyse hiçbir şey yapma
        if (e.target.closest('.dropdown ul')) {
            e.stopPropagation();
            return;
        }
        // Dropdown dışında tıklanırsa menüleri kapat
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }
});
});