import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { Download, Calendar, Clock, FileText, Settings, Eye, CheckCircle, AlertTriangle, Trash2, MessageSquare, User, MapPin, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import axiosInstance from '../../axiosInstance';



const ReportsPage = () => {
  const { colors } = useTheme();
  const [selectedReport, setSelectedReport] = useState('summary');
  const [dateRange, setDateRange] = useState('7d');
  const [reportFormat, setReportFormat] = useState('pdf');
  const [activeTab, setActiveTab] = useState('analytics');
  const [selectedUserReport, setSelectedUserReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // get reports from api
  const getReportsFromApi = async () => {
    setLoading(true);
    setError('');
    try {
      // Remove skipAuth: true to require Authorization header
      const response = await axiosInstance.get('/api/reports/suspecious/list/');
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching reports');
      setLoading(false);
      console.error('Error fetching reports:', error);
    }
  }
  
  // Mock user submitted reports data
  // const userReports = [
  //   {
  //     id: 'USR001',
  //     type: 'misinformation',
  //     platform: 'facebook',
  //     url: 'https://facebook.com/post/123456',
  //     description: 'False information about election results being spread in local groups',
  //     urgency: 'high',
  //     contact: 'user1@example.com',
  //     submittedAt: '2024-06-20T10:30:00Z',
  //     status: 'pending',
  //     location: 'Douala, Cameroon',
  //     engagement: 1250
  //   },
  //   {
  //     id: 'USR002',
  //     type: 'hate_speech',
  //     platform: 'twitter',
  //     url: 'https://twitter.com/user/status/789012',
  //     description: 'Ethnic hate speech targeting specific communities',
  //     urgency: 'critical',
  //     contact: 'user2@example.com',
  //     submittedAt: '2024-06-20T09:15:00Z',
  //     status: 'investigating',
  //     location: 'Yaoundé, Cameroon',
  //     engagement: 890
  //   },
  //   {
  //     id: 'USR003',
  //     type: 'spam',
  //     platform: 'whatsapp',
  //     url: '',
  //     description: 'Spam messages promoting fake investment schemes',
  //     urgency: 'medium',
  //     contact: '',
  //     submittedAt: '2024-06-20T08:45:00Z',
  //     status: 'resolved',
  //     location: 'Bamenda, Cameroon',
  //     engagement: 450
  //   },
  //   {
  //     id: 'USR004',
  //     type: 'fake_news',
  //     platform: 'instagram',
  //     url: 'https://instagram.com/p/345678',
  //     description: 'Fake news about health crisis spreading panic',
  //     urgency: 'high',
  //     contact: 'user4@example.com',
  //     submittedAt: '2024-06-19T16:20:00Z',
  //     status: 'pending',
  //     location: 'Garoua, Cameroon',
  //     engagement: 2100
  //   },
  //   {
  //     id: 'USR005',
  //     type: 'harassment',
  //     platform: 'tiktok',
  //     url: 'https://tiktok.com/@user/video/567890',
  //     description: 'Cyberbullying and harassment of minors',
  //     urgency: 'critical',
  //     contact: 'user5@example.com',
  //     submittedAt: '2024-06-19T14:10:00Z',
  //     status: 'investigating',
  //     location: 'Maroua, Cameroon',
  //     engagement: 750
  //   }
  // ];

  const handleReportAction = (reportId, action) => {
    console.log(`Performing ${action} on report ${reportId}`);
    // Here you would implement the actual action logic
    alert(`${action} performed on report ${reportId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return colors.warning;
      case 'investigating': return colors.primary;
      case 'resolved': return colors.success;
      case 'rejected': return colors.danger;
      default: return colors.textMuted;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return colors.danger;
      case 'high': return colors.warning;
      case 'medium': return colors.primary;
      case 'low': return colors.success;
      default: return colors.textMuted;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const UserReportsManagement = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold" style={{ color: colors.text }}>User Submitted Reports</h3>
          <p style={{ color: colors.textSecondary }}>Manage and review reports submitted by users</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Reports Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: colors.warning }}>Pending</p>
              <p className="text-2xl font-bold" style={{ color: colors.text }}>
                {reports.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8" style={{ color: colors.warning }} />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: colors.primary }}>Investigating</p>
              <p className="text-2xl font-bold" style={{ color: colors.text }}>
                {reports.filter(r => r.status === 'investigating').length}
              </p>
            </div>
            <Eye className="w-8 h-8" style={{ color: colors.primary }} />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: colors.success }}>Resolved</p>
              <p className="text-2xl font-bold" style={{ color: colors.text }}>
                {reports.filter(r => r.status === 'resolved').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8" style={{ color: colors.success }} />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: colors.text }}>Total Reports</p>
              <p className="text-2xl font-bold" style={{ color: colors.text }}>{reports.length}</p>
            </div>
            <FileText className="w-8 h-8" style={{ color: colors.textMuted }} />
          </div>
        </Card>
      </div>

      {/* Reports List */}
      <Card className="p-6">
        {loading ? (
          <div className="text-center py-8" style={{ color: colors.textSecondary }}>Loading reports...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <div className="space-y-4">
            {reports.length === 0 ? (
              <div className="text-center py-8" style={{ color: colors.textSecondary }}>No reports found.</div>
            ) : (
              reports.map((report) => (
                <div 
                  key={report.id}
                  className="border rounded-lg p-4 transition-all duration-200 hover:scale-[1.01]"
                  style={{ 
                    borderColor: colors.border,
                    backgroundColor: colors.bgCard
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          style={{ 
                            backgroundColor: getUrgencyColor(report.urgency) + '20',
                            color: getUrgencyColor(report.urgency),
                            borderColor: getUrgencyColor(report.urgency)
                          }}
                        >
                          {report.urgency} priority
                        </Badge>
                        <Badge 
                          style={{ 
                            backgroundColor: colors.secondary + '20',
                            color: colors.secondary,
                            borderColor: colors.secondary
                          }}
                        >
                          {report.type.replace('_', ' ')}
                        </Badge>
                        <Badge 
                          style={{ 
                            backgroundColor: getStatusColor(report.status) + '20',
                            color: getStatusColor(report.status),
                            borderColor: getStatusColor(report.status)
                          }}
                        >
                          {report.status}
                        </Badge>
                      </div>
                      
                      <h4 className="font-semibold mb-2" style={{ color: colors.text }}>
                        Report #{report.id}
                      </h4>
                      
                      <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                        {report.description}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" style={{ color: colors.textMuted }}>
                        <div className="flex items-center gap-1">
                          <MessageSquare size={12} />
                          <span>{report.platform}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          <span>{report.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={12} />
                          <span>{report.engagement} engaged</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{formatDate(report.submittedAt)}</span>
                        </div>
                      </div>
                      
                      {report.url && (
                        <div className="mt-2">
                          <a 
                            href={report.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm flex items-center gap-1 hover:underline"
                            style={{ color: colors.primary }}
                          >
                            <ExternalLink size={12} />
                            View Original Content
                          </a>
                        </div>
                      )}
                      
                      {report.contact && (
                        <div className="mt-2">
                          <span className="text-sm" style={{ color: colors.textMuted }}>
                            Contact: {report.contact}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => setSelectedUserReport(report)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      
                      {report.status === 'pending' && (
                        <Button 
                          variant="warning" 
                          size="sm"
                          onClick={() => handleReportAction(report.id, 'investigate')}
                        >
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Investigate
                        </Button>
                      )}
                      
                      {report.status === 'investigating' && (
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleReportAction(report.id, 'resolve')}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                      )}
                      
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleReportAction(report.id, 'delete')}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </Card>

      {/* Report Detail Modal */}
      {selectedUserReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                  Report Details - #{selectedUserReport.id}
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedUserReport(null)}
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium" style={{ color: colors.textMuted }}>Type</label>
                    <p style={{ color: colors.text }}>{selectedUserReport.type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: colors.textMuted }}>Platform</label>
                    <p style={{ color: colors.text }}>{selectedUserReport.platform}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: colors.textMuted }}>Urgency</label>
                    <p style={{ color: colors.text }}>{selectedUserReport.urgency}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: colors.textMuted }}>Status</label>
                    <p style={{ color: colors.text }}>{selectedUserReport.status}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium" style={{ color: colors.textMuted }}>Description</label>
                  <p style={{ color: colors.text }}>{selectedUserReport.description}</p>
                </div>
                
                {selectedUserReport.url && (
                  <div>
                    <label className="text-sm font-medium" style={{ color: colors.textMuted }}>URL</label>
                    <a 
                      href={selectedUserReport.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block hover:underline"
                      style={{ color: colors.primary }}
                    >
                      {selectedUserReport.url}
                    </a>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium" style={{ color: colors.textMuted }}>Location</label>
                    <p style={{ color: colors.text }}>{selectedUserReport.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium" style={{ color: colors.textMuted }}>Engagement</label>
                    <p style={{ color: colors.text }}>{selectedUserReport.engagement} users</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium" style={{ color: colors.textMuted }}>Submitted At</label>
                  <p style={{ color: colors.text }}>{formatDate(selectedUserReport.submittedAt)}</p>
                </div>
                
                {selectedUserReport.contact && (
                  <div>
                    <label className="text-sm font-medium" style={{ color: colors.textMuted }}>Contact</label>
                    <p style={{ color: colors.text }}>{selectedUserReport.contact}</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button 
                  variant="primary"
                  onClick={() => handleReportAction(selectedUserReport.id, 'investigate')}
                >
                  Start Investigation
                </Button>
                <Button 
                  variant="success"
                  onClick={() => handleReportAction(selectedUserReport.id, 'resolve')}
                >
                  Mark as Resolved
                </Button>
                <Button 
                  variant="danger"
                  onClick={() => handleReportAction(selectedUserReport.id, 'reject')}
                >
                  Reject Report
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );

  const reportTypes = [
    { id: 'summary', name: 'Executive Summary', description: 'High-level overview of threats and system performance' },
    { id: 'detailed', name: 'Detailed Analysis', description: 'Comprehensive breakdown of all detected threats' },
    { id: 'platform', name: 'Platform-specific', description: 'Individual reports for each monitored platform' },
    { id: 'geographic', name: 'Geographic Analysis', description: 'Regional threat distribution and patterns' },
    { id: 'trend', name: 'Trend Analysis', description: 'Historical trends and predictive insights' }
  ];

  const recentReports = [
    { id: 1, name: 'Weekly Threat Summary', type: 'Executive Summary', date: '2024-06-10', status: 'completed', size: '2.4 MB' },
    { id: 2, name: 'Facebook Deep Dive', type: 'Platform Analysis', date: '2024-06-09', status: 'completed', size: '5.7 MB' },
    { id: 3, name: 'Regional Threat Map', type: 'Geographic Analysis', date: '2024-06-08', status: 'completed', size: '3.1 MB' },
    { id: 4, name: 'Monthly Trend Report', type: 'Trend Analysis', date: '2024-06-07', status: 'processing', size: '- MB' },
    { id: 5, name: 'Instagram Content Analysis', type: 'Platform Analysis', date: '2024-06-06', status: 'completed', size: '4.2 MB' }
  ];

  const reportMetrics = [
    { label: 'Total Reports Generated', value: '1,247', change: '+12%', color: colors.primary },
    { label: 'Average Processing Time', value: '3.2 min', change: '-8%', color: colors.success },
    { label: 'Reports Downloaded', value: '892', change: '+24%', color: colors.secondary },
    { label: 'Automated Reports', value: '156', change: '+45%', color: colors.warning }
  ];

  const generateReport = () => {
    // Simulate report generation
    alert(`Generating ${reportTypes.find(r => r.id === selectedReport)?.name} report for ${dateRange} in ${reportFormat.toUpperCase()} format...`);
  };

  // Fetch reports on mount
  useEffect(() => {
    getReportsFromApi();
  }, []);

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b" style={{ borderColor: colors.border }}>
        <Button
          variant={activeTab === 'analytics' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('analytics')}
          className="pb-2"
        >
          <FileText className="w-4 h-4 mr-2" />
          Analytics Reports
        </Button>
        <Button
          variant={activeTab === 'user-reports' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('user-reports')}
          className="pb-2"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          User Reports
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === 'user-reports' ? (
        <UserReportsManagement />
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Reports & Analytics</h2>
              <p style={{ color: colors.textSecondary }}>Generate and manage comprehensive threat analysis reports</p>
            </div>
            <Button variant="primary" icon={Download} onClick={generateReport}>
              Generate New Report
            </Button>
          </div>

      {/* Report Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportMetrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: metric.color }}>{metric.label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>{metric.value}</p>
                <p className="text-xs mt-1" style={{ color: metric.color }}>{metric.change} from last period</p>
              </div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <FileText className="w-6 h-6" style={{ color: metric.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Report Generation */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Generate Custom Report</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Report Type</label>
            <select 
              value={selectedReport} 
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
                color: colors.text 
              }}
            >
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>
              {reportTypes.find(r => r.id === selectedReport)?.description}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Date Range</label>
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
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
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>Format</label>
            <select 
              value={reportFormat} 
              onChange={(e) => setReportFormat(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ 
                backgroundColor: colors.bgCard, 
                borderColor: colors.border,
                color: colors.text 
              }}
            >
              <option value="pdf">PDF Document</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="csv">CSV Data</option>
              <option value="json">JSON Data</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Recent Reports */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold" style={{ color: colors.text }}>Recent Reports</h3>
          <Button variant="ghost" icon={Calendar}>View All Reports</Button>
        </div>
        <div className="space-y-4">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border"
                 style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border }}>
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <FileText className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: colors.text }}>{report.reporter_name}</h4>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {report.content_type} • {report.date_reported}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {report.status}
                </span>
                <Button variant="ghost" size="sm" icon={Settings}>Configure</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Report Templates */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((template) => (
            <div key={template.id} className="p-4 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                 style={{ backgroundColor: colors.bgCard, borderColor: colors.border }}
                 onClick={() => setSelectedReport(template.id)}>
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                </div>
                <h4 className="font-semibold" style={{ color: colors.text }}>{template.name}</h4>
              </div>
              <p className="text-sm" style={{ color: colors.textSecondary }}>{template.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs" style={{ color: colors.textMuted }}>Template</span>
                <Button variant="ghost" size="sm">Use Template</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Scheduled Reports */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>Scheduled Reports</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg"
               style={{ backgroundColor: colors.bgSecondary }}>
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.success + '20' }}
              >
                <Clock className="w-5 h-5" style={{ color: colors.success }} />
              </div>
              <div>
                <h4 className="font-semibold" style={{ color: colors.text }}>Weekly Executive Summary</h4>
                <p className="text-sm" style={{ color: colors.textSecondary }}>Every Monday at 9:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
              <Button variant="ghost" size="sm" icon={Settings}>Configure</Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg"
               style={{ backgroundColor: colors.bgSecondary }}>
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colors.warning + '20' }}
              >
                <Clock className="w-5 h-5" style={{ color: colors.warning }} />
              </div>
              <div>
                <h4 className="font-semibold" style={{ color: colors.text }}>Monthly Trend Analysis</h4>
                <p className="text-sm" style={{ color: colors.textSecondary }}>First day of each month at 8:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Paused</span>
              <Button variant="ghost" size="sm" icon={Settings}>Configure</Button>
            </div>
          </div>
        </div>
      </Card>
        </>
      )}
    </div>
  );
};

export default ReportsPage