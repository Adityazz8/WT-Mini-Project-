// ===================================
// VELUXE MOTORS - MAIN JAVASCRIPT
// Comprehensive functionality for all pages
// ===================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeUserAccess();
});

// Initialize Navigation
function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
            link.classList.add('active');
        }
    });
}

// Initialize User Access Area
function initializeUserAccess() {
    const userAccessArea = document.getElementById('userAccessArea');
    if (!userAccessArea) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        userAccessArea.innerHTML = `
            <a href="index.html" style="color: #d4af37; font-weight: 600;">👤 ${currentUser.name}</a>
            <button onclick="handleLogout()" class="nav-link" style="text-decoration: underline;">Logout</button>
        `;
    } else {
        userAccessArea.innerHTML = `
            <a href="login.html" class="nav-link">Login</a>
            <a href="register.html" class="nav-link">Register</a>
        `;
    }
}

// Handle Logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        alert('You have been logged out successfully.');
        window.location.href = 'index.html';
    }
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Validate Email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate Phone
function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Calculate Days Between Dates
function calculateDaysBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Get All Bookings
function getAllBookings() {
    return JSON.parse(localStorage.getItem('bookings')) || [];
}

// Get User Bookings
function getUserBookings(userEmail) {
    const allBookings = getAllBookings();
    return allBookings.filter(booking => booking.email === userEmail);
}

// Cancel Booking
function cancelBooking(bookingIndex) {
    const bookings = getAllBookings();
    bookings.splice(bookingIndex, 1);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Local Storage Manager
const StorageManager = {
    // Users
    saveUser: function(user) {
        let users = this.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    },
    
    getUsers: function() {
        return JSON.parse(localStorage.getItem('users')) || [];
    },
    
    findUser: function(email) {
        const users = this.getUsers();
        return users.find(user => user.email === email);
    },
    
    // Bookings
    saveBooking: function(booking) {
        let bookings = this.getBookings();
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
    },
    
    getBookings: function() {
        return JSON.parse(localStorage.getItem('bookings')) || [];
    },
    
    // Current User
    setCurrentUser: function(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    },
    
    getCurrentUser: function() {
        return JSON.parse(localStorage.getItem('currentUser'));
    },
    
    clearCurrentUser: function() {
        localStorage.removeItem('currentUser');
    }
};

// Form Validation
const FormValidator = {
    validateLoginForm: function(email, password) {
        const errors = [];
        
        if (!email) errors.push('Email is required');
        if (!validateEmail(email)) errors.push('Invalid email format');
        if (!password) errors.push('Password is required');
        if (password.length < 6) errors.push('Password must be at least 6 characters');
        
        return errors;
    },
    
    validateRegistrationForm: function(data) {
        const errors = [];
        
        if (!data.fullName) errors.push('Full name is required');
        if (!data.email) errors.push('Email is required');
        if (!validateEmail(data.email)) errors.push('Invalid email format');
        if (!data.phone) errors.push('Phone is required');
        if (!validatePhone(data.phone)) errors.push('Invalid phone format');
        if (!data.dob) errors.push('Date of birth is required');
        if (!data.password) errors.push('Password is required');
        if (data.password.length < 6) errors.push('Password must be at least 6 characters');
        if (data.password !== data.confirmPassword) errors.push('Passwords do not match');
        if (!data.termsAccepted) errors.push('You must accept the terms and conditions');
        
        return errors;
    },
    
    validateBookingForm: function(data) {
        const errors = [];
        
        if (!data.name) errors.push('Name is required');
        if (!data.email) errors.push('Email is required');
        if (!validateEmail(data.email)) errors.push('Invalid email format');
        if (!data.phone) errors.push('Phone is required');
        if (!validatePhone(data.phone)) errors.push('Invalid phone format');
        if (!data.pickupDate) errors.push('Pickup date is required');
        if (!data.dropoffDate) errors.push('Dropoff date is required');
        
        const pickupDate = new Date(data.pickupDate);
        const dropoffDate = new Date(data.dropoffDate);
        
        if (pickupDate >= dropoffDate) {
            errors.push('Dropoff date must be after pickup date');
        }
        
        if (!data.license) errors.push('Driver\'s license is required');
        
        return errors;
    },
    
    validateContactForm: function(data) {
        const errors = [];
        
        if (!data.name) errors.push('Name is required');
        if (!data.email) errors.push('Email is required');
        if (!validateEmail(data.email)) errors.push('Invalid email format');
        if (!data.subject) errors.push('Subject is required');
        if (!data.message) errors.push('Message is required');
        
        return errors;
    }
};

// UI Helper Functions
const UIHelper = {
    showMessage: function(containerId, message, type = 'success') {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.textContent = message;
        container.style.display = 'block';
        container.className = `${type}-message`;
        
        setTimeout(() => {
            container.style.display = 'none';
        }, 4000);
    },
    
    showError: function(containerId, message) {
        this.showMessage(containerId, message, 'error');
    },
    
    showSuccess: function(containerId, message) {
        this.showMessage(containerId, message, 'success');
    },
    
    disableButton: function(buttonSelector, disabled = true) {
        const button = document.querySelector(buttonSelector);
        if (button) {
            button.disabled = disabled;
            button.style.opacity = disabled ? '0.5' : '1';
        }
    }
};

// Analytics Helper
const Analytics = {
    trackEvent: function(eventName, eventData = {}) {
        const analytics = JSON.parse(localStorage.getItem('analytics')) || [];
        analytics.push({
            event: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('analytics', JSON.stringify(analytics));
    },
    
    trackPageView: function() {
        this.trackEvent('pageView', {
            page: window.location.pathname,
            referrer: document.referrer
        });
    },
    
    trackBooking: function(bookingData) {
        this.trackEvent('booking', bookingData);
    },
    
    trackLogin: function(userRole) {
        this.trackEvent('login', { role: userRole });
    }
};

// Initialize Analytics
Analytics.trackPageView();

// Export functions for use in pages
window.validateEmail = validateEmail;
window.validatePhone = validatePhone;
window.formatDate = formatDate;
window.calculateDaysBetween = calculateDaysBetween;
window.FormValidator = FormValidator;
window.UIHelper = UIHelper;
window.StorageManager = StorageManager;
window.Analytics = Analytics;
