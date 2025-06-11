// Enhanced script.js with improved profile switching and project filtering

document.addEventListener("DOMContentLoaded", function () {
  // Profile Toggle Functionality
  const aboutText = document.getElementById('about-text');
  const skillsList = document.getElementById('skills-list');
  const profileToggle = document.getElementById('profile-toggle');
  const heroDescription = document.getElementById('hero-description');

  let currentProfile = 'uxui'; // Default profile

  if (profileToggle) {
    profileToggle.addEventListener('click', () => {
      if (currentProfile === 'uxui') {
        // Switching to Textile profile
        aboutText.innerHTML = `
        I’m a textile designer and visual artist with over 15 years of experience in print and surface design. <br><br>
        I blend technique, color, and intuition to create meaningful patterns and products. I’m especially interested in sustainable design and the emotional connection that textures and prints can evoke.
      `;
        heroDescription.innerHTML = "Explore my world between digital and textile. Textile projects: prints, color explorations, mockups, and more.";
        skillsList.innerHTML = `
        <li>Surface Pattern Design</li>
        <li>Textile Illustration</li>
        <li>Adobe Photoshop, Illustrator, InDesign</li>
        <li>Color Trend Research</li>
        <li>Sustainable Textile Design</li>
      `;
        profileToggle.textContent = "Switch to UX/UI Profile";
        profileToggle.setAttribute('aria-label', 'Switch to UX/UI Profile');
        currentProfile = 'textile';
        document.title = "Malala Soifer | Textile & Surface Design";
      } else {
        // Switching to UX/UI profile
        aboutText.innerHTML = `
  Hi! I'm Malala — a designer with over 15 years of experience in <strong>textile graphic design</strong> and a
  background in Fine Arts. I bring a strong aesthetic sensibility, a critical eye for detail, and a deep
  understanding of visual composition.

  Driven by curiosity and a desire to solve real-world problems, I’ve transitioned into <strong>UX/UI design</strong> and <strong>Front-End development</strong>—
  applying my creative vision to digital experiences that are both intuitive and visually engaging.

  <br><br>I’m currently working as a <strong>UX/UI & Front-End Intern</strong> at The Integrity Game, where I also contribute to graphic
  design. I'm continuously learning and building with <strong>HTML, CSS, JavaScript, and React</strong>.

  I’m especially passionate about projects in <strong>eCommerce and Retail</strong>—crafting user-centered, strategic solutions for
  digital catalogs and shopping experiences that connect people to products in meaningful ways.
`;
        heroDescription.innerHTML  = `Explore my world between digital and textile. <strong>UX/UI, apps, websites, graphic design</strong>, and more.`;
        skillsList.innerHTML = `
        <li>UX/UI Design</li>
        <li>Frontend Development (HTML, CSS, JavaScript)</li>
        <li>Responsive Design</li>
        <li>User Research & Testing</li>
        <li>Prototyping & Wireframing</li>
      `;
        profileToggle.textContent = "Switch to Textile Profile";
        profileToggle.setAttribute('aria-label', 'Switch to Textile Profile');
        currentProfile = 'uxui';
        document.title = "Malala Soifer | UX/UI & Frontend";
      }

      // Filter projects based on current profile
      filterProjects(currentProfile);
    });
  }


  // Filter projects based on profile
  function filterProjects(profile) {
    const projectCards = document.querySelectorAll('.project-card');

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
  const projectCards = document.querySelectorAll('.project-card');

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

  // Initialize projects based on default profile
  filterProjects(currentProfile);
});

// back to top
document.querySelector('.back-to-top-link').addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Custom Lightbox JavaScript 
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('customLightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Find all lightbox triggers (both gallery items and single images)
    const lightboxTriggers = document.querySelectorAll('.project-media img, .gallery-item img');

    // Add click event to all triggers
    lightboxTriggers.forEach(img => {
        img.style.cursor = 'zoom-in'; // Añade un cursor indicativo
        img.addEventListener('click', function(e) {
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
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Focus management for accessibility
        closeBtn.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        lightboxImg.src = ''; // Clear image source
        lightboxTitle.textContent = ''; // Clear title
    }

    // Close lightbox when clicking the close button
    closeBtn.addEventListener('click', closeLightbox);

    // Close lightbox when clicking outside the content
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) { // Solo si el clic es directamente en el fondo del lightbox
            closeLightbox();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Prevent content clicks from closing lightbox
    lightbox.querySelector('.lightbox-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

