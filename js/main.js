// Main JavaScript file for Dayal Engineering website

// Language Switcher
const langBtn = document.getElementById('langBtn');
if (langBtn) {
    langBtn.addEventListener('click', () => {
        translationManager.toggleLanguage();
        
        // Re-translate select options after language change
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.dispatchEvent(new Event('change', { bubbles: false }));
        });
    });
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Contact Form Submission - REMOVED (form no longer exists)
// const contactForm = document.getElementById('contactForm');
// Contact form functionality has been removed as the form is no longer part of the design

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = this.getAttribute('target');
        
        // Skip external links (target="_blank") and non-anchor links
        if (target === '_blank') return;
        
        // Only handle internal anchor links
        if (href && href.startsWith('#') && href !== '#' && href !== '') {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add loading animation to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Update contact links with env config
    updateContactLinks();
});

// Function to update all contact links from env config
function updateContactLinks() {
    if (typeof envConfig === 'undefined') {
        console.warn('envConfig not loaded, using default values');
        return;
    }

    // Update Hero WhatsApp Button (index.html)
    const heroWhatsAppBtn = document.getElementById('heroWhatsAppBtn');
    if (heroWhatsAppBtn) {
        heroWhatsAppBtn.href = envConfig.getWhatsAppUrl("Hi, I'm interested in your welding services");
    }

    // Update Contact Phone Link (index.html)
    const contactPhoneLink = document.getElementById('contactPhoneLink');
    if (contactPhoneLink) {
        contactPhoneLink.href = envConfig.getPhoneUrl();
        contactPhoneLink.textContent = envConfig.config.businessPhone;
    }

    // Update Contact WhatsApp Link (index.html)
    const contactWhatsAppLink = document.getElementById('contactWhatsAppLink');
    if (contactWhatsAppLink) {
        contactWhatsAppLink.href = envConfig.getWhatsAppUrl("Hi, I need welding services");
    }

    // Update Footer links
    const footerPhoneLink = document.getElementById('footerPhoneLink');
    if (footerPhoneLink) {
        footerPhoneLink.href = envConfig.getPhoneUrl();
    }

    const footerWhatsAppLink = document.getElementById('footerWhatsAppLink');
    if (footerWhatsAppLink) {
        footerWhatsAppLink.href = envConfig.getWhatsAppUrl("Hi, I'm interested in your services");
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('.feature-card, .product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Phone number validation
function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// Add phone validation to contact form
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.setCustomValidity('Please enter a valid 10-digit Indian phone number');
            this.reportValidity();
        } else {
            this.setCustomValidity('');
        }
    });

    phoneInput.addEventListener('input', function() {
        this.setCustomValidity('');
    });
}

// Add active state to current page in navigation
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('#')[0];
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Console log for debugging
console.log('Dayal Engineering Website - Loaded Successfully');

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}
