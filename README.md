# Surrey Students' Law Society Website

A professional, responsive website for the Surrey Students' Law Society, built with HTML5 and CSS3. The website features a modern design with the society's logo prominently displayed and a custom color scheme matching the logo's dark blue and red theme.

## File Structure

```
law-society/
├── index.html              # Main website file
├── generic.html            # Convertor from JSON (config/content.json) to content
├── content-editor.html     # Convertor from content to JSON
├── assets/
│   ├── css/
│   │   ├── main.css        # Original template CSS
│   │   ├── custom.css      # Custom color scheme and styling
│   │   └── noscript.css    # No-script fallback styles
│   ├── js/                 # JavaScript files
│   ├── sass/               # SASS source files
│   └── webfonts/           # Font Awesome icons
├── images/
│   ├── Logo-no-bg.PNG      # Society logo
│   ├── bg.jpg              # Background image
│   └── pic01.jpg-pic08.jpg # Content images
└── README.md               # This file
```

## Customizations Made

### Color Scheme
- **Primary Blue**: #1a237e (Dark blue from logo)
- **Primary Red**: #d32f2f (Red accent from logo)
- **Dark Blue**: #0d47a1 (Darker shade for depth)
- **Light Blue**: #3949ab (Lighter shade for contrast)
- **Accent Red**: #f44336 (Bright red for highlights)

### Logo Integration
- Logo positioned prominently at the top of the page
- Subtle fade effects and glow animations
- Responsive sizing for different screen sizes
- Hover effects with scale and shadow changes

### Content Updates
- Updated all text content to reflect the Surrey Students' Law Society
- Three main sections: About, What We Offer, and Join Our Community
- Events section showcasing society activities
- Contact information and social media links
- Professional form styling

## Hosting on GitHub Pages (That's the plan)

### Option 1: Automatic Deployment (Recommended)

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com) and sign in
   - Click "New repository"
   - Name it `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
   - Make it public
   - Click "Create repository"

2. **Upload Your Files**:
   - Clone the repository to your local machine:
     ```bash
     git clone https://github.com/yourusername/yourusername.github.io.git
     cd yourusername.github.io
     ```
   - Copy all website files to this directory
   - Commit and push:
     ```bash
     git add .
     git commit -m "Initial website upload"
     git push origin main
     ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "GitHub Pages" section
   - Select "Deploy from a branch" and choose "main" branch
   - Click "Save"
   - Your website will be available at `https://yourusername.github.io`

### Option 2: Project Repository

1. **Create a Regular Repository**:
   - Name it something like `law-society-website`
   - Make it public
   - Upload your files

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Your website will be at `https://yourusername.github.io/law-society-website`

## Customization

### Changing Colors
Edit `assets/css/custom.css` and modify the CSS variables at the top:

```css
:root {
    --primary-blue: #1a237e;    /* Change this for main blue */
    --primary-red: #d32f2f;     /* Change this for main red */
    /* ... other colors ... */
}
```

### Updating Content (Easy Method)
**Option 1: Use the Visual Content Editor**
1. Open `content-editor.html` in your web browser
2. Fill out the form with your new content
3. Click "Generate Updated Content"
4. Copy the generated JSON and save it to `config/content.json`
5. Upload the updated file to GitHub

**Option 2: Edit JSON Directly**
- Edit `config/content.json` with any text editor
- Update the text between the quotes
- Save and upload to GitHub

### Manual Content Updates (Advanced)
- Edit `index.html` to change text content
- Replace images in the `images/` folder
- Update contact information and social media links

### Adding New Sections
- Follow the existing HTML structure in `index.html`
- Add corresponding CSS styles in `custom.css`
- Ensure responsive design for mobile devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## Dependencies

- **HTML5 UP Template**: Solid State (free template)
- **Font Awesome**: Icon library
- **jQuery**: JavaScript library for interactions
- **Custom CSS**: Tailored styling for the law society

---

**Note**: The contact form in this static website is for display purposes only. To make it functional, you'll need to integrate it with a form service like Formspree, Netlify Forms, or implement a backend solution.
