import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { 
  TrendingUp, 
  Users, 
  Target, 
  BarChart3, 
  Shield, 
  CheckCircle, 
  Star,
  ArrowRight,
  Building,
  Lightbulb,
  CreditCard,
  Calendar,
  Award,
  DollarSign,
  UserPlus,
  Headphones,
  Video,
  Rocket,
  Brain,
  Network,
  Activity,
  Phone
} from 'lucide-react';

const MarketingPage = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [showBusinessDashboard, setShowBusinessDashboard] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);

  const services = [
    {
      icon: TrendingUp,
      title: "Business Analysis & Strategy",
      description: "Comprehensive analysis of your business model, market position, and growth opportunities with AI-powered insights.",
      features: ["Market Analysis", "Competitor Research", "Growth Strategy", "Risk Assessment"],
      price: "Starting at XFA 299/month",
      popular: false
    },
    {
      icon: Target,
      title: "Advertising & Marketing",
      description: "Data-driven advertising strategies to maximize ROI and reach your target audience effectively.",
      features: ["Campaign Optimization", "Audience Targeting", "Content Strategy", "Performance Analytics"],
      price: "Starting at XFA 199/month",
      popular: true
    },
    {
      icon: Users,
      title: "Customer Acquisition",
      description: "Proven strategies to attract, convert, and retain customers using advanced analytics and AI insights.",
      features: ["Lead Generation", "Conversion Optimization", "Customer Journey Mapping", "Retention Strategies"],
      price: "Starting at XFA 399/month",
      popular: false
    },
    {
      icon: Lightbulb,
      title: "Problem Solving & Innovation",
      description: "Identify business challenges and implement innovative solutions powered by AI and data analytics.",
      features: ["Problem Identification", "Solution Design", "Implementation Support", "Performance Monitoring"],
      price: "Starting at XFA 499/month",
      popular: false
    },
    {
      icon: Brain,
      title: "AI-Powered Business Intelligence",
      description: "Transform your data into actionable insights with advanced AI and machine learning algorithms.",
      features: ["Predictive Analytics", "Automated Reporting", "Real-time Dashboards", "Custom AI Models"],
      price: "Starting at XFA 699/month",
      popular: false
    },
    {
      icon: Shield,
      title: "Digital Security Consulting",
      description: "Protect your business from digital threats with comprehensive security analysis and implementation.",
      features: ["Security Audits", "Threat Assessment", "Compliance Management", "Incident Response"],
      price: "Starting at XFA 599/month",
      popular: false
    }
  ];

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'XFA 299',
      period: '/month',
      description: 'Perfect for small businesses getting started',
      features: [
        'Basic business analysis',
        'Monthly strategy consultation',
        'Email support',
        'Basic reporting',
        'Up to 3 campaigns',
        'Standard templates',
        'Community access'
      ],
      popular: false,
      savings: null,
      setupFee: 'XFA 99',
      billingOptions: ['Monthly', 'Quarterly'],
      support: 'Email support',
      onboarding: '2 weeks'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 'XFA 799',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        'Comprehensive business analysis',
        'Weekly strategy sessions',
        'Priority support',
        'Advanced analytics',
        'Unlimited campaigns',
        'Custom solutions',
        'Dedicated account manager',
        'API access',
        'White-label options'
      ],
      popular: true,
      savings: 'Save 20% annually',
      setupFee: 'Free',
      billingOptions: ['Monthly', 'Quarterly', 'Annually'],
      support: 'Priority phone & email',
      onboarding: '1 week'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'XFA 1,999',
      period: '/month',
      description: 'For large organizations',
      features: [
        'Full-scale business transformation',
        'Daily consultation access',
        '24/7 premium support',
        'AI-powered insights',
        'Custom integrations',
        'White-label solutions',
        'Executive advisory board',
        'Custom AI models',
        'Dedicated success team',
        'SLA guarantees'
      ],
      popular: false,
      savings: 'Save 25% annually',
      setupFee: 'Free',
      billingOptions: ['Monthly', 'Quarterly', 'Annually'],
      support: '24/7 dedicated support',
      onboarding: '3 days'
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      company: "TechStart Inc.",
      role: "CEO",
      content: "Sui-Ru's marketing insights helped us increase our customer acquisition by 340% in just 6 months. The AI-powered analysis revealed opportunities we never knew existed.",
      rating: 5,
      image: "/api/placeholder/60/60",
      results: "340% increase in customer acquisition",
      industry: "Technology"
    },
    {
      name: "Michael Rodriguez",
      company: "Global Dynamics",
      role: "Marketing Director",
      content: "The ROI from our investment in Sui-Ru's services has been incredible. We've seen a 250% improvement in our marketing efficiency.",
      rating: 5,
      image: "/api/placeholder/60/60",
      results: "250% ROI improvement",
      industry: "Manufacturing"
    },
    {
      name: "Emily Watson",
      company: "Innovation Labs",
      role: "Founder",
      content: "Their problem-solving approach transformed our business model. We went from struggling startup to market leader in 18 months.",
      rating: 5,
      image: "/api/placeholder/60/60",
      results: "Market leadership achieved",
      industry: "Healthcare"
    }
  ];

  const stats = [
    { label: "Businesses Served", value: "2,500+", icon: Building, growth: "+15%" },
    { label: "Average ROI Increase", value: "285%", icon: TrendingUp, growth: "+12%" },
    { label: "Success Rate", value: "94%", icon: Target, growth: "+3%" },
    { label: "Expert Consultants", value: "150+", icon: Users, growth: "+25%" }
  ];

  const businessDashboardFeatures = [
    {
      title: "Real-time Analytics",
      description: "Monitor your business performance with live data and insights",
      icon: BarChart3,
      metrics: ["Revenue tracking", "Customer acquisition", "Market trends", "Competitor analysis"]
    },
    {
      title: "Expert Consultation Scheduling",
      description: "Book sessions with industry experts and track consultation history",
      icon: Calendar,
      metrics: ["Available time slots", "Expert profiles", "Session recordings", "Action items"]
    },
    {
      title: "ROI Tracking",
      description: "Measure the return on investment for all your business initiatives",
      icon: DollarSign,
      metrics: ["Campaign performance", "Cost analysis", "Profit margins", "Growth projections"]
    },
    {
      title: "Business Health Score",
      description: "Get an overall health score for your business with actionable recommendations",
      icon: Activity,
      metrics: ["Financial health", "Market position", "Operational efficiency", "Growth potential"]
    }
  ];

  const registrationSteps = [
    {
      step: 1,
      title: "Company Information",
      description: "Tell us about your business",
      fields: ["Company Name", "Industry", "Company Size", "Website"]
    },
    {
      step: 2,
      title: "Business Goals",
      description: "What are you looking to achieve?",
      fields: ["Primary Goals", "Current Challenges", "Target Market", "Budget Range"]
    },
    {
      step: 3,
      title: "Contact & Billing",
      description: "How can we reach you?",
      fields: ["Contact Person", "Email", "Phone", "Billing Address"]
    },
    {
      step: 4,
      title: "Payment Setup",
      description: "Choose your plan and payment method",
      fields: ["Selected Plan", "Payment Method", "Billing Cycle", "Additional Services"]
    }
  ];

  const addOnServices = [
    {
      name: "Advanced AI Analytics",
      description: "Custom AI models for your specific business needs",
      price: "XFA 299/month",
      icon: Brain
    },
    {
      name: "24/7 Priority Support",
      description: "Round-the-clock expert assistance",
      price: "XFA 199/month",
      icon: Headphones
    },
    {
      name: "Custom Integration",
      description: "Connect with your existing business tools",
      price: "XFA 499/month",
      icon: Network
    },
    {
      name: "Executive Coaching",
      description: "One-on-one sessions with C-level executives",
      price: "XFA 799/month",
      icon: Award
    }
  ];

  const BusinessRegistrationForm = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          {registrationSteps.map((step, index) => (
            <div key={step.step} className="flex items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold XFA {
                  registrationStep >= step.step 
                    ? 'text-white' 
                    : 'text-gray-400'
                }`}
                style={{ 
                  backgroundColor: registrationStep >= step.step ? colors.primary : colors.bgSecondary 
                }}
              >
                {step.step}
              </div>
              {index < registrationSteps.length - 1 && (
                <div 
                  className="w-16 h-1 mx-4"
                  style={{ 
                    backgroundColor: registrationStep > step.step ? colors.primary : colors.bgSecondary 
                  }}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
            {registrationSteps[registrationStep - 1].title}
          </h3>
          <p style={{ color: colors.textSecondary }}>
            {registrationSteps[registrationStep - 1].description}
          </p>
        </div>
      </div>

      <Card className="p-8">
        {registrationStep === 1 && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Company Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text
                }}
                placeholder="Enter your company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Industry *
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text
                }}
              >
                <option>Select your industry</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Manufacturing</option>
                <option>Retail</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Company Size *
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text
                }}
              >
                <option>Select company size</option>
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>51-200 employees</option>
                <option>201-1000 employees</option>
                <option>1000+ employees</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Website
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text
                }}
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>
        )}

        {registrationStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Primary Business Goals *
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Increase Revenue",
                  "Improve Efficiency",
                  "Market Expansion",
                  "Customer Acquisition",
                  "Digital Transformation",
                  "Cost Reduction"
                ].map((goal) => (
                  <label key={goal} className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span style={{ color: colors.text }}>{goal}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Current Challenges *
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border h-32"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text
                }}
                placeholder="Describe your main business challenges..."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Target Market
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ 
                    backgroundColor: colors.bgCard,
                    borderColor: colors.border,
                    color: colors.text
                  }}
                  placeholder="Describe your target market"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Monthly Budget Range
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border"
                  style={{ 
                    backgroundColor: colors.bgCard,
                    borderColor: colors.border,
                    color: colors.text
                  }}
                >
                  <option>Select budget range</option>
                  <option>XFA 500 - XFA 1,000</option>
                  <option>XFA 1,000 - XFA 5,000</option>
                  <option>XFA 5,000 - XFA 10,000</option>
                  <option>XFA 10,000+</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {registrationStep === 3 && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Contact Person *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text
                }}
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Job Title *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text
                }}
                placeholder="Your job title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Email Address *
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text
                }}
                placeholder="email@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Phone Number *
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text
                }}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Billing Address *
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border h-24"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border,
                  color: colors.text
                }}
                placeholder="Enter your billing address"
              />
            </div>
          </div>
        )}

        {registrationStep === 4 && (
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Selected Plan: {pricingPlans.find(p => p.id === selectedPlan)?.name}
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                {pricingPlans.map((plan) => (
                  <Card 
                    key={plan.id}
                    className={`p-4 cursor-pointer transition-all XFA {
                      selectedPlan === plan.id ? 'ring-2' : ''
                    }`}
                    style={{ 
                      ringColor: selectedPlan === plan.id ? colors.primary : 'transparent'
                    }}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="text-center">
                      <h5 className="font-semibold" style={{ color: colors.text }}>{plan.name}</h5>
                      <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                        {plan.price}<span className="text-sm">{plan.period}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Add-on Services
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {addOnServices.map((addon, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <addon.icon className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                          <h5 className="font-semibold" style={{ color: colors.text }}>{addon.name}</h5>
                        </div>
                        <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                          {addon.description}
                        </p>
                        <div className="font-semibold" style={{ color: colors.primary }}>
                          {addon.price}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Payment Information
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="radio" name="payment" className="mr-3" defaultChecked />
                      <CreditCard className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                      <span style={{ color: colors.text }}>Credit Card</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="payment" className="mr-3" />
                      <Building className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                      <span style={{ color: colors.text }}>Bank Transfer</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Billing Cycle
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{ 
                      backgroundColor: colors.bgCard,
                      borderColor: colors.border,
                      color: colors.text
                    }}
                  >
                    <option>Monthly</option>
                    <option>Quarterly (5% discount)</option>
                    <option>Annually (15% discount)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {registrationStep > 1 && (
            <Button 
              variant="ghost" 
              onClick={() => setRegistrationStep(registrationStep - 1)}
            >
              Previous
            </Button>
          )}
          <div className="ml-auto">
            {registrationStep < 4 ? (
              <Button 
                variant="primary" 
                onClick={() => setRegistrationStep(registrationStep + 1)}
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                variant="primary" 
                onClick={() => setShowBusinessDashboard(true)}
                className="px-8"
              >
                Complete Registration
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );

  const BusinessDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
          Welcome to Your Business Dashboard
        </h2>
        <p className="text-lg" style={{ color: colors.textSecondary }}>
          Track your business performance and access expert insights
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {businessDashboardFeatures.map((feature, index) => (
          <Card key={index} className="p-6 hover:scale-105 transition-transform duration-300">
            <feature.icon className="w-8 h-8 mb-4" style={{ color: colors.primary }} />
            <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
              {feature.title}
            </h3>
            <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
              {feature.description}
            </p>
            <ul className="space-y-1">
              {feature.metrics.map((metric, idx) => (
                <li key={idx} className="flex items-center text-sm" style={{ color: colors.textMuted }}>
                  <CheckCircle className="w-3 h-3 mr-2" style={{ color: colors.success }} />
                  {metric}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            Business Performance Overview
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.success }}>+24%</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Revenue Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.primary }}>87%</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Goal Achievement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.warning }}>12</div>
              <div className="text-sm" style={{ color: colors.textMuted }}>Active Campaigns</div>
            </div>
          </div>
          <Button variant="primary" className="w-full">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Detailed Analytics
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
            Upcoming Consultations
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
              <Calendar className="w-5 h-5 mr-3" style={{ color: colors.primary }} />
              <div>
                <div className="font-medium" style={{ color: colors.text }}>Strategy Session</div>
                <div className="text-sm" style={{ color: colors.textMuted }}>Tomorrow, 2:00 PM</div>
              </div>
            </div>
            <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.bgSecondary }}>
              <Video className="w-5 h-5 mr-3" style={{ color: colors.primary }} />
              <div>
                <div className="font-medium" style={{ color: colors.text }}>Marketing Review</div>
                <div className="text-sm" style={{ color: colors.textMuted }}>Friday, 10:00 AM</div>
              </div>
            </div>
          </div>
          <Button variant="ghost" className="w-full mt-4">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule New Session
          </Button>
        </Card>
      </div>
    </div>
  );

  if (showBusinessDashboard) {
    return (
      <div className="min-h-screen pt-16" style={{ backgroundColor: colors.bg }}>
        <BusinessDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: colors.bg }}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge 
              className="mb-6"
              style={{ backgroundColor: colors.primary }}
            >
              🚀 AI-Powered Business Transformation
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Transform Your Business
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Leverage AI-powered insights and expert consultation to accelerate growth, optimize operations, and dominate your market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                className="text-lg px-8 py-4"
                onClick={() => setActiveTab('signup')}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Your Transformation
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                className="text-lg px-8 py-4"
                onClick={() => setActiveTab('demo')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center hover:scale-105 transition-transform duration-300">
                <stat.icon className="w-8 h-8 mx-auto mb-4" style={{ color: colors.primary }} />
                <div className="text-3xl font-bold mb-2" style={{ color: colors.text }}>{stat.value}</div>
                <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>{stat.label}</div>
                <Badge 
                  variant="outline" 
                  className="text-xs"
                  style={{ color: colors.success, borderColor: colors.success }}
                >
                  {stat.growth} this quarter
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Expert Business Services
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Our AI-powered platform combined with expert consultation delivers measurable results for your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                {service.popular && (
                  <Badge 
                    className="absolute top-4 right-4"
                    style={{ backgroundColor: colors.success }}
                  >
                    Most Popular
                  </Badge>
                )}
                <service.icon className="w-12 h-12 mb-6" style={{ color: colors.primary }} />
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
                  {service.title}
                </h3>
                <p className="text-lg mb-6" style={{ color: colors.textSecondary }}>
                  {service.description}
                </p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" style={{ color: colors.success }} />
                      <span style={{ color: colors.text }}>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold" style={{ color: colors.primary }}>
                    {service.price}
                  </div>
                  <Button variant="primary" size="sm">
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section className="py-20" style={{ backgroundColor: colors.bgSecondary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Choose Your Growth Plan
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Flexible pricing options designed to scale with your business needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`p-8 relative XFA {plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge 
                      className="px-4 py-2"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-4xl font-bold" style={{ color: colors.text }}>
                      {plan.price}
                    </span>
                    <span className="text-lg" style={{ color: colors.textSecondary }}>
                      {plan.period}
                    </span>
                  </div>
                  <p style={{ color: colors.textSecondary }}>{plan.description}</p>
                  {plan.savings && (
                    <Badge 
                      variant="outline" 
                      className="mt-2"
                      style={{ color: colors.success, borderColor: colors.success }}
                    >
                      {plan.savings}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3" style={{ color: colors.success }} />
                      <span style={{ color: colors.text }}>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-8 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: colors.textMuted }}>Setup Fee:</span>
                    <span style={{ color: colors.text }}>{plan.setupFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: colors.textMuted }}>Support:</span>
                    <span style={{ color: colors.text }}>{plan.support}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: colors.textMuted }}>Onboarding:</span>
                    <span style={{ color: colors.text }}>{plan.onboarding}</span>
                  </div>
                </div>
                
                <Button 
                  variant={plan.popular ? "primary" : "ghost"}
                  className="w-full"
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    setActiveTab('signup');
                  }}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Success Stories
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              See how businesses like yours have transformed with our expert guidance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:scale-105 transition-transform duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: colors.warning }} />
                  ))}
                </div>
                <blockquote className="text-lg leading-relaxed mb-6 italic" style={{ color: colors.text }}>
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full mr-4 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
                  >
                    <span className="text-white font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: colors.text }}>{testimonial.name}</div>
                    <div style={{ color: colors.textSecondary }}>
                      {testimonial.role} at {testimonial.company}
                    </div>
                    <div className="text-sm" style={{ color: colors.textMuted }}>{testimonial.industry}</div>
                  </div>
                </div>
                <Badge 
                  variant="outline"
                  style={{ color: colors.success, borderColor: colors.success }}
                >
                  {testimonial.results}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Registration Section */}
      {activeTab === 'signup' && (
        <section className="py-20" style={{ backgroundColor: colors.bgSecondary }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
                Start Your Business Transformation
              </h2>
              <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
                Complete our comprehensive registration to get personalized business insights and expert consultation.
              </p>
            </div>
            <BusinessRegistrationForm />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of successful businesses that have accelerated their growth with our AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => setActiveTab('signup')}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Start Free Consultation
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-gray-900"
              onClick={() => setActiveTab('contact')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketingPage;

