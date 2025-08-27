import React, { useState } from 'react';
import { useForm } from '@formspree/react';
import { Bell, Send, Users, Mail } from 'lucide-react';

interface NewsNotificationSystemProps {
  articleTitle: string;
  articleUrl: string;
  articleExcerpt: string;
  articleImage: string;
}

const NewsNotificationSystem: React.FC<NewsNotificationSystemProps> = ({
  articleTitle,
  articleUrl,
  articleExcerpt,
  articleImage
}) => {
  const [state, handleSubmit] = useForm("mdklozew"); // Newsletter endpoint
  const [isNotifying, setIsNotifying] = useState(false);

  const notifySubscribers = async () => {
    setIsNotifying(true);
    
    const formData = new FormData();
    formData.append('type', 'new_article_notification');
    formData.append('articleTitle', articleTitle);
    formData.append('articleUrl', articleUrl);
    formData.append('articleExcerpt', articleExcerpt);
    formData.append('articleImage', articleImage);
    formData.append('publishedAt', new Date().toISOString());
    formData.append('_subject', `New Article Published: ${articleTitle}`);
    formData.append('_template', 'table');
    
    await handleSubmit(formData);
    setIsNotifying(false);
  };

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100">Notify Subscribers</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Send email notification to all newsletter subscribers
            </p>
          </div>
        </div>
        
        <button
          onClick={notifySubscribers}
          disabled={isNotifying || state.submitting}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isNotifying || state.submitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Notifying...
            </>
          ) : (
            <>
              <Send size={16} />
              Notify All
            </>
          )}
        </button>
      </div>
      
      {state.succeeded && (
        <div className="mt-3 text-sm text-green-700 dark:text-green-300">
          ✅ Notification sent to all subscribers!
        </div>
      )}
      
      {state.errors && state.errors.length > 0 && (
        <div className="mt-3 text-sm text-red-700 dark:text-red-300">
          ❌ Failed to send notifications. Please try again.
        </div>
      )}
    </div>
  );
};

export default NewsNotificationSystem;