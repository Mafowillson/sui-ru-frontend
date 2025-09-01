import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Globe, Shield, Activity, Search, Eye, Zap, Globe2, Network, Brain, Radar, Target, UserPlus, CheckCircle, Camera, Video, Play, Send, Users2, MessageSquare, MessageCircle, Heart, Vote } from 'lucide-react';
import InteractiveMap from '../InteractiveMapLeaflet';
import 'leaflet/dist/leaflet.css';

const LandingPage = ({ onAuthClick, onDemoClick }) => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [stats] = useState({
    contentMonitored: 2480000,
    accuracyRate: 94,
    platformsMonitored: 5,
    threatsDetected: 12500,
    countriesProtected: 15,
    responseTime: 2.3
  });

  // Dynamic Text Animation Component
  const DynamicWelcomeText = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const words = [
      'Sui-Ru',
      'Digital Safety', 
      'AI Protection',
      'Smart Defense',
      'Cyber Security',
      'Cameroon Monitor'
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentWordIndex(prev => (prev + 1) % words.length);
      }, 2500);
      return () => clearInterval(interval);
    }, [words.length]);

    return (
      <div className="relative h-20 overflow-hidden">
        {words.map((word, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentWordIndex 
                ? 'transform translate-y-0 opacity-100' 
                : index < currentWordIndex 
                  ? 'transform -translate-y-full opacity-0'
                  : 'transform translate-y-full opacity-0'
            }`}
          >
            <span 
              className="bg-clip-text text-transparent text-6xl lg:text-7xl font-bold block"
              style={{ 
                background: colors.gradientPrimary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {word}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Floating background elements
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main flowing curves */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="curve1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: colors.primary, stopOpacity: 0.1 }} />
            <stop offset="50%" style={{ stopColor: colors.secondary, stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: colors.primary, stopOpacity: 0.1 }} />
          </linearGradient>
          <linearGradient id="curve2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: colors.secondary, stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: colors.primary, stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>
        
        {/* Large flowing curve */}
        <path
          d="M0,400 Q300,200 600,300 T1200,250"
          stroke="url(#curve1)"
          strokeWidth="100"
          fill="none"
          className="animate-pulse"
        />
        
        {/* Secondary curve */}
        <path
          d="M200,600 Q500,400 800,500 T1400,450"
          stroke="url(#curve2)"
          strokeWidth="60"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        
        {/* Subtle accent curves */}
        {[...Array(5)].map((_, i) => (
          <path
            key={i}
            d={`M${i * 200},${300 + i * 50} Q${300 + i * 100},${200 + i * 30} ${600 + i * 150},${250 + i * 40}`}
            stroke={colors.primary}
            strokeWidth="2"
            fill="none"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-pulse"
          style={{
            backgroundColor: colors.primary,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div 
      className="pt-16 min-h-screen relative overflow-hidden transition-all duration-500"
      style={{ backgroundColor: colors.bg }}
    >
      <FloatingElements />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Badge */}
              <div 
                className="inline-flex items-center px-6 py-3 border rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10)`,
                  borderColor: `${colors.primary}30`,
                  boxShadow: `0 0 30px ${colors.primary}20`
                }}
              >
                <Zap className="w-5 h-5 mr-3" style={{ color: colors.primary }} />
                <span className="font-medium" style={{ color: colors.primary }}>AI-Powered Detection System</span>
                <div className="ml-3 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.success }} />
              </div>
              
              {/* Main Heading with Dynamic Text */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                    <span style={{ color: colors.text }}>Welcome to</span>
                  </h1>
                  <DynamicWelcomeText />
                </div>
                
                <div className="text-2xl font-light leading-relaxed max-w-2xl" style={{ color: colors.textSecondary }}>
                  Advanced <span className="font-semibold" style={{ color: colors.primary }}>misinformation</span> and{' '}
                  <span className="font-semibold" style={{ color: colors.secondary }}>hate speech</span> monitoring
                  for Cameroon's digital communities
                </div>
              </div>

              {/* Search Bar */}
              <div className="max-w-md">
                <div 
                  className="flex items-center px-6 py-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 focus-within:scale-105"
                  style={{ 
                    backgroundColor: colors.bgCard,
                    borderColor: colors.border,
                    boxShadow: `0 0 40px ${colors.primary}10`
                  }}
                >
                  <Search className="w-5 h-5 mr-4" style={{ color: colors.textMuted }} />
                  <input
                    type="text"
                    placeholder="Search threats, content, or regions..."
                    className="flex-1 bg-transparent outline-none text-lg"
                    style={{ color: colors.text }}
                  />
                  <Button variant="primary" size="sm" className="ml-2">
                    <Search size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => onAuthClick('login')}
                className="px-8 py-4 text-lg font-semibold"
              >
                <Eye className="w-6 h-6 mr-3" />
                Get Started
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => onDemoClick()}
                className="px-8 py-4 text-lg"
              >
                <UserPlus className="w-6 h-6 mr-3" />
                Try Demo
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: colors.text }}>
                  {(stats.contentMonitored / 1000000).toFixed(1)}M+
                </div>
                <div className="text-sm" style={{ color: colors.textMuted }}>Content Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: colors.text }}>
                  {stats.accuracyRate}%
                </div>
                <div className="text-sm" style={{ color: colors.textMuted }}>Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: colors.text }}>
                  {stats.responseTime}s
                </div>
                <div className="text-sm" style={{ color: colors.textMuted }}>Response Time</div>
              </div>
            </div>
          </div>

         {/* Right Column - 3D Cameroon */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-lg">
            <InteractiveMap theme={colors} />
          </div>
        </div>
        </div>

        {/* Stats Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.text }}>
              Protecting Digital Cameroon
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Real-time monitoring and analysis across multiple platforms with AI-powered threat detection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card 
              className="p-8 text-center transition-all duration-300 hover:scale-105 relative overflow-hidden cursor-pointer" 
              glow
              onClick={() => navigate('/dashboard')}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-5" style={{ background: colors.gradientPrimary }} />
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: colors.gradientPrimary }}
              >
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2" style={{ color: colors.text }}>
                {stats.threatsDetected.toLocaleString()}+
              </div>
              <div className="text-lg font-medium mb-2" style={{ color: colors.primary }}>Threats Detected</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>This month</div>
            </Card>

            <Card 
              className="p-8 text-center transition-all duration-300 hover:scale-105 relative overflow-hidden cursor-pointer" 
              glow
              onClick={() => navigate('/geographic-intel')}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-5" style={{ background: colors.gradientSecondary }} />
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: colors.gradientSecondary }}
              >
                <Globe2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2" style={{ color: colors.text }}>
                10
              </div>
              <div className="text-lg font-medium mb-2" style={{ color: colors.secondary }}>Regions Protected</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Across Cameroon</div>
            </Card>

            <Card 
              className="p-8 text-center transition-all duration-300 hover:scale-105 relative overflow-hidden cursor-pointer" 
              glow
              onClick={() => navigate('/live-monitoring')}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-5" style={{ background: colors.gradientSuccess }} />
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: colors.gradientSuccess }}
              >
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2" style={{ color: colors.text }}>
                24/7
              </div>
              <div className="text-lg font-medium mb-2" style={{ color: colors.success }}>Live Monitoring</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Always active</div>
            </Card>

            <Card 
              className="p-8 text-center transition-all duration-300 hover:scale-105 relative overflow-hidden cursor-pointer" 
              glow
              onClick={() => navigate('/dashboard')}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-5" style={{ background: colors.gradientDanger }} />
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: colors.gradientDanger }}
              >
                <Network className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2" style={{ color: colors.text }}>
                {stats.platformsMonitored}+
              </div>
              <div className="text-lg font-medium mb-2" style={{ color: colors.danger }}>Platforms</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Monitored</div>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.text }}>
              Advanced AI Detection
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Cutting-edge technology specifically trained for Cameroon's contexts and languages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 transition-all duration-300 hover:scale-105 relative overflow-hidden" glow>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-10 rounded-full" style={{ background: colors.gradientPrimary }} />
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <Brain className="w-7 h-7" style={{ color: colors.primary }} />
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>AI Detection</h3>
              <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
                Machine learning algorithms trained on Cameroon's languages and cultural contexts for accurate threat identification.
              </p>
            </Card>

            <Card className="p-8 transition-all duration-300 hover:scale-105 relative overflow-hidden" glow>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-10 rounded-full" style={{ background: colors.gradientSecondary }} />
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${colors.secondary}20` }}
              >
                <Radar className="w-7 h-7" style={{ color: colors.secondary }} />
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Real-time Analysis</h3>
              <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
                Monitor social media platforms in real-time with instant threat detection and automated response systems.
              </p>
            </Card>

            <Card className="p-8 transition-all duration-300 hover:scale-105 relative overflow-hidden" glow>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-10 rounded-full" style={{ background: colors.gradientSuccess }} />
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${colors.success}20` }}
              >
                <Target className="w-7 h-7" style={{ color: colors.success }} />
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>Precision Alerts</h3>
              <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
                Intelligent alert system that prioritizes threats and provides actionable insights for rapid response.
              </p>
            </Card>
          </div>
        </div>

        {/* Case Studies Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.text }}>
              Success Stories
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Real-world impact of Sui-Ru in protecting Cameroon's digital communities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: "Municipal Election Protection",
                location: "Douala, Littoral Region, 2023",
                challenge: "Widespread misinformation campaigns targeting municipal electoral processes across social media platforms",
                solution: "Deployed Sui-Ru's AI monitoring system to track and identify false election information in real-time across Cameroon's regions",
                results: [
                  "Detected 1,247 false election posts",
                  "Prevented 91% from viral spread",
                  "Protected 8M+ Cameroonians from misinformation"
                ],
                icon: Vote,
                color: colors.primary
              },
              {
                title: "Regional Harmony Initiative",
                location: "Northwest & Southwest Regions, 2023",
                challenge: "Rising regional tensions fueled by hate speech on social media platforms between different communities",
                solution: "Implemented comprehensive hate speech detection with cultural context understanding for Cameroon's diverse regions",
                results: [
                  "Identified 834 hate speech incidents",
                  "Reduced regional tension posts by 68%",
                  "Improved inter-community relations index by 42%"
                ],
                icon: Heart,
                color: colors.success
              }
            ].map((study, index) => (
              <Card key={index} className="p-8 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 rounded-full" style={{ background: `linear-gradient(135deg, ${study.color}20, ${study.color}10)` }} />
                <div className="relative z-10">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${study.color}20` }}
                  >
                    <study.icon className="w-8 h-8" style={{ color: study.color }} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{study.title}</h3>
                  <p className="text-sm font-medium mb-4" style={{ color: colors.textSecondary }}>{study.location}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2" style={{ color: colors.text }}>Challenge</h4>
                      <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2" style={{ color: colors.text }}>Solution</h4>
                      <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{study.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: colors.text }}>Results</h4>
                      <ul className="space-y-2">
                        {study.results.map((result, i) => (
                          <li key={i} className="flex items-center text-sm" style={{ color: colors.textSecondary }}>
                            <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: colors.success }} />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Coverage Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.text }}>
              Comprehensive Platform Coverage
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Monitor threats across all major social media and messaging platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {[
              { name: "Facebook", icon: Globe, users: "2.9B", coverage: "98%" },
              { name: "WhatsApp", icon: MessageSquare, users: "2.0B", coverage: "95%" },
              { name: "Twitter/X", icon: MessageCircle, users: "450M", coverage: "97%" },
              { name: "Instagram", icon: Camera, users: "2.0B", coverage: "94%" },
              { name: "TikTok", icon: Video, users: "1.0B", coverage: "92%" },
              { name: "YouTube", icon: Play, users: "2.7B", coverage: "96%" },
              { name: "Telegram", icon: Send, users: "700M", coverage: "89%" },
              { name: "LinkedIn", icon: Users2, users: "900M", coverage: "91%" }
            ].map((platform, index) => (
              <Card key={index} className="p-6 text-center transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br opacity-5" style={{ background: colors.gradientPrimary }} />
                <div className="relative z-10">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: colors.bgTertiary }}
                  >
                    <platform.icon className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                  <h4 className="font-semibold mb-1" style={{ color: colors.text }}>{platform.name}</h4>
                  <p className="text-xs mb-2" style={{ color: colors.textSecondary }}>{platform.users} users</p>
                  <div className="text-xs font-medium" style={{ color: colors.success }}>{platform.coverage} coverage</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Model Testing Demo Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6" style={{ color: colors.text }}>
              🚀 Try Our AI Model Live!
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Experience the power of our hate speech detection AI in real-time. Test it with your own text content.
            </p>
          </div>

          <Card className="p-12 relative overflow-hidden max-w-4xl mx-auto" glow>
            <div className="absolute inset-0 bg-gradient-to-r opacity-5" style={{ background: colors.gradientPrimary }} />
            <div className="relative z-10 text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: colors.bgTertiary }}
              >
                <Brain className="w-10 h-10" style={{ color: colors.primary }} />
              </div>
              
              <h3 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
                Hate Speech Detection Demo
              </h3>
              
              <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
                Our AI model analyzes text content and provides detailed insights including confidence scores, 
                severity levels, and detected keywords. Perfect for demonstrating our technology's capabilities.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: colors.bgSecondary }}>
                    <Target className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: colors.text }}>Real-time Analysis</h4>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    Instant results with processing times under 5ms
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: colors.bgSecondary }}>
                    <Zap className="w-6 h-6" style={{ color: colors.warning }} />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: colors.text }}>High Accuracy</h4>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    94.2% accuracy rate across multiple languages
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: colors.bgSecondary }}>
                    <Shield className="w-6 h-6" style={{ color: colors.success }} />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: colors.text }}>Detailed Insights</h4>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    Confidence scores, severity levels, and explanations
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => navigate('/model-testing')}
                  className="px-10 py-5 text-lg font-semibold"
                >
                  <Brain className="w-6 h-6 mr-3" />
                  Test the Model Now
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => onDemoClick()}
                  className="px-10 py-5 text-lg font-semibold"
                >
                  <Eye className="w-6 h-6 mr-3" />
                  View Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="py-20 text-center">
          <Card className="p-12 relative overflow-hidden" glow>
            <div className="absolute inset-0 bg-gradient-to-r opacity-5" style={{ background: colors.gradientPrimary }} />
            <div className="relative z-10">
              <h2 className="text-5xl font-bold mb-6" style={{ color: colors.text }}>
                Ready to Secure Your Digital Space?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
                Join the mission to protect African digital communities from misinformation and hate speech.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => onAuthClick('login')}
                  className="px-10 py-5 text-lg font-semibold"
                >
                  <Eye className="w-6 h-6 mr-3" />
                  Get Started
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
    </div>
  );
};

export default LandingPage



