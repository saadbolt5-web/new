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
        to_email: 'contact@saherflow.com',
        reply_to: formData.email,
        subject: `New Contact Form Submission from ${formData.name}`,
      };

      // Template parameters for user auto-reply
      const userTemplateParams = {
        to_name: formData.name,
        to_email: formData.email,
        from_name: 'Saher Flow Solutions',
        user_message: formData.message,
        department: formData.department,
      };

      // Send admin notification
      console.log('Sending admin notification...');
      const adminResponse = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_CONTACT,
        adminTemplateParams
      );

      // Send user auto-reply
      console.log('Sending user auto-reply...');
      const userResponse = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_AUTO_REPLY,
        userTemplateParams
      );

      console.log('Admin notification sent:', adminResponse);
      console.log('User auto-reply sent:', userResponse);

      return { 
        success: adminResponse?.status === 200 && userResponse?.status === 200 
      };
    } catch (error) {
      console.error('Failed to send contact form:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

export const validateEmailJSConfig = (): boolean => {
  return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID_CONTACT && EMAILJS_TEMPLATE_ID_AUTO_REPLY && EMAILJS_PUBLIC_KEY);
};