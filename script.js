document.addEventListener('DOMContentLoaded', () => {
    // 1. Animation au scroll (reveal)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('🚀 Merci ! Votre demande a été envoyée à l\'équipe FITLIFE.');
            contactForm.reset();
        });
    }
});