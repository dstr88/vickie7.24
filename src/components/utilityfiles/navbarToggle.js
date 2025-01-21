// ./utilityfiles/navbarToggle.js
export function setupNavbarToggle() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
  
    if (navbarToggle && navbarMenu) {
      navbarToggle.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        navbarMenu.classList.toggle('active');
      });
    }
  }

/*// src/scripts/navbarToggle.js
export function setupNavbarToggle() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
  
    if (navbarToggle && navbarMenu) {
      navbarToggle.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        navbarMenu.classList.toggle('active');
      });
    }
  }  */