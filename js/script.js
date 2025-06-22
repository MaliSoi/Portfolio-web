// ============================
// Profile Toggle & Menu Logic
// ============================

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  const profileToggleDesktop = document.getElementById('profile-toggle-desktop');
  const profileToggleMenu = document.getElementById('profile-toggle-menu');
  const aboutText = document.getElementById('about-text');
  const skillsList = document.getElementById('skills-list');
  const heroDescription = document.getElementById('hero-description');
  const projectCards = document.querySelectorAll('.project-card');

  let currentProfile = 'uxui';
  const isOnProjectPage = window.location.pathname.includes('/Proyectos/');

  if (isOnProjectPage) {
    if (profileToggleDesktop) profileToggleDesktop.classList.add('disabled-toggle');
    if (profileToggleMenu) profileToggleMenu.classList.add('disabled-toggle');
  }

  function handleProfileToggleClick(event) {
    if (this.classList.contains('disabled-toggle')) {
      event.preventDefault();
      return;
    }

    if (isOnProjectPage) {
      const targetProfile = currentProfile === 'uxui' ? 'textile' : 'uxui';
      window.location.href = `../../index.html?profile=${targetProfile}`;
    } else {
      if (currentProfile === 'uxui') {
        aboutText.innerHTML = `I'm a textile designer and visual artist with over 15 years of experience in print and surface design. <br><br>I blend technique, color, and intuition to create meaningful patterns and products. I'm especially interested in sustainable design and the emotional connection that textures and prints can evoke.`;
        heroDescription.innerHTML = "Explore my world between digital and textile. <strong>Prints, color explorations, mockups</strong>, and more.";
        skillsList.innerHTML = `
          <li>Surface Pattern Design</li>
          <li>Textile Illustration</li>
          <li>Adobe Photoshop, Illustrator, InDesign</li>
          <li>Color Trend Research</li>
          <li>Emerging Technologies (Generative AI)</li>`;
        if (profileToggleDesktop) profileToggleDesktop.textContent = "Switch to UX/UI Profile";
        if (profileToggleMenu) profileToggleMenu.textContent = "Switch to UX/UI Profile";
        currentProfile = 'textile';
        document.title = "Malala Soifer | Textile & Surface Design";
      } else {
        aboutText.innerHTML = `Hi! I'm Malala — a designer with over 15 years of experience in <strong>textile graphic design</strong> and a background in Fine Arts. I bring a strong aesthetic sensibility, a critical eye for detail, and a deep understanding of visual composition.<br><br>Driven by curiosity and a desire to solve real-world problems, I've transitioned into <strong>UX/UI design</strong> and <strong>Front-End development</strong>— applying my creative vision to digital experiences that are both intuitive and visually engaging.<br><br>I'm currently working as a <strong>UX/UI & Front-End Intern</strong> at The Integrity Game, where I also contribute to graphic design. I'm continuously learning and building with <strong>HTML, CSS, JavaScript, and React</strong>.<br><br>I'm especially passionate about projects in <strong>eCommerce and Retail</strong>—crafting user-centered, strategic solutions for digital catalogs and shopping experiences that connect people to products in meaningful ways.`;
        heroDescription.innerHTML = `Explore my world between digital and textile. <strong>UX/UI, apps, websites, graphic design</strong>, and more.`;
        skillsList.innerHTML = `
          <li>UX/UI Design</li>
          <li>Frontend Development (HTML, CSS, JavaScript)</li>
          <li>Responsive Design</li>
          <li>User Research & Testing</li>
          <li>Prototyping & Wireframing</li>
          <li>Emerging Technologies (Generative AI)</li>
          <li>Github</li>
          <li>Netlify</li>`;
        if (profileToggleDesktop) profileToggleDesktop.textContent = "Switch to Textile Profile";
        if (profileToggleMenu) profileToggleMenu.textContent = "Switch to Textile Profile";
        currentProfile = 'uxui';
        document.title = "Malala Soifer | UX/UI & Frontend";
      }
      if (projectCards.length > 0) filterProjects(currentProfile);
    }

    if (navLinks.classList.contains('active') && this === profileToggleMenu) {
      navLinks.classList.remove('active');
      hamburgerMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  }

  if (profileToggleDesktop) profileToggleDesktop.addEventListener('click', handleProfileToggleClick);
  if (profileToggleMenu) profileToggleMenu.addEventListener('click', handleProfileToggleClick);

  if (hamburgerMenu && navLinks) {
    hamburgerMenu.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      hamburgerMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 769) {
          navLinks.classList.remove('active');
          hamburgerMenu.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      });
    });
  }

  function setProfile(profileToSet) {
    const wasDesktopDisabled = profileToggleDesktop && profileToggleDesktop.classList.contains('disabled-toggle');
    const wasMenuDisabled = profileToggleMenu && profileToggleMenu.classList.contains('disabled-toggle');

    if (wasDesktopDisabled) profileToggleDesktop.classList.remove('disabled-toggle');
    if (wasMenuDisabled) profileToggleMenu.classList.remove('disabled-toggle');

    currentProfile = profileToSet === 'textile' ? 'uxui' : 'textile';
    if (profileToggleDesktop) profileToggleDesktop.click();

    if (wasDesktopDisabled) profileToggleDesktop.classList.add('disabled-toggle');
    if (wasMenuDisabled) profileToggleMenu.classList.add('disabled-toggle');
  }

  if (!isOnProjectPage) {
    const urlParams = new URLSearchParams(window.location.search);
    const profileParam = urlParams.get('profile');
    if (profileParam && (profileParam === 'uxui' || profileParam === 'textile')) {
      setProfile(profileParam);
    } else {
      currentProfile = 'textile';
      if (profileToggleDesktop) profileToggleDesktop.click();
    }
  }

  // ==================
  // Project Filtering
  // ==================
  function filterProjects(profile) {
    if (projectCards && projectCards.length > 0) {
      projectCards.forEach(card => {
        if (profile === 'uxui') {
          card.classList.toggle('hidden', !card.classList.contains('uxui-project'));
        } else {
          card.classList.toggle('hidden', !card.classList.contains('textile-project'));
        }
      });
    }
  }

  // =======================
  // Fade-in on Scroll Logic
  // =======================
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
  fadeElements.forEach(element => observer.observe(element));

  // =============================
  // Project Card Hover Animation
  // =============================
  if (projectCards.length > 0) {
    projectCards.forEach(card => {
      const title = card.querySelector('.project-title');
      card.addEventListener('mouseenter', () => { if (title) title.style.opacity = '1'; });
      card.addEventListener('mouseleave', () => { if (title) title.style.opacity = '0'; });
    });
  }

