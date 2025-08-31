import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Loader2, CheckCircle, Camera, FileImage, Radar, Search, Brain } from 'lucide-react';


const ImageDetectionPage = () => {
  const { colors } = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        confidence: 87,
        classification: 'Safe Content',
        details: {
          misinformation_risk: 'Low',
          hate_speech_risk: 'None',
          manipulation_detected: false,
          content_type: 'Natural Image',
          objects_detected: ['person', 'building', 'text'],
          text_extracted: 'Sample text found in image'
        },
        recommendations: [
          'Content appears to be authentic',
          'No signs of digital manipulation detected',
          'Text content is factual and non-harmful'
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Image Detection AI
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Advanced AI-powered image analysis for misinformation and harmful content detection
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: colors.text }}>
              Upload Image for Analysis
            </h2>
            
            <div 
              className="border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors duration-200 hover:border-blue-500"
              style={{ borderColor: colors.border }}
            >
              <Camera className="w-12 h-12 mx-auto mb-4" style={{ color: colors.textSecondary }} />
              <p className="text-lg mb-4" style={{ color: colors.text }}>
                {selectedFile ? selectedFile.name : 'Select an image to analyze'}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button variant="primary" className="cursor-pointer">
                  <FileImage className="w-4 h-4 mr-2" />
                  Choose Image
                </Button>
              </label>
            </div>

            {selectedFile && (
              <div className="mb-6">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <Button 
              variant="primary" 
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Radar className="w-4 h-4 mr-2" />
                  Analyze Image
                </>
              )}
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: colors.text }}>
              Analysis Results
            </h2>
            
            {!analysisResult && !isAnalyzing && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 mx-auto mb-4" style={{ color: colors.textMuted }} />
                <p style={{ color: colors.textMuted }}>
                  Upload an image to see analysis results
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-12">
                <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin" style={{ color: colors.primary }} />
                <p style={{ color: colors.text }}>Analyzing image...</p>
                <p className="text-sm mt-2" style={{ color: colors.textMuted }}>
                  This may take a few moments
                </p>
              </div>
            )}

            {analysisResult && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold" style={{ color: colors.text }}>
                    {analysisResult.classification}
                  </h3>
                  <Badge 
                    variant={analysisResult.confidence > 80 ? 'success' : 'warning'}
                    size="lg"
                  >
                    {analysisResult.confidence}% Confidence
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: colors.text }}>Risk Assessment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Misinformation Risk:</span>
                      <Badge variant={analysisResult.details.misinformation_risk === 'Low' ? 'success' : 'warning'}>
                        {analysisResult.details.misinformation_risk}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Hate Speech Risk:</span>
                      <Badge variant="success">
                        {analysisResult.details.hate_speech_risk}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>Manipulation Detected:</span>
                      <Badge variant={analysisResult.details.manipulation_detected ? 'danger' : 'success'}>
                        {analysisResult.details.manipulation_detected ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: colors.text }}>Detected Objects</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.details.objects_detected.map((object, index) => (
                      <Badge key={index} variant="outline">
                        {object}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3" style={{ color: colors.text }}>Recommendations</h4>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5" style={{ color: colors.success }} />
                        <span style={{ color: colors.textSecondary }}>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Card>
        </div>

        <Card className="p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <FileImage className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Upload</h3>
              <p style={{ color: colors.textSecondary }}>
                Upload any image file for analysis
              </p>
            </div>
            <div className="text-center">
              <Brain className="w-12 h-12 mx-auto mb-4" style={{ color: colors.secondary }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Analyze</h3>
              <p style={{ color: colors.textSecondary }}>
                AI analyzes content, objects, and text
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: colors.success }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Results</h3>
              <p style={{ color: colors.textSecondary }}>
                Get detailed analysis and recommendations
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ImageDetectionPage;