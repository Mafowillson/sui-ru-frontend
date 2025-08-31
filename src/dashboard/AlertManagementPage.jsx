import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Bell, Download, Filter, RotateCcw, X, Search, AlertTriangle, Flag, CheckCircle, Settings } from 'lucide-react';

const AlertManagementPage = () => {
  const { colors } = useTheme();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');

  const alerts = [
    {
      id: 1,
      title: 'High-Risk Misinformation Campaign Detected',
      description: 'Coordinated spread of false information about health policies across multiple platforms',
      severity: 'critical',
      status: 'active',
      platform: 'Facebook',
      timestamp: '2024-06-10 14:32:15',
      affectedUsers: 15420,
      confidence: 96.8,
      tags: ['misinformation', 'health', 'coordinated']
    },
    {
      id: 2,
      title: 'Hate Speech Targeting Minority Groups',
      description: 'Increased hate speech activity targeting specific ethnic communities',
      severity: 'high',
      status: 'investigating',
      platform: 'Twitter',
      timestamp: '2024-06-10 13:45:22',
      affectedUsers: 8750,
      confidence: 94.2,
      tags: ['hate-speech', 'ethnic', 'harassment']
    },
    {
      id: 3,
      title: 'Spam Bot Network Activity',
      description: 'Large-scale automated posting detected across multiple accounts',
      severity: 'medium',
      status: 'resolved',
      platform: 'Instagram',
      timestamp: '2024-06-10 12:18:45',
      affectedUsers: 3200,
      confidence: 89.5,
      tags: ['spam', 'bot-network', 'automation']
    },
    {
      id: 4,
      title: 'Suspicious Content Sharing Pattern',
      description: 'Unusual sharing patterns detected for potentially harmful content',
      severity: 'low',
      status: 'monitoring',
      platform: 'WhatsApp',
      timestamp: '2024-06-10 11:22:10',
      affectedUsers: 1850,
      confidence: 78.3,
      tags: ['suspicious', 'sharing-pattern', 'monitoring']
    },
    {
      id: 5,
      title: 'Deepfake Video Distribution',
      description: 'AI-generated fake video content spreading across social platforms',
      severity: 'critical',
      status: 'active',
      platform: 'TikTok',
      timestamp: '2024-06-10 10:55:33',
      affectedUsers: 22100,
      confidence: 98.1,
      tags: ['deepfake', 'video', 'ai-generated']
    }
  ];

  const alertStats = [
    { label: 'Active Alerts', value: '23', change: '+3', color: colors.danger },
    { label: 'Resolved Today', value: '47', change: '+12', color: colors.success },
    { label: 'Under Investigation', value: '8', change: '-2', color: colors.warning },
    { label: 'Average Response Time', value: '12 min', change: '-3 min', color: colors.primary }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return colors.danger;
      case 'high': return '#f97316';
      case 'medium': return colors.warning;
      case 'low': return colors.primary;
      default: return colors.textSecondary;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return colors.danger;
      case 'investigating': return colors.warning;
      case 'monitoring': return colors.primary;
      case 'resolved': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = filterSeverity === 'all' || alert.severity === filterSeverity;
    const statusMatch = filterStatus === 'all' || alert.status === filterStatus;
    return severityMatch && statusMatch;
  });

  const handleAlertAction = (alertId, action) => {
    alert(`Performing ${action} on alert ${alertId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Alert Management</h2>
          <p style={{ color: colors.textSecondary }}>Monitor and manage security alerts and threat notifications</p>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" icon={Bell}>Configure Alerts</Button>
          <Button variant="secondary" icon={Download}>Export Alerts</Button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {alertStats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: stat.color }}>{stat.label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.change} from yesterday</p>
              </div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <Bell className="w-6 h-6" style={{ color: stat.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters and Controls */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Severity</label>
              <select 
                value={filterSeverity} 
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard, 
                  borderColor: colors.border,
                  color: colors.text 
                }}
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Status</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard, 
                  borderColor: colors.border,
                  color: colors.text 
                }}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="investigating">Investigating</option>
                <option value="monitoring">Monitoring</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Sort By</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard, 
                  borderColor: colors.border,
                  color: colors.text 
                }}
              >
                <option value="timestamp">Latest First</option>
                <option value="severity">Severity</option>
                <option value="confidence">Confidence</option>
                <option value="affected">Affected Users</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" icon={Filter}>Advanced Filters</Button>
            <Button variant="ghost" icon={RotateCcw}>Refresh</Button>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="p-6 hover:scale-[1.02] transition-transform cursor-pointer"
                onClick={() => setSelectedAlert(alert)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getSeverityColor(alert.severity) }}
                  />
                  <h3 className="font-semibold text-lg" style={{ color: colors.text }}>{alert.title}</h3>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getSeverityColor(alert.severity)}20`,
                      color: getSeverityColor(alert.severity)
                    }}
                  >
                    {alert.severity.toUpperCase()}
                  </span>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getStatusColor(alert.status)}20`,
                      color: getStatusColor(alert.status)
                    }}
                  >
                    {alert.status.toUpperCase()}
                  </span>
                </div>
                
                <p className="mb-3" style={{ color: colors.textSecondary }}>{alert.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm" style={{ color: colors.textMuted }}>
                  <span>📱 {alert.platform}</span>
                  <span>👥 {alert.affectedUsers.toLocaleString()} users</span>
                  <span>🎯 {alert.confidence}% confidence</span>
                  <span>⏰ {alert.timestamp}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {alert.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded text-xs"
                          style={{ backgroundColor: colors.bgSecondary, color: colors.textSecondary }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 ml-4">
                <Button variant="primary" size="sm" 
                        onClick={(e) => { e.stopPropagation(); handleAlertAction(alert.id, 'investigate'); }}>
                  Investigate
                </Button>
                <Button variant="secondary" size="sm"
                        onClick={(e) => { e.stopPropagation(); handleAlertAction(alert.id, 'escalate'); }}>
                  Escalate
                </Button>
                {alert.status !== 'resolved' && (
                  <Button variant="ghost" size="sm"
                          onClick={(e) => { e.stopPropagation(); handleAlertAction(alert.id, 'resolve'); }}>
                    Resolve
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: colors.text }}>{selectedAlert.title}</h2>
                  <p className="mt-2" style={{ color: colors.textSecondary }}>{selectedAlert.description}</p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedAlert(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-3" style={{ color: colors.text }}>Alert Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Severity:</span>
                      <span style={{ color: getSeverityColor(selectedAlert.severity) }}>
                        {selectedAlert.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Status:</span>
                      <span style={{ color: getStatusColor(selectedAlert.status) }}>
                        {selectedAlert.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Platform:</span>
                      <span style={{ color: colors.text }}>{selectedAlert.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Confidence:</span>
                      <span style={{ color: colors.text }}>{selectedAlert.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Affected Users:</span>
                      <span style={{ color: colors.text }}>{selectedAlert.affectedUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Timestamp:</span>
                      <span style={{ color: colors.text }}>{selectedAlert.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3" style={{ color: colors.text }}>Actions</h3>
                  <div className="space-y-3">
                    <Button variant="primary" className="w-full" icon={Search}>
                      Start Investigation
                    </Button>
                    <Button variant="secondary" className="w-full" icon={AlertTriangle}>
                      Escalate to Authorities
                    </Button>
                    <Button variant="ghost" className="w-full" icon={Flag}>
                      Flag for Review
                    </Button>
                    <Button variant="ghost" className="w-full" icon={CheckCircle}>
                      Mark as Resolved
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3" style={{ color: colors.text }}>Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 rounded-full text-sm"
                          style={{ backgroundColor: colors.primary + '20', color: colors.primary }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="primary" icon={Bell} className="h-16">
            Create Custom Alert
          </Button>
          <Button variant="secondary" icon={Settings} className="h-16">
            Configure Thresholds
          </Button>
          <Button variant="ghost" icon={Download} className="h-16">
            Export Alert Data
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AlertManagementPage;