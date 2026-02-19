// Environment Configuration Loader
// Reads from .env file and makes values available throughout the website

class EnvironmentConfig {
    constructor() {
        this.config = {
            // Business Contact
            whatsappNumber: '917564974258',
            businessPhone: '+91 7564974258',
            businessEmail: 'contact@dayalengineering.com',
            businessAddress: 'Asharfi Chawk, Hajipur Jandaha Road Vaishali',
            
            // Site Info
            siteName: 'Dayal Engineering',
            siteTagline: 'Reliable Welding & Fabrication Solutions',
            siteUrl: 'https://yourdomain.com'
        };
        
        this.init();
    }

    async init() {
        try {
            // Try to load from .env file
            const response = await fetch('.env');
            if (response.ok) {
                const envText = await response.text();
                this.parseEnv(envText);
            }
        } catch (error) {
            console.log('Using default configuration');
        }
        
        // Apply configuration to page
        this.applyConfig();
    }

    parseEnv(envText) {
        const lines = envText.split('\n');
        lines.forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#')) {
                const [key, ...valueParts] = line.split('=');
                const value = valueParts.join('=').trim();
                
                switch(key.trim()) {
                    case 'WHATSAPP_NUMBER':
                        this.config.whatsappNumber = value;
                        break;
                    case 'BUSINESS_PHONE':
                        this.config.businessPhone = value;
                        break;
                    case 'BUSINESS_EMAIL':
                        this.config.businessEmail = value;
                        break;
                    case 'BUSINESS_ADDRESS':
                        this.config.businessAddress = value;
                        break;
                    case 'SITE_NAME':
                        this.config.siteName = value;
                        break;
                    case 'SITE_TAGLINE':
                        this.config.siteTagline = value;
                        break;
                    case 'SITE_URL':
                        this.config.siteUrl = value;
                        break;
                }
            }
        });
    }

    applyConfig() {
        // Update all WhatsApp links
        document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            const currentHref = link.getAttribute('href');
            const textPart = currentHref.includes('?text=') 
                ? currentHref.split('?text=')[1] 
                : 'Hi, I need welding services';
            link.setAttribute('href', `https://wa.me/${this.config.whatsappNumber}?text=${textPart}`);
        });

        // Update phone links
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.setAttribute('href', `tel:${this.config.businessPhone}`);
            // Update displayed text if it's a phone number
            if (link.textContent.match(/[\d\s\+\-\(\)]+/)) {
                link.textContent = this.config.businessPhone;
            }
        });

        // Update email links
        document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
            link.setAttribute('href', `mailto:${this.config.businessEmail}`);
            if (link.textContent.includes('@')) {
                link.textContent = this.config.businessEmail;
            }
        });

        // Update elements with data-config attribute
        document.querySelectorAll('[data-config]').forEach(element => {
            const configKey = element.getAttribute('data-config');
            const value = this.getConfig(configKey);
            if (value) {
                element.textContent = value;
            }
        });

        // Update business address
        document.querySelectorAll('[data-config-address]').forEach(element => {
            element.innerHTML = this.config.businessAddress.replace(/,/g, '<br>');
        });
    }

    getConfig(key) {
        const keyMap = {
            'whatsapp': this.config.whatsappNumber,
            'phone': this.config.businessPhone,
            'email': this.config.businessEmail,
            'address': this.config.businessAddress,
            'siteName': this.config.siteName,
            'tagline': this.config.siteTagline
        };
        return keyMap[key] || null;
    }

    // Get WhatsApp URL with custom message
    getWhatsAppUrl(message = 'Hi, I need welding services') {
        return `https://wa.me/${this.config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    }

    // Get phone URL
    getPhoneUrl() {
        return `tel:${this.config.businessPhone}`;
    }

    // Get email URL
    getEmailUrl(subject = '', body = '') {
        let url = `mailto:${this.config.businessEmail}`;
        if (subject || body) {
            url += `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
        return url;
    }
}

// Initialize and export
const envConfig = new EnvironmentConfig();

// Make available globally
window.envConfig = envConfig;

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EnvironmentConfig, envConfig };
}
