// Article Loader for Surrey Students' Law Society Website
// This script loads article content based on URL parameters and displays it

class ArticleLoader {
    constructor() {
        this.articleData = null;
        this.init();
    }

    async init() {
        try {
            await this.loadArticleData();
            this.displayArticle();
        } catch (error) {
            console.error('Error loading article:', error);
            this.showErrorContent();
        }
    }

    async loadArticleData() {
        // Get article ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('article');
        
        if (!articleId) {
            throw new Error('No article ID specified');
        }

        // Load content.json to get article data
        const response = await fetch('../config/content.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const content = await response.json();
        
        // Find the article by ID - match the articleId with the filename part of the link
        console.log('Looking for article with ID:', articleId);
        console.log('Available events:', content.sections.events.items.map(item => ({
            title: item.title,
            link: item.link,
            hasArticle: !!item.article
        })));
        
        const article = content.sections.events.items.find(item => {
            if (!item.link) {
                console.log('Item has no link:', item.title);
                return false;
            }
            const linkParts = item.link.split('/');
            const fileName = linkParts[linkParts.length - 1];
            const fileId = fileName.replace('.html', '');
            console.log(`Comparing ${fileId} with ${articleId}`);
            return fileId === articleId;
        });

        if (!article) {
            throw new Error(`Article not found: ${articleId}`);
        }

        if (!article.article) {
            throw new Error(`Article content not found for: ${articleId}`);
        }

        this.articleData = article;
    }

    displayArticle() {
        if (!this.articleData) return;

        const article = this.articleData.article;

        // Update page title
        document.title = `${article.fullTitle} - Surrey Students' Law Society`;

        // Update banner
        document.getElementById('article-title').textContent = article.fullTitle;
        
        // Update subtitle based on available data
        let subtitle = '';
        if (article.date) subtitle += article.date;
        if (article.location) subtitle += subtitle ? ` • ${article.location}` : article.location;
        if (article.duration) subtitle += subtitle ? ` • ${article.duration}` : article.duration;
        
        document.getElementById('article-subtitle').textContent = subtitle;

        // Update meta information
        if (article.date) document.getElementById('article-date').textContent = article.date;
        if (article.location) document.getElementById('article-location').textContent = article.location;
        if (article.duration) document.getElementById('article-duration').textContent = article.duration;

        // Update article body
        this.populateArticleBody(article.content);

        // Update tags
        if (article.tags && article.tags.length > 0) {
            const tagsHtml = article.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            document.getElementById('article-tags').innerHTML = tagsHtml;
        }

        // Update contact information
        if (article.contact) {
            const contactElement = document.getElementById('article-contact');
            contactElement.href = `mailto:${article.contact}`;
            contactElement.textContent = article.contact;
        }
    }

    populateArticleBody(content) {
        const articleBody = document.getElementById('article-body');
        articleBody.innerHTML = '';

        content.forEach((section, index) => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'article-section';
            
            const sectionTitle = document.createElement('h3');
            sectionTitle.textContent = section.section;
            sectionTitle.className = 'section-title';
            
            const sectionContent = document.createElement('div');
            sectionContent.className = 'section-content';
            
            // Handle text with line breaks
            const formattedText = section.text.replace(/\n/g, '<br>');
            sectionContent.innerHTML = formattedText;
            
            sectionDiv.appendChild(sectionTitle);
            sectionDiv.appendChild(sectionContent);
            articleBody.appendChild(sectionDiv);
        });
    }

    showErrorContent() {
        document.title = 'Article Not Found - Surrey Students\' Law Society';
        document.getElementById('article-title').textContent = 'Article Not Found';
        document.getElementById('article-subtitle').textContent = 'The requested article could not be loaded.';
        
        const articleBody = document.getElementById('article-body');
        articleBody.innerHTML = `
            <div class="error-message">
                <p>Sorry, the article you're looking for could not be found or loaded.</p>
                <p>This might be due to:</p>
                <ul>
                    <li>The article URL is incorrect</li>
                    <li>The article content is not available</li>
                    <li>A temporary server issue</li>
                </ul>
                <p>Please try:</p>
                <ul>
                    <li>Going back to the <a href="../index.html#four">Events page</a></li>
                    <li>Checking the URL for typos</li>
                    <li>Refreshing the page</li>
                </ul>
            </div>
        `;
    }
}

// Initialize article loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ArticleLoader();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArticleLoader;
}