// =============================
// Swiper Lightbox desde galería
// =============================
const lightbox = document.getElementById("customLightbox");
const swiperWrapper = lightbox.querySelector(".swiper-wrapper");
const lightboxTitle = lightbox.querySelector(".lightbox-title");
const closeBtn = lightbox.querySelector(".lightbox-close");

// Recolectamos todas las imágenes que abrirán el lightbox
const galleryItems = document.querySelectorAll('[data-lightbox="gallery"]');
const slidesData = [];

galleryItems.forEach((item, index) => {
  const img = item.querySelector("img");
  if (img) {
    slidesData.push({
      src: img.src,
      title: item.getAttribute("data-title") || img.alt || ""
    });

    item.addEventListener("click", () => {
      openLightbox(index);
    });
  }
});

function openLightbox(startIndex) {
  swiperWrapper.innerHTML = ""; // Limpiamos lo anterior

  slidesData.forEach(data => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    const image = document.createElement("img");
    image.src = data.src;
    image.alt = data.title;

    slide.appendChild(image);
    swiperWrapper.appendChild(slide);
  });

  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";

  if (window.swiperInstance) window.swiperInstance.destroy(true, true);

  window.swiperInstance = new Swiper(".mySwiper", {
    initialSlide: startIndex,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    on: {
      slideChange: function () {
        const realIndex = this.realIndex;
        lightboxTitle.textContent = slidesData[realIndex].title || "";
      }
    }
  });

  lightboxTitle.textContent = slidesData[startIndex].title || "";
}

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
});


// ========================
// Back to Top Link Logic
// ========================
document.addEventListener('DOMContentLoaded', function () {
  const backToTopLink = document.querySelector('.back-to-top-link');
  if (backToTopLink) {
    backToTopLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// ========================
// Form Submission Logic
// ========================
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
      form.reset();
      form.style.transition = "opacity 1s ease-out";
      form.style.opacity = "0";
      setTimeout(() => {
        form.style.display = "none";
        successMessage.style.display = "block";
        successMessage.classList.add("show");
      }, 1000);
    })
    .catch(error => alert("Oops! Something went wrong: " + error));
});
