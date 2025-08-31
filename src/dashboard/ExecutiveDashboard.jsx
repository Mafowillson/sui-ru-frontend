import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Line, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { Users, AlertTriangle, TrendingUp, Search, Settings, Calendar, MapPin, Activity, Database, FileText, Play, Pause, Download, BarChart3, Network, Target, Clock, Wifi, CheckCircle, ArrowUp, Plus, Filter, Map } from 'lucide-react';
import SideNavigation from './SideNavigation';
import ReportsPage from './ReportsPage';
import SettingsPage from '../pages/SettingsPage';
import PlatformAnalysisPage from './PlatformAnalysisPage'
import InteractiveMap from '../InteractiveMapLeaflet';

const ExecutiveDashboard = ({ user, onLogout, onAnalystClick }) => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [realTimeData, setRealTimeData] = useState({
    totalContent: 2480000,
    activeThreats: 23,
    accuracy: 94.2,
    platforms: 5,
    lastUpdate: new Date()
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [isLive, setIsLive] = useState(true);
  const [connectionStatus] = useState('connected'); // Remove setConnectionStatus to fix eslint warning

  // Mock real-time data updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        totalContent: prev.totalContent + Math.floor(Math.random() * 100),
        activeThreats: Math.max(0, prev.activeThreats + (Math.random() > 0.7 ? 1 : -1)),
        accuracy: Math.min(100, Math.max(90, prev.accuracy + (Math.random() - 0.5) * 0.2)),
        lastUpdate: new Date()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Mock chart data
  const threatTrendData = [
    { time: '00:00', threats: 15, misinformation: 8, hate_speech: 7 },
    { time: '04:00', threats: 12, misinformation: 6, hate_speech: 6 },
    { time: '08:00', threats: 18, misinformation: 11, hate_speech: 7 },
    { time: '12:00', threats: 25, misinformation: 15, hate_speech: 10 },
    { time: '16:00', threats: 31, misinformation: 18, hate_speech: 13 },
    { time: '20:00', threats: 23, misinformation: 12, hate_speech: 11 },
    { time: '24:00', threats: 23, misinformation: 13, hate_speech: 10 }
  ];

  const platformData = [
    { name: 'Facebook', threats: 35, color: '#1877F2' },
    { name: 'X (Twitter)', threats: 28, color: '#000000' },
    { name: 'TikTok', threats: 18, color: '#FE2C55' },
    { name: 'Instagram', threats: 15, color: '#E4405F' },
    { name: 'Reddit', threats: 12, color: '#FF4500' }
  ];

  const geographicData = [
    { region: 'Centre Region', threats: 45, population: 4.1, severity: 'high' },
    { region: 'Littoral Region', threats: 38, population: 3.2, severity: 'high' },
    { region: 'West Region', threats: 22, population: 1.9, severity: 'medium' },
    { region: 'Northwest Region', threats: 18, population: 2.0, severity: 'medium' },
    { region: 'Southwest Region', threats: 15, population: 1.5, severity: 'low' },
    { region: 'Far North Region', threats: 28, population: 4.0, severity: 'high' },
    { region: 'North Region', threats: 12, population: 2.4, severity: 'low' },
    { region: 'Adamawa Region', threats: 8, population: 1.1, severity: 'low' },
    { region: 'East Region', threats: 6, population: 0.8, severity: 'low' },
    { region: 'South Region', threats: 10, population: 0.7, severity: 'low' }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'misinformation',
      severity: 'critical',
      title: 'False Election Information Spreading',
      platform: 'Facebook',
      location: 'Douala, Cameroon',
      time: '2 minutes ago',
      engagement: 1250,
      status: 'active'
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
      status: 'investigating'
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
      status: 'resolved'
    }
  ];

  const ContentMonitoringFeed = () => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: colors.text }}>
          <Activity className="w-5 h-5" style={{ color: colors.primary }} />
          Live Content Monitoring
        </h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLive ? 'animate-pulse' : ''}`} style={{ backgroundColor: isLive ? colors.success : colors.textMuted }}></div>
          <span className="text-sm" style={{ color: colors.textSecondary }}>{isLive ? 'Live' : 'Paused'}</span>
          <Button variant="ghost" size="sm" onClick={() => setIsLive(!isLive)}>
            {isLive ? <Pause size={16} /> : <Play size={16} />}
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {recentAlerts.map(alert => (
          <div 
            key={alert.id} 
            className="border rounded-lg p-4 transition-all duration-200 hover:scale-[1.02]"
            style={{ 
              borderColor: colors.border,
              backgroundColor: colors.bgCard
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant={alert.severity === 'critical' ? 'danger' : alert.severity === 'high' ? 'warning' : 'default'}
                    size="sm"
                  >
                    {alert.severity}
                  </Badge>
                  <Badge variant="default" size="sm">{alert.type.replace('_', ' ')}</Badge>
                  <span className="text-xs" style={{ color: colors.textMuted }}>{alert.platform}</span>
                </div>
                
                <h4 className="font-medium mb-1" style={{ color: colors.text }}>{alert.title}</h4>
                
                <div className="flex items-center gap-4 text-sm" style={{ color: colors.textSecondary }}>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {alert.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {alert.engagement.toLocaleString()} engaged
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {alert.time}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={onAnalystClick}>
                  <Search size={14} />
                  Analyze
                </Button>
                <Badge 
                  variant={
                    alert.status === 'active' ? 'danger' : 
                    alert.status === 'investigating' ? 'warning' : 'success'
                  }
                  size="sm"
                >
                  {alert.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const GeographicIntelligence = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
          <Map className="w-5 h-5" style={{ color: colors.secondary }} />
          Interactive Threat Map
        </h3>
        
        <div className="mb-6">
          <InteractiveMap theme={colors} />
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
          <Map className="w-5 h-5" style={{ color: colors.secondary }} />
          Regional Intelligence
        </h3>
        
        <div className="space-y-4">
          {geographicData.map((region, index) => (
            <div 
              key={region.region} 
              className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
              style={{ backgroundColor: colors.bgTertiary }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: region.severity === 'high' ? colors.danger :
                                     region.severity === 'medium' ? colors.warning : colors.success
                  }}
                ></div>
                <div>
                  <div className="font-medium" style={{ color: colors.text }}>{region.region}</div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>{region.population}M population</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold" style={{ color: colors.text }}>{region.threats}</div>
                <div className="text-xs" style={{ color: colors.textMuted }}>active threats</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card 
                className="p-6 transition-all duration-300 hover:scale-105 cursor-pointer" 
                glow
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}10 100%)`,
                  borderColor: `${colors.primary}30`
                }}
                onClick={() => navigate('/content-queue')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.primary }}>Total Content Monitored</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: colors.text }}>
                      {(realTimeData.totalContent / 1000000).toFixed(2)}M
                    </p>
                    <p className="text-xs mt-1" style={{ color: colors.primary }}>
                      +{Math.floor(Math.random() * 50 + 20)}K today
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <Database className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 transition-all duration-300 hover:scale-105 cursor-pointer" 
                glow
                style={{ 
                  background: `linear-gradient(135deg, ${colors.danger}20 0%, ${colors.danger}10 100%)`,
                  borderColor: `${colors.danger}30`
                }}
                onClick={() => setActiveTab('analytics')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.danger }}>Active Threats</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: colors.text }}>{realTimeData.activeThreats}</p>
                    <p className="text-xs mt-1" style={{ color: colors.danger }}>
                      {Math.random() > 0.5 ? '+2' : '-1'} from yesterday
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${colors.danger}20` }}
                  >
                    <AlertTriangle className="w-6 h-6" style={{ color: colors.danger }} />
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 transition-all duration-300 hover:scale-105" 
                glow
                style={{ 
                  background: `linear-gradient(135deg, ${colors.success}20 0%, ${colors.success}10 100%)`,
                  borderColor: `${colors.success}30`
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.success }}>Detection Accuracy</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: colors.text }}>{realTimeData.accuracy.toFixed(1)}%</p>
                    <p className="text-xs mt-1" style={{ color: colors.success }}>
                      +0.3% this week
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${colors.success}20` }}
                  >
                    <Target className="w-6 h-6" style={{ color: colors.success }} />
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 transition-all duration-300 hover:scale-105" 
                glow
                style={{ 
                  background: `linear-gradient(135deg, ${colors.secondary}20 0%, ${colors.secondary}10 100%)`,
                  borderColor: `${colors.secondary}30`
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.secondary }}>Platforms Monitored</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: colors.text }}>{realTimeData.platforms}</p>
                    <p className="text-xs mt-1" style={{ color: colors.secondary }}>
                      All systems operational
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${colors.secondary}20` }}
                  >
                    <Network className="w-6 h-6" style={{ color: colors.secondary }} />
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Threat Trends */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold" style={{ color: colors.text }}>Threat Trends (24h)</h3>
                  <div className="flex gap-2">
                    {['6h', '24h', '7d', '30d'].map(period => (
                      <Button
                        key={period}
                        variant={selectedTimeframe === period ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setSelectedTimeframe(period)}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={threatTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                    <XAxis dataKey="time" stroke={colors.textSecondary} />
                    <YAxis stroke={colors.textSecondary} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.bgCard, 
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                    <Area type="monotone" dataKey="threats" stackId="1" stroke={colors.danger} fill={colors.danger} fillOpacity={0.2} />
                    <Line type="monotone" dataKey="misinformation" stroke={colors.warning} strokeWidth={2} />
                    <Line type="monotone" dataKey="hate_speech" stroke={colors.secondary} strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </Card>

              {/* Platform Distribution */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Platform Distribution</h3>
                
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="threats"
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.bgCard, 
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Trending & Emergency Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Trending Topics */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: colors.text }}>
                    <TrendingUp className="w-5 h-5" style={{ color: colors.warning }} />
                    Trending Topics
                  </h3>
                  <Badge variant="warning" size="sm">Live</Badge>
                </div>
                
                <div className="space-y-4">
                  {[
                    { topic: "Election Misinformation", mentions: 1247, trend: "+23%", severity: "high", platform: "Facebook" },
                    { topic: "COVID-19 Vaccine Claims", mentions: 892, trend: "+15%", severity: "medium", platform: "Twitter" },
                    { topic: "Economic Conspiracy", mentions: 634, trend: "+8%", severity: "medium", platform: "WhatsApp" },
                    { topic: "Ethnic Tensions", mentions: 423, trend: "+45%", severity: "critical", platform: "TikTok" },
                    { topic: "Government Policies", mentions: 312, trend: "-5%", severity: "low", platform: "Instagram" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-105" 
                         style={{ backgroundColor: colors.bgTertiary, border: `1px solid ${colors.border}` }}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium" style={{ color: colors.text }}>{item.topic}</span>
                          <Badge 
                            variant={item.severity === 'critical' ? 'danger' : item.severity === 'high' ? 'warning' : item.severity === 'medium' ? 'primary' : 'success'} 
                            size="sm"
                          >
                            {item.severity}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span style={{ color: colors.textSecondary }}>{item.mentions} mentions</span>
                          <span style={{ color: colors.textMuted }}>on {item.platform}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${item.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                          {item.trend}
                        </div>
                        <div className="text-xs" style={{ color: colors.textMuted }}>24h</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
                  <Button variant="ghost" size="sm" className="w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View All Trending Topics
                  </Button>
                </div>
              </Card>

              {/* Emergency Alerts */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: colors.text }}>
                    <AlertTriangle className="w-5 h-5" style={{ color: colors.danger }} />
                    Emergency Alerts
                  </h3>
                  <Badge variant="danger" size="sm">3 Active</Badge>
                </div>
                
                <div className="space-y-4">
                  {[
                    { 
                      id: "EMG-001", 
                      title: "Mass Disinformation Campaign", 
                      description: "Coordinated spread of false election information across multiple platforms",
                      severity: "critical", 
                      time: "2 min ago",
                      location: "Yaoundé, Centre",
                      status: "investigating"
                    },
                    { 
                      id: "EMG-002", 
                      title: "Hate Speech Surge", 
                      description: "Significant increase in ethnic hate speech following political announcement",
                      severity: "high", 
                      time: "15 min ago",
                      location: "Douala, Littoral",
                      status: "monitoring"
                    },
                    { 
                      id: "EMG-003", 
                      title: "Viral Fake News", 
                      description: "False health information spreading rapidly on WhatsApp groups",
                      severity: "medium", 
                      time: "1 hour ago",
                      location: "Bamenda, Nord-Ouest",
                      status: "contained"
                    }
                  ].map((alert, index) => (
                    <div key={index} className="p-4 rounded-lg border-l-4 transition-all duration-200 hover:scale-105" 
                         style={{ 
                           backgroundColor: colors.bgTertiary, 
                           border: `1px solid ${colors.border}`,
                           borderLeftColor: alert.severity === 'critical' ? colors.danger : alert.severity === 'high' ? colors.warning : colors.primary
                         }}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm" style={{ color: colors.textMuted }}>{alert.id}</span>
                          <Badge 
                            variant={alert.severity === 'critical' ? 'danger' : alert.severity === 'high' ? 'warning' : 'primary'} 
                            size="sm"
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <span className="text-xs" style={{ color: colors.textMuted }}>{alert.time}</span>
                      </div>
                      
                      <h4 className="font-medium mb-1" style={{ color: colors.text }}>{alert.title}</h4>
                      <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>{alert.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs" style={{ color: colors.textMuted }}>
                          <MapPin className="w-3 h-3" />
                          {alert.location}
                        </div>
                        <Badge 
                          variant={alert.status === 'investigating' ? 'warning' : alert.status === 'monitoring' ? 'primary' : 'success'} 
                          size="sm"
                        >
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Removed View Emergency Dashboard button */}
              </Card>
            </div>

            {/* Lower Section: Live Feed & Geographic Intelligence */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {ContentMonitoringFeed()}
                
                {/* Additional Content to Fill Space */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
                    <BarChart3 className="w-5 h-5" style={{ color: colors.primary }} />
                    Real-time Analytics
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>Detection Rate</span>
                          <span className="text-lg font-bold" style={{ color: colors.success }}>98.7%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="h-2 rounded-full" style={{ backgroundColor: colors.success, width: '98.7%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>Response Time</span>
                          <span className="text-lg font-bold" style={{ color: colors.primary }}>2.3s</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="h-2 rounded-full" style={{ backgroundColor: colors.primary, width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>False Positives</span>
                          <span className="text-lg font-bold" style={{ color: colors.warning }}>1.2%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="h-2 rounded-full" style={{ backgroundColor: colors.warning, width: '12%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                        <h4 className="font-semibold mb-3" style={{ color: colors.text }}>Platform Activity</h4>
                        <div className="space-y-2">
                          {[
                            { platform: 'Facebook', activity: 89, color: colors.primary },
                            { platform: 'Twitter/X', activity: 76, color: colors.secondary },
                            { platform: 'WhatsApp', activity: 92, color: colors.success },
                            { platform: 'TikTok', activity: 68, color: colors.warning },
                            { platform: 'Instagram', activity: 54, color: colors.danger }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm" style={{ color: colors.textSecondary }}>{item.platform}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className="h-1.5 rounded-full" 
                                    style={{ backgroundColor: item.color, width: `${item.activity}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-medium" style={{ color: colors.text }}>{item.activity}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                        <h4 className="font-semibold mb-3" style={{ color: colors.text }}>System Status</h4>
                        <div className="space-y-2">
                          {[
                            { service: 'AI Detection Engine', status: 'operational', uptime: '99.9%' },
                            { service: 'Content Crawler', status: 'operational', uptime: '99.7%' },
                            { service: 'Alert System', status: 'operational', uptime: '100%' },
                            { service: 'Database Cluster', status: 'operational', uptime: '99.8%' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-2 h-2 rounded-full" 
                                  style={{ backgroundColor: colors.success }}
                                ></div>
                                <span className="text-sm" style={{ color: colors.textSecondary }}>{item.service}</span>
                              </div>
                              <span className="text-xs font-medium" style={{ color: colors.text }}>{item.uptime}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* Recent Actions Card */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
                    <Clock className="w-5 h-5" style={{ color: colors.secondary }} />
                    Recent Actions
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { action: 'Content flagged for review', user: 'AI System', time: '2 minutes ago', type: 'automated' },
                      { action: 'Alert escalated to authorities', user: 'Sarah Chen', time: '5 minutes ago', type: 'manual' },
                      { action: 'False positive marked', user: 'Michael Rodriguez', time: '8 minutes ago', type: 'manual' },
                      { action: 'New threat pattern detected', user: 'AI System', time: '12 minutes ago', type: 'automated' },
                      { action: 'Report generated and sent', user: 'System', time: '15 minutes ago', type: 'automated' },
                      { action: 'User account suspended', user: 'Emily Watson', time: '18 minutes ago', type: 'manual' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: item.type === 'automated' ? colors.primary : colors.secondary }}
                          ></div>
                          <div>
                            <div className="font-medium text-sm" style={{ color: colors.text }}>{item.action}</div>
                            <div className="text-xs" style={{ color: colors.textMuted }}>by {item.user}</div>
                          </div>
                        </div>
                        <div className="text-xs" style={{ color: colors.textSecondary }}>{item.time}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              <div>
                <GeographicIntelligence />
              </div>
            </div>
          </>
        );
      
      case 'monitoring':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Live Content Monitoring</h3>
              <p style={{ color: colors.textSecondary }}>Real-time content analysis and threat detection across all monitored platforms.</p>
            </Card>
            {ContentMonitoringFeed()}
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Advanced Analytics</h3>
              <p style={{ color: colors.textSecondary }}>Deep insights and trend analysis for strategic decision making.</p>
            </Card>

            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>Total Threats Detected</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: colors.danger }}>1,247</p>
                    <p className="text-xs mt-1" style={{ color: colors.danger }}>+18% from last week</p>
                  </div>
                  <AlertTriangle className="w-8 h-8" style={{ color: colors.danger }} />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>Content Analyzed</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: colors.primary }}>2.48M</p>
                    <p className="text-xs mt-1" style={{ color: colors.success }}>+25K today</p>
                  </div>
                  <Database className="w-8 h-8" style={{ color: colors.primary }} />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>Response Time</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: colors.success }}>2.3s</p>
                    <p className="text-xs mt-1" style={{ color: colors.success }}>-0.5s improvement</p>
                  </div>
                  <Clock className="w-8 h-8" style={{ color: colors.success }} />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>Accuracy Rate</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: colors.success }}>94.2%</p>
                    <p className="text-xs mt-1" style={{ color: colors.success }}>+0.3% this week</p>
                  </div>
                  <Target className="w-8 h-8" style={{ color: colors.success }} />
                </div>
              </Card>
            </div>

            {/* Main Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Threat Trends Over Time</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={threatTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                    <XAxis dataKey="time" stroke={colors.textSecondary} />
                    <YAxis stroke={colors.textSecondary} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.bgCard, 
                        border: `1px solid ${colors.border}`, 
                        borderRadius: '8px',
                        color: colors.text
                      }} 
                    />
                    <Area type="monotone" dataKey="threats" stroke={colors.danger} fill={colors.danger} fillOpacity={0.3} />
                    <Line type="monotone" dataKey="misinformation" stroke={colors.warning} strokeWidth={2} />
                    <Line type="monotone" dataKey="hate_speech" stroke={colors.primary} strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </Card>
              
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Platform Distribution</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="threats"
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.bgCard, 
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Threat Categories</h4>
                <div className="space-y-4">
                  {[
                    { category: 'Misinformation', count: 456, percentage: 36.6, color: colors.danger },
                    { category: 'Hate Speech', count: 342, percentage: 27.4, color: colors.warning },
                    { category: 'Spam', count: 289, percentage: 23.2, color: colors.primary },
                    { category: 'Harassment', count: 160, percentage: 12.8, color: colors.secondary }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm" style={{ color: colors.text }}>{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold" style={{ color: colors.text }}>{item.count}</div>
                        <div className="text-xs" style={{ color: colors.textMuted }}>{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Geographic Hotspots</h4>
                <div className="space-y-3">
                  {geographicData.slice(0, 6).map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ 
                            backgroundColor: region.severity === 'high' ? colors.danger :
                                             region.severity === 'medium' ? colors.warning : colors.success
                          }}
                        ></div>
                        <span className="text-sm" style={{ color: colors.text }}>{region.region}</span>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: colors.text }}>{region.threats}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Detection Performance</h4>
                <div className="space-y-4">
                  {[
                    { metric: 'True Positives', value: '1,174', percentage: 94.2, color: colors.success },
                    { metric: 'False Positives', value: '73', percentage: 5.8, color: colors.warning },
                    { metric: 'True Negatives', value: '2.47M', percentage: 99.8, color: colors.success },
                    { metric: 'False Negatives', value: '15', percentage: 0.2, color: colors.danger }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: colors.textSecondary }}>{item.metric}</span>
                        <span className="text-sm font-semibold" style={{ color: colors.text }}>{item.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ backgroundColor: item.color, width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Advanced Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Hourly Activity Pattern</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={[
                    { hour: '00', activity: 45 }, { hour: '01', activity: 32 }, { hour: '02', activity: 28 },
                    { hour: '03', activity: 25 }, { hour: '04', activity: 30 }, { hour: '05', activity: 42 },
                    { hour: '06', activity: 65 }, { hour: '07', activity: 85 }, { hour: '08', activity: 95 },
                    { hour: '09', activity: 110 }, { hour: '10', activity: 125 }, { hour: '11', activity: 135 },
                    { hour: '12', activity: 145 }, { hour: '13', activity: 140 }, { hour: '14', activity: 130 },
                    { hour: '15', activity: 125 }, { hour: '16', activity: 120 }, { hour: '17', activity: 115 },
                    { hour: '18', activity: 105 }, { hour: '19', activity: 95 }, { hour: '20', activity: 85 },
                    { hour: '21', activity: 75 }, { hour: '22', activity: 65 }, { hour: '23', activity: 55 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                    <XAxis dataKey="hour" stroke={colors.textSecondary} />
                    <YAxis stroke={colors.textSecondary} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.bgCard, 
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                    <Area type="monotone" dataKey="activity" stroke={colors.primary} fill={colors.primary} fillOpacity={0.4} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Weekly Comparison</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <ComposedChart data={[
                    { day: 'Mon', thisWeek: 180, lastWeek: 165 },
                    { day: 'Tue', thisWeek: 195, lastWeek: 170 },
                    { day: 'Wed', thisWeek: 210, lastWeek: 185 },
                    { day: 'Thu', thisWeek: 225, lastWeek: 200 },
                    { day: 'Fri', thisWeek: 240, lastWeek: 220 },
                    { day: 'Sat', thisWeek: 155, lastWeek: 140 },
                    { day: 'Sun', thisWeek: 130, lastWeek: 125 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                    <XAxis dataKey="day" stroke={colors.textSecondary} />
                    <YAxis stroke={colors.textSecondary} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.bgCard, 
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                    <Line type="monotone" dataKey="thisWeek" stroke={colors.primary} strokeWidth={3} />
                    <Line type="monotone" dataKey="lastWeek" stroke={colors.textMuted} strokeWidth={2} strokeDasharray="5 5" />
                  </ComposedChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Export and Actions */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold" style={{ color: colors.text }}>Analytics Actions</h4>
                <div className="flex gap-3">
                  <Button variant="primary" icon={Download}>Export Report</Button>
                  <Button variant="secondary" icon={Calendar}>Schedule Report</Button>
                  <Button variant="ghost" icon={Settings}>Configure Metrics</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                  <h5 className="font-semibold mb-2" style={{ color: colors.text }}>Custom Reports</h5>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>Generate detailed analytics reports with custom date ranges and filters.</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                  <h5 className="font-semibold mb-2" style={{ color: colors.text }}>Data Export</h5>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>Export raw data in CSV, JSON, or Excel formats for external analysis.</p>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case 'geographic':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Geographic Intelligence</h3>
              <p style={{ color: colors.textSecondary }}>Regional analysis and geospatial threat mapping.</p>
            </Card>
            <GeographicIntelligence />
          </div>
        );
      
      case 'alerts':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Alert Management</h3>
              <p style={{ color: colors.textSecondary }}>Monitor, manage, and respond to security alerts and threats in real-time.</p>
            </Card>

            {/* Alert Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>Active Alerts</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: colors.danger }}>23</p>
                    <p className="text-xs mt-1" style={{ color: colors.danger }}>+5 in last hour</p>
                  </div>
                  <AlertTriangle className="w-8 h-8" style={{ color: colors.danger }} />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>Resolved Today</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: colors.success }}>47</p>
                    <p className="text-xs mt-1" style={{ color: colors.success }}>94% resolution rate</p>
                  </div>
                  <CheckCircle className="w-8 h-8" style={{ color: colors.success }} />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>Avg Response Time</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: colors.primary }}>4.2m</p>
                    <p className="text-xs mt-1" style={{ color: colors.success }}>-1.3m improvement</p>
                  </div>
                  <Clock className="w-8 h-8" style={{ color: colors.primary }} />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>Escalated</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: colors.warning }}>8</p>
                    <p className="text-xs mt-1" style={{ color: colors.warning }}>Requires attention</p>
                  </div>
                  <ArrowUp className="w-8 h-8" style={{ color: colors.warning }} />
                </div>
              </Card>
            </div>

            {/* Alert Filters and Actions */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold" style={{ color: colors.text }}>Alert Dashboard</h4>
                <div className="flex gap-3">
                  <Button variant="primary" icon={Plus}>Create Alert</Button>
                  <Button variant="secondary" icon={Filter}>Filter Alerts</Button>
                  <Button variant="ghost" icon={Settings}>Alert Settings</Button>
                </div>
              </div>
              
              <div className="flex gap-4 mb-6">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">All (23)</Button>
                  <Button variant="ghost" size="sm" style={{ color: colors.danger }}>Critical (8)</Button>
                  <Button variant="ghost" size="sm" style={{ color: colors.warning }}>High (12)</Button>
                  <Button variant="ghost" size="sm" style={{ color: colors.primary }}>Medium (3)</Button>
                  <Button variant="ghost" size="sm" style={{ color: colors.textMuted }}>Low (0)</Button>
                </div>
              </div>
            </Card>

            {/* Active Alerts List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Critical Alerts</h4>
                <div className="space-y-4">
                  {[
                    {
                      id: 'ALT-001',
                      title: 'Mass Disinformation Campaign Detected',
                      description: 'Coordinated spread of false election information across multiple platforms',
                      severity: 'critical',
                      location: 'Yaoundé, Centre',
                      time: '2 minutes ago',
                      status: 'investigating',
                      assignee: 'Sarah Chen'
                    },
                    {
                      id: 'ALT-002',
                      title: 'Hate Speech Surge',
                      description: 'Significant increase in ethnic hate speech following political announcement',
                      severity: 'critical',
                      location: 'Douala, Littoral',
                      time: '15 minutes ago',
                      status: 'monitoring',
                      assignee: 'Michael Rodriguez'
                    },
                    {
                      id: 'ALT-003',
                      title: 'Viral Fake News',
                      description: 'False health information spreading rapidly on WhatsApp groups',
                      severity: 'high',
                      location: 'Bamenda, Nord-Ouest',
                      time: '1 hour ago',
                      status: 'contained',
                      assignee: 'Emily Watson'
                    }
                  ].map((alert, index) => (
                    <div key={index} className="p-4 rounded-lg border" style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border }}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ 
                              backgroundColor: alert.severity === 'critical' ? colors.danger : 
                                             alert.severity === 'high' ? colors.warning : colors.primary 
                            }}
                          ></div>
                          <div>
                            <h5 className="font-semibold text-sm" style={{ color: colors.text }}>{alert.title}</h5>
                            <p className="text-xs" style={{ color: colors.textMuted }}>ID: {alert.id}</p>
                          </div>
                        </div>
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: alert.status === 'investigating' ? colors.danger + '20' :
                                           alert.status === 'monitoring' ? colors.warning + '20' : colors.success + '20',
                            color: alert.status === 'investigating' ? colors.danger :
                                   alert.status === 'monitoring' ? colors.warning : colors.success
                          }}
                        >
                          {alert.status}
                        </span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>{alert.description}</p>
                      <div className="flex items-center justify-between text-xs" style={{ color: colors.textMuted }}>
                        <span>{alert.location}</span>
                        <span>Assigned to {alert.assignee}</span>
                        <span>{alert.time}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="primary" size="sm">Investigate</Button>
                        <Button variant="secondary" size="sm">Escalate</Button>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Alert Analytics</h4>
                
                {/* Alert Trends Chart */}
                <div className="mb-6">
                  <h5 className="text-sm font-medium mb-3" style={{ color: colors.textSecondary }}>Alert Trends (24h)</h5>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={[
                      { hour: '00', alerts: 2 }, { hour: '01', alerts: 1 }, { hour: '02', alerts: 0 },
                      { hour: '03', alerts: 1 }, { hour: '04', alerts: 0 }, { hour: '05', alerts: 2 },
                      { hour: '06', alerts: 4 }, { hour: '07', alerts: 6 }, { hour: '08', alerts: 8 },
                      { hour: '09', alerts: 12 }, { hour: '10', alerts: 15 }, { hour: '11', alerts: 18 },
                      { hour: '12', alerts: 23 }, { hour: '13', alerts: 20 }, { hour: '14', alerts: 17 },
                      { hour: '15', alerts: 14 }, { hour: '16', alerts: 11 }, { hour: '17', alerts: 9 },
                      { hour: '18', alerts: 7 }, { hour: '19', alerts: 5 }, { hour: '20', alerts: 4 },
                      { hour: '21', alerts: 3 }, { hour: '22', alerts: 2 }, { hour: '23', alerts: 1 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                      <XAxis dataKey="hour" stroke={colors.textSecondary} />
                      <YAxis stroke={colors.textSecondary} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: colors.bgCard, 
                          border: `1px solid ${colors.border}`,
                          borderRadius: '8px',
                          color: colors.text
                        }}
                      />
                      <Area type="monotone" dataKey="alerts" stroke={colors.danger} fill={colors.danger} fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Alert Distribution */}
                <div className="space-y-4">
                  <h5 className="text-sm font-medium" style={{ color: colors.textSecondary }}>Alert Distribution</h5>
                  {[
                    { type: 'Misinformation', count: 12, percentage: 52, color: colors.danger },
                    { type: 'Hate Speech', count: 7, percentage: 30, color: colors.warning },
                    { type: 'Spam', count: 3, percentage: 13, color: colors.primary },
                    { type: 'Other', count: 1, percentage: 5, color: colors.textMuted }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: colors.text }}>{item.type}</span>
                        <span className="text-sm font-semibold" style={{ color: colors.text }}>{item.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ backgroundColor: item.color, width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Alert Management Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Escalation Procedures</h4>
                <div className="space-y-3">
                  {[
                    { level: 'Level 1', description: 'Analyst Review', time: '< 5 minutes', color: colors.success },
                    { level: 'Level 2', description: 'Senior Analyst', time: '< 15 minutes', color: colors.warning },
                    { level: 'Level 3', description: 'Team Lead', time: '< 30 minutes', color: colors.danger },
                    { level: 'Level 4', description: 'Emergency Response', time: 'Immediate', color: colors.danger }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <div>
                          <div className="font-medium text-sm" style={{ color: colors.text }}>{item.level}</div>
                          <div className="text-xs" style={{ color: colors.textMuted }}>{item.description}</div>
                        </div>
                      </div>
                      <div className="text-xs font-medium" style={{ color: colors.textSecondary }}>{item.time}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Response Teams</h4>
                <div className="space-y-3">
                  {[
                    { team: 'Threat Analysis', members: 8, status: 'active', availability: '24/7' },
                    { team: 'Content Moderation', members: 12, status: 'active', availability: '24/7' },
                    { team: 'Legal Response', members: 4, status: 'on-call', availability: 'Business Hours' },
                    { team: 'Emergency Response', members: 6, status: 'standby', availability: 'On-Demand' }
                  ].map((item, index) => (
                    <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm" style={{ color: colors.text }}>{item.team}</div>
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ 
                            backgroundColor: item.status === 'active' ? colors.success :
                                           item.status === 'on-call' ? colors.warning : colors.textMuted
                          }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs" style={{ color: colors.textMuted }}>
                        <span>{item.members} members</span>
                        <span>{item.availability}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Alert Configuration</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: colors.text }}>Notification Channels</label>
                    <div className="space-y-2">
                      {[
                        { channel: 'Email', enabled: true },
                        { channel: 'SMS', enabled: true },
                        { channel: 'Slack', enabled: false },
                        { channel: 'Webhook', enabled: true }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: colors.textSecondary }}>{item.channel}</span>
                          <div 
                            className={`w-10 h-5 rounded-full p-1 transition-colors ${item.enabled ? 'bg-blue-500' : 'bg-gray-300'}`}
                          >
                            <div 
                              className={`w-3 h-3 rounded-full bg-white transition-transform ${item.enabled ? 'translate-x-5' : 'translate-x-0'}`}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: colors.text }}>Alert Thresholds</label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: colors.textSecondary }}>Critical</span>
                        <span className="text-sm font-medium" style={{ color: colors.text }}>≥ 90%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: colors.textSecondary }}>High</span>
                        <span className="text-sm font-medium" style={{ color: colors.text }}>≥ 70%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: colors.textSecondary }}>Medium</span>
                        <span className="text-sm font-medium" style={{ color: colors.text }}>≥ 50%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      
      case 'platforms':
        return <PlatformAnalysisPage />;
      
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return null;
    }
  };

  const handleAnalystClick = () => {
    navigate('/analyst');
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ backgroundColor: colors.bg }}
    >
      <SideNavigation activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} onAnalystClick={handleAnalystClick} />
      
      <div className="ml-64 pt-16">
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
                  style={{ background: colors.gradientPrimary }}
                >
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                {activeTab === 'dashboard' ? 'Executive Dashboard' :
                 activeTab === 'monitoring' ? 'Live Monitoring' :
                 activeTab === 'analytics' ? 'Advanced Analytics' :
                 activeTab === 'geographic' ? 'Geographic Intelligence' :
                 activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <p className="mt-1" style={{ color: colors.textSecondary }}>
                Real-time misinformation and hate speech monitoring
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div 
                  className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'animate-pulse' : ''}`}
                  style={{ backgroundColor: connectionStatus === 'connected' ? colors.success : colors.danger }}
                ></div>
                <span style={{ color: colors.textSecondary }}>
                  {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
                <Wifi size={16} style={{ color: colors.textSecondary }} />
              </div>
              
              <div className="text-xs" style={{ color: colors.textMuted }}>
                Last updated: {realTimeData.lastUpdate.toLocaleTimeString()}
              </div>
              
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('settings')}>
                <Settings size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          {renderTabContent()}

          {/* Quick Actions - Only show on dashboard */}
          {activeTab === 'dashboard' && (
            <Card className="p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" icon={Search} onClick={onAnalystClick}>
                  Open Analyst Workstation
                </Button>
                <Button variant="primary" icon={Download}>Export Report</Button>
                <Button variant="secondary" icon={Settings}>Configure Alerts</Button>
                <Button variant="secondary" icon={Calendar}>Schedule Analysis</Button>
                <Button variant="ghost" icon={FileText}>View Detailed Reports</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard