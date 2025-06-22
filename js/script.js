// Enhanced script.js with improved profile switching and project filtering

document.addEventListener("DOMContentLoaded", function () {
    // --- NEW/UPDATED: Hamburger Menu & Profile Toggle Buttons ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    // Selecciona AMBOS botones de perfil por su ID
    const profileToggleDesktop = document.getElementById('profile-toggle-desktop');
    const profileToggleMenu = document.getElementById('profile-toggle-menu');

    // Profile Toggle Functionality
    const aboutText = document.getElementById('about-text');
    const skillsList = document.getElementById('skills-list');
    const heroDescription = document.getElementById('hero-description');
    const projectCards = document.querySelectorAll('.project-card'); // Moved this up for broader scope

    let currentProfile = 'uxui'; // Default profile

    // Check if we are on the main index.html page or a project detail page
    const isOnProjectPage = window.location.pathname.includes('/Proyectos/');

    // NEW: Add a class to the button if on a project page
    // Aplicar a ambos botones si existen
    if (isOnProjectPage) {
        if (profileToggleDesktop) profileToggleDesktop.classList.add('disabled-toggle');
        if (profileToggleMenu) profileToggleMenu.classList.add('disabled-toggle');
    }

    // Función para manejar el clic del botón de perfil (unificada para ambos botones)
    function handleProfileToggleClick(event) {
        // Revisa si el botón está deshabilitado
        if (this.classList.contains('disabled-toggle')) {
            event.preventDefault(); // Detiene el clic si está deshabilitado
            return;
        }

        // Si estamos en una página de proyecto, redirige a index.html
        if (isOnProjectPage) {
            const targetProfile = currentProfile === 'uxui' ? 'textile' : 'uxui';
            window.location.href = `../../index.html?profile=${targetProfile}`;
        } else {
            // Lógica de cambio de perfil en index.html
            if (currentProfile === 'uxui') {
                // Switching to Textile profile
                aboutText.innerHTML = `
                I'm a textile designer and visual artist with over 15 years of experience in print and surface design. <br><br>
                I blend technique, color, and intuition to create meaningful patterns and products. I'm especially interested in sustainable design and the emotional connection that textures and prints can evoke.
                `;
                heroDescription.innerHTML = "Explore my world between digital and textile. <strong>Prints, color explorations, mockups</strong>, and more.";
                skillsList.innerHTML = `
                <li>Surface Pattern Design</li>
                <li>Textile Illustration</li>
                <li>Adobe Photoshop, Illustrator, InDesign</li>
                <li>Color Trend Research</li>
                <li>Emerging Technologies (Generative AI)</li>
                `;
                // Actualiza el texto de AMBOS botones de perfil
                if (profileToggleDesktop) profileToggleDesktop.textContent = "Switch to UX/UI Profile";
                if (profileToggleMenu) profileToggleMenu.textContent = "Switch to UX/UI Profile";
                currentProfile = 'textile';
                document.title = "Malala Soifer | Textile & Surface Design";
            } else {
                // Switching to UX/UI profile
                aboutText.innerHTML = `
                Hi! I'm Malala — a designer with over 15 years of experience in <strong>textile graphic design</strong> and a
                background in Fine Arts. I bring a strong aesthetic sensibility, a critical eye for detail, and a deep
                understanding of visual composition.

                Driven by curiosity and a desire to solve real-world problems, I've transitioned into <strong>UX/UI design</strong> and <strong>Front-End development</strong>—
                applying my creative vision to digital experiences that are both intuitive and visually engaging.

                <br><br>I'm currently working as a <strong>UX/UI & Front-End Intern</strong> at The Integrity Game, where I also contribute to graphic
                design. I'm continuously learning and building with <strong>HTML, CSS, JavaScript, and React</strong>.

                I'm especially passionate about projects in <strong>eCommerce and Retail</strong>—crafting user-centered, strategic solutions for
                digital catalogs and shopping experiences that connect people to products in meaningful ways.
                `;
                heroDescription.innerHTML = `Explore my world between digital and textile. <strong>UX/UI, apps, websites, graphic design</strong>, and more.`;
                skillsList.innerHTML = `
                <li>UX/UI Design</li>
                <li>Frontend Development (HTML, CSS, JavaScript)</li>
                <li>Responsive Design</li>
                <li>User Research & Testing</li>
                <li>Prototyping & Wireframing</li>
                <li>Emerging Technologies (Generative AI)</li>
                <li>Github</li>
                <li>Netlify</li>
                `;
                // Actualiza el texto de AMBOS botones de perfil
                if (profileToggleDesktop) profileToggleDesktop.textContent = "Switch to Textile Profile";
                if (profileToggleMenu) profileToggleMenu.textContent = "Switch to Textile Profile";
                currentProfile = 'uxui';
                document.title = "Malala Soifer | UX/UI & Frontend";
            }

            // Filtrar proyectos si existen en la página actual
            if (projectCards.length > 0) {
                filterProjects(currentProfile);
            }
        }

        // Si el menú hamburguesa está abierto y el clic fue en el botón del menú, ciérralo
        if (navLinks.classList.contains('active') && this === profileToggleMenu) {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }

    // Asigna el mismo manejador de eventos a AMBOS botones
    if (profileToggleDesktop) profileToggleDesktop.addEventListener('click', handleProfileToggleClick);
    if (profileToggleMenu) profileToggleMenu.addEventListener('click', handleProfileToggleClick);


    // Lógica del menú hamburguesa (combinada con el DOMContentLoaded inicial)
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll'); // Opcional: evita scroll en el body
        });

        // Cerrar menú al hacer clic en un enlace o en el botón de perfil dentro del menú
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Solo cierra el menú si la pantalla es de móvil (menos de 769px)
                if (window.innerWidth < 769) { // Usa 769px como breakpoint
                    navLinks.classList.remove('active');
                    hamburgerMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }
    // --- END NEW/UPDATED: Hamburger Menu & Profile Toggle Buttons ---

    // Function to set profile based on a given string (or URL parameter)
    function setProfile(profileToSet) {
        // Deshabilita temporalmente los botones si estaban deshabilitados
        const wasDesktopDisabled = profileToggleDesktop && profileToggleDesktop.classList.contains('disabled-toggle');
        const wasMenuDisabled = profileToggleMenu && profileToggleMenu.classList.contains('disabled-toggle');

        if (wasDesktopDisabled) profileToggleDesktop.classList.remove('disabled-toggle');
        if (wasMenuDisabled) profileToggleMenu.classList.remove('disabled-toggle');

        // Simula el clic en el botón de escritorio para activar la lógica de cambio
        // El manejador handleProfileToggleClick ahora maneja el estado
        if (profileToSet === 'textile') {
            currentProfile = 'uxui'; // Establece esto para que el clic lo cambie a 'textile'
        } else {
            currentProfile = 'textile'; // Establece esto para que el clic lo cambie a 'uxui'
        }
        // Simula un click en el botón de escritorio (o cualquiera de los dos, da igual)
        if (profileToggleDesktop) profileToggleDesktop.click();


        // Vuelve a habilitar si estaban deshabilitados
        if (wasDesktopDisabled) profileToggleDesktop.classList.add('disabled-toggle');
        if (wasMenuDisabled) profileToggleMenu.classList.add('disabled-toggle');
    }

    // New: Check for profile parameter in URL on page load
    if (!isOnProjectPage) { // Only run this on index.html
        const urlParams = new URLSearchParams(window.location.search);
        const profileParam = urlParams.get('profile');
        if (profileParam && (profileParam === 'uxui' || profileParam === 'textile')) {
            setProfile(profileParam);
        } else {
            // Inicializa con el perfil 'uxui' si no hay parámetro o es inválido
            // Simula un clic para establecer el perfil UX/UI por defecto al cargar la página
            // Asegúrate de que currentProfile sea 'textile' ANTES del clic para que cambie a 'uxui'
            currentProfile = 'textile';
            if (profileToggleDesktop) profileToggleDesktop.click();
        }
    }


    // Filter projects based on profile
    function filterProjects(profile) {
        // Ensure projectCards are available before attempting to filter
        if (projectCards && projectCards.length > 0) {
            projectCards.forEach(card => {
                if (profile === 'uxui') {
                    if (card.classList.contains('uxui-project')) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                } else if (profile === 'textile') {
                    if (card.classList.contains('textile-project')) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        }
    }

    // Fade elements on scroll
    const fadeElements = document.querySelectorAll('.fade-element');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Image hover effects for project cards
    // Only apply if project cards exist (i.e., on index.html)
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            const image = card.querySelector('.project-image');
            const title = card.querySelector('.project-title');

            card.addEventListener('mouseenter', () => {
                if (title) title.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
                if (title) title.style.opacity = '0';
            });
        });
    }

    // Custom Lightbox JavaScript
    const lightbox = document.getElementById('customLightbox');

    if (lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-image');
        const lightboxTitle = lightbox.querySelector('.lightbox-title');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        const lightboxTriggers = document.querySelectorAll('.project-media img, .gallery-item img, .swiper-slide img');

        lightboxTriggers.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function (e) {
                e.preventDefault();

                let imgSrc = this.src;
                let imgTitle = this.getAttribute('data-title') || this.alt;

                if (imgSrc) {
                    openLightbox(imgSrc, imgTitle);
                }
            });
        });

        function openLightbox(src, title = '') {
            lightboxImg.src = src;
            lightboxTitle.textContent = title;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';

            closeBtn.focus();
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            lightboxImg.src = '';
            lightboxTitle.textContent = '';
        }

        closeBtn.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        lightbox.querySelector('.lightbox-content').addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    console.log('Portfolio script initialized successfully');
});

document.addEventListener('DOMContentLoaded', function () {
    const backToTopLink = document.querySelector('.back-to-top-link');
    if (backToTopLink) {
        backToTopLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});


// Forms

const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
  .then(() => {
    form.reset(); // Limpia los campos del formulario

    // Aplica el estilo para el fade out del formulario
    form.style.transition = "opacity 1s ease-out";
    form.style.opacity = "0";

    // Espera a que el fade out del formulario termine antes de ocultarlo y mostrar el mensaje
    setTimeout(() => {
      form.style.display = "none"; // Oculta el formulario después del fade out
      successMessage.style.display = "block"; // Muestra el contenedor del mensaje
      successMessage.classList.add("show"); // Agrega la clase 'show' para activar el fade-in
    }, 1000); // 1000ms = 1 segundo, igual a la duración de la transición del formulario
  })
  .catch(error => alert("Oops! Something went wrong: " + error));
});
 