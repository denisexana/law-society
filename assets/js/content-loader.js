// Content Loader for Surrey Students' Law Society Website
// This script loads content from config/content.json and populates the HTML

class ContentLoader {
    constructor() {
        this.content = null;
        this.init();
    }

    async init() {
        try {
            console.log('ContentLoader: Initializing...');
            await this.loadContent();
            console.log('ContentLoader: Content loaded successfully');
            this.populateContent();
            console.log('ContentLoader: Content populated successfully');
        } catch (error) {
            console.error('ContentLoader: Error loading content:', error);
            this.showFallbackContent();
        }
    }

    async loadContent() {
        const response = await fetch('config/content.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.content = await response.json();
    }

    populateContent() {
        if (!this.content) return;

        console.log('ContentLoader: Starting to populate content...');

        // Update page title
        document.title = this.content.site.title;

        // Update header
        this.updateElement('#header h1 a', this.content.header.title);

        // Update banner
        this.updateElement('#banner h2', this.content.banner.title);
        this.updateElement('#banner p', this.content.banner.subtitle);
        this.updateElement('#banner .logo img', this.content.banner.logo.src, 'src');
        this.updateElement('#banner .logo img', this.content.banner.logo.alt, 'alt');

        // Update sections
        this.updateSection('one', this.content.sections.about);
        this.updateSection('two', this.content.sections.offerings);
        this.updateSection('three', this.content.sections.community);
        
        console.log('ContentLoader: About to update events section...');
        this.updateEventsSection(this.content.sections.events);

        // Update contact section
        this.updateContactSection();

        // Update footer
        this.updateElement('#footer .copyright li:first-child', this.content.footer.copyright);
        
        console.log('ContentLoader: Content population complete');
    }

    updateElement(selector, text, attribute = null) {
        const element = document.querySelector(selector);
        if (element) {
            if (attribute) {
                element.setAttribute(attribute, text);
            } else {
                element.textContent = text;
            }
        }
    }

    updateSection(sectionId, sectionData) {
        const section = document.querySelector(`#${sectionId}`);
        if (section) {
            // Update title
            const titleElement = section.querySelector('h2.major');
            if (titleElement) {
                titleElement.textContent = sectionData.title;
            }

            // Update content
            const contentElement = section.querySelector('.content p');
            if (contentElement) {
                contentElement.textContent = sectionData.content;
            }

            // Update image
            const imageElement = section.querySelector('.image img');
            if (imageElement && sectionData.image) {
                imageElement.src = sectionData.image.src;
                imageElement.alt = sectionData.image.alt;
            }
        }
    }

    updateEventsSection(eventsData) {
        console.log('ContentLoader: Updating events section with data:', eventsData);
        
        // Update events title and description
        this.updateElement('#four h2.major', eventsData.title);
        this.updateElement('#four > .inner > p', eventsData.description);

        // Update events button
        this.updateElement('#four .actions .button', eventsData.buttonText);

        // Update individual event items
        const eventArticles = document.querySelectorAll('#four .features article');
        console.log('ContentLoader: Found event articles:', eventArticles.length);
        
        eventsData.items.forEach((event, index) => {
            console.log(`ContentLoader: Processing event ${index}:`, event.title);
            if (eventArticles[index]) {
                const titleElement = eventArticles[index].querySelector('h3.major');
                const descElement = eventArticles[index].querySelector('p');
                const imageElement = eventArticles[index].querySelector('.image img');
                const linkElement = eventArticles[index].querySelector('.special');

                if (titleElement) titleElement.textContent = event.title;
                if (descElement) descElement.textContent = event.description;
                if (imageElement && event.image) {
                    imageElement.src = event.image.src;
                    imageElement.alt = event.image.alt;
                }
                if (linkElement && event.link) {
                    // Create proper article link with query parameter
                    const articleId = event.link.split('/').pop().replace('.html', '');
                    const articleUrl = `articles/article-template.html?article=${articleId}`;
                    linkElement.href = articleUrl;
                    console.log(`Updated link for ${event.title}: ${articleUrl}`);
                }
            } else {
                console.log(`ContentLoader: No article element found for event ${index}`);
            }
        });
    }

    updateContactSection() {
        const contactData = this.content.contact;

        // Update contact title and description
        this.updateElement('#footer h2.major', contactData.title);
        this.updateElement('#footer > .inner > p', contactData.description);

        // Update form labels
        this.updateElement('#footer label[for="name"]', contactData.form.name);
        this.updateElement('#footer label[for="email"]', contactData.form.email);
        this.updateElement('#footer label[for="message"]', contactData.form.message);
        this.updateElement('#footer input[type="submit"]', contactData.form.submit, 'value');

        // Update contact information
        const addressElement = document.querySelector('#footer .contact li.icon.solid.fa-home');
        if (addressElement) {
            addressElement.innerHTML = `
                ${contactData.info.address.organization}<br />
                ${contactData.info.address.institution}<br />
                ${contactData.info.address.location}
            `;
        }

        const emailElement = document.querySelector('#footer .contact li.icon.solid.fa-envelope a');
        if (emailElement) {
            emailElement.href = `mailto:${contactData.info.email}`;
            emailElement.textContent = contactData.info.email;
        }

        // Update social media links
        const socialElements = {
            'twitter': document.querySelector('#footer .contact li.icon.brands.fa-twitter a'),
            'facebook': document.querySelector('#footer .contact li.icon.brands.fa-facebook-f a'),
            'instagram': document.querySelector('#footer .contact li.icon.brands.fa-instagram a'),
            'linkedin': document.querySelector('#footer .contact li.icon.brands.fa-linkedin a')
        };

        if (socialElements.twitter) {
            socialElements.twitter.textContent = contactData.info.social.twitter;
        }
        if (socialElements.facebook) {
            socialElements.facebook.textContent = contactData.info.social.facebook;
        }
        if (socialElements.instagram) {
            socialElements.instagram.textContent = contactData.info.social.instagram;
        }
        if (socialElements.linkedin) {
            socialElements.linkedin.textContent = contactData.info.social.linkedin;
        }
    }

    showFallbackContent() {
        console.log('Using fallback content - content.json not found');
        // The HTML already contains the content, so it will display as is
    }
}

// Initialize content loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContentLoader();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentLoader;
}
