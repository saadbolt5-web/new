// Subscription management utilities
import { EmailService } from './emailService';

export interface Subscriber {
  email: string;
  preferences: {
    productUpdates: boolean;
    industryNews: boolean;
    technicalPapers: boolean;
    events: boolean;
  };
  subscribedAt: string;
  source: string;
  status: 'active' | 'unsubscribed' | 'bounced';
}

export interface NewsArticle {
  title: string;
  url: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt: string;
}

// Email templates for different notification types
export const emailTemplates = {
  welcomeEmail: (email: string) => ({
    subject: 'Welcome to Saher Flow Solutions Newsletter!',
    template: 'welcome',
    data: {
      email,
      companyName: 'Saher Flow Solutions',
      unsubscribeUrl: `${window.location.origin}/unsubscribe?email=${encodeURIComponent(email)}`,
      websiteUrl: window.location.origin,
    }
  }),

  newArticleNotification: (article: NewsArticle, subscriber: Subscriber) => ({
    subject: `New Article: ${article.title}`,
    template: 'new_article',
    data: {
      subscriberEmail: subscriber.email,
      articleTitle: article.title,
      articleUrl: `${window.location.origin}${article.url}`,
      articleExcerpt: article.excerpt,
      articleImage: article.image,
      articleCategory: article.category,
      publishedAt: article.publishedAt,
      unsubscribeUrl: `${window.location.origin}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`,
      websiteUrl: window.location.origin,
    }
  }),

  monthlyDigest: (articles: NewsArticle[], subscriber: Subscriber) => ({
    subject: 'Monthly Newsletter - Latest Updates from Saher Flow Solutions',
    template: 'monthly_digest',
    data: {
      subscriberEmail: subscriber.email,
      articles: articles.slice(0, 5), // Top 5 articles
      monthYear: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      unsubscribeUrl: `${window.location.origin}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`,
      websiteUrl: window.location.origin,
    }
  }),

  unsubscribeConfirmation: (email: string) => ({
    subject: 'You have been unsubscribed from Saher Flow Solutions Newsletter',
    template: 'unsubscribe_confirmation',
    data: {
      email,
      resubscribeUrl: `${window.location.origin}/subscribe`,
      websiteUrl: window.location.origin,
    }
  })
};

// Subscription management functions
export class SubscriptionManager {
  private formspreeEndpoint: string;

  constructor(formspreeEndpoint: string) {
    this.formspreeEndpoint = 'mdklozew'; // Newsletter endpoint
  }

  // Send welcome email to new subscriber
  async sendWelcomeEmail(email: string, preferences: Subscriber['preferences']) {
    const template = emailTemplates.welcomeEmail(email);
    
    const formData = new FormData();
    formData.append('type', 'welcome_email');
    formData.append('email', email);
    formData.append('preferences', JSON.stringify(preferences));
    formData.append('subject', template.subject);
    formData.append('template', template.template);
    formData.append('data', JSON.stringify(template.data));
    formData.append('_subject', `Welcome Email: ${email}`);

    try {
      const response = await fetch(`https://formspree.io/f/mdklozew`, {
        method: 'POST',
        body: formData,
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      return false;
    }
  }

  // Notify all subscribers about new article
  async notifyNewArticle(article: NewsArticle) {
    const formData = new FormData();
    formData.append('type', 'new_article_notification');
    formData.append('articleTitle', article.title);
    formData.append('articleUrl', article.url);
    formData.append('articleExcerpt', article.excerpt);
    formData.append('articleImage', article.image);
    formData.append('articleCategory', article.category);
    formData.append('publishedAt', article.publishedAt);
    formData.append('_subject', `New Article Notification: ${article.title}`);

    try {
      const response = await fetch(`https://formspree.io/f/${this.formspreeEndpoint}`, {
        method: 'POST',
        body: formData,
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to send article notification:', error);
      return false;
    }
  }

  // Send monthly digest
  async sendMonthlyDigest(articles: NewsArticle[]) {
    const formData = new FormData();
    formData.append('type', 'monthly_digest');
    formData.append('articles', JSON.stringify(articles));
    formData.append('monthYear', new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
    formData.append('_subject', 'Monthly Newsletter Digest');

    try {
      const response = await fetch(`https://formspree.io/f/${this.formspreeEndpoint}`, {
        method: 'POST',
        body: formData,
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to send monthly digest:', error);
      return false;
    }
  }

  // Handle unsubscribe request
  async handleUnsubscribe(email: string) {
    const template = emailTemplates.unsubscribeConfirmation(email);
    
    const formData = new FormData();
    formData.append('type', 'unsubscribe');
    formData.append('email', email);
    formData.append('unsubscribedAt', new Date().toISOString());
    formData.append('subject', template.subject);
    formData.append('_subject', `Unsubscribe Request: ${email}`);

    try {
      const response = await fetch(`https://formspree.io/f/${this.formspreeEndpoint}`, {
        method: 'POST',
        body: formData,
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to process unsubscribe:', error);
      return false;
    }
  }
}

// Hook for subscription management
export const useSubscriptionManager = (formspreeEndpoint: string) => {
  const manager = new SubscriptionManager(formspreeEndpoint);
  
  return {
    sendWelcomeEmail: manager.sendWelcomeEmail.bind(manager),
    notifyNewArticle: manager.notifyNewArticle.bind(manager),
    sendMonthlyDigest: manager.sendMonthlyDigest.bind(manager),
    handleUnsubscribe: manager.handleUnsubscribe.bind(manager),
  };
};

// Auto-notification system for new articles
export const useAutoNotification = () => {
  const [isNotifying, setIsNotifying] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const notifySubscribers = async (article: NewsArticle) => {
    setIsNotifying(true);
    setNotificationStatus('idle');
    
    try {
      // In a real implementation, you would:
      // 1. Get list of subscribers from your database
      // 2. Send email to each subscriber
      // For now, we'll just log that the system is ready
      
      console.log('Article notification system triggered for:', article.title);
      console.log('In production, this would send emails to all subscribers');
      
      // Example of how you would send to subscribers:
      // const subscribers = await getSubscribersList(); // You need to implement this
      // for (const subscriber of subscribers) {
      //   await EmailService.sendNewArticleNotification(
      //     subscriber.email,
      //     article.title,
      //     article.excerpt,
      //     article.url,
      //     subscriber.name
      //   );
      // }
      
      setNotificationStatus('success');
    } catch (error) {
      console.error('Failed to notify subscribers:', error);
      setNotificationStatus('error');
    } finally {
      setIsNotifying(false);
    }
  };
  
  return { 
    notifySubscribers, 
    isNotifying, 
    notificationStatus 
  };
};
// Helper function to get subscribers list (you need to implement this)
// This could connect to your database, CRM, or email service
export const getSubscribersList = async (): Promise<Subscriber[]> => {
  // TODO: Implement subscriber storage and retrieval
  // This could be:
  // - A database (Firebase, Supabase, etc.)
  // - A file-based storage
  // - Integration with email service (Mailchimp, ConvertKit, etc.)
  
  console.warn('getSubscribersList not implemented - returning empty array');
  return [];
};

// Helper function to add subscriber to list
export const addSubscriber = async (subscriber: Omit<Subscriber, 'subscribedAt' | 'status'>): Promise<boolean> => {
  // TODO: Implement subscriber storage
  // This should save the subscriber to your chosen storage solution
  
  console.log('New subscriber to be stored:', subscriber);
  console.warn('addSubscriber not implemented - subscriber not stored');
  return true;
};