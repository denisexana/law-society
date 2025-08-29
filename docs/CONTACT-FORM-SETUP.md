# Contact Form Setup Guide

## **How the Contact Form Currently Works**

Your "Get in touch" section contact form that currently:
- **Collects user information** (name, email, message)
- **Doesn't send emails** (form action is placeholder)
- **Doesn't store submissions** anywhere

## **Making the Form Functional**

### **Option 1: Formspree (Recommended - Easiest)**

**Step 1: Create Formspree Account**
1. Go to [Formspree.io](https://formspree.io)
2. Click "Sign Up" and create a free account
3. Verify your email address

**Step 2: Create a New Form**
1. Click "New Form" in your dashboard
2. Give it a name like "Surrey Law Society Contact"
3. Copy the unique endpoint URL (looks like `https://formspree.io/f/abc123`)

**Step 3: Update Your Website**
1. Open `index.html` in your text editor
2. Find this line:
   ```html
   <form method="POST" action="https://formspree.io/f/YOUR_FORM_ID_HERE">
   ```
3. Replace `YOUR_FORM_ID_HERE` with your actual Formspree endpoint
4. Save and upload to GitHub

**Step 4: Test the Form**
1. Fill out the form on your website
2. Submit it
3. Check your email for the submission
4. Check your Formspree dashboard for submissions

**Benefits:**
- **Free tier**: 50 submissions per month
- **No backend required**: Works with GitHub Pages
- **Email notifications**: Get submissions in your inbox
- **Spam protection**: Built-in spam filtering
- **Dashboard**: View all submissions online

---

## **Current Form Setup (Formspree)**

Your form is now configured for Formspree. Here's what you need to do:

### **1. Get Your Formspree Endpoint**
- Sign up at [Formspree.io](https://formspree.io)
- Create a new form
- Copy the endpoint URL

### **2. Update the Action URL**
In `index.html`, find this line:
```html
<form method="POST" action="https://formspree.io/f/YOUR_FORM_ID_HERE">
```

Replace `YOUR_FORM_ID_HERE` with your actual endpoint.

### **3. Test the Form**
- Fill out the form
- Submit it
- Check your email for the submission

## **What Happens When Someone Submits the Form**

1. **User fills out the form** on your website
2. **Form submits to Formspree** (your endpoint)
3. **Formspree processes the submission** and sends you an email
4. **You receive an email** with the contact details
5. **Submission appears in your Formspree dashboard**
6. **User sees a success message** (Formspree handles this)
