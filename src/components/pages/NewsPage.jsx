import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Calendar, User, ArrowRight, AlertTriangle, Shield, Globe, MessageSquare, Camera, BarChart3, Eye } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const NewsPage = () => {
  const { colors } = useTheme();

  const breakingNews = {
    id: 1,
    title: "Major Social Media Platform Implements New AI-Powered Hate Speech Detection System",
    excerpt: "In a groundbreaking move, one of the world's largest social media platforms has deployed an advanced artificial intelligence system capable of detecting and removing hate speech in real-time across 50+ languages, marking a significant milestone in digital safety technology.",
    author: "Tech News Team",
    date: "2024-12-18",
    time: "2 hours ago",
    category: "Breaking News",
    image: "/api/placeholder/800/400",
    urgent: true,
    views: "15.2K"
  };

  const newsArticles = [
    {
      id: 2,
      title: "EU Passes Landmark Digital Services Act Amendment Targeting AI Content Moderation",
      excerpt: "The European Union has approved significant amendments to the Digital Services Act, introducing new requirements for AI transparency in content moderation systems and establishing stricter accountability measures for tech companies.",
      author: "Policy Reporter",
      date: "2024-12-17",
      time: "6 hours ago",
      category: "Policy & Regulation",
      image: "/api/placeholder/400/250",
      views: "8.7K"
    },
    {
      id: 3,
      title: "Research Study Reveals 40% Reduction in Online Harassment Using Advanced ML Models",
      excerpt: "A comprehensive 12-month study conducted across multiple platforms shows that implementing sophisticated machine learning models for content analysis has led to a significant decrease in online harassment incidents.",
      author: "Research Team",
      date: "2024-12-16",
      time: "1 day ago",
      category: "Research",
      image: "/api/placeholder/400/250",
      views: "12.1K"
    },
    {
      id: 4,
      title: "Global Coalition Forms to Combat Cross-Platform Misinformation Campaigns",
      excerpt: "Tech giants, government agencies, and NGOs have announced the formation of a new international coalition dedicated to identifying and neutralizing sophisticated misinformation campaigns that span multiple digital platforms.",
      author: "International Desk",
      date: "2024-12-15",
      time: "2 days ago",
      category: "Global Security",
      image: "/api/placeholder/400/250",
      views: "9.8K"
    },
    {
      id: 5,
      title: "Breakthrough in Real-Time Image Analysis Detects Deepfakes with 99.7% Accuracy",
      excerpt: "Researchers at leading AI institutions have developed a revolutionary deep learning system capable of identifying deepfake images and videos in real-time with unprecedented accuracy, potentially transforming digital media verification.",
      author: "Science Reporter",
      date: "2024-12-14",
      time: "3 days ago",
      category: "Technology",
      image: "/api/placeholder/400/250",
      views: "18.5K"
    },
    {
      id: 6,
      title: "Mental Health Organizations Report Positive Impact of Improved Content Moderation",
      excerpt: "Leading mental health advocacy groups have released data showing measurable improvements in user wellbeing following the implementation of more sophisticated content moderation systems across major social platforms.",
      author: "Health Reporter",
      date: "2024-12-13",
      time: "4 days ago",
      category: "Health & Society",
      image: "/api/placeholder/400/250",
      views: "7.3K"
    },
    {
      id: 7,
      title: "Cybersecurity Experts Warn of AI-Generated Phishing Attacks Surge",
      excerpt: "Security researchers have identified a 300% increase in sophisticated phishing attacks utilizing AI-generated content, prompting urgent calls for enhanced detection mechanisms and user education initiatives.",
      author: "Security Desk",
      date: "2024-12-12",
      time: "5 days ago",
      category: "Cybersecurity",
      image: "/api/placeholder/400/250",
      views: "11.2K"
    }
  ];

  const trendingTopics = [
    { name: "AI Content Moderation", trend: "+45%", icon: BarChart3 },
    { name: "Digital Safety Laws", trend: "+32%", icon: Shield },
    { name: "Deepfake Detection", trend: "+67%", icon: Camera },
    { name: "Online Harassment", trend: "+28%", icon: MessageSquare },
    { name: "Platform Accountability", trend: "+41%", icon: Globe }
  ];

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-5xl font-bold mb-6"
            style={{ color: colors.text }}
          >
            Latest News & Updates
          </h1>
          <p 
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: colors.textMuted }}
          >
            Stay informed with the latest developments in AI technology, digital safety, 
            policy changes, and industry breakthroughs that shape the future of online communities.
          </p>
        </div>

        {/* Breaking News */}
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
                  src={breakingNews.image} 
                  alt={breakingNews.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white"
                  >
                    {breakingNews.category}
                  </span>
                  <span className="ml-2 text-sm text-red-500 font-medium">
                    {breakingNews.time}
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
                  {breakingNews.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" style={{ color: colors.textMuted }} />
                      <span className="text-sm" style={{ color: colors.textMuted }}>
                        {breakingNews.author}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-2" style={{ color: colors.textMuted }} />
                      <span className="text-sm" style={{ color: colors.textMuted }}>
                        {breakingNews.views} views
                      </span>
                    </div>
                  </div>
                  <Button variant="primary" size="sm">
                    Read Full Story
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:flex lg:space-x-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <h2 
              className="text-3xl font-bold mb-8"
              style={{ color: colors.text }}
            >
              Recent News
            </h2>
            <div className="space-y-8">
              {newsArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={article.image} 
                        alt={article.title}
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
                          {article.category}
                        </span>
                        <span className="ml-2 text-xs" style={{ color: colors.textMuted }}>
                          {article.time}
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
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm" style={{ color: colors.textMuted }}>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {article.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {article.date}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {article.views}
                          </div>
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

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More News
              </Button>
            </div>
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
                      Platform Safety Report Q4 2024
                    </p>
                    <p className="text-xs" style={{ color: colors.textMuted }}>
                      Released 30 minutes ago
                    </p>
                  </div>
                  <div className="border-l-4 pl-4" style={{ borderColor: colors.primary }}>
                    <p className="text-sm font-medium" style={{ color: colors.text }}>
                      New API Updates for Developers
                    </p>
                    <p className="text-xs" style={{ color: colors.textMuted }}>
                      Released 2 hours ago
                    </p>
                  </div>
                  <div className="border-l-4 pl-4" style={{ borderColor: colors.primary }}>
                    <p className="text-sm font-medium" style={{ color: colors.text }}>
                      Community Guidelines Update
                    </p>
                    <p className="text-xs" style={{ color: colors.textMuted }}>
                      Released 1 day ago
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

