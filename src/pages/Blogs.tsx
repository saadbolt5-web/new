import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Tag, User, Clock, Search, Filter, Share2, Eye, BookOpen, TrendingUp, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { loadAllBlogs, getBlogCategories, getBlogTags, getBlogsByCategory, getBlogsByTag, searchBlogs, BlogArticle } from '../utils/blogLoader';
import SEOHead from '../components/SEOHead';
import { AutoNotificationService } from '../utils/autoNotificationService';

// SEO Component for structured data
const BlogStructuredData: React.FC<{ articles: BlogArticle[] }> = ({ articles }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Saher Flow Solutions Blog",
    "description": "Expert insights on multiphase flow measurement, oil & gas technology, and industry innovations",
    "url": `${window.location.origin}/blogs`,
    "blogPost": articles.slice(0, 10).map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.excerpt,
      "image": article.image,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Saher Flow Solutions"
      },
      "datePublished": article.date,
      "url": `${window.location.origin}/blogs/${article.slug}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

const Blogs: React.FC = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<BlogArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const articlesPerPage = 6;

  // Load blog data
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        const [blogArticles, blogCategories, blogTags] = await Promise.all([
          loadAllBlogs(),
          getBlogCategories(),
          getBlogTags()
        ]);
        
        setArticles(blogArticles);
        setCategories(blogCategories);
        setTags(blogTags);
        setFilteredArticles(blogArticles);
        
        // Check for article hash in URL
        const hash = window.location.hash.substring(1);
        if (hash) {
          const article = blogArticles.find(a => a.slug === hash || a.id === hash);
          if (article) {
            setSelectedArticle(article);
          }
        }
        
        // Trigger auto-notification check
        AutoNotificationService.checkForNewContent();
        
      } catch (err) {
        console.error('Error loading blogs:', err);
        setError(`Failed to load blog articles: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, []);

  // Filter articles based on category, tag, and search
  useEffect(() => {
    const filterArticles = async () => {
      try {
        let filtered = articles;

        // Apply search filter
        if (searchQuery.trim()) {
          filtered = await searchBlogs(searchQuery);
        }

        // Apply category filter
        if (selectedCategory !== 'All') {
          filtered = await getBlogsByCategory(selectedCategory);
        }

        // Apply tag filter
        if (selectedTag) {
          const tagFiltered = await getBlogsByTag(selectedTag);
          filtered = filtered.filter(article => 
            tagFiltered.some(tagArticle => tagArticle.slug === article.slug)
          );
        }

        // If both search and filters are applied, intersect the results
        if (searchQuery.trim() && (selectedCategory !== 'All' || selectedTag)) {
          const searchResults = await searchBlogs(searchQuery);
          filtered = filtered.filter(article => 
            searchResults.some(searchArticle => searchArticle.slug === article.slug)
          );
        }

        setFilteredArticles(filtered);
        setCurrentPage(1);
      } catch (err) {
        console.error('Error filtering articles:', err);
      }
    };

    if (articles.length > 0) {
      filterArticles();
    }
  }, [selectedCategory, selectedTag, searchQuery, articles]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareArticle = async (article: BlogArticle) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: `${window.location.origin}/blogs/${article.slug}`
        });
      } catch (err) {
        console.log('Share was cancelled');
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(`${window.location.origin}/blogs/${article.slug}`);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedTag('');
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-navy-600 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto"></div>
          </div>
          <p className="text-navy-600 dark:text-white font-medium mt-4">Loading blog articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error Loading Blogs</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-navy-600 text-white px-6 py-2 rounded-lg hover:bg-navy-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <>
      <SEOHead
        title="Expert Blog | Flow Measurement Technology Insights | Saher Flow Solutions"
        description="Expert insights on multiphase flow measurement, oil & gas technology, digital transformation, and industry innovations from Saher Flow Solutions team of experts."
        keywords="flow measurement blog, oil gas technology blog, multiphase flow insights, DMOR technology blog, digital transformation oil gas, Saudi Vision 2030, petroleum engineering blog"
        url="/blogs"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Saher Flow Solutions Expert Blog",
          "description": "Expert insights on multiphase flow measurement and oil & gas technology",
          "url": "https://saherflow.com/blogs",
          "publisher": {
            "@type": "Organization",
            "name": "Saher Flow Solutions"
          },
          "blogPost": articles.slice(0, 10).map(article => ({
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.excerpt,
            "image": article.image,
            "author": {
              "@type": "Person",
              "name": article.author,
              "jobTitle": article.authorTitle
            },
            "datePublished": article.date,
            "url": `https://saherflow.com/blogs/${article.slug}`,
            "publisher": {
              "@type": "Organization",
              "name": "Saher Flow Solutions"
            }
          }))
        }}
      />
      <BlogStructuredData articles={articles} />
      
      {/* SEO Meta Tags */}
      <div className="sr-only">
        <h1>Saher Flow Solutions Blog - Expert Insights on Flow Measurement Technology</h1>
        <meta name="description" content="Read expert insights on multiphase flow measurement, oil & gas technology, digital transformation, and industry innovations from Saher Flow Solutions." />
        <meta name="keywords" content="flow measurement blog, oil gas technology, multiphase flow, DMOR technology, digital transformation, Saudi Vision 2030" />
      </div>

      <section id="blogs" className="pt-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
              
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Expert Insights &
                  <span className="block text-yellow-400">Industry Blog</span>
                </h1>
                
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-6 sm:mb-8">
                Deep dive into flow measurement technology, industry trends, and innovation insights from our team of experts
              </p>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300 text-sm sm:text-base">Weekly Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300 text-sm sm:text-base">{articles.length} Articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300 text-sm sm:text-base">Expert Authors</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 shadow-md sticky top-16 z-40 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
       

              {/* Filters */}
              <div className="flex flex-wrap gap-3 items-center">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Tag Filter */}
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-navy-500 dark:focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">All Tags</option>
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>

                {/* Clear Filters */}
                {(selectedCategory !== 'All' || selectedTag || searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-navy-600 dark:hover:text-yellow-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategory !== 'All' || selectedTag || searchQuery) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {searchQuery && (
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                    Search: "{searchQuery}"
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedTag && (
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 px-3 py-1 rounded-full text-sm">
                    Tag: {selectedTag}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchQuery || selectedCategory !== 'All' || selectedTag
                    ? 'Try adjusting your search criteria or filters.'
                    : 'No blog articles are available at the moment.'
                  }
                </p>
                {(searchQuery || selectedCategory !== 'All' || selectedTag) && (
                  <button
                    onClick={clearFilters}
                    className="bg-navy-600 text-white px-6 py-2 rounded-lg hover:bg-navy-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                  {currentArticles.map((article, index) => (
                    <article
                      key={article.id || article.slug}
                      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-[1.02] cursor-pointer"
                      onClick={() => setSelectedArticle(article)}
                    >
                      {/* Image */}
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={handleImageError}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-navy-900 dark:text-white px-3 py-1.5 rounded-full text-sm font-medium">
                            {article.category}
                          </div>
                        </div>

                        {/* Featured Badge */}
                        {article.featured && (
                          <div className="absolute top-4 right-4">
                            <div className="bg-yellow-500 text-navy-900 px-2 py-1 rounded-full text-xs font-bold">
                              FEATURED
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Meta */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={article.date} className="text-sm">
                              {formatDate(article.date)}
                            </time>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{article.readTime}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-navy-900 dark:text-white mb-3 group-hover:text-navy-700 dark:group-hover:text-yellow-400 transition-colors duration-200 line-clamp-2">
                          {article.title}
                        </h2>

                        {/* Author */}
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src={article.authorImage}
                            alt={article.author}
                            className="w-8 h-8 rounded-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150';
                            }}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{article.author}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{article.authorTitle}</div>
                          </div>
                        </div>

                        {/* Excerpt */}
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags?.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Read More */}
                        <div className="flex items-center justify-between">
                          <button className="flex items-center gap-2 text-navy-600 dark:text-yellow-400 font-semibold hover:text-yellow-500 transition-colors duration-200 text-sm group-hover:gap-3">
                            Read Article <ArrowRight className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              shareArticle(article);
                            }}
                            className="text-gray-400 hover:text-navy-600 dark:hover:text-yellow-400 transition-colors"
                            title="Share article"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5 text-navy-900 dark:text-white" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`w-10 h-10 rounded-full transition-all duration-300 ${
                            currentPage === index + 1
                              ? 'bg-navy-600 text-white'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5 text-navy-900 dark:text-white" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-navy-900 to-navy-800 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Stay Updated with Our Latest Insights</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Subscribe to our newsletter and never miss expert insights on flow measurement technology and industry trends
            </p>
            
          </div>
        </div>

        {/* Article Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-t-2xl"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-2xl"></div>
                
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white p-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors backdrop-blur-sm"
                >
                  <X size={24} />
                </button>

                {/* Article Meta on Image */}
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {selectedArticle.category}
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={selectedArticle.date}>
                        {formatDate(selectedArticle.date)}
                      </time>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <Clock className="w-4 h-4" />
                      <span>{selectedArticle.readTime}</span>
                    </div>
                  </div>
                  
                  <h1 className="text-2xl lg:text-4xl font-bold text-white leading-tight">
                    {selectedArticle.title}
                  </h1>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <img
                    src={selectedArticle.authorImage}
                    alt={selectedArticle.author}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150';
                    }}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-navy-900 dark:text-white">{selectedArticle.author}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedArticle.authorTitle}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedArticle.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Article Content */}
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-navy-900 dark:prose-headings:text-white prose-a:text-navy-600 dark:prose-a:text-yellow-400 prose-strong:text-navy-900 dark:prose-strong:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />
                <style jsx>{`
                  .prose {
                    line-height: 1.8;
                  }
                  .prose h1 {
                    font-size: 2.5rem;
                    font-weight: 800;
                    margin-top: 2rem;
                    margin-bottom: 1.5rem;
                    color: #1a3a5c;
                  }
                  .prose h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: #1a3a5c;
                    border-bottom: 2px solid #ffd500;
                    padding-bottom: 0.5rem;
                  }
                  .prose h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                    color: #1a3a5c;
                  }
                  .prose p {
                    margin-bottom: 1.5rem;
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #374151 !important;
                  }
                  .dark .prose p {
                    color: #d1d5db !important;
                  }
                  .prose ul, .prose ol {
                    margin: 1.5rem 0;
                    padding-left: 2rem;
                  }
                  .prose li {
                    margin-bottom: 0.75rem;
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: #374151 !important;
                  }
                  .dark .prose li {
                    color: #d1d5db !important;
                  }
                  .prose blockquote {
                    border-left: 4px solid #ffd500;
                    background: #f9fafb;
                    padding: 1.5rem 2rem;
                    margin: 2rem 0;
                    font-style: italic;
                    font-size: 1.2rem;
                    color: #1a3a5c;
                  }
                  .prose table {
                    width: 100%;
                    margin: 2rem 0;
                    border-collapse: collapse;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    border-radius: 0.5rem;
                    overflow: hidden;
                  }
                  .prose th {
                    background: #1a3a5c;
                    color: white;
                    padding: 1rem;
                    text-align: left;
                    font-weight: 600;
                  }
                  .prose td {
                    padding: 1rem;
                    border-bottom: 1px solid #e5e7eb;
                    color: #374151 !important;
                  }
                  .dark .prose td {
                    color: #d1d5db !important;
                  }
                  .prose tr:nth-child(even) {
                    background: #f9fafb;
                  }
                  .prose code {
                    background: #f3f4f6;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-family: 'Monaco', 'Menlo', monospace;
                    font-size: 0.9rem;
                    color: #1a3a5c;
                  }
                  .prose pre {
                    background: #1f2937;
                    color: #f9fafb;
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin: 2rem 0;
                  }
                  .prose img {
                    border-radius: 0.5rem;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                    margin: 2rem 0;
                  }
                  .prose a {
                    color: #1a3a5c;
                    text-decoration: underline;
                    text-decoration-color: #ffd500;
                    text-underline-offset: 3px;
                    font-weight: 500;
                  }
                  .prose a:hover {
                    color: #ffd500;
                  }
                  .dark .prose h1,
                  .dark .prose h2,
                  .dark .prose h3 {
                    color: white !important;
                  }
                  .dark .prose blockquote {
                    background: #374151;
                    color: #f9fafb !important;
                  }
                  .dark .prose th {
                    background: #374151;
                  }
                  .dark .prose tr:nth-child(even) {
                    background: #374151;
                  }
                  .dark .prose code {
                    background: #374151;
                    color: #ffd500;
                  }
                `}</style>

                {/* Share Actions */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 dark:text-gray-400">Share this article:</span>
                    <button
                      onClick={() => shareArticle(selectedArticle)}
                      className="flex items-center gap-2 text-navy-600 dark:text-yellow-400 hover:text-navy-700 dark:hover:text-yellow-300 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedArticle.readTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Blogs;