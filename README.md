# Dynamic News System

This project implements a dynamic news system where each news article is stored in a separate markdown file, organized by date.

## News File Structure

```
src/content/news/
├── 2025-01-15-aramco-prequalified.md
├── 2024-12-10-successful-field-trial.md
├── 2024-12-05-aramco-leadership-visit.md
└── 2024-11-20-new-research-facility.md
```

## File Naming Convention

News files should be named using the format: `YYYY-MM-DD-slug.md`

- `YYYY-MM-DD`: The publication date
- `slug`: A URL-friendly identifier (lowercase, hyphens instead of spaces)

## Markdown File Format

Each news file should start with YAML frontmatter followed by markdown content:

```markdown
---
id: unique-identifier (optional)
title: "Article Title"
date: "YYYY-MM-DD"
category: "Category Name"
image: "https://image-url.com/image.jpg"
excerpt: "Brief description..."
featured: true/false
---

# Article Title

Article content in markdown format with support for:

- **Bold text**
- *Italic text*
- ## Subheadings
- Lists
- Links
- Images
- Tables
- Blockquotes

> This is a blockquote

## Features

- ✅ Dynamic loading from markdown files
- 📅 Automatic sorting by date (newest first)
- 🏷️ Category-based organization  
- 📸 Rich image support
- 📝 Full markdown formatting
- 🔍 SEO-friendly URLs
```

## Adding New News Articles

To add a new news article:

1. Create a new `.md` file in `src/content/news/`
2. Name it with the current date: `YYYY-MM-DD-article-slug.md`
3. Add the frontmatter with required fields
4. Write your article content in markdown
5. The article will automatically appear on the news page

## Supported Categories

- Customer Validation
- Technology  
- Company News
- Honorary Mentions

## Features

- **Rich Content**: Full markdown support with images, tables, lists, etc.
- **Automatic Sorting**: News items are automatically sorted by date (newest first)
- **Responsive Design**: Works on all device sizes
- **Search & Filter**: Easy navigation and categorization
- **SEO Friendly**: Clean URLs and proper metadata

## Future Enhancements

The system is designed to be easily extensible with features like:
- Search functionality
- Tag-based filtering
- RSS feed generation
- Email notifications
- Admin interface for content management

## Email System Setup with EmailJS

The website now uses a hybrid email system combining EmailJS and Web3Forms:
- **EmailJS (Free - 200 emails/month)**: Contact forms, newsletter, confirmations
- **Web3Forms (Completely Free)**: Career applications with file uploads
- **Smart email routing**: Different emails for different purposes

### Setup Steps:

## Complete Free Email Solution

