import { useState } from 'react';
import { MessageSquare, Flag, CheckCircle, MapPin, Clock, Users,Brain, FileText, Download, ExternalLink, Camera, FileImage, Share2, Heart,MessageCircle, RotateCcw} from 'lucide-react';

import { useTheme } from '../contexts/ThemeContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

import { User, AlertCircle, Settings, AlertTriangle, XCircle, Search, Activity } from 'lucide-react';

const AnalystWorkstation = ({ user }) => {
  const { colors } = useTheme();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filters, setFilters] = useState({
    severity: 'all',
    type: 'all',
    platform: 'all',
    status: 'pending'
  });
  const [analysisData, setAnalysisData] = useState({
    classification: '',
    confidence: 75,
    notes: '',
    priority: 'medium'
  });

  // Enhanced detailed content data for analyst review
  const detailedAlerts = [
    {
      id: 1,
      type: 'misinformation',
      severity: 'critical',
      title: 'False Election Information Spreading',
      platform: 'Facebook',
      location: 'Douala, Cameroon',
      time: '2 minutes ago',
      engagement: 1250,
      status: 'pending',
      content: {
        text: "URGENT: The election commission has changed voting dates to next month due to technical issues. Share this to inform others!",
        author: {
          name: "News Update Cameroon",
          verified: false,
          followers: 15420,
          account_age: "3 months"
        },
        media: [{ type: 'image', description: 'Fake election notice document' }],
        reactions: { likes: 342, shares: 189, comments: 76 },
        url: "https://facebook.com/example-post-123"
      },
      ai_analysis: {
        confidence: 89,
        threat_indicators: [
          "Urgent language designed to create panic",
          "False information about official processes",
          "Encourages viral sharing",
          "Unverified source with recent account creation"
        ],
        similar_patterns: 3
      }
    },
    {
      id: 2,
      type: 'hate_speech',
      severity: 'high',
      title: 'Ethnic Tension Content Detected',
      platform: 'WhatsApp',
      location: 'Yaoundé, Cameroon',
      time: '8 minutes ago',
      engagement: 890,
      status: 'pending',
      content: {
        text: "These people from [ethnic group] are destroying our economy. We need to stop them before they take everything from us. Share in all your groups.",
        author: {
          name: "RedditUser123",
          verified: false,
          groups: 23
        },
        media: [],
        forwarded_count: 45
      },
      ai_analysis: {
        confidence: 76,
        threat_indicators: [
          "Ethnic targeting language",
          "Economic scapegoating", 
          "Call for group action",
          "Encourages widespread distribution"
        ],
        similar_patterns: 7
      }
    },
    {
      id: 3,
      type: 'misinformation',
      severity: 'medium',
      title: 'Health Misinformation Campaign',
      platform: 'Twitter/X',
      location: 'Lagos, Nigeria',
      time: '15 minutes ago',
      engagement: 2100,
      status: 'investigating',
      content: {
        text: "BREAKING: Local doctors confirm traditional herb mixture cures COVID-19 100%. Big pharma doesn't want you to know! Recipe in comments. #NaturalCure #COVID19",
        author: {
          name: "@HealthTruthNG",
          verified: false,
          followers: 2340,
          account_age: "6 months"
        },
        media: [{ type: 'image', description: 'Photo of herbal mixture' }],
        reactions: { likes: 876, retweets: 234, comments: 145 },
        url: "https://twitter.com/example-tweet-456"
      },
      ai_analysis: {
        confidence: 82,
        threat_indicators: [
          "False medical claims",
          "Conspiracy theory elements",
          "Encourages self-medication",
          "Potential public health risk"
        ],
        similar_patterns: 12
      }
    },
    {
      id: 4,
      type: 'incitement',
      severity: 'critical',
      title: 'Call to Violence Against Government Officials',
      platform: 'Telegram',
      location: 'Abuja, Nigeria',
      time: '12 minutes ago',
      engagement: 567,
      status: 'pending',
      content: {
        text: "Time to take action! These corrupt officials need to face real consequences. Meet at the government house tomorrow at 6 PM. Bring what you need to make them listen. #Revolution #TakeAction",
        author: {
          name: "Freedom Fighter NG",
          verified: false,
          followers: 8900,
          account_age: "2 weeks"
        },
        media: [{ type: 'image', description: 'Photo of government building with threatening overlay' }],
        reactions: { likes: 234, shares: 89, comments: 45 },
        url: "https://t.me/example-channel-789"
      },
      ai_analysis: {
        confidence: 94,
        threat_indicators: [
          "Direct call to physical action",
          "Threatening language toward officials",
          "Specific time and location mentioned",
          "Encourages bringing weapons/tools",
          "Recently created account"
        ],
        similar_patterns: 2
      }
    },
    {
      id: 5,
      type: 'misinformation',
      severity: 'high',
      title: 'False Economic Crisis Information',
      platform: 'Instagram',
      location: 'Accra, Ghana',
      time: '25 minutes ago',
      engagement: 3400,
      status: 'investigating',
      content: {
        text: "BREAKING: Bank of Ghana secretly printing unlimited money causing inflation! Your savings are worthless! Convert everything to foreign currency NOW before it's too late! 🚨💰 #GhanaEconomy #BankingCrisis",
        author: {
          name: "Ghana Economic Truth",
          verified: false,
          followers: 45600,
          account_age: "1 year"
        },
        media: [{ type: 'video', description: 'Fake news report about banking crisis' }],
        reactions: { likes: 1200, shares: 890, comments: 234 },
        url: "https://instagram.com/example-post-456"
      },
      ai_analysis: {
        confidence: 87,
        threat_indicators: [
          "False financial information",
          "Panic-inducing language",
          "Encourages immediate financial action",
          "Potential market manipulation",
          "Unverified economic claims"
        ],
        similar_patterns: 8
      }
    },
    {
      id: 6,
      type: 'hate_speech',
      severity: 'medium',
      title: 'Religious Intolerance Content',
      platform: 'TikTok',
      location: 'Kano, Nigeria',
      time: '35 minutes ago',
      engagement: 1890,
      status: 'pending',
      content: {
        text: "These [religious group] people are trying to destroy our traditions and way of life. We need to protect our community from their influence. Share to spread awareness! 🙏",
        author: {
          name: "Traditional Values NG",
          verified: false,
          followers: 12300,
          account_age: "8 months"
        },
        media: [{ type: 'video', description: 'Video promoting religious intolerance' }],
        reactions: { likes: 567, shares: 234, comments: 89 },
        url: "https://tiktok.com/example-video-789"
      },
      ai_analysis: {
        confidence: 73,
        threat_indicators: [
          "Religious targeting language",
          "Us vs them mentality",
          "Calls for community action",
          "Promotes exclusion",
          "Spreads religious intolerance"
        ],
        similar_patterns: 15
      }
    },
    {
      id: 7,
      type: 'spam',
      severity: 'low',
      title: 'Coordinated Bot Activity Detected',
      platform: 'Twitter/X',
      location: 'Multiple Locations',
      time: '1 hour ago',
      engagement: 890,
      status: 'investigating',
      content: {
        text: "🎉 CONGRATULATIONS! You've been selected for our EXCLUSIVE cryptocurrency giveaway! 💰 Send 0.1 BTC to claim your 2 BTC reward! Limited time offer! #CryptoGiveaway #Bitcoin #FreeMoneyy",
        author: {
          name: "Crypto Rewards Official",
          verified: false,
          followers: 234,
          account_age: "1 day"
        },
        media: [{ type: 'image', description: 'Fake cryptocurrency promotion graphic' }],
        reactions: { likes: 45, retweets: 123, comments: 12 },
        url: "https://twitter.com/example-scam-123"
      },
      ai_analysis: {
        confidence: 96,
        threat_indicators: [
          "Classic cryptocurrency scam pattern",
          "Requests upfront payment",
          "Too good to be true offers",
          "Newly created account",
          "Multiple similar accounts detected"
        ],
        similar_patterns: 45
      }
    },
    {
      id: 8,
      type: 'misinformation',
      severity: 'high',
      title: 'False Climate Change Denial Campaign',
      platform: 'YouTube',
      location: 'Cape Town, South Africa',
      time: '2 hours ago',
      engagement: 5600,
      status: 'pending',
      content: {
        text: "EXPOSED: Climate change is a HOAX created by Western powers to control African development! Don't let them fool you with fake science! Our traditional weather patterns are normal! 🌍 #ClimateHoax #AfricaFirst",
        author: {
          name: "Africa Truth Channel",
          verified: false,
          followers: 89000,
          account_age: "2 years"
        },
        media: [{ type: 'video', description: '45-minute video spreading climate misinformation' }],
        reactions: { likes: 2300, shares: 890, comments: 567 },
        url: "https://youtube.com/example-video-climate"
      },
      ai_analysis: {
        confidence: 91,
        threat_indicators: [
          "Climate science denial",
          "Conspiracy theory promotion",
          "Anti-Western sentiment exploitation",
          "Undermines environmental action",
          "Spreads scientific misinformation"
        ],
        similar_patterns: 6
      }
    }
  ];

  const ContentReviewInterface = () => {
    if (!selectedAlert) {
      return (
        <Card className="p-8 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-4" style={{ color: colors.textMuted }} />
          <h3 className="text-xl mb-2" style={{ color: colors.text }}>Select Content to Analyze</h3>
          <p style={{ color: colors.textSecondary }}>Choose an alert from the list to begin detailed analysis</p>
        </Card>
      );
    }

    const alert = selectedAlert;
    const content = alert.content;

    return (
      <div className="space-y-6">
        {/* Content Header */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Badge 
                variant={alert.severity === 'critical' ? 'danger' : alert.severity === 'high' ? 'warning' : 'default'}
                size="lg"
              >
                {alert.severity}
              </Badge>
              <Badge variant="default">{alert.type.replace('_', ' ')}</Badge>
              <Badge variant="outline">{alert.platform}</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" size="sm">
                <Flag size={16} />
                Flag as Threat
              </Button>
              <Button variant="secondary" size="sm">
                <CheckCircle size={16} />
                Mark Reviewed
              </Button>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{alert.title}</h2>
          <div className="flex items-center gap-4 text-sm" style={{ color: colors.textSecondary }}>
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {alert.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {alert.time}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              {alert.engagement.toLocaleString()} engaged
            </span>
          </div>
        </Card>

        {/* Original Content */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
            <FileText className="w-5 h-5" />
            Original Content
          </h3>
          
          <div 
            className="rounded-lg p-4 mb-4"
            style={{ backgroundColor: colors.bgTertiary }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.bgCard }}
              >
                <User className="w-5 h-5" style={{ color: colors.textSecondary }} />
              </div>
              <div>
                <div className="font-medium" style={{ color: colors.text }}>{content.author.name}</div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  {content.author.followers && `${content.author.followers.toLocaleString()} followers`}
                  {content.author.account_age && ` • Account: ${content.author.account_age}`}
                  {content.author.groups && ` • ${content.author.groups} groups`}
                </div>
              </div>
            </div>
            
            <p className="leading-relaxed mb-4" style={{ color: colors.text }}>{content.text}</p>
            
            {content.media && content.media.length > 0 && (
              <div 
                className="border rounded p-3 mb-4"
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                  <FileImage size={16} />
                  Media: {content.media[0].description}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-6 text-sm" style={{ color: colors.textSecondary }}>
              {content.reactions && (
                <>
                  <span className="flex items-center gap-1">
                    <Heart size={14} />
                    {content.reactions.likes || content.reactions.reactions}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 size={14} />
                    {content.reactions.shares || content.reactions.retweets}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    {content.reactions.comments}
                  </span>
                </>
              )}
              {content.forwarded_count && (
                <span className="flex items-center gap-1">
                  <RotateCcw size={14} />
                  {content.forwarded_count} forwards
                </span>
              )}
            </div>
          </div>

          {content.url && (
            <Button variant="ghost" size="sm" className="mb-4">
              <ExternalLink size={14} className="mr-2" />
              View Original Post
            </Button>
          )}
        </Card>

        {/* AI Analysis */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
            <Brain className="w-5 h-5" style={{ color: colors.secondary }} />
            AI Analysis
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span style={{ color: colors.textSecondary }}>Confidence Score</span>
                  <span className="font-bold" style={{ color: colors.text }}>{alert.ai_analysis.confidence}%</span>
                </div>
                <div 
                  className="w-full rounded-full h-2"
                  style={{ backgroundColor: colors.bgTertiary }}
                >
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${alert.ai_analysis.confidence}%`,
                      background: 'linear-gradient(to right, #f59e0b, #ef4444)'
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <span className="text-sm" style={{ color: colors.textSecondary }}>Similar Patterns Found</span>
                <p className="text-2xl font-bold" style={{ color: colors.text }}>{alert.ai_analysis.similar_patterns}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2" style={{ color: colors.text }}>Threat Indicators</h4>
              <ul className="space-y-1">
                {alert.ai_analysis.threat_indicators.map((indicator, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                    <AlertCircle size={12} style={{ color: colors.warning }} />
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Analyst Tools */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
            <Settings className="w-5 h-5" style={{ color: colors.primary }} />
            Analysis Tools
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Classification */}
            <div>
              <h4 className="font-medium mb-3" style={{ color: colors.text }}>Classification</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>Threat Type</label>
                  <select 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: colors.bgTertiary,
                      borderColor: colors.border,
                      color: colors.text,
                      focusRingColor: colors.primary
                    }}
                    value={analysisData.classification}
                    onChange={(e) => setAnalysisData(prev => ({ ...prev, classification: e.target.value }))}
                  >
                    <option value="">Select classification...</option>
                    <option value="misinformation">Misinformation</option>
                    <option value="hate_speech">Hate Speech</option>
                    <option value="incitement">Incitement to Violence</option>
                    <option value="spam">Spam/Bot Activity</option>
                    <option value="false_positive">False Positive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>Priority Level</label>
                  <select 
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: colors.bgTertiary,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                    value={analysisData.priority}
                    onChange={(e) => setAnalysisData(prev => ({ ...prev, priority: e.target.value }))}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1" style={{ color: colors.textSecondary }}>
                    Confidence ({analysisData.confidence}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={analysisData.confidence}
                    onChange={(e) => setAnalysisData(prev => ({ ...prev, confidence: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <h4 className="font-medium mb-3" style={{ color: colors.text }}>Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="primary" className="w-full">
                  <Camera size={16} className="mr-2" />
                  Take Screenshot
                </Button>
                <Button variant="secondary" className="w-full">
                  <Download size={16} className="mr-2" />
                  Save Evidence
                </Button>
                <Button variant="secondary" className="w-full">
                  <Share2 size={16} className="mr-2" />
                  Share with Team
                </Button>
                <Button variant="warning" className="w-full">
                  <AlertTriangle size={16} className="mr-2" />
                  Escalate to Supervisor
                </Button>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-6">
            <label className="block text-sm mb-2" style={{ color: colors.textSecondary }}>Analysis Notes</label>
            <textarea
              className="w-full border rounded px-3 py-2 h-24 focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              placeholder="Add your analysis notes, context, and recommendations..."
              value={analysisData.notes}
              onChange={(e) => setAnalysisData(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button variant="success">
              <CheckCircle size={16} className="mr-2" />
              Complete Analysis
            </Button>
            <Button variant="secondary">
              <Clock size={16} className="mr-2" />
              Save Draft
            </Button>
            <Button variant="danger">
              <XCircle size={16} className="mr-2" />
              Reject/Archive
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  // Enhanced filtering function
  const getFilteredAlerts = () => {
    return detailedAlerts.filter(alert => {
      if (filters.status !== 'all' && alert.status !== filters.status) return false;
      if (filters.severity !== 'all' && alert.severity !== filters.severity) return false;
      if (filters.type !== 'all' && alert.type !== filters.type) return false;
      if (filters.platform !== 'all' && alert.platform !== filters.platform) return false;
      return true;
    });
  };

  const AlertsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('time');
    
    const filteredAlerts = getFilteredAlerts().filter(alert =>
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.content.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedAlerts = [...filteredAlerts].sort((a, b) => {
      switch(sortBy) {
        case 'confidence':
          return b.ai_analysis.confidence - a.ai_analysis.confidence;
        case 'engagement':
          return b.engagement - a.engagement;
        case 'severity':
          const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return severityOrder[b.severity] - severityOrder[a.severity];
        default:
          return 0; // Keep original order for time
      }
    });

    return (
      <Card className="p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold" style={{ color: colors.text }}>Content Queue</h3>
            <Badge variant="primary" size="sm">
              {filteredAlerts.length} of {detailedAlerts.length}
            </Badge>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: colors.textMuted }} />
            <input
              type="text"
              placeholder="Search alerts, content, or locations..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Enhanced Filters */}
          <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
            <select 
              className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending Review</option>
              <option value="investigating">Investigating</option>
              <option value="completed">Completed</option>
            </select>

            <select 
              className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              value={filters.severity}
              onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select 
              className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="all">All Types</option>
              <option value="misinformation">Misinformation</option>
              <option value="hate_speech">Hate Speech</option>
              <option value="incitement">Incitement</option>
              <option value="spam">Spam/Bots</option>
            </select>

            <select 
              className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              value={filters.platform}
              onChange={(e) => setFilters(prev => ({ ...prev, platform: e.target.value }))}
            >
              <option value="all">All Platforms</option>
              <option value="Facebook">Facebook</option>
              <option value="X (Twitter)">X (Twitter)</option>
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="Reddit">Reddit</option>
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: colors.textSecondary }}>Sort by:</span>
            <select 
              className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: colors.bgTertiary,
                borderColor: colors.border,
                color: colors.text
              }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="time">Latest First</option>
              <option value="confidence">AI Confidence</option>
              <option value="engagement">Engagement</option>
              <option value="severity">Severity</option>
            </select>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sortedAlerts.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 mx-auto mb-3" style={{ color: colors.textMuted }} />
              <p style={{ color: colors.textSecondary }}>No alerts match your current filters</p>
            </div>
          ) : (
            sortedAlerts.map(alert => (
              <div 
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  selectedAlert?.id === alert.id ? 'ring-2' : ''
                }`}
                style={{ 
                  borderColor: selectedAlert?.id === alert.id ? colors.primary : colors.border,
                  backgroundColor: selectedAlert?.id === alert.id ? `${colors.primary}10` : colors.bgCard,
                  ringColor: colors.primary
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge 
                        variant={alert.severity === 'critical' ? 'danger' : alert.severity === 'high' ? 'warning' : 'default'}
                        size="sm"
                      >
                        {alert.severity}
                      </Badge>
                      <Badge variant="default" size="sm">{alert.type.replace('_', ' ')}</Badge>
                      <span className="text-xs" style={{ color: colors.textMuted }}>{alert.platform}</span>
                      {alert.status === 'investigating' && (
                        <Badge variant="warning" size="sm">
                          <Activity className="w-3 h-3 mr-1" />
                          In Progress
                        </Badge>
                      )}
                    </div>
                    
                    <h4 className="font-medium mb-1 truncate" style={{ color: colors.text }}>{alert.title}</h4>
                    <p className="text-sm mb-2 line-clamp-2" style={{ color: colors.textSecondary }}>
                      {alert.content.text.substring(0, 120)}...
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs flex-wrap" style={{ color: colors.textMuted }}>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {alert.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {alert.engagement.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right ml-3 flex-shrink-0">
                    <div className="text-sm font-medium" style={{ color: colors.text }}>{alert.ai_analysis.confidence}%</div>
                    <div className="text-xs" style={{ color: colors.textMuted }}>confidence</div>
                    <div 
                      className="w-2 h-2 rounded-full mt-1 mx-auto"
                      style={{ 
                        backgroundColor: alert.ai_analysis.confidence > 85 ? colors.danger : 
                                        alert.ai_analysis.confidence > 70 ? colors.warning : colors.success 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
          <div className="flex gap-2 flex-wrap">
            <Button variant="primary" size="sm" className="flex-1 sm:flex-none">
              <CheckCircle className="w-4 h-4 mr-1" />
              Bulk Review
            </Button>
            <Button variant="secondary" size="sm" className="flex-1 sm:flex-none">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 sm:flex-none">
              <RotateCcw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ backgroundColor: colors.bg }}
    >
      <div>
        {/* Header */}
        <div 
          className="backdrop-blur-sm border-b px-6 py-4 transition-all duration-300"
          style={{ 
            backgroundColor: colors.navBg,
            borderColor: colors.navBorder 
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3" style={{ color: colors.text }}>
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: colors.gradientSecondary }}
                >
                  <Search className="w-5 h-5 text-white" />
                </div>
                Analyst Workstation
              </h1>
              <p className="mt-1" style={{ color: colors.textSecondary }}>
                Detailed content analysis and threat investigation • {user?.name} • {user?.role}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="primary" size="lg">
                {detailedAlerts.filter(a => a.status === 'pending').length} Pending Review
              </Badge>
              
              <Button variant="ghost" size="sm">
                <Settings size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Panel - Alerts List */}
            <div className="lg:col-span-2">
              <AlertsList />
            </div>
            
            {/* Right Panel - Content Review */}
            <div className="lg:col-span-3">
              <ContentReviewInterface />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalystWorkstation;

