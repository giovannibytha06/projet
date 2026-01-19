document.addEventListener('DOMContentLoaded', () => {
    // 1. Animation au scroll (reveal)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 }); // Déclenche l'animation quand 10% de l'élément est visible

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) { // Vérifie que le formulaire existe sur la page
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche le rechargement de la page
            alert('🚀 Merci ! Votre demande a été envoyée à l\'équipe FITLIFE.');
            contactForm.reset(); // Réinitialise le formulaire après envoi
        });
    }
});