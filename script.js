document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navbar = document.querySelector('.navbar');

    if (burgerMenu && navbar) {
        burgerMenu.addEventListener('click', () => {
            navbar.classList.toggle('open');
        });
    }

    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });


    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlideIndex = 0;

    function showSlide(index) {
        if (carouselSlides.length === 0) return; 

  
        if (index >= carouselSlides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = carouselSlides.length - 1;
        } else {
            currentSlideIndex = index;
        }

        carouselSlides.forEach(slide => {
            slide.classList.remove('active-slide');
        });

        
        carouselSlides[currentSlideIndex].classList.add('active-slide');
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            showSlide(currentSlideIndex - 1);
        });

        nextButton.addEventListener('click', () => {
            showSlide(currentSlideIndex + 1);
        });

    
        showSlide(0);  
        setInterval(() => {
             showSlide(currentSlideIndex + 1);
        }, 5000); 
    }
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        const nomInput = document.getElementById('nom');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        function displayError(inputElement, message) {
            let errorElement = inputElement.nextElementSibling;
            if (!errorElement || !errorElement.classList.contains('error-message')) {
                errorElement = document.createElement('div');
                errorElement.classList.add('error-message');
                inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
            }
            errorElement.textContent = message;
            errorElement.style.color = 'red';
            inputElement.style.border = '1px solid red';
        }

        function clearError(inputElement) {
            let errorElement = inputElement.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.remove();
            }
            inputElement.style.border = '1px solid #555';
        }
        [nomInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('input', () => {
                let isValid = true;
                if (input.id === 'nom' && input.value.trim().length < 2) {
                    displayError(input, 'Le nom doit contenir au moins 2 caractères.');
                    isValid = false;
                } else if (input.id === 'email' && !isValidEmail(input.value.trim())) {
                    displayError(input, 'Veuillez entrer une adresse email valide.');
                    isValid = false;
                } else if (input.id === 'message' && input.value.trim().length < 10) {
                    displayError(input, 'Le message doit contenir au moins 10 caractères.');
                    isValid = false;
                } else {
                    clearError(input);
                }
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let formValid = true;
            [nomInput, emailInput, messageInput].forEach(input => input.dispatchEvent(new Event('input')));


            document.querySelectorAll('.error-message').forEach(error => {
                if (error.textContent.trim() !== '') {
                    formValid = false;
                }
            });

            if (formValid) {
                alert('Message envoyé avec succès !');
                contactForm.reset();
            } else {
                alert('Veuillez corriger les erreurs dans le formulaire.');
            }
        });
    }
    const themeSwitchButton = document.getElementById('theme-switch');
    const THEME_KEY = 'fitlifeTheme';

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        localStorage.setItem(THEME_KEY, theme);
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY) || 'dark'; 
        applyTheme(savedTheme);
    }
    loadTheme();

    if (themeSwitchButton) {
        themeSwitchButton.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
});
const decouvrirBtn = document.getElementById('decouvrir-programmes');

if (decouvrirBtn) {
    decouvrirBtn.addEventListener('click', () => {
        window.location.href = 'programmes.html';
    });
}