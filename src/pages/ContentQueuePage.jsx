import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  MessageSquare, 
  Clock, 
  MapPin, 
  Users, 
  AlertTriangle, 
  Eye, 
  Search, 
  RefreshCw,
  Play,
  Pause,
  CheckCircle,
  Flag
} from 'lucide-react';

const ContentQueuePage = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [isLive, setIsLive] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock content queue data
  const [contentQueue, setContentQueue] = useState([
    {
      id: 'CNT-001',
      content: 'Breaking: False information about election results spreading rapidly across social media platforms',
      platform: 'Facebook',
      source: '@news_cameroon_fake',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      location: 'Yaoundé, Centre',
      engagement: 1250,
      threatLevel: 'critical',
      contentType: 'misinformation',
      status: 'pending',
      language: 'French',
      mediaType: 'text'
    },
    {
      id: 'CNT-002',
      content: 'Ethnic hate speech targeting specific communities in response to political developments',
      platform: 'WhatsApp',
      source: 'Group: Political Updates CM',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      location: 'Douala, Littoral',
      engagement: 890,
      threatLevel: 'high',
      contentType: 'hate_speech',
      status: 'analyzing',
      language: 'English',
      mediaType: 'text'
    },
    {
      id: 'CNT-003',
      content: 'Viral video containing false health information about COVID-19 vaccines',
      platform: 'TikTok',
      source: '@health_truth_cm',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      location: 'Bamenda, Nord-Ouest',
      engagement: 2100,
      threatLevel: 'medium',
      contentType: 'misinformation',
      status: 'reviewed',
      language: 'English',
      mediaType: 'video'
    },
    {
      id: 'CNT-004',
      content: 'Spam content promoting fake investment schemes targeting Cameroonians',
      platform: 'Instagram',
      source: '@invest_cm_now',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      location: 'Garoua, Nord',
      engagement: 456,
      threatLevel: 'low',
      contentType: 'spam',
      status: 'flagged',
      language: 'French',
      mediaType: 'image'
    },
    {
      id: 'CNT-005',
      content: 'False claims about government policies spreading through messaging groups',
      platform: 'Telegram',
      source: 'Channel: CM Politics',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      location: 'Maroua, Extrême-Nord',
      engagement: 678,
      threatLevel: 'medium',
      contentType: 'misinformation',
      status: 'pending',
      language: 'French',
      mediaType: 'text'
    },
    {
      id: 'CNT-006',
      content: 'Inflammatory content targeting religious communities during festival period',
      platform: 'Twitter/X',
      source: '@religious_divide',
      timestamp: new Date(Date.now() - 18 * 60 * 1000),
      location: 'Bertoua, Est',
      engagement: 234,
      threatLevel: 'high',
      contentType: 'hate_speech',
      status: 'escalated',
      language: 'English',
      mediaType: 'text'
    }
  ]);

  // Simulate real-time content updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newContent = {
        id: `CNT-${String(Date.now()).slice(-3)}`,
        content: [
          'New suspicious content detected on social media platform',
          'Potential misinformation about local events spreading',
          'Hate speech content flagged by automated systems',
          'Spam content promoting fraudulent services detected',
          'False information about health topics identified'
        ][Math.floor(Math.random() * 5)],
        platform: ['Facebook', 'WhatsApp', 'TikTok', 'Instagram', 'Twitter/X'][Math.floor(Math.random() * 5)],
        source: `@user_${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date(),
        location: [
          'Yaoundé, Centre',
          'Douala, Littoral',
          'Bamenda, Nord-Ouest',
          'Garoua, Nord',
          'Maroua, Extrême-Nord'
        ][Math.floor(Math.random() * 5)],
        engagement: Math.floor(Math.random() * 2000) + 100,
        threatLevel: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
        contentType: ['misinformation', 'hate_speech', 'spam'][Math.floor(Math.random() * 3)],
        status: 'pending',
        language: ['English', 'French'][Math.floor(Math.random() * 2)],
        mediaType: ['text', 'image', 'video'][Math.floor(Math.random() * 3)]
      };

      setContentQueue(prev => [newContent, ...prev.slice(0, 19)]); // Keep only latest 20 items
    }, 8000); // Add new content every 8 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  // Filter and sort content
  const filteredContent = contentQueue
    .filter(item => {
      if (filter === 'all') return true;
      if (filter === 'critical') return item.threatLevel === 'critical';
      if (filter === 'pending') return item.status === 'pending';
      if (filter === 'analyzing') return item.status === 'analyzing';
      return item.contentType === filter;
    })
    .filter(item => 
      searchTerm === '' || 
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return b.timestamp - a.timestamp;
      if (sortBy === 'oldest') return a.timestamp - b.timestamp;
      if (sortBy === 'engagement') return b.engagement - a.engagement;
      if (sortBy === 'threat') {
        const threatOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return threatOrder[b.threatLevel] - threatOrder[a.threatLevel];
      }
      return 0;
    });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={14} style={{ color: colors.warning }} />;
      case 'analyzing': return <RefreshCw size={14} style={{ color: colors.primary }} className="animate-spin" />;
      case 'reviewed': return <CheckCircle size={14} style={{ color: colors.success }} />;
      case 'flagged': return <Flag size={14} style={{ color: colors.danger }} />;
      case 'escalated': return <AlertTriangle size={14} style={{ color: colors.danger }} />;
      default: return <Clock size={14} style={{ color: colors.textMuted }} />;
    }
  };

  const getThreatColor = (level) => {
    switch (level) {
      case 'critical': return colors.danger;
      case 'high': return colors.warning;
      case 'medium': return colors.primary;
      case 'low': return colors.success;
      default: return colors.textMuted;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div 
      className="min-h-screen pt-16 px-6 py-8"
      style={{ backgroundColor: colors.bg }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: colors.text }}>
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: colors.gradientPrimary }}
                >
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                Content Monitoring Queue
              </h1>
              <p className="mt-2" style={{ color: colors.textSecondary }}>
                Real-time content analysis queue - monitoring incoming content for threats and misinformation
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div 
                  className={`w-3 h-3 rounded-full ${isLive ? 'animate-pulse' : ''}`}
                  style={{ backgroundColor: isLive ? colors.success : colors.textMuted }}
                ></div>
                <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  {isLive ? 'Live Monitoring' : 'Paused'}
                </span>
                <Button variant="ghost" size="sm" onClick={() => setIsLive(!isLive)}>
                  {isLive ? <Pause size={16} /> : <Play size={16} />}
                </Button>
              </div>
              
              <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>Total in Queue</p>
                  <p className="text-2xl font-bold" style={{ color: colors.text }}>{filteredContent.length}</p>
                </div>
                <MessageSquare className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>Pending Review</p>
                  <p className="text-2xl font-bold" style={{ color: colors.text }}>
                    {contentQueue.filter(item => item.status === 'pending').length}
                  </p>
                </div>
                <Clock className="w-8 h-8" style={{ color: colors.warning }} />
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>Critical Threats</p>
                  <p className="text-2xl font-bold" style={{ color: colors.text }}>
                    {contentQueue.filter(item => item.threatLevel === 'critical').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8" style={{ color: colors.danger }} />
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>Avg. Response Time</p>
                  <p className="text-2xl font-bold" style={{ color: colors.text }}>2.3s</p>
                </div>
                <RefreshCw className="w-8 h-8" style={{ color: colors.success }} />
              </div>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div 
                className="flex items-center px-4 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border
                }}
              >
                <Search className="w-5 h-5 mr-3" style={{ color: colors.textMuted }} />
                <input
                  type="text"
                  placeholder="Search content, platform, or location..."
                  className="flex-1 bg-transparent outline-none"
                  style={{ color: colors.text }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                className="px-4 py-2 rounded-lg border outline-none"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text
                }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Content</option>
                <option value="critical">Critical Only</option>
                <option value="pending">Pending Review</option>
                <option value="analyzing">Analyzing</option>
                <option value="misinformation">Misinformation</option>
                <option value="hate_speech">Hate Speech</option>
                <option value="spam">Spam</option>
              </select>
              
              <select
                className="px-4 py-2 rounded-lg border outline-none"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text
                }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="engagement">High Engagement</option>
                <option value="threat">Threat Level</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Queue */}
        <div className="space-y-3">
          {filteredContent.map((item, index) => (
            <Card 
              key={item.id}
              className="p-4 transition-all duration-200 hover:scale-[1.01] border-l-4"
              style={{ 
                borderLeftColor: getThreatColor(item.threatLevel),
                animation: index === 0 && isLive ? 'slideInFromTop 0.5s ease-out' : 'none'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge 
                      variant={
                        item.threatLevel === 'critical' ? 'danger' :
                        item.threatLevel === 'high' ? 'warning' :
                        item.threatLevel === 'medium' ? 'primary' : 'default'
                      }
                      size="sm"
                    >
                      {item.threatLevel}
                    </Badge>
                    
                    <Badge variant="default" size="sm">
                      {item.contentType.replace('_', ' ')}
                    </Badge>
                    
                    <span className="text-xs px-2 py-1 rounded" style={{ 
                      backgroundColor: colors.bgTertiary,
                      color: colors.textSecondary 
                    }}>
                      {item.platform}
                    </span>
                    
                    <span className="text-xs" style={{ color: colors.textMuted }}>
                      {item.mediaType}
                    </span>
                  </div>
                  
                  <h4 className="font-medium mb-2 line-clamp-2" style={{ color: colors.text }}>
                    {item.content}
                  </h4>
                  
                  <div className="flex items-center gap-4 text-sm" style={{ color: colors.textSecondary }}>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {item.engagement.toLocaleString()} engaged
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {formatTimeAgo(item.timestamp)}
                    </span>
                    <span className="text-xs">
                      {item.language}
                    </span>
                  </div>
                  
                  <div className="text-xs mt-1" style={{ color: colors.textMuted }}>
                    Source: {item.source} • ID: {item.id}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <div className="flex items-center gap-1">
                    {getStatusIcon(item.status)}
                    <span className="text-xs capitalize" style={{ color: colors.textSecondary }}>
                      {item.status}
                    </span>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <Eye size={14} />
                    Review
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <Card className="p-12 text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-4" style={{ color: colors.textMuted }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
              No content in queue
            </h3>
            <p style={{ color: colors.textSecondary }}>
              {searchTerm || filter !== 'all' 
                ? 'No content matches your current filters.' 
                : 'The content queue is empty. New content will appear here as it\'s detected.'
              }
            </p>
          </Card>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ContentQueuePage;

