import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { CheckCircle, Loader2, Flag } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import axiosInstance from '../../axiosInstance';

const ReportPage = () => {
  const { colors } = useTheme();
  const [reportData, setReportData] = useState({
    reporter_name: '',
    reporter_email: '',
    content_type: '',
    platform: '',
    url: '',
    urgency_level: '',
    description: '',
    evidence: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('reporter_name', reportData.reporter_name);
      formData.append('reporter_email', reportData.reporter_email);
      formData.append('content_type', reportData.content_type);
      formData.append('platform', reportData.platform);
      formData.append('url', reportData.url);
      formData.append('urgency_level', reportData.urgency_level);
      formData.append('description', reportData.description);
      if (reportData.evidence) {
        formData.append('evidence', reportData.evidence);
      }
      const response = await axiosInstance.post('/api/reports/suspecious/', formData, {
        skipAuth: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.status === 201) {
        setSubmitted(true);
        setReportData({
          reporter_name: '',
          reporter_email: '',
          content_type: '',
          platform: '',
          url: '',
          urgency_level: '',
          description: '',
          evidence: null
        });
      } else {
        console.error('Failed to submit report:', response.data);
      }
    } catch (error) {
      console.error('Error submitting report:', error);
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (field, value) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };
  const handleFileChange = (e) => {
    setReportData(prev => ({ ...prev, evidence: e.target.files[0] }));
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: colors.success }} />
            <h1 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
              Report Submitted Successfully
            </h1>
            <p className="text-lg mb-6" style={{ color: colors.textSecondary }}>
              Thank you for your report. Our team will review it and take appropriate action.
            </p>
            <div className="space-y-2 mb-6">
              <p style={{ color: colors.textSecondary }}>
                <strong>Report ID:</strong> #RPT-{Date.now().toString().slice(-6)}
              </p>
              <p style={{ color: colors.textSecondary }}>
                <strong>Status:</strong> Under Review
              </p>
            </div>
            <Button variant="primary" onClick={() => setSubmitted(false)}>
              Submit Another Report
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Report Suspicious Content
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Help us identify and address harmful content on social media platforms
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Your Name *
              </label>
              <input
                type="text"
                value={reportData.reporter_name}
                onChange={e => handleInputChange('reporter_name', e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border, color: colors.text }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Your Email *
              </label>
              <input
                type="email"
                value={reportData.reporter_email}
                onChange={e => handleInputChange('reporter_email', e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border, color: colors.text }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Content Type *
              </label>
              <select
                value={reportData.content_type}
                onChange={e => handleInputChange('content_type', e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border, color: colors.text }}
              >
                <option value="">Select content type</option>
                <option value="misinformation">Misinformation</option>
                <option value="hate_speech">Hate Speech</option>
                <option value="harassment">Harassment</option>
                <option value="spam">Spam</option>
                <option value="fake_news">Fake News</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Platform *
              </label>
              <select
                value={reportData.platform}
                onChange={e => handleInputChange('platform', e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border, color: colors.text }}
              >
                <option value="">Select platform</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Content URL or Link
              </label>
              <input
                type="url"
                value={reportData.url}
                onChange={e => handleInputChange('url', e.target.value)}
                placeholder="https://example.com/post"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border, color: colors.text }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Urgency Level *
              </label>
              <select
                value={reportData.urgency_level}
                onChange={e => handleInputChange('urgency_level', e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border, color: colors.text }}
              >
                <option value="">Select urgency</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Description *
              </label>
              <textarea
                value={reportData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                required
                rows={4}
                placeholder="Please provide details about the suspicious content..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border, color: colors.text }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Evidence (Optional)
              </label>
              <input
                type="file"
                accept="image/*,video/*,application/pdf"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border, color: colors.text }}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting Report...
                </>
              ) : (
                <>
                  <Flag className="w-4 h-4 mr-2" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        </Card>

        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            What Happens Next?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1" style={{ backgroundColor: colors.primary }}>
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: colors.text }}>Immediate Review</h3>
                <p style={{ color: colors.textSecondary }}>
                  Your report is immediately logged and assigned to our analysis team
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1" style={{ backgroundColor: colors.secondary }}>
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: colors.text }}>AI Analysis</h3>
                <p style={{ color: colors.textSecondary }}>
                  Our AI systems analyze the reported content for verification
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1" style={{ backgroundColor: colors.success }}>
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: colors.text }}>Action Taken</h3>
                <p style={{ color: colors.textSecondary }}>
                  Appropriate measures are taken based on the analysis results
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportPage;