### 1. EmailJS Setup (Free - 200 emails/month)
- Create account at [emailjs.com](https://emailjs.com)
- Add your email service (Gmail, Outlook, etc.)
- Create 2 templates with IDs: `template_8ex3j33` and `template_e4oorbp`
- Get your Service ID and Public Key

### 2. Web3Forms Setup (Completely Free)
- Go to [web3forms.com](https://web3forms.com)
- Enter career@saherflow.com and get access key
- Supports unlimited emails and file uploads

### 3. Update Configuration
Replace these values in `src/utils/emailService.ts`:
```typescript
const EMAILJS_SERVICE_ID = 'service_yu0nzx3';
const EMAILJS_PUBLIC_KEY = 'B4GXKUs8SowruUqKW';
```

And in career application section:
```typescript
adminFormData.append('access_key', 'c3660cda-6910-4f7d-ad61-881517115e4a');
```

### How It Works:

### Email Flow:

**1. Contact Forms:**
- User submits → You receive at contact@saherflow.com
- User gets instant confirmation email
- Handles: General inquiries, sales, technical support

**2. Newsletter Subscription:**
- User subscribes → Checks for duplicates
- If new: Welcome email sent + admin notification
- If duplicate: "Already subscribed" message
- Auto-notifications when new articles published

**3. Career Applications:**
- User applies → Resume sent to career@saherflow.com
- User gets confirmation email
- Supports file uploads (PDF, DOC, DOCX)

**4. Auto Article Notifications:**
- System checks for new articles every 5 minutes
- Automatically emails all subscribers
- Works for both news and blog posts
- Tracks what's already been sent

### Features:

- ✅ **Completely Free**: No monthly costs, no server required
- 📧 **Smart Email Routing**: Different emails for different purposes
- 🔔 **Auto Notifications**: Subscribers get notified of new content
- 📎 **File Support**: Resume uploads for job applications
- 🛡️ **Duplicate Prevention**: Won't spam existing subscribers
- 📱 **Mobile Friendly**: All forms work on mobile
- 🎯 **Instant Confirmations**: Users get immediate feedback
- 🔄 **Error Handling**: Graceful failure handling

### Email Addresses Used:
- **contact@saherflow.com**: Contact forms, newsletter admin notifications
- **career@saherflow.com**: Job applications with resumes

### Limits:
- **EmailJS**: 200 emails/month (free tier)
- **Web3Forms**: Unlimited emails and files (completely free)
- **Combined**: Handles all your needs without cost

### What Happens:

1. **Contact Form**: User message → contact@saherflow.com + user confirmation
2. **Newsletter**: Welcome email + admin notification + auto article alerts  
3. **Job Application**: Resume → career@saherflow.com + applicant confirmation
4. **New Articles**: Auto-email to all subscribers (news & blogs)

This solution gives you enterprise-level email functionality completely free!

### Newsletter Features:

- ✅ **Multi-variant subscription forms** (default, compact, footer)
- 📧 **Automatic welcome emails** for new subscribers
- 🔔 **Auto-notifications** when new articles are published
- 📊 **Subscription preferences** (product updates, industry news, etc.)
- 📱 **Mobile-responsive** subscription forms
- 🛡️ **Privacy protection** and easy unsubscribe
- 📈 **Subscriber analytics** and management
- 🎯 **Targeted content** based on preferences
- 📅 **Monthly digest** capability
- 🔄 **Confirmation emails** for all actions

### Email Templates:

The system supports various email templates:
- **Welcome Email**: Sent immediately after subscription
- **New Article Notification**: Sent when new content is published
- **Monthly Digest**: Curated monthly newsletter
- **Unsubscribe Confirmation**: Sent when users unsubscribe

### Subscription Management:

- **Automatic Detection**: New articles trigger subscriber notifications
- **Preference Management**: Users can choose content types
- **Easy Unsubscribe**: One-click unsubscribe with feedback collection
- **Resubscribe Option**: Users can easily resubscribe
- **Privacy Compliant**: GDPR-friendly subscription handling

### Integration Points:

1. **News Page**: Auto-notifies subscribers when new articles are detected
2. **Footer**: Compact subscription form on every page
3. **Dedicated Subscribe Page**: Full-featured subscription with preferences
4. **Unsubscribe Page**: Handles unsubscribe requests with feedback

### Setup Steps:

1. Create 3 forms in Formspree:
   - Newsletter subscriptions
   - Article notifications  
   - Unsubscribe requests

2. Update form IDs in the respective components

3. Configure email templates and autoresponders in Formspree

4. Set up email marketing integrations (optional)

5. Test the complete subscription flow

### Advanced Features:

- **Subscriber Segmentation**: Different content for different preferences
- **A/B Testing**: Test different subscription forms and content
- **Analytics Integration**: Track subscription rates and engagement
- **Email Marketing Integration**: Connect with Mailchimp, ConvertKit, etc.

## Job Applications Setup

The careers page also has a functional application form. To receive job applications:

1. Create a second form in your Formspree account for job applications
2. Replace the form ID in `src/pages/Careers.tsx`:
   ```typescript
   const [state, handleSubmit] = useForm("YOUR_CAREERS_FORM_ID_HERE");
   ```
3. Configure the careers form in Formspree dashboard:
   - Set up separate email notifications for HR/recruitment team
   - Configure file upload settings for resumes
   - Set up automated responses for applicants

### Job Application Features:
- ✅ Complete candidate information collection
- 📄 Resume/CV file upload support
- 📧 Automatic email notifications to HR team
- 🔄 Form validation and error handling
- 📱 Mobile-friendly application process
- 🛡️ Spam protection for applications

### Application Data Collected:
- Full name and contact information
- Phone number and current location
- Years of experience
- Position applied for
- Cover letter
- Resume/CV file attachment

This allows you to receive complete job applications with all candidate data and documents directly in your email inbox.