// Auto-notification service for new articles
import { EmailService } from './emailService';
import { loadAllNews } from './newsLoader';
import { loadAllBlogs } from './blogLoader';

export class AutoNotificationService {
  private static lastNewsCheck: string[] = [];
  private static lastBlogCheck: string[] = [];
  private static isInitialized = false;

  /**
   * Initialize the service
   */
  static initialize(): void {
    if (this.isInitialized) return;

    try {
      // Load previously notified articles
      const storedNews = localStorage.getItem('saher_notified_news');
      const storedBlogs = localStorage.getItem('saher_notified_blogs');
      
      this.lastNewsCheck = storedNews ? JSON.parse(storedNews) : [];
      this.lastBlogCheck = storedBlogs ? JSON.parse(storedBlogs) : [];
      
      console.log('Auto-notification service initialized');
      console.log(`Previously notified: ${this.lastNewsCheck.length} news, ${this.lastBlogCheck.length} blogs`);
      
      this.isInitialized = true;
      
      // Start periodic checks
      this.startPeriodicChecks();
    } catch (error) {
      console.error('Failed to initialize auto-notification service:', error);
    }
  }

  /**
   * Start periodic checks for new content
   */
  private static startPeriodicChecks(): void {
    // Check every 5 minutes
    setInterval(() => {
      this.checkForNewContent();
    }, 5 * 60 * 1000);

    // Initial check after 10 seconds
    setTimeout(() => {
      this.checkForNewContent();
    }, 10000);
  }

  /**
   * Check for new articles and notify subscribers
   */
  static async checkForNewContent(): Promise<void> {
    try {
      console.log('Checking for new content...');
      
      // Check news
      const news = await loadAllNews();
      const newNewsArticles = news.filter(article => {
        const articleId = article.id || article.slug;
        return !this.lastNewsCheck.includes(articleId) && this.isRecentArticle(article.date);
      });

      // Check blogs
      const blogs = await loadAllBlogs();
      const newBlogArticles = blogs.filter(article => {
        const articleId = article.id || article.slug;
        return !this.lastBlogCheck.includes(articleId) && this.isRecentArticle(article.date);
      });

      // Notify about new news articles
      for (const article of newNewsArticles) {
        console.log(`Found new news article: ${article.title}`);
        await this.notifySubscribers({
          title: article.title,
          excerpt: article.excerpt,
          url: `/news#${article.slug}`,
          type: 'news'
        });
        
        const articleId = article.id || article.slug;
        this.lastNewsCheck.push(articleId);
      }

      // Notify about new blog articles
      for (const article of newBlogArticles) {
        console.log(`Found new blog article: ${article.title}`);
        await this.notifySubscribers({
          title: article.title,
          excerpt: article.excerpt,
          url: `/blogs#${article.slug}`,
          type: 'blog'
        });
        
        const articleId = article.id || article.slug;
        this.lastBlogCheck.push(articleId);
      }

      // Save updated lists
      if (newNewsArticles.length > 0) {
        localStorage.setItem('saher_notified_news', JSON.stringify(this.lastNewsCheck));
      }
      if (newBlogArticles.length > 0) {
        localStorage.setItem('saher_notified_blogs', JSON.stringify(this.lastBlogCheck));
      }

      if (newNewsArticles.length > 0 || newBlogArticles.length > 0) {
        console.log(`Notification check complete: ${newNewsArticles.length} news, ${newBlogArticles.length} blogs notified`);
      }

    } catch (error) {
      console.error('Error checking for new content:', error);
    }
  }

  /**
   * Check if article is recent (within last 7 days)
   */
  private static isRecentArticle(dateString: string): boolean {
    const articleDate = new Date(dateString);
    const now = new Date();
    const daysDiff = (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  }

  /**
   * Notify subscribers about new article
   */
  private static async notifySubscribers(article: {
    title: string;
    excerpt: string;
    url: string;
    type: 'news' | 'blog';
  }): Promise<void> {
    try {
      const result = await EmailService.notifySubscribersNewArticle(article);
      console.log(`Notified ${result.success} subscribers about: ${article.title}`);
      
      if (result.failed > 0) {
        console.warn(`Failed to notify ${result.failed} subscribers`);
      }
    } catch (error) {
      console.error('Failed to notify subscribers:', error);
    }
  }

  /**
   * Manually trigger notification for specific article
   */
  static async manualNotify(article: {
    title: string;
    excerpt: string;
    url: string;
    type: 'news' | 'blog';
  }): Promise<boolean> {
    try {
      await this.notifySubscribers(article);
      
      // Mark as notified
      const articleId = article.url.split('#')[1] || article.title.toLowerCase().replace(/\s+/g, '-');
      if (article.type === 'news') {
        this.lastNewsCheck.push(articleId);
        localStorage.setItem('saher_notified_news', JSON.stringify(this.lastNewsCheck));
      } else {
        this.lastBlogCheck.push(articleId);
        localStorage.setItem('saher_notified_blogs', JSON.stringify(this.lastBlogCheck));
      }
      
      return true;
    } catch (error) {
      console.error('Manual notification failed:', error);
      return false;
    }
  }

  /**
   * Get notification statistics
   */
  static getStats() {
    return {
      notifiedNews: this.lastNewsCheck.length,
      notifiedBlogs: this.lastBlogCheck.length,
      totalNotified: this.lastNewsCheck.length + this.lastBlogCheck.length,
      isInitialized: this.isInitialized
    };
  }

  /**
   * Reset notification history (for testing)
   */
  static reset(): void {
    this.lastNewsCheck = [];
    this.lastBlogCheck = [];
    localStorage.removeItem('saher_notified_news');
    localStorage.removeItem('saher_notified_blogs');
    console.log('Auto-notification service reset');
  }
}

// Initialize when module loads
AutoNotificationService.initialize();