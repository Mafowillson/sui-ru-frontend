import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Users, Shield, BarChart3, Brain, Radar } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const AboutPage = () => {
  const { colors } = useTheme();
  
  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            About Sui-Ru MHSMS
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Advanced Misinformation and Hate Speech Monitoring System
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 mr-3" style={{ color: colors.primary }} />
              <h2 className="text-2xl font-semibold" style={{ color: colors.text }}>Our Mission</h2>
            </div>
            <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
              Sui-Ru MHSMS is dedicated to protecting digital communities by providing real-time monitoring 
              and analysis of misinformation and hate speech across social media platforms. We leverage 
              advanced AI technology to detect, analyze, and respond to harmful content before it spreads.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-8 h-8 mr-3" style={{ color: colors.secondary }} />
              <h2 className="text-2xl font-semibold" style={{ color: colors.text }}>AI Technology</h2>
            </div>
            <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
              Our system uses cutting-edge machine learning algorithms and natural language processing 
              to identify patterns, analyze sentiment, and classify content with high accuracy. 
              We continuously improve our models to stay ahead of evolving threats.
            </p>
          </Card>
        </div>

        <Card className="p-8 mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-center" style={{ color: colors.text }}>
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Radar className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>Real-time Monitoring</h3>
              <p style={{ color: colors.textSecondary }}>
                24/7 surveillance of social media platforms for immediate threat detection
              </p>
            </div>
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4" style={{ color: colors.secondary }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>Advanced Analytics</h3>
              <p style={{ color: colors.textSecondary }}>
                Comprehensive data analysis and visualization for informed decision making
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4" style={{ color: colors.success }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>Community Protection</h3>
              <p style={{ color: colors.textSecondary }}>
                Safeguarding online communities from harmful content and misinformation
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>
            Our Commitment
          </h2>
          <p className="text-lg leading-relaxed mb-4" style={{ color: colors.textSecondary }}>
            We are committed to maintaining the highest standards of accuracy, privacy, and ethical AI practices. 
            Our team works closely with cybersecurity experts, social media platforms, and government agencies 
            to ensure effective and responsible content monitoring.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Badge variant="primary" size="lg">Privacy First</Badge>
            <Badge variant="success" size="lg">Ethical AI</Badge>
            <Badge variant="secondary" size="lg">24/7 Support</Badge>
            <Badge variant="outline" size="lg">Continuous Innovation</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage
