import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Loader2, Send, AlertTriangle, CheckCircle, XCircle, Brain, Clock, Zap, Play, Pause, RefreshCw, Globe, MessageCircle, Heart, Share, Flag, Download } from 'lucide-react';
import { detectHateSpeech } from '../services/apiService';

// Note: jsPDF needs to be installed: npm install jspdf jspdf-autotable
// For now, we'll use a simple text-based PDF generation

const ModelTestingPage = () => {
  const { colors } = useTheme();
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [socialMediaPosts, setSocialMediaPosts] = useState([]);
  const [simulationSpeed, setSimulationSpeed] = useState(3000); // 3 seconds between posts
  const [analyzedPosts, setAnalyzedPosts] = useState({});
  const [simulationInterval, setSimulationInterval] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filters, setFilters] = useState({
    platform: 'all',
    severity: 'all',
    category: 'all',
    searchText: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: ''
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  // Mock social media posts data
  const mockSocialMediaPosts = [
    {
      id: 1,
      content: "Just had the best ndolé ever at Chez Wou in Douala! 🍲 The peanut sauce was perfect. Love this community! #DoualaFood #Cameroon",
      poster: {
        username: "douala_foodie_42",
        displayName: "Sarah Abena",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: true,
        followers: 12400,
        location: "Douala, Cameroon",
        joinDate: "2020-03-15"
      },
      platform: "Twitter",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      likes: 23,
      shares: 5,
      comments: 8,
      isHateSpeech: false,
      isMisinformation: false,
      category: "positive"
    },
    {
      id: 2,
      content: "All Anglophones are separatists and should be eliminated from our country! They're destroying Cameroon! This is the truth! #Unity #OneCameroon",
      poster: {
        username: "truth_seeker_88",
        displayName: "Jean Mbarga",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 1200,
        location: "Yaoundé, Cameroon",
        joinDate: "2023-08-22"
      },
      platform: "Twitter",
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
      likes: 45,
      shares: 12,
      comments: 67,
      isHateSpeech: true,
      isMisinformation: true,
      category: "hate_speech"
    },
    {
      id: 3,
      content: "BREAKING: Scientists discover that drinking hot water with bitter leaf cures HIV in 24 hours! Share this with everyone you know! #Health #HIV #Cameroon",
      poster: {
        username: "health_guru_2024",
        displayName: "Dr. Nkem",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 8900,
        location: "Bamenda, Cameroon",
        joinDate: "2022-11-10"
      },
      platform: "Facebook",
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      likes: 156,
      shares: 89,
      comments: 34,
      isHateSpeech: false,
      isMisinformation: true,
      category: "misinformation"
    },
    {
      id: 4,
      content: "Happy birthday to my amazing sister! 🎉 You're the best person I know and I'm so lucky to have you in my life! #Family #Love #Buea",
      poster: {
        username: "sister_love_99",
        displayName: "Emma Fon",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: true,
        followers: 5600,
        location: "Buea, Cameroon",
        joinDate: "2019-06-12"
      },
      platform: "Instagram",
      timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
      likes: 89,
      shares: 12,
      comments: 23,
      isHateSpeech: false,
      isMisinformation: false,
      category: "positive"
    },
    {
      id: 5,
      content: "The government is hiding oil money in Swiss banks and they're controlling our minds with witchcraft! Wake up Cameroonians! #Corruption #Truth #Cameroon",
      poster: {
        username: "truth_bringer_777",
        displayName: "Mike Ngu",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 3400,
        location: "Kribi, Cameroon",
        joinDate: "2021-04-18"
      },
      platform: "Twitter",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      likes: 23,
      shares: 45,
      comments: 78,
      isHateSpeech: false,
      isMisinformation: true,
      category: "conspiracy"
    },
    {
      id: 6,
      content: "We need to kill all the Bamileke people and take back our country! No more mercy! They're stealing our resources! #Justice #Cameroon",
      poster: {
        username: "patriot_warrior",
        displayName: "Robert Ndi",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 2100,
        location: "Garoua, Cameroon",
        joinDate: "2023-12-01"
      },
      platform: "Facebook",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      likes: 67,
      shares: 23,
      comments: 89,
      isHateSpeech: true,
      isMisinformation: false,
      category: "hate_speech"
    },
    {
      id: 7,
      content: "Just finished reading an amazing book about climate change solutions for the Sahel region. We can make a difference together! 🌱 #ClimateAction #Sahel #Maroua",
      poster: {
        username: "eco_warrior_2024",
        displayName: "Lisa Tchokouani",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: true,
        followers: 7800,
        location: "Maroua, Cameroon",
        joinDate: "2021-02-14"
      },
      platform: "LinkedIn",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      likes: 34,
      shares: 8,
      comments: 12,
      isHateSpeech: false,
      isMisinformation: false,
      category: "positive"
    },
    {
      id: 8,
      content: "All Fulani people control the cattle trade and banks! They're plotting against us! #Fulani #Conspiracy #Ngaoundere",
      poster: {
        username: "real_truth_999",
        displayName: "Anonymous User",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 450,
        location: "Ngaoundéré, Cameroon",
        joinDate: "2024-01-15"
      },
      platform: "Twitter",
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      likes: 12,
      shares: 3,
      comments: 45,
      isHateSpeech: true,
      isMisinformation: true,
      category: "hate_speech"
    },
    {
      id: 9,
      content: "Amazing sunset over Mount Cameroon tonight! Nature is truly beautiful and healing. Grateful for moments like this ✨ #MountCameroon #Limbe #Nature",
      poster: {
        username: "nature_lover_88",
        displayName: "David Manga",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 3200,
        location: "Limbe, Cameroon",
        joinDate: "2020-09-22"
      },
      platform: "Instagram",
      timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
      likes: 67,
      shares: 15,
      comments: 9,
      isHateSpeech: false,
      isMisinformation: false,
      category: "positive"
    },
    {
      id: 10,
      content: "The deep state is using traditional healers to implant microchips! Don't trust the mainstream media! #Conspiracy #TraditionalHealers #Bertoua",
      poster: {
        username: "freedom_fighter_2024",
        displayName: "Patricia Nguemo",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
        verified: false,
        followers: 1800,
        location: "Bertoua, Cameroon",
        joinDate: "2023-05-10"
      },
      platform: "Facebook",
      timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
      likes: 89,
      shares: 156,
      comments: 234,
      isHateSpeech: false,
      isMisinformation: true,
      category: "conspiracy"
    }
  ];

  // Start simulation
  const startSimulation = () => {
    setIsSimulationRunning(true);
    setSocialMediaPosts([]);
    setAnalyzedPosts({});
    
    // Clear any existing interval
    if (simulationInterval) {
      clearInterval(simulationInterval);
    }
    
    // Create new interval for progressive post addition
    let postIndex = 0;
    const interval = setInterval(() => {
      if (postIndex >= mockSocialMediaPosts.length) {
        // All posts have been added, stop the simulation
        setIsSimulationRunning(false);
        clearInterval(interval);
        return;
      }
      
      const post = mockSocialMediaPosts[postIndex];
      setSocialMediaPosts(prev => [post, ...prev]);
      
      // Automatically analyze the post after it appears
      setTimeout(() => {
        analyzePost(post);
      }, 1000);
      
      postIndex++;
    }, simulationSpeed);
    
    setSimulationInterval(interval);
  };

  // Stop simulation
  const stopSimulation = () => {
    setIsSimulationRunning(false);
    if (simulationInterval) {
      clearInterval(simulationInterval);
      setSimulationInterval(null);
    }
  };

  // Reset simulation
  const resetSimulation = () => {
    setIsSimulationRunning(false);
    setSocialMediaPosts([]);
    setAnalyzedPosts({});
    if (simulationInterval) {
      clearInterval(simulationInterval);
      setSimulationInterval(null);
    }
  };

  // Apply filters to posts
  const applyFilters = useCallback(() => {
    let filtered = socialMediaPosts;
    
    if (filters.platform !== 'all') {
      filtered = filtered.filter(post => post.platform === filters.platform);
    }
    
    if (filters.severity !== 'all') {
      filtered = filtered.filter(post => {
        const analysis = analyzedPosts[post.id];
        return analysis && analysis.severity === filters.severity;
      });
    }
    
    if (filters.category !== 'all') {
      filtered = filtered.filter(post => post.category === filters.category);
    }
    
    if (filters.searchText) {
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        post.poster.displayName.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        post.poster.username.toLowerCase().includes(filters.searchText.toLowerCase())
      );
    }
    
    // Date filtering
    if (filters.startDate) {
      filtered = filtered.filter(post => {
        const postDate = new Date(post.timestamp).toDateString();
        const startDate = new Date(filters.startDate).toDateString();
        return postDate >= startDate;
      });
    }
    
    if (filters.endDate) {
      filtered = filtered.filter(post => {
        const postDate = new Date(post.timestamp).toDateString();
        const endDate = new Date(filters.endDate).toDateString();
        return postDate <= endDate;
      });
    }
    
    // Time filtering
    if (filters.startTime) {
      filtered = filtered.filter(post => {
        const postTime = new Date(post.timestamp).getHours() * 60 + new Date(post.timestamp).getMinutes();
        const startTime = parseInt(filters.startTime.split(':')[0]) * 60 + parseInt(filters.startTime.split(':')[1]);
        return postTime >= startTime;
      });
    }
    
    if (filters.endTime) {
      filtered = filtered.filter(post => {
        const postTime = new Date(post.timestamp).getHours() * 60 + new Date(post.timestamp).getMinutes();
        const endTime = parseInt(filters.endTime.split(':')[0]) * 60 + parseInt(filters.endTime.split(':')[1]);
        return postTime <= endTime;
      });
    }
    
    setFilteredPosts(filtered);
  }, [filters, socialMediaPosts, analyzedPosts]);

  // Update filters and apply
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Apply filters whenever filters or posts change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Initialize filtered posts when social media posts change
  useEffect(() => {
    setFilteredPosts(socialMediaPosts);
  }, [socialMediaPosts]);

  // Download results as JSON
  const downloadResults = () => {
    const results = {
      simulation_info: {
        total_posts: socialMediaPosts.length,
        analyzed_posts: Object.keys(analyzedPosts).length,
        simulation_duration: `${Math.ceil(socialMediaPosts.length * simulationSpeed / 1000)}s`,
        timestamp: new Date().toISOString()
      },
      posts: socialMediaPosts.map(post => ({
        ...post,
        analysis: analyzedPosts[post.id] || null
      })),
      filters_applied: filters
    };
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hate_speech_analysis_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download results as PDF
  const downloadPDF = () => {
    // Create a simple text-based report since jsPDF isn't installed
    const reportContent = `
HATE SPEECH DETECTION ANALYSIS REPORT
Generated: ${new Date().toLocaleString()}
Total Posts Analyzed: ${socialMediaPosts.length}
Analyzed Posts: ${Object.keys(analyzedPosts).length}

POST ANALYSIS SUMMARY:
${socialMediaPosts.map(post => {
  const analysis = analyzedPosts[post.id];
  return `
Post ID: ${post.id}
Content: ${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}
Platform: ${post.platform}
Timestamp: ${new Date(post.timestamp).toLocaleString()}
Likes: ${post.likes} | Comments: ${post.comments} | Shares: ${post.shares}
Category: ${post.category}
Severity: ${analysis?.severity || 'N/A'}
Risk Score: ${analysis?.risk_score || 'N/A'}
Confidence: ${analysis ? (analysis.confidence * 100).toFixed(1) + '%' : 'N/A'}
${analysis?.detected_keywords?.length > 0 ? `Keywords: ${analysis.detected_keywords.join(', ')}` : ''}
${analysis?.explanation ? `Explanation: ${analysis.explanation}` : ''}
---`;
}).join('')}

FILTERS APPLIED:
Platform: ${filters.platform}
Severity: ${filters.severity}
Category: ${filters.category}
Search: ${filters.searchText || 'None'}
Date Range: ${filters.startDate || 'None'} to ${filters.endDate || 'None'}
Time Range: ${filters.startTime || 'None'} to ${filters.endTime || 'None'}
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hate_speech_analysis_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Analyze a single post
  const analyzePost = async (post) => {
    try {
      const response = await detectHateSpeech(post.content);
      if (response.success) {
        setAnalyzedPosts(prev => ({
          ...prev,
          [post.id]: response.data
        }));
      }
    } catch (error) {
      console.error('Error analyzing post:', error);
    }
  };

  // API call to hate speech detection service
  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const response = await detectHateSpeech(inputText);
      
      if (response.success) {
        setAnalysisResult(response.data);
      } else {
        setError(response.error || 'Analysis failed. Please try again.');
      }
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    };
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'medium': return <AlertTriangle className="w-5 h-5" />;
      case 'low': return <CheckCircle className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getHateSpeechIcon = (isHateSpeech) => {
    return isHateSpeech ? 
      <XCircle className="w-6 h-6" style={{ color: colors.error }} /> : 
      <CheckCircle className="w-6 h-6" style={{ color: colors.success }} />;
  };

  const getCategoryBadge = (category) => {
    const variants = {
      'hate_speech': 'danger',
      'misinformation': 'warning',
      'conspiracy': 'warning',
      'positive': 'success'
    };
    
    const labels = {
      'hate_speech': 'Hate Speech',
      'misinformation': 'Misinformation',
      'conspiracy': 'Conspiracy',
      'positive': 'Safe Content'
    };
    
    return <Badge variant={variants[category]} size="sm">{labels[category]}</Badge>;
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'Twitter': '🐦',
      'Facebook': '📘',
      'Instagram': '📷',
      'LinkedIn': '💼'
    };
    return icons[platform] || '🌐';
  };

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Hate Speech Detection Model Testing
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Test our AI-powered hate speech detection model with your own text content and real-time social media simulation
          </p>
        </div>

        {/* Social Media Simulation Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
            <Globe className="w-6 h-6" style={{ color: colors.primary }} />
            Real-Time Social Media Post Simulation
          </h2>
          
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="primary" 
              onClick={startSimulation}
              disabled={isSimulationRunning}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Simulation
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={stopSimulation}
              disabled={!isSimulationRunning}
              className="flex items-center gap-2"
            >
              <Pause className="w-4 h-4" />
              Pause
            </Button>
            
            <Button 
              variant="outline" 
              onClick={resetSimulation}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </Button>
            
            <Button 
              variant="outline" 
              onClick={downloadResults}
              disabled={socialMediaPosts.length === 0}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download JSON
            </Button>
            
            <Button 
              variant="outline" 
              onClick={downloadPDF}
              disabled={socialMediaPosts.length === 0}
              className="flex items-center gap-2"
            >
              📄
              Download Report
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: colors.textSecondary }}>Speed:</span>
              <select 
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                className="px-3 py-1 border rounded text-sm"
                style={{ 
                  backgroundColor: colors.bgSecondary,
                  borderColor: colors.border,
                  color: colors.text
                }}
              >
                <option value={1000}>Fast (1s)</option>
                <option value={2000}>Normal (2s)</option>
                <option value={3000}>Slow (3s)</option>
                <option value={5000}>Very Slow (5s)</option>
                <option value={10000}>Super Slow (10s)</option>
              </select>
            </div>
          </div>

          <div className="text-sm" style={{ color: colors.textSecondary }}>
            <p>This simulation generates mock social media posts in real-time to demonstrate our AI model's ability to detect hate speech and misinformation.</p>
          </div>
        </Card>

        {/* Live Posts Feed */}
        {socialMediaPosts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
              <MessageCircle className="w-5 h-5" style={{ color: colors.secondary }} />
              Live Posts Feed
            </h3>
            
            {/* Real-time Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                  {socialMediaPosts.length}
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  Total Posts
                </div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: colors.error }}>
                  {socialMediaPosts.filter(post => post.isHateSpeech).length}
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  Hate Speech
                </div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: colors.warning }}>
                  {socialMediaPosts.filter(post => post.isMisinformation).length}
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  Misinformation
                </div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: colors.success }}>
                  {socialMediaPosts.filter(post => !post.isHateSpeech && !post.isMisinformation).length}
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  Safe Content
                </div>
              </Card>
            </div>

            {/* Filtering Controls */}
            <Card className="p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                  Filter Posts
                </h4>
                <div className="flex items-center gap-2">
                  {Object.values(filters).some(filter => filter !== 'all' && filter !== '') && (
                    <Badge variant="secondary" size="sm">
                      Filters Active
                    </Badge>
                  )}
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Showing {filteredPosts.length} of {socialMediaPosts.length} posts
                  </div>
                </div>
              </div>
              
              {/* Basic Filters */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <label className="block text-xs mb-1" style={{ color: colors.textSecondary }}>Platform</label>
                  <select 
                    value={filters.platform}
                    onChange={(e) => updateFilters({ platform: e.target.value })}
                    className="w-full px-2 py-1 text-sm border rounded"
                    style={{ 
                      backgroundColor: colors.bgSecondary,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                  >
                    <option value="all">All Platforms</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs mb-1" style={{ color: colors.textSecondary }}>Severity</label>
                  <select 
                    value={filters.severity}
                    onChange={(e) => updateFilters({ severity: e.target.value })}
                    className="w-full px-2 py-1 text-sm border rounded"
                    style={{ 
                      backgroundColor: colors.bgSecondary,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                  >
                    <option value="all">All Severities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs mb-1" style={{ color: colors.textSecondary }}>Category</label>
                  <select 
                    value={filters.category}
                    onChange={(e) => updateFilters({ category: e.target.value })}
                    className="w-full px-2 py-1 text-sm border rounded"
                    style={{ 
                      backgroundColor: colors.bgSecondary,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                  >
                    <option value="all">All Categories</option>
                    <option value="hate_speech">Hate Speech</option>
                    <option value="misinformation">Misinformation</option>
                    <option value="conspiracy">Conspiracy</option>
                    <option value="positive">Positive</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs mb-1" style={{ color: colors.textSecondary }}>Search</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Search posts, users, or content..."
                      value={filters.searchText}
                      onChange={(e) => updateFilters({ searchText: e.target.value })}
                      className="flex-1 px-2 py-1 text-sm border rounded"
                      style={{ 
                        backgroundColor: colors.bgSecondary,
                        borderColor: colors.border,
                        color: colors.text
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setFilters({
                        platform: 'all',
                        severity: 'all',
                        category: 'all',
                        searchText: '',
                        startDate: '',
                        endDate: '',
                        startTime: '',
                        endTime: ''
                      })}
                      className="px-3 py-1"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Date and Time Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs mb-1" style={{ color: colors.textSecondary }}>Start Date</label>
                  <input 
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => updateFilters({ startDate: e.target.value })}
                    className="w-full px-2 py-1 text-sm border rounded"
                    style={{ 
                      backgroundColor: colors.bgSecondary,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-xs mb-1" style={{ color: colors.textSecondary }}>End Date</label>
                  <input 
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => updateFilters({ endDate: e.target.value })}
                    className="w-full px-2 py-1 text-sm border rounded"
                    style={{ 
                      backgroundColor: colors.bgSecondary,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-xs mb-1" style={{ color: colors.textSecondary }}>Start Time</label>
                  <input 
                    type="time"
                    value={filters.startTime}
                    onChange={(e) => updateFilters({ startTime: e.target.value })}
                    className="w-full px-2 py-1 text-sm border rounded"
                    style={{ 
                      backgroundColor: colors.bgSecondary,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-xs mb-1" style={{ color: colors.textSecondary }}>End Time</label>
                  <input 
                    type="time"
                    value={filters.endTime}
                    onChange={(e) => updateFilters({ endTime: e.target.value })}
                    className="w-full px-2 py-1 text-sm border rounded"
                    style={{ 
                      backgroundColor: colors.bgSecondary,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                  />
                </div>
              </div>
            </Card>
            
            <div className="space-y-4">
              {(Object.values(filters).some(filter => filter !== 'all' && filter !== '') ? filteredPosts : socialMediaPosts).map((post) => (
                <Card 
                  key={post.id} 
                  className="p-4 cursor-pointer hover:shadow-lg transition-all duration-200"
                  onClick={() => {
                    setSelectedPost(post);
                    setShowPostModal(true);
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Poster Avatar */}
                    <img 
                      src={post.poster.avatar} 
                      alt={post.poster.displayName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    
                    <div className="flex-1">
                      {/* Poster Info */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold" style={{ color: colors.text }}>
                          {post.poster.displayName}
                        </span>
                        {post.poster.verified && (
                          <Badge variant="success" size="sm">✓ Verified</Badge>
                        )}
                        <span className="text-sm" style={{ color: colors.textSecondary }}>
                          @{post.poster.username}
                        </span>
                        <span className="text-sm" style={{ color: colors.textSecondary }}>
                          {getPlatformIcon(post.platform)}
                        </span>
                      </div>
                      
                      {/* Post Content */}
                      <p className="mb-3" style={{ color: colors.text }}>
                        {post.content}
                      </p>
                      
                      {/* Post Metadata */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm" style={{ color: colors.textSecondary }}>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {post.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share className="w-4 h-4" />
                            {post.shares}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(post.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getCategoryBadge(post.category)}
                          {(post.isHateSpeech || post.isMisinformation) && (
                            <Badge variant="danger" size="sm">
                              <Flag className="w-3 h-3 mr-1" />
                              Flagged
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Poster Details */}
                      <div className="mt-3 p-3 rounded-lg text-sm" style={{ backgroundColor: colors.bgSecondary }}>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span style={{ color: colors.textSecondary }}>Followers:</span>
                            <span className="ml-2 font-medium" style={{ color: colors.text }}>
                              {post.poster.followers.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: colors.textSecondary }}>Location:</span>
                            <span className="ml-2 font-medium" style={{ color: colors.text }}>
                              {post.poster.location}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: colors.textSecondary }}>Joined:</span>
                            <span className="ml-2 font-medium" style={{ color: colors.text }}>
                              {new Date(post.poster.joinDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: colors.textSecondary }}>Platform:</span>
                            <span className="ml-2 font-medium" style={{ color: colors.text }}>
                              {post.platform}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Real-time Analysis Results */}
                      {analyzedPosts[post.id] && (
                        <div className="mt-3 p-3 rounded-lg border-l-4" style={{ 
                          backgroundColor: colors.bgSecondary,
                          borderLeftColor: analyzedPosts[post.id].severity === 'high' ? colors.error : 
                                          analyzedPosts[post.id].severity === 'medium' ? colors.warning : colors.success
                        }}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium" style={{ color: colors.text }}>
                              AI Analysis Results
                            </h4>
                            <div className="flex items-center gap-2">
                              {getHateSpeechIcon(analyzedPosts[post.id].is_hate_speech)}
                              <span className="text-xs font-medium" style={{ color: colors.textSecondary }}>
                                {analyzedPosts[post.id].is_hate_speech ? 'Hate Speech Detected' : 
                                 analyzedPosts[post.id].is_misinformation ? 'Misinformation Detected' : 'Safe Content'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Full Sentence Analysis */}
                          <div className="mb-3 p-2 rounded" style={{ backgroundColor: colors.bg }}>
                            <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                              Analyzed Content:
                            </div>
                            <p className="text-sm italic" style={{ color: colors.text }}>
                              "{analyzedPosts[post.id].text}"
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                            <div className="text-center">
                              <div className="font-bold" style={{ color: colors.primary }}>
                                {(analyzedPosts[post.id].confidence * 100).toFixed(0)}%
                              </div>
                              <div style={{ color: colors.textSecondary }}>Confidence</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold capitalize" style={{ 
                                color: analyzedPosts[post.id].severity === 'high' ? '#ef4444' :
                                       analyzedPosts[post.id].severity === 'medium' ? '#f59e0b' :
                                       '#10b981'
                              }}>
                                {analyzedPosts[post.id].severity}
                              </div>
                              <div style={{ color: colors.textSecondary }}>Severity</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold" style={{ color: colors.secondary }}>
                                {analyzedPosts[post.id].risk_score}
                              </div>
                              <div style={{ color: colors.textSecondary }}>Risk Score</div>
                            </div>
                          </div>
                          
                          {analyzedPosts[post.id].detected_keywords && analyzedPosts[post.id].detected_keywords.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                                Detected Keywords:
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {analyzedPosts[post.id].detected_keywords.map((keyword, idx) => (
                                  <Badge key={idx} variant="danger" size="xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Explanation */}
                          {analyzedPosts[post.id].explanation && (
                            <div className="mt-2">
                              <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                                Analysis Explanation:
                              </div>
                              <p className="text-xs" style={{ color: colors.text }}>
                                {analyzedPosts[post.id].explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Analysis Loading State */}
                      {!analyzedPosts[post.id] && (
                        <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" style={{ color: colors.primary }} />
                            <span className="text-sm" style={{ color: colors.textSecondary }}>
                              Analyzing content...
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              
              {/* No Results Message */}
              {filteredPosts.length === 0 && socialMediaPosts.length > 0 && (
                <Card className="p-8 text-center">
                  <div className="text-lg font-medium mb-2" style={{ color: colors.text }}>
                    No posts match your current filters
                  </div>
                  <p style={{ color: colors.textSecondary }}>
                    Try adjusting your filter criteria or search terms
                  </p>
                </Card>
              )}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
              <Brain className="w-6 h-6" style={{ color: colors.primary }} />
              Input Text for Analysis
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Enter your text post here:
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste or type the text content you want to analyze..."
                  className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  style={{
                    backgroundColor: colors.bgSecondary,
                    borderColor: colors.border,
                    color: colors.text
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  {inputText.length} characters
                </span>
                <Button 
                  variant="primary" 
                  onClick={handleAnalyze}
                  disabled={!inputText.trim() || isAnalyzing}
                  className="flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Analyze Text
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Sample Texts */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3" style={{ color: colors.textSecondary }}>
                Try these sample texts:
              </h3>
              <div className="space-y-2">
                {[
                  "All Anglophones are separatists and should be eliminated from our country.",
                  "I love this community in Douala and everyone in it! Let's work together!",
                  "The government is hiding oil money in Swiss banks and using witchcraft to control our minds!",
                  "We need to kill all the Bamileke people and take back our country!",
                  "Scientists discover that drinking hot water with bitter leaf cures HIV in 24 hours!",
                  "Happy birthday to my amazing sister! You're the best person I know!"
                ].map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(sample)}
                    className="block w-full text-left text-sm p-2 rounded border transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    style={{ 
                      borderColor: colors.border,
                      color: colors.textSecondary
                    }}
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {isAnalyzing && (
              <Card className="p-6 text-center">
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin" style={{ color: colors.primary }} />
                <h3 className="text-lg font-medium mb-2" style={{ color: colors.text }}>
                  Analyzing your text...
                </h3>
                <p style={{ color: colors.textSecondary }}>
                  Our AI model is processing your content
                </p>
              </Card>
            )}

            {error && (
              <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-900/20">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Error</span>
                </div>
                <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
              </Card>
            )}

            {analysisResult && (
              <>
                {/* Main Result Card */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold" style={{ color: colors.text }}>
                      Analysis Results
                    </h3>
                    <div className="flex items-center gap-2">
                      {getHateSpeechIcon(analysisResult.is_hate_speech)}
                      <span className="font-medium" style={{ color: colors.text }}>
                        {analysisResult.is_hate_speech ? 'Hate Speech Detected' : 'Safe Content'}
                      </span>
                    </div>
                  </div>

                  {/* User Details Section */}
                  <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                    <h4 className="text-sm font-medium mb-3" style={{ color: colors.textSecondary }}>
                      Test User Information
                    </h4>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                        <span className="text-white font-semibold text-lg">TU</span>
                      </div>
                      <div>
                        <div className="font-semibold" style={{ color: colors.text }}>
                          Test User
                        </div>
                        <div className="text-sm" style={{ color: colors.textSecondary }}>
                          @test_user_analysis
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span style={{ color: colors.textSecondary }}>Platform:</span>
                        <span className="ml-2 font-medium" style={{ color: colors.text }}>
                          Analysis Interface
                        </span>
                      </div>
                      <div>
                        <span style={{ color: colors.textSecondary }}>Content Type:</span>
                        <span className="ml-2 font-medium" style={{ color: colors.text }}>
                          Manual Input
                        </span>
                      </div>
                      <div>
                        <span style={{ color: colors.textSecondary }}>Analysis Time:</span>
                        <span className="ml-2 font-medium" style={{ color: colors.text }}>
                          {new Date(analysisResult.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: colors.textSecondary }}>Model Version:</span>
                        <span className="ml-2 font-medium" style={{ color: colors.text }}>
                          {analysisResult.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Confidence and Severity */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                      <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                        {(analysisResult.confidence * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>
                        Confidence
                      </div>
                    </div>
                    <div className="text-center p-3 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                      <div className="flex items-center justify-center gap-2">
                        {getSeverityIcon(analysisResult.severity)}
                        <span className="text-lg font-semibold capitalize" style={{ color: colors.text }}>
                          {analysisResult.severity}
                        </span>
                      </div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>
                        Severity
                      </div>
                    </div>
                  </div>

                  {/* Risk Score and Moderation Action */}
                  {analysisResult.risk_score && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                        <div className="text-2xl font-bold" style={{ color: colors.secondary }}>
                          {analysisResult.risk_score}
                        </div>
                        <div className="text-sm" style={{ color: colors.textSecondary }}>
                          Risk Score
                        </div>
                      </div>
                      <div className="text-center p-3 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                        <div className="text-lg font-semibold capitalize" style={{ color: colors.text }}>
                          {analysisResult.moderation_action?.replace(/_/g, ' ') || 'No Action'}
                        </div>
                        <div className="text-sm" style={{ color: colors.textSecondary }}>
                          Moderation Action
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Detected Keywords */}
                  {analysisResult.detected_keywords && analysisResult.detected_keywords.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                        Detected Keywords:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.detected_keywords.map((keyword, index) => (
                          <Badge key={index} variant="danger" size="sm">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                      Analysis Explanation:
                    </h4>
                    <p className="text-sm" style={{ color: colors.text }}>
                      {analysisResult.explanation}
                    </p>
                  </div>

                  {/* Technical Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span style={{ color: colors.textSecondary }}>Language:</span>
                      <span className="ml-2 font-medium" style={{ color: colors.text }}>
                        {analysisResult.language || 'en'}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>Processing Time:</span>
                      <span className="ml-2 font-medium" style={{ color: colors.text }}>
                        {analysisResult.processing_time_ms}ms
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Raw JSON Response */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
                    <Zap className="w-5 h-5" style={{ color: colors.secondary }} />
                    Raw Model Response
                  </h3>
                  <div 
                    className="p-4 rounded-lg text-sm font-mono overflow-x-auto"
                    style={{ 
                      backgroundColor: colors.bgSecondary,
                      border: `1px solid ${colors.border}`
                    }}
                  >
                    <pre style={{ color: colors.text }}>
                      {JSON.stringify(analysisResult, null, 2)}
                    </pre>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm" style={{ color: colors.textMuted }}>
            This interface demonstrates our hate speech detection model's capabilities with real-time social media simulation. 
            The model analyzes text content and provides confidence scores, severity levels, 
            and detailed explanations for its classifications.
          </p>
        </div>
      </div>

      {/* Post Detail Modal */}
      {showPostModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                  Post Details
                </h2>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPostModal(false)}
                  className="p-2"
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Post Content */}
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
                    Content
                  </h3>
                  <p className="text-lg p-4 rounded-lg" style={{ backgroundColor: colors.bgSecondary, color: colors.text }}>
                    {selectedPost.content}
                  </p>
                </div>
                
                {/* Poster Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
                    Poster Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                    <div>
                      <span style={{ color: colors.textSecondary }}>Display Name:</span>
                      <span className="ml-2 font-medium" style={{ color: colors.text }}>
                        {selectedPost.poster.displayName}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>Username:</span>
                      <span className="ml-2 font-medium" style={{ color: colors.text }}>
                        @{selectedPost.poster.username}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>Followers:</span>
                      <span className="ml-2 font-medium" style={{ color: colors.text }}>
                        {selectedPost.poster.followers.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>Location:</span>
                      <span className="ml-2 font-medium" style={{ color: colors.text }}>
                        {selectedPost.poster.location}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>Joined:</span>
                      <span className="ml-2 font-medium" style={{ color: colors.text }}>
                        {new Date(selectedPost.poster.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>Platform:</span>
                      <span className="ml-2 font-medium" style={{ color: colors.text }}>
                        {selectedPost.poster.platform}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>Verified:</span>
                      <span className="ml-2 font-medium" style={{ color: colors.text }}>
                        {selectedPost.poster.verified ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>Posted:</span>
                      <span className="ml-2 font-medium" style={{ color: colors.text }}>
                        {new Date(selectedPost.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Engagement Metrics */}
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
                    Engagement Metrics
                  </h3>
                  <div className="grid grid-cols-3 gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                        {selectedPost.likes}
                      </div>
                      <div style={{ color: colors.textSecondary }}>Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: colors.secondary }}>
                        {selectedPost.comments}
                      </div>
                      <div style={{ color: colors.textSecondary }}>Comments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: colors.warning }}>
                        {selectedPost.shares}
                      </div>
                      <div style={{ color: colors.textSecondary }}>Shares</div>
                    </div>
                  </div>
                </div>
                
                {/* AI Analysis Results */}
                {analyzedPosts[selectedPost.id] && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
                      AI Analysis Results
                    </h3>
                    <div className="p-4 rounded-lg border-l-4" style={{ 
                      backgroundColor: colors.bgSecondary,
                      borderLeftColor: analyzedPosts[selectedPost.id].severity === 'high' ? '#ef4444' : 
                                      analyzedPosts[selectedPost.id].severity === 'medium' ? '#f59e0b' : '#10b981'
                    }}>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                            {(analyzedPosts[selectedPost.id].confidence * 100).toFixed(0)}%
                          </div>
                          <div style={{ color: colors.textSecondary }}>Confidence</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold capitalize text-lg" style={{ 
                            color: analyzedPosts[selectedPost.id].severity === 'high' ? '#ef4444' :
                                   analyzedPosts[selectedPost.id].severity === 'medium' ? '#f59e0b' :
                                   '#10b981'
                          }}>
                            {analyzedPosts[selectedPost.id].severity}
                          </div>
                          <div style={{ color: colors.textSecondary }}>Severity</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold" style={{ color: colors.secondary }}>
                            {analyzedPosts[selectedPost.id].risk_score}
                          </div>
                          <div style={{ color: colors.textSecondary }}>Risk Score</div>
                        </div>
                      </div>
                      
                      {analyzedPosts[selectedPost.id].detected_keywords && analyzedPosts[selectedPost.id].detected_keywords.length > 0 && (
                        <div className="mb-4">
                          <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                            Detected Keywords:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {analyzedPosts[selectedPost.id].detected_keywords.map((keyword, idx) => (
                              <Badge key={idx} variant="danger" size="sm">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {analyzedPosts[selectedPost.id].explanation && (
                        <div>
                          <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                            Analysis Explanation:
                          </div>
                          <p className="text-sm" style={{ color: colors.text }}>
                            {analyzedPosts[selectedPost.id].explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Category-Specific Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
                    {selectedPost.category === 'hate_speech' ? 'Hate Speech Analysis' :
                     selectedPost.category === 'misinformation' ? 'Misinformation Analysis' :
                     selectedPost.category === 'conspiracy' ? 'Conspiracy Theory Analysis' :
                     'Positive Content Analysis'}
                  </h3>
                  
                  {selectedPost.category === 'hate_speech' && (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2" style={{ color: colors.error }}>
                            🚨 Hate Speech Indicators Detected
                          </h4>
                          <ul className="text-sm space-y-1" style={{ color: colors.text }}>
                            <li>• Ethnic targeting and discrimination</li>
                            <li>• Calls for violence or elimination</li>
                            <li>• Dehumanizing language</li>
                            <li>• Incitement to hatred</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2" style={{ color: colors.text }}>
                            Recommended Actions:
                          </h4>
                          <ul className="text-sm space-y-1" style={{ color: colors.text }}>
                            <li>• Flag for immediate review</li>
                            <li>• Consider account suspension</li>
                            <li>• Report to authorities if necessary</li>
                            <li>• Monitor for similar content</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2" style={{ color: colors.text }}>
                            Context Analysis:
                          </h4>
                          <p className="text-sm" style={{ color: colors.text }}>
                            This content targets specific ethnic groups in Cameroon and promotes violence. 
                            It violates platform policies and may have legal implications.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedPost.category === 'misinformation' && (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2" style={{ color: colors.warning }}>
                            ⚠️ Misinformation Indicators Detected
                          </h4>
                          <ul className="text-sm space-y-1" style={{ color: colors.text }}>
                            <li>• False health claims</li>
                            <li>• Unverified scientific claims</li>
                            <li>• Sensationalist language</li>
                            <li>• Urgency to share</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2" style={{ color: colors.text }}>
                            Recommended Actions:
                          </h4>
                          <ul className="text-sm space-y-1" style={{ color: colors.text }}>
                            <li>• Flag for fact-checking</li>
                            <li>• Add warning labels</li>
                            <li>• Reduce distribution</li>
                            <li>• Provide fact-check links</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2" style={{ color: colors.text }}>
                            Fact-Check Notes:
                          </h4>
                          <p className="text-sm" style={{ color: colors.text }}>
                            Claims about traditional medicine curing serious diseases lack scientific evidence. 
                            This type of misinformation can be harmful to public health.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedPost.category === 'conspiracy' && (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2" style={{ color: colors.warning }}>
                            🔍 Conspiracy Theory Indicators Detected
                          </h4>
                          <ul className="text-sm space-y-1" style={{ color: colors.text }}>
                            <li>• Secret government plots</li>
                            <li>• Hidden control mechanisms</li>
                            <li>• "Wake up" messaging</li>
                            <li>• Anti-establishment rhetoric</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2" style={{ color: colors.text }}>
                            Recommended Actions:
                          </h4>
                          <ul className="text-sm space-y-1" style={{ color: colors.text }}>
                            <li>• Flag for review</li>
                            <li>• Add context labels</li>
                            <li>• Reduce algorithmic promotion</li>
                            <li>• Provide factual counter-narratives</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2" style={{ color: colors.text }}>
                            Analysis Notes:
                          </h4>
                          <p className="text-sm" style={{ color: colors.text }}>
                            This content promotes unfounded conspiracy theories about government corruption. 
                            While corruption concerns may be valid, the specific claims lack evidence.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedPost.category === 'positive' && (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2" style={{ color: colors.success }}>
                            ✅ Positive Content Indicators
                          </h4>
                          <ul className="text-sm space-y-1" style={{ color: colors.text }}>
                            <li>• Community building</li>
                            <li>• Cultural celebration</li>
                            <li>• Educational content</li>
                            <li>• Inspirational messaging</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2" style={{ color: colors.text }}>
                            Content Value:
                          </h4>
                          <ul className="text-sm space-y-1" style={{ color: colors.text }}>
                            <li>• Promotes social cohesion</li>
                            <li>• Celebrates local culture</li>
                            <li>• Provides educational value</li>
                            <li>• Encourages positive engagement</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2" style={{ color: colors.text }}>
                            Community Impact:
                          </h4>
                          <p className="text-sm" style={{ color: colors.text }}>
                            This content contributes positively to the Cameroonian online community by 
                            celebrating local culture, sharing knowledge, and building connections.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelTestingPage;
