import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Calendar, User, ArrowRight, AlertTriangle, Shield, Globe, MessageSquare, Camera, BarChart3, Eye, Search, Loader2, RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { newsService, getTimeAgo, truncateText } from '../services/apiService';

const NewsPage = () => {
  const { colors } = useTheme();
  const [breakingNews, setBreakingNews] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [sources, setSources] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});

  const categories = useMemo(() => [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'technology', name: 'Technology', icon: BarChart3 },
    { id: 'business', name: 'Business', icon: MessageSquare },
    { id: 'health', name: 'Health', icon: Shield },
    { id: 'science', name: 'Science', icon: Camera },
    { id: 'sports', name: 'Sports', icon: Eye }
  ], []);

  const trendingTopics = [
    { name: "AI Content Moderation", trend: "+45%", icon: BarChart3 },
    { name: "Digital Safety Laws", trend: "+32%", icon: Shield },
    { name: "Deepfake Detection", trend: "+67%", icon: Camera },
    { name: "Online Harassment", trend: "+28%", icon: MessageSquare },
    { name: "Platform Accountability", trend: "+41%", icon: Globe }
  ];

  const loadCategoryCounts = useCallback(async () => {
    const counts = {};
    for (const category of categories) {
      try {
        const result = await newsService.getTopHeadlines('us', category.id === 'general' ? null : category.id, 100, 1);
        if (result.success) {
          counts[category.id] = result.totalResults || 0;
        } else {
          counts[category.id] = 0;
        }
      } catch (err) {
        counts[category.id] = 0;
      }
    }
    setCategoryCounts(counts);
  }, [categories]);

  const loadNews = useCallback(async (isLoadMore = false) => {
    setArticlesLoading(true);
    try {
      let result;
      const pageToLoad = isLoadMore ? currentPage : 1;
      
      if (searchQuery.trim()) {
        // Search mode - increase page size for more results
        result = await newsService.searchNews(searchQuery, 'publishedAt', 50, pageToLoad);
      } else {
        // Category mode - increase page size for more results
        result = await newsService.getTopHeadlines('us', selectedCategory === 'general' ? null : selectedCategory, 50, pageToLoad);
      }

      if (result.success) {
        const filteredArticles = result.articles.filter(article => 
          article.title && 
          article.description && 
          article.title !== '[Removed]' &&
          article.description !== '[Removed]' &&
          !article.title.includes('[Removed]') &&
          !article.description.includes('[Removed]')
        );

        if (isLoadMore) {
          // Append new articles to existing ones
          setNewsArticles(prev => [...prev, ...filteredArticles]);
        } else {
          // Replace articles for new search/category
          setNewsArticles(filteredArticles);
          setCurrentPage(1);
        }
        
        setTotalResults(result.totalResults);
      } else {
        setError(result.error || 'Failed to load news');
      }
    } catch (err) {
      setError('Failed to load news');
      console.error('Error loading news:', err);
    } finally {
      setArticlesLoading(false);
    }
  }, [selectedCategory, currentPage, searchQuery]);

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      // Load breaking news (top headlines)
      const breakingResult = await newsService.getTopHeadlines('us', null, 1, 1);
      if (breakingResult.success && breakingResult.articles.length > 0) {
        setBreakingNews(breakingResult.articles[0]);
      }

      // Load sources
      const sourcesResult = await newsService.getSources();
      if (sourcesResult.success) {
        setSources(sourcesResult.sources.slice(0, 10)); // Limit to 10 sources
      }

      await loadNews();
    } catch (err) {
      setError('Failed to load news data');
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(false);
    }
  }, [loadNews]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    if (currentPage === 1) {
      loadNews();
    }
  }, [selectedCategory, currentPage, loadNews]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setCurrentPage(1);
    setSelectedCategory('general');
    await loadNews(false);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setSearchQuery('');
    setNewsArticles([]);
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await loadNews(true);
  };

  const handleRefresh = () => {
    setCurrentPage(1);
    setNewsArticles([]);
    loadInitialData();
    loadCategoryCounts();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: colors.bg }}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: colors.primary }} />
          <p style={{ color: colors.textMuted }}>Loading latest news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: colors.bg }}>
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={loadInitialData} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <h1 
              className="text-5xl font-bold"
              style={{ color: colors.text }}
            >
              Latest News & Updates
            </h1>
            <Button
              onClick={handleRefresh}
              variant="ghost"
              size="sm"
              className="ml-4"
            >
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>
          <p 
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: colors.textMuted }}
          >
            Stay informed with the latest developments in technology, business, health, 
            and breaking news from around the world.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colors.bgCard,
                borderColor: colors.border,
                color: colors.text
              }}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textMuted }} />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id ? 'text-white' : ''
              }`}
              style={{
                backgroundColor: selectedCategory === category.id ? colors.primary : colors.bgCard,
                color: selectedCategory === category.id ? 'white' : colors.textMuted,
                border: `1px solid ${colors.border}`
              }}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.name} ({categoryCounts[category.id] || 0})
            </button>
          ))}
        </div>

        {/* Breaking News */}
        {breakingNews && !searchQuery && (
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <AlertTriangle 
                className="w-6 h-6 mr-3 text-red-500 animate-pulse" 
              />
              <h2 
                className="text-2xl font-bold text-red-500"
              >
                Breaking News
              </h2>
            </div>
            <Card className="overflow-hidden border-l-4 border-red-500">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img 
                    src={breakingNews.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop'} 
                    alt={breakingNews.title}
                    className="w-full h-64 lg:h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop';
                    }}
                  />
                </div>
                <div className="lg:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white"
                    >
                      Breaking News
                    </span>
                    <span className="ml-2 text-sm text-red-500 font-medium">
                      {getTimeAgo(breakingNews.publishedAt)}
                    </span>
                  </div>
                  <h2 
                    className="text-3xl font-bold mb-4 leading-tight"
                    style={{ color: colors.text }}
                  >
                    {breakingNews.title}
                  </h2>
                  <p 
                    className="text-lg mb-6 leading-relaxed"
                    style={{ color: colors.textMuted }}
                  >
                    {breakingNews.description ? truncateText(breakingNews.description, 200) : ''}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" style={{ color: colors.textMuted }} />
                        <span className="text-sm" style={{ color: colors.textMuted }}>
                          {breakingNews.source?.name || breakingNews.author || 'Unknown'}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => window.open(breakingNews.url, '_blank')}
                    >
                      Read Full Story
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="lg:flex lg:space-x-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-8">
              <h2 
                className="text-3xl font-bold"
                style={{ color: colors.text }}
              >
                {searchQuery ? `Search Results for "${searchQuery}" (${newsArticles.length})` : `Recent News (${newsArticles.length})`}
              </h2>
              {articlesLoading && (
                <Loader2 className="w-6 h-6 animate-spin" style={{ color: colors.primary }} />
              )}
            </div>

            {/* News Articles */}
            <div className="space-y-8">
              {newsArticles.map((article, index) => (
                <Card key={`${article.url}-${index}`} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={article.urlToImage || `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop&sig=${index}`} 
                        alt={article.title}
                        className="w-full h-48 md:h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop&sig=${index}`;
                        }}
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center mb-3">
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: colors.primary + '20',
                            color: colors.primary 
                          }}
                        >
                          {article.source?.name || 'News'}
                        </span>
                        <span className="ml-2 text-xs" style={{ color: colors.textMuted }}>
                          {getTimeAgo(article.publishedAt)}
                        </span>
                      </div>
                      <h3 
                        className="text-xl font-bold mb-3 leading-tight"
                        style={{ color: colors.text }}
                      >
                        {article.title}
                      </h3>
                      <p 
                        className="mb-4 leading-relaxed"
                        style={{ color: colors.textMuted }}
                      >
                        {article.description ? truncateText(article.description, 150) : ''}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm" style={{ color: colors.textMuted }}>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {article.author || article.source?.name || 'Unknown'}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(article.url, '_blank')}
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            {newsArticles.length > 0 && newsArticles.length < totalResults && (
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={articlesLoading}
                >
                  {articlesLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    `Load More News (${totalResults - newsArticles.length} remaining)`
                  )}
                </Button>
              </div>
            )}

            {/* No Results */}
            {newsArticles.length === 0 && !articlesLoading && (
              <div className="text-center py-12">
                <p style={{ color: colors.textMuted }}>
                  {searchQuery ? `No news found for "${searchQuery}"` : 'No news available at the moment.'}
                </p>
                <Button 
                  onClick={handleRefresh}
                  variant="primary"
                  className="mt-4"
                >
                  Refresh News
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 mt-12 lg:mt-0">
            {/* Trending Topics */}
            <Card className="mb-8">
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-6"
                  style={{ color: colors.text }}
                >
                  Trending Topics
                </h3>
                <div className="space-y-4">
                  {trendingTopics.map((topic) => (
                    <div 
                      key={topic.name}
                      className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
                      style={{ backgroundColor: colors.bgHover + '50' }}
                      onClick={() => {
                        setSearchQuery(topic.name);
                        handleSearch({ preventDefault: () => {} });
                      }}
                    >
                      <div className="flex items-center">
                        <topic.icon 
                          className="w-5 h-5 mr-3" 
                          style={{ color: colors.primary }} 
                        />
                        <span style={{ color: colors.text }}>{topic.name}</span>
                      </div>
                      <span 
                        className="text-sm font-medium text-green-500"
                      >
                        {topic.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* News Sources */}
            {sources.length > 0 && (
              <Card className="mb-8">
                <div className="p-6">
                  <h3 
                    className="text-xl font-bold mb-6"
                    style={{ color: colors.text }}
                  >
                    Top News Sources
                  </h3>
                  <div className="space-y-3">
                    {sources.slice(0, 8).map((source) => (
                      <div 
                        key={source.id}
                        className="flex items-center justify-between p-2 rounded cursor-pointer transition-colors"
                        style={{ backgroundColor: colors.bgHover + '30' }}
                        onClick={() => window.open(source.url, '_blank')}
                      >
                        <span className="text-sm" style={{ color: colors.text }}>
                          {source.name}
                        </span>
                        <ArrowRight className="w-4 h-4" style={{ color: colors.textMuted }} />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Quick Updates */}
            <Card>
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-6"
                  style={{ color: colors.text }}
                >
                  Quick Updates
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 pl-4" style={{ borderColor: colors.primary }}>
                    <p className="text-sm font-medium" style={{ color: colors.text }}>
                      Live News Updates Available
                    </p>
                    <p className="text-xs" style={{ color: colors.textMuted }}>
                      Updated every 15 minutes
                    </p>
                  </div>
                  <div className="border-l-4 pl-4" style={{ borderColor: colors.primary }}>
                    <p className="text-sm font-medium" style={{ color: colors.text }}>
                      Breaking News Alerts
                    </p>
                    <p className="text-xs" style={{ color: colors.textMuted }}>
                      Real-time notifications
                    </p>
                  </div>
                  <div className="border-l-4 pl-4" style={{ borderColor: colors.primary }}>
                    <p className="text-sm font-medium" style={{ color: colors.text }}>
                      Global News Coverage
                    </p>
                    <p className="text-xs" style={{ color: colors.textMuted }}>
                      150,000+ sources worldwide
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;

