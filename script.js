document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navigation & Menu Burger ---
    const burgerMenu = document.querySelector('.burger-menu');
    const navbar = document.querySelector('.navbar');

    if (burgerMenu && navbar) {
        burgerMenu.addEventListener('click', () => {
            navbar.classList.toggle('open');
            burgerMenu.classList.toggle('active'); // Pour animer les barres si besoin
        });
    }

    // Gestion de la page active dans la nav
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- 2. Carrousel Dynamique ---
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlideIndex = 0;

    function showSlide(index) {
        if (carouselSlides.length === 0) return; 

        // Boucle infinie
        if (index >= carouselSlides.length) currentSlideIndex = 0;
        else if (index < 0) currentSlideIndex = carouselSlides.length - 1;
        else currentSlideIndex = index;

        carouselSlides.forEach(slide => slide.classList.remove('active-slide'));
        carouselSlides[currentSlideIndex].classList.add('active-slide');
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => showSlide(currentSlideIndex - 1));
        nextButton.addEventListener('click', () => showSlide(currentSlideIndex + 1));

        // Auto-play toutes les 5 secondes
        setInterval(() => showSlide(currentSlideIndex + 1), 5000);
    }

    // --- 3. Validation du Formulaire de Contact ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const inputs = {
            nom: document.getElementById('nom'),
            email: document.getElementById('email'),
            message: document.getElementById('message')
        };

        const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        const validateInput = (input) => {
            let error = "";
            if (input.id === 'nom' && input.value.trim().length < 2) error = "Minimum 2 caractères.";
            if (input.id === 'email' && !isValidEmail(input.value.trim())) error = "Email invalide.";
            if (input.id === 'message' && input.value.trim().length < 10) error = "Minimum 10 caractères.";

            const errorDisplay = input.nextElementSibling?.classList.contains('error-message') 
                ? input.nextElementSibling 
                : document.createElement('div');
            
            if (error) {
                errorDisplay.className = 'error-message';
                errorDisplay.textContent = error;
                errorDisplay.style.color = '#ff4d4d';
                errorDisplay.style.fontSize = '0.8em';
                if (!input.nextElementSibling?.classList.contains('error-message')) input.parentNode.insertBefore(errorDisplay, input.nextSibling);
                input.style.borderColor = '#ff4d4d';
            } else {
                if (input.nextElementSibling?.classList.contains('error-message')) errorDisplay.remove();
                input.style.borderColor = 'var(--primary-color)';
            }
            return !error;
        };

        Object.values(inputs).forEach(input => {
            input.addEventListener('input', () => validateInput(input));
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const isFormValid = Object.values(inputs).every(input => validateInput(input));
            if (isFormValid) {
                alert('🚀 Message envoyé avec succès !');
                contactForm.reset();
            }
        });
    }

    // --- 4. Thème (LocalStorage) ---
    const themeSwitchButton = document.getElementById('theme-switch');
    const THEME_KEY = 'fitlifeTheme';

    const applyTheme = (theme) => {
        document.body.classList.toggle('light-mode', theme === 'light');
        localStorage.setItem(THEME_KEY, theme);
    };

    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(savedTheme);

    if (themeSwitchButton) {
        themeSwitchButton.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    // --- 5. Bonus : Animation au Scroll (Effet Attractif) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });

    // Bouton Découvrir (Page Accueil)
    const decouvrirBtn = document.getElementById('decouvrir-programmes');
    if (decouvrirBtn) {
        decouvrirBtn.addEventListener('click', () => {
            window.location.href = 'programmes.html';
        });
    }
});