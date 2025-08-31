import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../ui/Card';
import { Monitor } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const PlatformAnalysisPage = () => {
  const { colors } = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');

  const platformData = [
    { name: 'Facebook', threats: 45, posts: 125000, accuracy: 96.2, color: '#1877F2' },
    { name: 'X (Twitter)', threats: 32, posts: 89000, accuracy: 94.8, color: '#000000' },
    { name: 'Instagram', threats: 28, posts: 67000, accuracy: 95.1, color: '#E4405F' },
    { name: 'TikTok', threats: 23, posts: 78000, accuracy: 93.7, color: '#FE2C55' },
    { name: 'Reddit', threats: 15, posts: 34000, accuracy: 96.8, color: '#FF4500' }
  ];

  const threatTrendData = [
    { date: '2024-06-04', Facebook: 42, 'X (Twitter)': 35, Instagram: 25, TikTok: 28, Reddit: 12 },
    { date: '2024-06-05', Facebook: 38, 'X (Twitter)': 29, Instagram: 31, TikTok: 25, Reddit: 15 },
    { date: '2024-06-06', Facebook: 51, 'X (Twitter)': 41, Instagram: 28, TikTok: 32, Reddit: 18 },
    { date: '2024-06-07', Facebook: 47, 'X (Twitter)': 33, Instagram: 26, TikTok: 29, Reddit: 14 },
    { date: '2024-06-08', Facebook: 43, 'X (Twitter)': 37, Instagram: 29, TikTok: 26, Reddit: 16 },
    { date: '2024-06-09', Facebook: 49, 'X (Twitter)': 31, Instagram: 32, TikTok: 24, Reddit: 13 },
    { date: '2024-06-10', Facebook: 45, 'X (Twitter)': 32, Instagram: 28, TikTok: 23, Reddit: 15 }
  ];

  const contentTypeData = [
    { name: 'Misinformation', value: 45, color: '#ef4444' },
    { name: 'Hate Speech', value: 32, color: '#f97316' },
    { name: 'Spam', value: 15, color: '#eab308' },
    { name: 'Harassment', value: 8, color: '#8b5cf6' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Platform Analysis</h2>
          <p style={{ color: colors.textSecondary }}>Comprehensive analysis across social media platforms</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedPlatform} 
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 rounded-lg border"
            style={{ 
              backgroundColor: colors.bgCard, 
              borderColor: colors.border,
              color: colors.text 
            }}
          >
            <option value="all">All Platforms</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">X (Twitter)</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="reddit">Reddit</option>
          </select>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg border"
            style={{ 
              backgroundColor: colors.bgCard, 
              borderColor: colors.border,
              color: colors.text 
            }}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platformData.map((platform) => (
          <Card key={platform.name} className="p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: platform.color + '20' }}
                >
                  <Monitor className="w-5 h-5" style={{ color: platform.color }} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: colors.text }}>{platform.name}</h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {platform.posts.toLocaleString()} posts monitored
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textSecondary }}>Active Threats</span>
                <span className="font-semibold text-lg" style={{ color: colors.danger }}>
                  {platform.threats}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: colors.textSecondary }}>Detection Accuracy</span>
                <span className="font-semibold" style={{ color: colors.success }}>
                  {platform.accuracy}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${platform.accuracy}%`,
                    backgroundColor: colors.success 
                  }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Threat Trends Chart */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
          Threat Detection Trends
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={threatTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="date" stroke={colors.textSecondary} />
              <YAxis stroke={colors.textSecondary} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: colors.bgCard, 
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="Facebook" stroke="#1877F2" strokeWidth={2} />
              <Line type="monotone" dataKey="Twitter" stroke="#1DA1F2" strokeWidth={2} />
              <Line type="monotone" dataKey="Instagram" stroke="#E4405F" strokeWidth={2} />
              <Line type="monotone" dataKey="WhatsApp" stroke="#25D366" strokeWidth={2} />
              <Line type="monotone" dataKey="TikTok" stroke="#000000" strokeWidth={2} />
              <Line type="monotone" dataKey="YouTube" stroke="#FF0000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Content Type Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            Content Type Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            Platform Performance Metrics
          </h3>
          <div className="space-y-4">
            {platformData.slice(0, 4).map((platform) => (
              <div key={platform.name} className="flex items-center justify-between p-3 rounded-lg" 
                   style={{ backgroundColor: colors.bgSecondary }}>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: platform.color }}
                  />
                  <span style={{ color: colors.text }}>{platform.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm" style={{ color: colors.textSecondary }}>
                    {platform.threats} threats
                  </span>
                  <span className="font-semibold" style={{ color: colors.success }}>
                    {platform.accuracy}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Real-time Monitoring Status */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
          Real-time Monitoring Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2" />
              <span style={{ color: colors.text }}>All Systems Operational</span>
            </div>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              6 platforms actively monitored
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: colors.primary }}>
              {platformData.reduce((sum, p) => sum + p.posts, 0).toLocaleString()}
            </div>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Total posts analyzed today
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: colors.danger }}>
              {platformData.reduce((sum, p) => sum + p.threats, 0)}
            </div>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Active threats detected
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlatformAnalysisPage;