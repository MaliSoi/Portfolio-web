// Enhanced script.js with improved profile switching and project filtering

document.addEventListener("DOMContentLoaded", function() {
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
      heroDescription.textContent = "Textile and surface designer with a passion for patterns, colors, and sustainable design solutions.";
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
        I’m a UX/UI designer and frontend developer with a strong visual sensibility and a background in graphic and textile design. <br><br>
        I’m passionate about creating intuitive, accessible, and visually compelling digital experiences. I combine research, user-centered methodologies, and prototyping to deliver thoughtful solutions that connect with people.
      `;
      heroDescription.textContent = "Explore my world between digital and textile. UX/UI, illustration, patterns and more.";
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
document.querySelector('.back-to-top-link').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

