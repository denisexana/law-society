# Content Editing Guide for Surrey Students' Law Society Website

## **How to Update Your Website Content**

This guide shows you how to easily update your website content without touching the HTML code. All content is stored in a simple JSON file that you can edit with any text editor.

## **File to Edit: `config/content.json`**

Open this file in any text editor (Notepad, TextEdit, VS Code, etc.) to update your content.

## **Step-by-Step Editing Process**

### 1. **Open the Configuration File**
- Navigate to the `config` folder in your website files
- Open `content.json` with any text editor

### 2. **Edit the Content**
- Find the section you want to change
- Update the text between the quotes
- Save the file

### 3. **Upload to GitHub**
- Upload the updated `content.json` file to your GitHub repository
- Your website will automatically update with the new content

## **Content Sections You Can Edit**

### **Site Information**
```json
"site": {
  "title": "Surrey Students' Law Society",
  "tagline": "Empowering Future Legal Professionals",
  "description": "Your description here..."
}
```

### **Header & Navigation**
```json
"header": {
  "title": "Surrey Students' Law Society",
  "menu": {
    "home": "Home",
    "about": "About",
    "contact": "Get in Touch"
  }
}
```

### **Banner Section**
```json
"banner": {
  "title": "Surrey Students' Law Society",
  "subtitle": "Empowering Future Legal Professionals"
}
```

### **About Section**
```json
"sections": {
  "about": {
    "title": "About Our Society",
    "content": "Your about text here..."
  }
}
```

### **What We Offer Section**
```json
"offerings": {
  "title": "What We Offer",
  "content": "Your offerings description here..."
}
```

### **Community Section**
```json
"community": {
  "title": "Join Our Community",
  "content": "Your community description here..."
}
```

### **Events Section**
```json
"events": {
  "title": "Upcoming Events",
  "description": "Your events description here...",
  "items": [
    {
      "title": "Event Title",
      "description": "Event description...",
      "link": "#"
    }
  ]
}
```

### **Contact Information**
```json
"contact": {
  "title": "Get in touch",
  "description": "Your contact description...",
  "info": {
    "address": {
      "organization": "Your Organization Name",
      "institution": "Your Institution",
      "location": "Your Location"
    },
    "email": "your-email@example.com",
    "social": {
      "twitter": "@YourTwitter",
      "facebook": "facebook.com/YourPage",
      "instagram": "@YourInstagram",
      "linkedin": "linkedin.com/company/YourCompany"
    }
  }
}
```

## **Important Editing Rules**

1. **Don't remove the quotes** around your text
2. **Don't remove the commas** between items
3. **Don't change the structure** of the JSON file
4. **Always save the file** after making changes
5. **Test your changes** by opening the website in a browser

## **Quick Content Update Example**

Want to change the tagline? Find this line:

```json
"tagline": "Empowering Future Legal Professionals"
```

Change it to:

```json
"tagline": "Building Tomorrow's Legal Leaders"
```

Save the file and upload it to GitHub. Your website will show the new tagline!

## **Troubleshooting**

### **Website shows old content?**
- Make sure you saved the `content.json` file
- Clear your browser cache
- Check that the file was uploaded to GitHub

### **Website doesn't load?**
- Check that `content.json` is in the `config` folder
- Verify the JSON syntax is correct (no missing commas or quotes)
- Check the browser console for error messages

### **Content looks wrong?**
- Verify the JSON structure matches the examples above
- Check for extra or missing commas
- Ensure all quotes are properly closed

---