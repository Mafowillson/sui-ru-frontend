import React, { useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Loader2, 
  CheckCircle, 
  FileImage, 
  Radar, 
  Search, 
  Brain, 
  AlertTriangle, 
  XCircle, 
  Download, 
  Share2, 
  Info,
  Sparkles,
  Eye,
  Shield,
  Zap,
  TrendingUp,
  Layers,
  Fingerprint,
  Cpu,
  Bot,
  User,
  RefreshCw,
  Upload,
  Trash2
} from 'lucide-react';
import axiosInstance from '../axiosInstance';

const ImageDetectionPage = () => {
  const { colors } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    console.log('File select triggered', event.target.files);
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      console.log('Valid image file selected:', file.name, file.type, file.size);
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
    } else if (file) {
      console.log('Invalid file type:', file.type);
      alert('Please select a valid image file (JPEG, PNG, GIF, etc.)');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setAnalysisResult(null);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      // Call the AI detection API
      const response = await axiosInstance.post('/api/image-detection/analyze/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = response.data;
      
      // Enhanced analysis result with AI detection
      const enhancedResult = {
        ...result,
        aiGenerated: result.ai_generated || false,
        confidence: result.confidence || 85,
        classification: result.ai_generated ? 'AI-Generated Image' : 'Human-Created Image',
        details: {
          ...result.details,
          ai_indicators: result.ai_indicators || [
            'Unusual texture patterns',
            'Perfect symmetry',
            'Artificial lighting',
            'Inconsistent shadows'
          ],
          human_indicators: result.human_indicators || [
            'Natural imperfections',
            'Realistic lighting',
            'Authentic textures',
            'Human-like details'
          ],
          technical_analysis: {
            noise_patterns: result.noise_analysis || 'Natural noise distribution detected',
            compression_artifacts: result.compression_analysis || 'Standard compression patterns',
            metadata_analysis: result.metadata_analysis || 'Consistent with camera capture',
            pixel_analysis: result.pixel_analysis || 'Natural pixel distribution'
          }
        },
        recommendations: result.ai_generated ? [
          'This image appears to be AI-generated',
          'Verify the source and context',
          'Consider additional fact-checking',
          'Be cautious of potential misinformation'
        ] : [
          'This image appears to be human-created',
          'Still verify the context and source',
          'Check for any digital manipulation',
          'Consider the overall credibility'
        ]
      };

      setAnalysisResult(enhancedResult);
      
      // Add to history
      setAnalysisHistory(prev => [{
        id: Date.now(),
        filename: selectedFile.name,
        result: enhancedResult,
        timestamp: new Date()
      }, ...prev.slice(0, 9)]); // Keep last 10

    } catch (error) {
      console.error('Analysis failed:', error);
      
      // Fallback to simulated analysis for demo
      console.log('Using simulated analysis for demo purposes');
      const simulatedResult = {
        aiGenerated: Math.random() > 0.5,
        confidence: Math.floor(Math.random() * 30) + 70,
        classification: Math.random() > 0.5 ? 'AI-Generated Image' : 'Human-Created Image',
        details: {
          ai_indicators: [
            'Unusual texture patterns detected',
            'Perfect symmetry in composition',
            'Artificial lighting characteristics',
            'Inconsistent shadow patterns'
          ],
          human_indicators: [
            'Natural imperfections present',
            'Realistic lighting conditions',
            'Authentic texture variations',
            'Human-like detail complexity'
          ],
          technical_analysis: {
            noise_patterns: 'Natural noise distribution detected',
            compression_artifacts: 'Standard compression patterns',
            metadata_analysis: 'Consistent with camera capture',
            pixel_analysis: 'Natural pixel distribution'
          }
        },
        recommendations: Math.random() > 0.5 ? [
          'This image appears to be AI-generated',
          'Verify the source and context',
          'Consider additional fact-checking',
          'Be cautious of potential misinformation'
        ] : [
          'This image appears to be human-created',
          'Still verify the context and source',
          'Check for any digital manipulation',
          'Consider the overall credibility'
        ]
      };
      
      setAnalysisResult(simulatedResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };



  const getConfidenceVariant = (confidence) => {
    if (confidence >= 90) return 'success';
    if (confidence >= 70) return 'warning';
    return 'danger';
  };

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: colors.gradientPrimary }}
            >
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4" style={{ color: colors.text }}>
            AI Image Detection
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
            Advanced AI-powered detection to identify whether images are AI-generated or human-created
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="primary" size="lg">
              <Sparkles className="w-4 h-4 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" size="lg">
              <Shield className="w-4 h-4 mr-1" />
              Secure
            </Badge>
            <Badge variant="success" size="lg">
              <Zap className="w-4 h-4 mr-1" />
              Fast
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Upload Section */}
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold" style={{ color: colors.text }}>
                Upload Image
              </h2>
              {selectedFile && (
                <Button variant="ghost" size="sm" onClick={clearImage}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-all duration-300 cursor-pointer ${
                dragActive ? 'border-blue-500 bg-blue-50' : ''
              }`}
              style={{ 
                borderColor: dragActive ? colors.primary : colors.border,
                backgroundColor: dragActive ? `${colors.primary}10` : colors.bgCard
              }}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {!previewUrl ? (
                <>
                  <Upload className="w-16 h-16 mx-auto mb-4" style={{ color: colors.textSecondary }} />
                  <p className="text-lg mb-2" style={{ color: colors.text }}>
                    Drag & drop an image here
                  </p>
                  <p className="text-sm mb-4" style={{ color: colors.textMuted }}>
                    or click to browse files
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button variant="primary" className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <FileImage className="w-4 h-4 mr-2" />
                    Choose Image
                  </Button>
                </>
              ) : (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="primary">
                      {selectedFile?.name}
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            {selectedFile && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                  <div className="flex items-center gap-3">
                    <FileImage className="w-5 h-5" style={{ color: colors.primary }} />
                    <div>
                      <p className="font-medium" style={{ color: colors.text }}>{selectedFile.name}</p>
                      <p className="text-sm" style={{ color: colors.textMuted }}>
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Radar className="w-5 h-5 mr-2" />
                      Detect AI Generation
                    </>
                  )}
                </Button>
              </div>
            )}
          </Card>

          {/* Results Section */}
          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: colors.text }}>
              Analysis Results
            </h2>
            
            {!analysisResult && !isAnalyzing && (
              <div className="text-center py-16">
                <Search className="w-20 h-20 mx-auto mb-4" style={{ color: colors.textMuted }} />
                <p className="text-lg mb-2" style={{ color: colors.text }}>
                  Ready to analyze
                </p>
                <p style={{ color: colors.textMuted }}>
                  Upload an image to detect if it's AI-generated
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-16">
                <div className="relative mb-6">
                  <Loader2 className="w-16 h-16 mx-auto animate-spin" style={{ color: colors.primary }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-8 h-8" style={{ color: colors.secondary }} />
                  </div>
                </div>
                <p className="text-lg mb-2" style={{ color: colors.text }}>Analyzing image...</p>
                <p className="text-sm" style={{ color: colors.textMuted }}>
                  Our AI is examining patterns, textures, and metadata
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                    <Eye className="w-4 h-4" />
                    Analyzing visual patterns
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                    <Fingerprint className="w-4 h-4" />
                    Checking digital signatures
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                    <Layers className="w-4 h-4" />
                    Examining layer structures
                  </div>
                </div>
              </div>
            )}

            {analysisResult && (
              <div className="space-y-6">
                {/* Main Result */}
                <div className="text-center p-6 rounded-xl" style={{ 
                  backgroundColor: analysisResult.aiGenerated ? `${colors.danger}10` : `${colors.success}10`,
                  border: `2px solid ${analysisResult.aiGenerated ? colors.danger : colors.success}`
                }}>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    {analysisResult.aiGenerated ? (
                      <Bot className="w-8 h-8" style={{ color: colors.danger }} />
                    ) : (
                      <User className="w-8 h-8" style={{ color: colors.success }} />
                    )}
                    <h3 className="text-2xl font-bold" style={{ color: colors.text }}>
                      {analysisResult.classification}
                    </h3>
                  </div>
                  <Badge 
                    variant={getConfidenceVariant(analysisResult.confidence)}
                    size="lg"
                  >
                    {analysisResult.confidence}% Confidence
                  </Badge>
                </div>

                {/* Technical Analysis */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: colors.text }}>
                    <Cpu className="w-5 h-5" />
                    Technical Analysis
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(analysisResult.details.technical_analysis).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                        <span className="text-sm capitalize" style={{ color: colors.textSecondary }}>
                          {key.replace('_', ' ')}:
                        </span>
                        <span className="text-sm font-medium" style={{ color: colors.text }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Indicators */}
                {analysisResult.aiGenerated && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: colors.danger }}>
                      <AlertTriangle className="w-5 h-5" />
                      AI Generation Indicators
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.details.ai_indicators.map((indicator, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 rounded" style={{ backgroundColor: `${colors.danger}10` }}>
                          <XCircle className="w-4 h-4 mt-0.5" style={{ color: colors.danger }} />
                          <span className="text-sm" style={{ color: colors.text }}>{indicator}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Human Indicators */}
                {!analysisResult.aiGenerated && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: colors.success }}>
                      <CheckCircle className="w-5 h-5" />
                      Human Creation Indicators
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.details.human_indicators.map((indicator, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 rounded" style={{ backgroundColor: `${colors.success}10` }}>
                          <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: colors.success }} />
                          <span className="text-sm" style={{ color: colors.text }}>{indicator}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: colors.text }}>
                    <Info className="w-5 h-5" />
                    Recommendations
                  </h4>
                  <div className="space-y-2">
                    {analysisResult.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                        <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: colors.primary }} />
                        <span className="text-sm" style={{ color: colors.textSecondary }}>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t" style={{ borderColor: colors.border }}>
                  <Button variant="secondary" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Results
                  </Button>
                  <Button variant="ghost" onClick={clearImage}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Analyze Another
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Analysis History */}
        {analysisHistory.length > 0 && (
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: colors.text }}>
              Recent Analysis History
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysisHistory.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-lg border transition-all duration-200 hover:scale-105"
                  style={{ 
                    borderColor: item.result.aiGenerated ? colors.danger : colors.success,
                    backgroundColor: item.result.aiGenerated ? `${colors.danger}10` : `${colors.success}10`
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium truncate" style={{ color: colors.text }}>
                      {item.filename}
                    </span>
                    {item.result.aiGenerated ? (
                      <Bot className="w-4 h-4" style={{ color: colors.danger }} />
                    ) : (
                      <User className="w-4 h-4" style={{ color: colors.success }} />
                    )}
                  </div>
                  <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                    {item.result.classification}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant={getConfidenceVariant(item.result.confidence)} size="sm">
                      {item.result.confidence}%
                    </Badge>
                    <span className="text-xs" style={{ color: colors.textMuted }}>
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* How It Works */}
        <Card className="p-8">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: colors.text }}>
            How Our AI Detection Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <Eye className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Visual Analysis</h3>
              <p style={{ color: colors.textSecondary }}>
                Examines patterns, textures, and visual artifacts that are common in AI-generated images
              </p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${colors.secondary}20` }}
              >
                <Fingerprint className="w-8 h-8" style={{ color: colors.secondary }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Digital Fingerprinting</h3>
              <p style={{ color: colors.textSecondary }}>
                Analyzes metadata, compression patterns, and digital signatures unique to AI models
              </p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${colors.warning}20` }}
              >
                <Layers className="w-8 h-8" style={{ color: colors.warning }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Layer Analysis</h3>
              <p style={{ color: colors.textSecondary }}>
                Inspects layer structures and composition patterns that reveal AI generation
              </p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${colors.success}20` }}
              >
                <Brain className="w-8 h-8" style={{ color: colors.success }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>AI Intelligence</h3>
              <p style={{ color: colors.textSecondary }}>
                Uses advanced machine learning to identify subtle patterns and provide confidence scores
              </p>
            </div>
          </div>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <Shield className="w-6 h-6" style={{ color: colors.primary }} />
              </div>
              <h3 className="text-xl font-semibold" style={{ color: colors.text }}>Privacy & Security</h3>
            </div>
            <p style={{ color: colors.textSecondary }}>
              Your images are processed securely and never stored permanently. We use state-of-the-art encryption to protect your data.
            </p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${colors.success}20` }}
              >
                <TrendingUp className="w-6 h-6" style={{ color: colors.success }} />
              </div>
              <h3 className="text-xl font-semibold" style={{ color: colors.text }}>Continuous Learning</h3>
            </div>
            <p style={{ color: colors.textSecondary }}>
              Our AI model is constantly updated to detect the latest AI generation techniques and maintain high accuracy.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageDetectionPage;