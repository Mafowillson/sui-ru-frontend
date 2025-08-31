import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { 
  GraduationCap, 
  BookOpen, 
  Play, 
  Users, 
  Star, 
  Award, 
  CheckCircle, 
  Search,
  Code,
  Target,
  User,
  Calendar
} from 'lucide-react';

const SUILearnPage = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: GraduationCap },
    { id: 'security', name: 'Digital Security', icon: User },
    { id: 'analytics', name: 'Data Analytics', icon: Code },
    { id: 'development', name: 'Development', icon: Target },
    { id: 'business', name: 'Business Intelligence', icon: Play }
  ];

  const courses = [
    {
      id: 1,
      title: "AI-Powered Threat Detection Fundamentals",
      description: "Learn the basics of AI-powered threat detection and misinformation analysis",
      instructor: "Dr. Sarah Chen",
      duration: "6 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 1250,
      price: "Free",
      category: "ai-ml",
      image: "/api/placeholder/300/200",
      lessons: 24,
      certificate: true,
      featured: true
    },
    {
      id: 2,
      title: "Advanced Content Monitoring Strategies",
      description: "Master advanced techniques for monitoring and analyzing digital content",
      instructor: "Prof. Michael Rodriguez",
      duration: "8 weeks",
      level: "Advanced",
      rating: 4.9,
      students: 890,
      price: "XFA 199",
      category: "security",
      image: "/api/placeholder/300/200",
      lessons: 32,
      certificate: true,
      featured: true
    },
    {
      id: 3,
      title: "Data Analytics for Digital Safety",
      description: "Comprehensive guide to analyzing data for digital safety applications",
      instructor: "Dr. Emily Watson",
      duration: "5 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 2100,
      price: "XFA 149",
      category: "analytics",
      image: "/api/placeholder/300/200",
      lessons: 20,
      certificate: true,
      featured: false
    },
    {
      id: 4,
      title: "Building Secure Applications",
      description: "Learn to develop secure applications with best practices",
      instructor: "James Thompson",
      duration: "10 weeks",
      level: "Advanced",
      rating: 4.6,
      students: 750,
      price: "XFA 299",
      category: "development",
      image: "/api/placeholder/300/200",
      lessons: 40,
      certificate: true,
      featured: false
    },
    {
      id: 5,
      title: "Business Intelligence for Decision Making",
      description: "Transform data into actionable business insights",
      instructor: "Lisa Park",
      duration: "7 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 1680,
      price: "XFA 179",
      category: "business",
      image: "/api/placeholder/300/200",
      lessons: 28,
      certificate: true,
      featured: false
    },
    {
      id: 6,
      title: "Introduction to Cybersecurity",
      description: "Essential cybersecurity concepts for beginners",
      instructor: "Robert Kim",
      duration: "4 weeks",
      level: "Beginner",
      rating: 4.5,
      students: 3200,
      price: "Free",
      category: "security",
      image: "/api/placeholder/300/200",
      lessons: 16,
      certificate: true,
      featured: false
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "Certified AI Threat Analyst",
      description: "Professional certification in AI-powered threat detection",
      duration: "3 months",
      price: "XFA 499",
      level: "Professional",
      badge: "CATA",
      requirements: ["Complete 3 AI/ML courses", "Pass final assessment", "Complete capstone project"]
    },
    {
      id: 2,
      title: "Digital Security Specialist",
      description: "Comprehensive certification in digital security practices",
      duration: "4 months",
      price: "XFA 699",
      level: "Expert",
      badge: "DSS",
      requirements: ["Complete 4 security courses", "Pass practical exam", "1 year experience"]
    },
    {
      id: 3,
      title: "Data Analytics Professional",
      description: "Advanced certification in data analytics and visualization",
      duration: "2 months",
      price: "XFA 399",
      level: "Professional",
      badge: "DAP",
      requirements: ["Complete 2 analytics courses", "Portfolio project", "Peer review"]
    }
  ];

  const learningPaths = [
    {
      id: 1,
      title: "AI Specialist Track",
      description: "Become an expert in AI-powered threat detection",
      courses: 5,
      duration: "6 months",
      level: "Beginner to Advanced",
      completion: 0
    },
    {
      id: 2,
      title: "Security Analyst Track",
      description: "Master digital security and threat analysis",
      courses: 4,
      duration: "4 months",
      level: "Intermediate to Expert",
      completion: 25
    },
    {
      id: 3,
      title: "Data Scientist Track",
      description: "Advanced data science for digital safety",
      courses: 6,
      duration: "8 months",
      level: "Intermediate to Expert",
      completion: 60
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredCourses = courses.filter(course => course.featured);

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: colors.bg }}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: colors.gradientPrimary }}
              >
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              SUI Learn Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Master AI-powered threat detection, digital security, and data analytics with expert-led courses and hands-on projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                className="text-lg px-8 py-4"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                className="text-lg px-8 py-4"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Courses
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-4" style={{ color: colors.primary }} />
              <div className="text-3xl font-bold mb-2" style={{ color: colors.text }}>50+</div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>Expert Courses</div>
            </Card>
            <Card className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-4" style={{ color: colors.primary }} />
              <div className="text-3xl font-bold mb-2" style={{ color: colors.text }}>15K+</div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>Active Learners</div>
            </Card>
            <Card className="p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-4" style={{ color: colors.primary }} />
              <div className="text-3xl font-bold mb-2" style={{ color: colors.text }}>12</div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>Certifications</div>
            </Card>
            <Card className="p-6 text-center">
              <Star className="w-8 h-8 mx-auto mb-4" style={{ color: colors.primary }} />
              <div className="text-3xl font-bold mb-2" style={{ color: colors.text }}>4.8</div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>Average Rating</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'paths', label: 'Learning Paths', icon: Target },
              { id: 'certifications', label: 'Certifications', icon: Award }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "primary" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center"
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {activeTab === 'courses' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
                Featured Courses
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
                Start with our most popular and highly-rated courses
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <div 
                      className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                    >
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <Badge 
                      className="absolute top-4 left-4"
                      style={{ backgroundColor: colors.success }}
                    >
                      Featured
                    </Badge>
                    <Badge 
                      className="absolute top-4 right-4"
                      style={{ backgroundColor: course.price === 'Free' ? colors.success : colors.primary }}
                    >
                      {course.price}
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                      {course.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                      {course.description}
                    </p>
                    
                    <div className="flex items-center mb-4">
                      <User className="w-4 h-4 mr-2" style={{ color: colors.textMuted }} />
                      <span className="text-sm" style={{ color: colors.textMuted }}>
                        {course.instructor}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1" style={{ color: colors.warning }} />
                        <span className="text-sm font-medium" style={{ color: colors.text }}>
                          {course.rating}
                        </span>
                        <span className="text-sm ml-2" style={{ color: colors.textMuted }}>
                          ({course.students} students)
                        </span>
                      </div>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" style={{ color: colors.textMuted }} />
                        <span className="text-sm" style={{ color: colors.textMuted }}>
                          {course.duration}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" style={{ color: colors.textMuted }} />
                        <span className="text-sm" style={{ color: colors.textMuted }}>
                          {course.lessons} lessons
                        </span>
                      </div>
                    </div>
                    
                    <Button variant="primary" className="w-full">
                      Enroll Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.textMuted }} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border"
                    style={{ 
                      backgroundColor: colors.bgCard,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "primary" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center"
                    >
                      <category.icon className="w-4 h-4 mr-1" />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* All Courses */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <div 
                      className="h-48 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center"
                    >
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <Badge 
                      className="absolute top-4 right-4"
                      style={{ backgroundColor: course.price === 'Free' ? colors.success : colors.primary }}
                    >
                      {course.price}
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2" style={{ color: colors.text }}>
                      {course.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                      {course.description}
                    </p>
                    
                    <div className="flex items-center mb-4">
                      <User className="w-4 h-4 mr-2" style={{ color: colors.textMuted }} />
                      <span className="text-sm" style={{ color: colors.textMuted }}>
                        {course.instructor}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1" style={{ color: colors.warning }} />
                        <span className="text-sm font-medium" style={{ color: colors.text }}>
                          {course.rating}
                        </span>
                      </div>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" style={{ color: colors.textMuted }} />
                        <span className="text-sm" style={{ color: colors.textMuted }}>
                          {course.duration}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" style={{ color: colors.textMuted }} />
                        <span className="text-sm" style={{ color: colors.textMuted }}>
                          {course.lessons} lessons
                        </span>
                      </div>
                    </div>
                    
                    <Button variant="primary" className="w-full">
                      Enroll Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Learning Paths */}
      {activeTab === 'paths' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
                Learning Paths
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
                Structured learning journeys to master specific skills
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {learningPaths.map((path) => (
                <Card key={path.id} className="p-8 hover:scale-105 transition-transform duration-300">
                  <div className="text-center mb-6">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: colors.gradientPrimary }}
                    >
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                      {path.title}
                    </h3>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      {path.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: colors.textMuted }}>Courses</span>
                      <span className="text-sm font-medium" style={{ color: colors.text }}>{path.courses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: colors.textMuted }}>Duration</span>
                      <span className="text-sm font-medium" style={{ color: colors.text }}>{path.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: colors.textMuted }}>Level</span>
                      <span className="text-sm font-medium" style={{ color: colors.text }}>{path.level}</span>
                    </div>
                  </div>
                  
                  {path.completion > 0 && (
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm" style={{ color: colors.textMuted }}>Progress</span>
                        <span className="text-sm font-medium" style={{ color: colors.text }}>{path.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `XFA {path.completion}%`,
                            backgroundColor: colors.primary 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <Button variant="primary" className="w-full">
                    {path.completion > 0 ? 'Continue Learning' : 'Start Path'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {activeTab === 'certifications' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
                Professional Certifications
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
                Earn industry-recognized certifications to advance your career
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert) => (
                <Card key={cert.id} className="p-8 hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-10 rounded-full" style={{ background: colors.gradientPrimary }} />
                  
                  <div className="text-center mb-6">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: colors.gradientPrimary }}
                    >
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <Badge 
                      className="mb-4"
                      style={{ backgroundColor: colors.secondary }}
                    >
                      {cert.badge}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                      {cert.title}
                    </h3>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      {cert.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: colors.textMuted }}>Duration</span>
                      <span className="text-sm font-medium" style={{ color: colors.text }}>{cert.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: colors.textMuted }}>Level</span>
                      <span className="text-sm font-medium" style={{ color: colors.text }}>{cert.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: colors.textMuted }}>Price</span>
                      <span className="text-sm font-medium" style={{ color: colors.text }}>{cert.price}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3" style={{ color: colors.text }}>Requirements:</h4>
                    <ul className="space-y-2">
                      {cert.requirements.map((req, index) => (
                        <li key={index} className="flex items-center text-sm" style={{ color: colors.textSecondary }}>
                          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: colors.success }} />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button variant="primary" className="w-full">
                    Start Certification
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of professionals advancing their careers with SUI Learn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="text-lg px-8 py-4"
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Start Free Course
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-gray-900"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SUILearnPage;

