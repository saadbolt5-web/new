// EmailJS service for contact form only
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_78g1aha';
const EMAILJS_TEMPLATE_ID_CONTACT = 'template_zodftxu'; // Admin notification
const EMAILJS_TEMPLATE_ID_AUTO_REPLY = 'template_fqz6jme'; // User auto-reply
const EMAILJS_PUBLIC_KEY = 'YlRIA-4TEOH3k-NgJ';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export class EmailService {
  /**
   * Send contact form submission to admin and auto-reply to user
   */
  static async sendContactForm(formData: {
    name: string;
    email: string;
    department: string;
    message: string;
    phone?: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      // Template parameters for admin notification
      const adminTemplateParams = {
        from_name: formData.name,
        from_email: formData.email,
        department: formData.department,
        message: formData.message,
        phone: formData.phone || 'Not provided',
      };

      // Template parameters for user auto-reply
      const userTemplateParams = {
        to_name: formData.name,
        to_email: formData.email,
        user_message: formData.message,
        department: formData.department,
      };

      console.log('Sending admin notification with params:', adminTemplateParams);
      console.log('Sending user auto-reply with params:', userTemplateParams);

      // Send admin notification
      const adminResponse = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_CONTACT,
        adminTemplateParams
      );

      console.log('Admin notification sent successfully:', adminResponse);

      // Send user auto-reply
      const userResponse = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_AUTO_REPLY,
        userTemplateParams
      );

      console.log('User auto-reply sent successfully:', userResponse);

      return { 
        success: adminResponse?.status === 200 && userResponse?.status === 200 
      };
    } catch (error) {
      console.error('Failed to send contact form:', error);
      
      // More detailed error logging
      if (error && typeof error === 'object' && 'text' in error) {
        console.error('EmailJS Error Details:', error.text);
      }
      
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send email. Please check your EmailJS configuration.' 
      };
    }
  }

  /**
   * Send welcome email to new subscriber (placeholder for newsletter functionality)
   */
  static async sendWelcomeEmail(email: string): Promise<boolean> {
    console.log('Welcome email functionality not implemented yet for:', email);
    return true; // Return true to avoid breaking the newsletter subscription flow
  }

  /**
   * Notify subscribers about new article (placeholder for newsletter functionality)
   */
  static async notifySubscribersNewArticle(article: {
    title: string;
    excerpt: string;
    url: string;
    type: 'news' | 'blog';
  }): Promise<{ success: number; failed: number }> {
    console.log('Article notification functionality not implemented yet for:', article.title);
    return { success: 0, failed: 0 }; // Return empty result to avoid breaking the notification flow
  }

  /**
   * Notify all subscribers (placeholder for newsletter functionality)
   */
  static async notifyAllSubscribers(
    title: string,
    excerpt: string,
    url: string,
    subscriberEmails: string[],
    author: string,
    publishedDate: string
  ): Promise<{ success: number; failed: number }> {
    console.log('Bulk notification functionality not implemented yet for:', title);
    return { success: 0, failed: 0 }; // Return empty result to avoid breaking the notification flow
  }
}

export const validateEmailJSConfig = (): boolean => {
  return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID_CONTACT && EMAILJS_TEMPLATE_ID_AUTO_REPLY && EMAILJS_PUBLIC_KEY);
};