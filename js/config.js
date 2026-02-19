// Environment Configuration Loader
// This file loads configuration from environment variables or falls back to direct config

class Config {
    constructor() {
        // Try to load from environment (for build tools like Vite, Webpack, etc.)
        this.firebase = {
            apiKey: this.getEnv('FIREBASE_API_KEY', 'YOUR_API_KEY_HERE'),
            authDomain: this.getEnv('FIREBASE_AUTH_DOMAIN', 'YOUR_PROJECT_ID.firebaseapp.com'),
            projectId: this.getEnv('FIREBASE_PROJECT_ID', 'YOUR_PROJECT_ID'),
            storageBucket: this.getEnv('FIREBASE_STORAGE_BUCKET', 'YOUR_PROJECT_ID.appspot.com'),
            messagingSenderId: this.getEnv('FIREBASE_MESSAGING_SENDER_ID', 'YOUR_MESSAGING_SENDER_ID'),
            appId: this.getEnv('FIREBASE_APP_ID', 'YOUR_APP_ID')
        };

        this.business = {
            whatsappNumber: this.getEnv('WHATSAPP_NUMBER', '919999999999'),
            phone: this.getEnv('BUSINESS_PHONE', '+91 99999 99999'),
            email: this.getEnv('BUSINESS_EMAIL', 'contact@dayalengineering.com'),
            address: this.getEnv('BUSINESS_ADDRESS', '123 Industrial Area, Your City, State - 123456')
        };

        this.site = {
            name: this.getEnv('SITE_NAME', 'Dayal Engineering'),
            tagline: this.getEnv('SITE_TAGLINE', 'Reliable Welding & Fabrication Solutions'),
            url: this.getEnv('SITE_URL', 'https://yourdomain.com')
        };
    }

    getEnv(key, defaultValue) {
        // Check various environment variable formats
        if (typeof process !== 'undefined' && process.env && process.env[key]) {
            return process.env[key];
        }
        if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
            return import.meta.env[key];
        }
        // For Vite
        if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[`VITE_${key}`]) {
            return import.meta.env[`VITE_${key}`];
        }
        return defaultValue;
    }

    isConfigured() {
        return this.firebase.apiKey !== 'YOUR_API_KEY_HERE';
    }

    getFirebaseConfig() {
        return this.firebase;
    }

    getWhatsAppLink(message = '') {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${this.business.whatsappNumber}?text=${encodedMessage}`;
    }
}

// Export singleton instance
const config = new Config();

// Make available globally for non-module scripts
if (typeof window !== 'undefined') {
    window.AppConfig = config;
}

export default config;
