// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Active nav link on scroll
    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav);
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.veluxe-nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('nav-active');
        }
    });
}

// Scroll to section on button click
function scrollToSection(section) {
    let target;
    if (section === 'cars') {
        target = document.querySelector('.featured-section');
    } else if (section === 'bikes') {
        target = document.querySelectorAll('.featured-section')[1];
    }
    
    if (target) {
        window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe benefit items and stat cards
document.querySelectorAll('.benefit-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Interactive card animations
document.querySelectorAll('.interactive-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// CTA button ripple effect
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Mobile menu toggle (if you add a hamburger menu)
function toggleMobileMenu() {
    const nav = document.querySelector('.veluxe-nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add scroll animation to hero elements
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.veluxe-hero');
    const scrollPos = window.pageYOffset;
    
    if (hero) {
        hero.style.backgroundPosition = `center ${scrollPos * 0.5}px`;
    }
});

// Form validation if needed
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4444';
            isValid = false;
        } else {
            input.style.borderColor = '#ccc';
        }
    });
    
    return isValid;
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any modals/dropdowns if needed
    }
});

// Load animation on page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Prevent console errors
console.log('%cWelcome to Veluxe Motors', 'color: gold; font-size: 20px; font-weight: bold;');
