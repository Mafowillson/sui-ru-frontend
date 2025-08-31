// API service for news data
const NEWS_API_KEY = 'be5ab416d6a043ec93cb7edac5cb7889';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

export const newsService = {
  // Get top headlines
  async getTopHeadlines(country = 'us', category = null, pageSize = 20, page = 1) {
    try {
      let url = `${NEWS_API_BASE_URL}/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`;
      
      if (category) {
        url += `&category=${category}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'ok') {
        return {
          success: true,
          articles: data.articles,
          totalResults: data.totalResults
        };
      } else {
        throw new Error(data.message || 'Failed to fetch news');
      }
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Search everything
  async searchNews(query, sortBy = 'publishedAt', pageSize = 20, page = 1, from = null, to = null) {
    try {
      let url = `${NEWS_API_BASE_URL}/everything?q=${encodeURIComponent(query)}&sortBy=${sortBy}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`;
      
      if (from) {
        url += `&from=${from}`;
      }
      
      if (to) {
        url += `&to=${to}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'ok') {
        return {
          success: true,
          articles: data.articles,
          totalResults: data.totalResults
        };
      } else {
        throw new Error(data.message || 'Failed to search news');
      }
    } catch (error) {
      console.error('Error searching news:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get news sources
  async getSources(category = null, language = 'en', country = null) {
    try {
      let url = `${NEWS_API_BASE_URL}/sources?language=${language}&apiKey=${NEWS_API_KEY}`;
      
      if (category) {
        url += `&category=${category}`;
      }
      
      if (country) {
        url += `&country=${country}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'ok') {
        return {
          success: true,
          sources: data.sources
        };
      } else {
        throw new Error(data.message || 'Failed to fetch sources');
      }
    } catch (error) {
      console.error('Error fetching sources:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

// Blog service with mock data (since we don't have a real blog API)
export const blogService = {
  // Mock blog posts data
  mockBlogPosts: [
    {
      id: 1,
      title: "The Future of AI-Powered Content Moderation: Trends and Innovations for 2025",
      excerpt: "As we advance into 2025, artificial intelligence continues to revolutionize how we approach content moderation and hate speech detection. This comprehensive analysis explores the latest developments in machine learning algorithms, natural language processing, and computer vision technologies that are reshaping the digital safety landscape.",
      content: "Full article content would go here...",
      author: "Dr. Sarah Chen",
      date: "2024-12-15",
      readTime: "8 min read",
      category: "AI Technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      featured: true,
      tags: ["AI", "Content Moderation", "Machine Learning", "Technology"],
      views: 1250
    },
    {
      id: 2,
      title: "Understanding the Psychology Behind Online Hate Speech",
      excerpt: "A deep dive into the psychological factors that drive individuals to engage in hate speech online, and how understanding these motivations can help us build better detection systems.",
      content: "Full article content would go here...",
      author: "Prof. Michael Rodriguez",
      date: "2024-12-12",
      readTime: "6 min read",
      category: "Psychology",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      featured: false,
      tags: ["Psychology", "Online Behavior", "Research"],
      views: 890
    },
    {
      id: 3,
      title: "Building Resilient Communities: Best Practices for Platform Safety",
      excerpt: "Explore proven strategies and methodologies that successful online platforms use to maintain safe, inclusive environments while preserving freedom of expression.",
      content: "Full article content would go here...",
      author: "Lisa Thompson",
      date: "2024-12-10",
      readTime: "5 min read",
      category: "Community Safety",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      featured: false,
      tags: ["Community", "Safety", "Best Practices"],
      views: 1100
    },
    {
      id: 4,
      title: "The Role of Machine Learning in Real-Time Content Analysis",
      excerpt: "Technical insights into how advanced machine learning models process and analyze millions of pieces of content in real-time to identify potential threats and harmful material.",
      content: "Full article content would go here...",
      author: "Alex Kumar",
      date: "2024-12-08",
      readTime: "7 min read",
      category: "Machine Learning",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      featured: false,
      tags: ["Machine Learning", "Real-time Analysis", "Technology"],
      views: 975
    },
    {
      id: 5,
      title: "Global Perspectives on Digital Rights and Content Moderation",
      excerpt: "An examination of how different cultures and legal frameworks approach the balance between free speech and content moderation across various international jurisdictions.",
      content: "Full article content would go here...",
      author: "Dr. Elena Vasquez",
      date: "2024-12-05",
      readTime: "9 min read",
      category: "Policy & Law",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
      featured: false,
      tags: ["Policy", "Digital Rights", "Global Perspective"],
      views: 1340
    },
    {
      id: 6,
      title: "Emerging Threats in Social Media: What to Watch in 2025",
      excerpt: "Identifying and analyzing new forms of online harassment, misinformation campaigns, and coordinated inauthentic behavior that platforms need to prepare for.",
      content: "Full article content would go here...",
      author: "James Wilson",
      date: "2024-12-03",
      readTime: "6 min read",
      category: "Threat Analysis",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      featured: false,
      tags: ["Threats", "Social Media", "Security"],
      views: 1180
    }
  ],

  // Get all blog posts
  async getBlogPosts(page = 1, pageSize = 6, category = null) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let posts = [...this.mockBlogPosts];
      
      // Filter by category if specified
      if (category && category !== 'all') {
        posts = posts.filter(post => 
          post.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
        );
      }
      
      // Calculate pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedPosts = posts.slice(startIndex, endIndex);
      
      return {
        success: true,
        posts: paginatedPosts,
        totalResults: posts.length,
        currentPage: page,
        totalPages: Math.ceil(posts.length / pageSize)
      };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get featured post
  async getFeaturedPost() {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const featuredPost = this.mockBlogPosts.find(post => post.featured);
      
      return {
        success: true,
        post: featuredPost
      };
    } catch (error) {
      console.error('Error fetching featured post:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get blog categories
  async getCategories() {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const categories = [
        { name: "AI Technology", count: 12, slug: "ai-technology" },
        { name: "Community Safety", count: 8, slug: "community-safety" },
        { name: "Machine Learning", count: 15, slug: "machine-learning" },
        { name: "Psychology", count: 6, slug: "psychology" },
        { name: "Policy & Law", count: 9, slug: "policy-law" },
        { name: "Threat Analysis", count: 11, slug: "threat-analysis" }
      ];
      
      return {
        success: true,
        categories
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Search blog posts
  async searchPosts(query, page = 1, pageSize = 6) {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const searchTerm = query.toLowerCase();
      const filteredPosts = this.mockBlogPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
      
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
      
      return {
        success: true,
        posts: paginatedPosts,
        totalResults: filteredPosts.length,
        currentPage: page,
        totalPages: Math.ceil(filteredPosts.length / pageSize)
      };
    } catch (error) {
      console.error('Error searching blog posts:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

};

// Hate Speech Detection API - exported separately for easy import
export const detectHateSpeech = async (text) => {
  try {
    // TODO: Replace with actual API endpoint
    // const response = await axiosInstance.post('/api/hate-speech-detection', { text });
    // return response.data;
    
    // Mock response for demonstration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerText = text.toLowerCase();
    
    // Enhanced detection logic
    const hateSpeechKeywords = [
      'hate', 'kill', 'eliminate', 'destroy', 'terrorist', 'muslim', 'jew', 'black', 'white', 'asian',
      'gay', 'lesbian', 'trans', 'queer', 'faggot', 'nigger', 'spic', 'chink', 'kike', 'towelhead',
      'liberal', 'conservative', 'democrat', 'republican', 'commie', 'nazi', 'fascist'
    ];
    
    const violenceKeywords = [
      'kill', 'murder', 'assassinate', 'bomb', 'shoot', 'attack', 'war', 'fight', 'destroy',
      'eliminate', 'exterminate', 'wipe out', 'burn', 'hang', 'lynch'
    ];
    
    const misinformationKeywords = [
      'cure', 'miracle', 'secret', 'conspiracy', 'government hiding', 'wake up', 'sheeple',
      'truth', 'real news', 'fake news', 'mainstream media', 'deep state'
    ];
    
    const isHateSpeech = hateSpeechKeywords.some(keyword => lowerText.includes(keyword)) ||
                         violenceKeywords.some(keyword => lowerText.includes(keyword));
    
    const isMisinformation = misinformationKeywords.some(keyword => lowerText.includes(keyword));
    
    // Determine severity based on content
    let severity = 'low';
    if (violenceKeywords.some(keyword => lowerText.includes(keyword))) {
      severity = 'high';
    } else if (hateSpeechKeywords.some(keyword => lowerText.includes(keyword))) {
      severity = 'medium';
    }
    
    // Calculate confidence based on keyword matches
    const keywordMatches = [...hateSpeechKeywords, ...violenceKeywords, ...misinformationKeywords]
      .filter(keyword => lowerText.includes(keyword)).length;
    const confidence = Math.min(0.95, 0.6 + (keywordMatches * 0.1));
    
    // Generate explanation based on detected content
    let explanation = "Content appears safe based on analysis.";
    if (isHateSpeech && isMisinformation) {
      explanation = "Content contains both hate speech and misinformation elements. Multiple concerning patterns detected including discriminatory language and false claims.";
    } else if (isHateSpeech) {
      explanation = "Content contains hate speech elements including discriminatory language, threats, or calls for violence.";
    } else if (isMisinformation) {
      explanation = "Content appears to contain misinformation or conspiracy theories that could mislead readers.";
    }
    
    // Detect specific keywords for display
    const detectedKeywords = [];
    hateSpeechKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) detectedKeywords.push(keyword);
    });
    violenceKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) detectedKeywords.push(keyword);
    });
    misinformationKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) detectedKeywords.push(keyword);
    });
    
    const mockResponse = {
      text: text,
      is_hate_speech: isHateSpeech,
      is_misinformation: isMisinformation,
      confidence: confidence,
      category: "enhanced_twitter_model_v2",
      severity: severity,
      detected_keywords: detectedKeywords.slice(0, 5), // Limit to 5 keywords
      explanation: explanation,
      timestamp: new Date().toISOString(),
      processing_time_ms: Math.floor(Math.random() * 20) + 5,
      risk_score: Math.floor(confidence * 100),
      moderation_action: isHateSpeech ? "flag_for_review" : isMisinformation ? "fact_check_needed" : "no_action",
      language: "en",
      sentiment: isHateSpeech ? "negative" : "neutral"
    };
    
    return {
      success: true,
      data: mockResponse
    };
  } catch (error) {
    console.error('Error detecting hate speech:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Utility functions
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(dateString);
  }
};

export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength).trim() + '...';
};

