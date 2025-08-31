import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Calendar, User, ArrowRight, TrendingUp, Shield, Brain, Globe, MessageSquare, BarChart3, Search, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { blogService } from '../../services/apiService';

const BlogPage = () => {
  const { colors } = useTheme();
  const [featuredPost, setFeaturedPost] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Load posts when category or page changes
  useEffect(() => {
    loadBlogPosts();
  }, [currentPage, selectedCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [featuredResult, categoriesResult] = await Promise.all([
        blogService.getFeaturedPost(),
        blogService.getCategories()
      ]);

      if (featuredResult.success) {
        setFeaturedPost(featuredResult.post);
      }

      if (categoriesResult.success) {
        setCategories(categoriesResult.categories);
      }

      await loadBlogPosts();
    } catch (err) {
      setError('Failed to load blog data');
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadBlogPosts = async () => {
    setPostsLoading(true);
    try {
      const result = await blogService.getBlogPosts(
        currentPage, 
        6, 
        selectedCategory === 'all' ? null : selectedCategory
      );

      if (result.success) {
        setBlogPosts(result.posts);
        setTotalPages(result.totalPages);
      } else {
        setError(result.error || 'Failed to load blog posts');
      }
    } catch (err) {
      setError('Failed to load blog posts');
      console.error('Error loading blog posts:', err);
    } finally {
      setPostsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setPostsLoading(true);
    try {
      const result = await blogService.searchPosts(searchQuery, 1, 6);
      
      if (result.success) {
        setBlogPosts(result.posts);
        setTotalPages(result.totalPages);
        setCurrentPage(1);
        setSelectedCategory('all');
      } else {
        setError(result.error || 'Search failed');
      }
    } catch (err) {
      setError('Search failed');
      console.error('Error searching posts:', err);
    } finally {
      setPostsLoading(false);
    }
  };

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
    setSearchQuery('');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with email: ${email}`);
      setEmail('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: colors.bg }}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: colors.primary }} />
          <p style={{ color: colors.textMuted }}>Loading blog content...</p>
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
          <h1 
            className="text-5xl font-bold mb-6"
            style={{ color: colors.text }}
          >
            Insights & Analysis
          </h1>
          <p 
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: colors.textMuted }}
          >
            Explore the latest research, trends, and insights in AI-powered content moderation, 
            digital safety, and the evolving landscape of online community protection.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colors.bgCard,
                borderColor: colors.border,
                color: colors.text,
                focusRingColor: colors.primary
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

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <Card className="overflow-hidden">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: colors.primary + '20',
                        color: colors.primary 
                      }}
                    >
                      {featuredPost.category}
                    </span>
                    <span className="ml-2 text-sm" style={{ color: colors.textMuted }}>
                      Featured
                    </span>
                  </div>
                  <h2 
                    className="text-3xl font-bold mb-4 leading-tight"
                    style={{ color: colors.text }}
                  >
                    {featuredPost.title}
                  </h2>
                  <p 
                    className="text-lg mb-6 leading-relaxed"
                    style={{ color: colors.textMuted }}
                  >
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" style={{ color: colors.textMuted }} />
                        <span className="text-sm" style={{ color: colors.textMuted }}>
                          {featuredPost.author}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" style={{ color: colors.textMuted }} />
                        <span className="text-sm" style={{ color: colors.textMuted }}>
                          {featuredPost.date}
                        </span>
                      </div>
                      <span className="text-sm" style={{ color: colors.textMuted }}>
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <Button variant="primary" size="sm">
                      Read More
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
                Latest Articles
              </h2>
              {postsLoading && (
                <Loader2 className="w-6 h-6 animate-spin" style={{ color: colors.primary }} />
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all' ? 'text-white' : ''
                }`}
                style={{
                  backgroundColor: selectedCategory === 'all' ? colors.primary : colors.bgCard,
                  color: selectedCategory === 'all' ? 'white' : colors.textMuted,
                  border: `1px solid ${colors.border}`
                }}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.slug ? 'text-white' : ''
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.slug ? colors.primary : colors.bgCard,
                    color: selectedCategory === category.slug ? 'white' : colors.textMuted,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Blog Posts */}
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover"
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
                          {post.category}
                        </span>
                      </div>
                      <h3 
                        className="text-xl font-bold mb-3 leading-tight"
                        style={{ color: colors.text }}
                      >
                        {post.title}
                      </h3>
                      <p 
                        className="mb-4 leading-relaxed"
                        style={{ color: colors.textMuted }}
                      >
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm" style={{ color: colors.textMuted }}>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.date}
                          </div>
                          <span>{post.readTime}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "primary" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 mt-12 lg:mt-0">
            {/* Categories */}
            <Card className="mb-8">
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-6"
                  style={{ color: colors.text }}
                >
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => {
                    const IconComponent = {
                      'ai-technology': Brain,
                      'community-safety': Shield,
                      'machine-learning': BarChart3,
                      'psychology': MessageSquare,
                      'policy-law': Globe,
                      'threat-analysis': TrendingUp
                    }[category.slug] || Brain;

                    return (
                      <div 
                        key={category.name}
                        className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
                        style={{ backgroundColor: colors.bgHover + '50' }}
                        onClick={() => handleCategoryChange(category.slug)}
                      >
                        <div className="flex items-center">
                          <IconComponent 
                            className="w-5 h-5 mr-3" 
                            style={{ color: colors.primary }} 
                          />
                          <span style={{ color: colors.text }}>{category.name}</span>
                        </div>
                        <span 
                          className="text-sm px-2 py-1 rounded"
                          style={{ 
                            backgroundColor: colors.primary + '20',
                            color: colors.primary 
                          }}
                        >
                          {category.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-4"
                  style={{ color: colors.text }}
                >
                  Stay Updated
                </h3>
                <p 
                  className="mb-6"
                  style={{ color: colors.textMuted }}
                >
                  Subscribe to our newsletter for the latest insights on AI, content moderation, and digital safety.
                </p>
                <form onSubmit={handleNewsletterSignup} className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ 
                      backgroundColor: colors.bgCard,
                      borderColor: colors.border,
                      color: colors.text 
                    }}
                  />
                  <Button type="submit" variant="primary" className="w-full">
                    Subscribe
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

