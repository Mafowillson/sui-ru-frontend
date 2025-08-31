import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  MessageCircle, 
  Book, 
  Video, 
  Search,
  HelpCircle,
  FileText,
  Users,
  Shield,
  Zap,
  Clock
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const HelpCenterPage = () => {
  const { colors } = useTheme();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is Sui-Ru MHSMS and how does it work?",
          answer: "Sui-Ru MHSMS (Misinformation and Hate Speech Monitoring System) is an advanced AI-powered platform designed to monitor social media platforms in real-time. Our system uses sophisticated machine learning algorithms, natural language processing, and computer vision to detect, analyze, and respond to misinformation and hate speech content across multiple digital platforms. The system operates by continuously scanning public content, analyzing it through our AI models, and flagging potentially harmful material for human review and appropriate action."
        },
        {
          question: "How do I get started with the platform?",
          answer: "Getting started with Sui-Ru MHSMS is straightforward. First, create an account through our registration page by providing your basic information and verifying your email address. Once registered, you'll have access to our demo dashboard where you can explore the platform's capabilities. For full access to monitoring tools and analytics, you'll need to complete the verification process and select an appropriate subscription plan based on your organization's needs."
        },
        {
          question: "What are the system requirements?",
          answer: "Sui-Ru MHSMS is a web-based platform that works on any modern web browser including Chrome, Firefox, Safari, and Edge. For optimal performance, we recommend using the latest version of your preferred browser with JavaScript enabled. The platform is fully responsive and works on desktop computers, tablets, and mobile devices. No additional software installation is required."
        }
      ]
    },
    {
      category: "AI Detection & Technology",
      questions: [
        {
          question: "How accurate is the AI detection system?",
          answer: "Our AI detection system achieves over 95% accuracy in identifying misinformation and hate speech across multiple languages and content types. The system uses ensemble learning techniques, combining multiple specialized models for text analysis, image recognition, and pattern detection. We continuously train and update our models using the latest datasets and feedback from human analysts. However, all flagged content undergoes human review to ensure accuracy and minimize false positives."
        },
        {
          question: "Which languages does the system support?",
          answer: "Sui-Ru MHSMS currently supports over 50 languages including English, Spanish, French, German, Arabic, Chinese, Japanese, Russian, Portuguese, and many others. Our multilingual capabilities are powered by advanced natural language processing models that can detect harmful content regardless of the language used. We're continuously expanding our language support based on user needs and global monitoring requirements."
        },
        {
          question: "How does the system handle different types of content?",
          answer: "Our platform analyzes multiple content types including text posts, images, videos, memes, and multimedia content. For text analysis, we use advanced NLP models that understand context, sentiment, and linguistic patterns. Image analysis employs computer vision to detect harmful visual content, symbols, and text within images. Video content is processed frame-by-frame and includes audio analysis for comprehensive monitoring."
        }
      ]
    },
    {
      category: "Platform Coverage",
      questions: [
        {
          question: "Which social media platforms are monitored?",
          answer: "We monitor major social media platforms including Facebook, Twitter/X, Instagram, WhatsApp, TikTok, YouTube, LinkedIn, Telegram, Discord, and Reddit. Our coverage extends to emerging platforms and regional social networks based on user requirements. We also monitor news websites, forums, and other digital communication channels where harmful content may spread."
        },
        {
          question: "How real-time is the monitoring?",
          answer: "Our monitoring system operates in near real-time with typical detection latency of 30 seconds to 2 minutes depending on the platform and content type. High-priority content and trending topics are processed with even lower latency. The system continuously scans for new content and updates our databases every few minutes to ensure comprehensive coverage."
        },
        {
          question: "Can I customize which platforms to monitor?",
          answer: "Yes, our platform offers flexible monitoring configuration. Users can select specific platforms, geographic regions, languages, and content types to monitor based on their needs. You can also set up custom keywords, hashtags, and user accounts for targeted monitoring. Enterprise users have access to advanced filtering and customization options."
        }
      ]
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          question: "How is user privacy protected?",
          answer: "Privacy protection is fundamental to our operations. We only analyze publicly available content and never access private messages, personal data, or confidential information. All data processing follows strict privacy regulations including GDPR, CCPA, and other international standards. Personal information is anonymized wherever possible, and we implement robust security measures to protect all data in our systems."
        },
        {
          question: "Who has access to the monitoring data?",
          answer: "Access to monitoring data is strictly controlled through role-based permissions. Only authorized personnel including security analysts, researchers, and designated government agencies have access to specific data relevant to their responsibilities. All access is logged, audited, and monitored for security purposes. We maintain detailed access logs and conduct regular security reviews."
        },
        {
          question: "How is data stored and secured?",
          answer: "All data is stored in secure, encrypted databases with multiple layers of protection including encryption at rest and in transit. We use industry-standard security protocols, regular security audits, and maintain compliance with international security standards. Data retention policies ensure that information is only kept as long as necessary for analysis and legal requirements."
        }
      ]
    },
    {
      category: "Reporting & Response",
      questions: [
        {
          question: "How can I report suspicious content?",
          answer: "You can report suspicious content through multiple channels. Use our secure Report page to submit URLs, screenshots, or descriptions of potentially harmful content. You can also use our mobile app or email our support team with relevant information. All reports are processed promptly by our analysis team and investigated according to severity and threat level."
        },
        {
          question: "What happens after content is detected?",
          answer: "When harmful content is detected, it's immediately flagged in our system and assigned a threat level based on severity and potential impact. The content undergoes human review by trained analysts who verify the AI detection and determine appropriate response actions. Depending on the severity, we may alert relevant authorities, notify platform moderators, or add the content to our threat intelligence database."
        },
        {
          question: "How quickly do you respond to reports?",
          answer: "Response times vary based on the severity and type of content reported. Critical threats involving immediate danger are processed within 15 minutes. High-priority content is typically reviewed within 2 hours, while standard reports are processed within 24 hours. We provide status updates for all reports and notify users when investigations are complete."
        }
      ]
    },
    {
      category: "Account & Billing",
      questions: [
        {
          question: "What subscription plans are available?",
          answer: "We offer several subscription tiers to meet different needs. The Basic plan includes access to monitoring dashboards and basic analytics. Professional plans add advanced filtering, custom alerts, and API access. Enterprise plans include dedicated support, custom integrations, and advanced analytics. Contact our sales team for detailed pricing and feature comparisons."
        },
        {
          question: "Can I upgrade or downgrade my plan?",
          answer: "Yes, you can change your subscription plan at any time through your account settings. Upgrades take effect immediately, while downgrades are processed at the end of your current billing cycle. Any unused credits from higher-tier plans are prorated and applied to your account. Our support team can assist with plan changes and answer billing questions."
        },
        {
          question: "Is there a free trial available?",
          answer: "We offer a 14-day free trial that includes access to our demo dashboard and limited monitoring capabilities. The trial allows you to explore the platform's features and see how it works with sample data. No credit card is required for the trial, and you can upgrade to a paid plan at any time during or after the trial period."
        }
      ]
    }
  ];

  const helpResources = [
    {
      title: "User Guide",
      description: "Comprehensive guide to using all platform features",
      icon: Book,
      type: "Documentation",
      link: "/docs/user-guide"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video tutorials for common tasks",
      icon: Video,
      type: "Video",
      link: "/tutorials"
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers",
      icon: FileText,
      type: "Technical",
      link: "/docs/api"
    },
    {
      title: "Best Practices",
      description: "Guidelines for effective content monitoring",
      icon: Shield,
      type: "Guide",
      link: "/docs/best-practices"
    },
    {
      title: "Quick Start Guide",
      description: "Get up and running in minutes",
      icon: Zap,
      type: "Getting Started",
      link: "/docs/quick-start"
    },
    {
      title: "Community Forum",
      description: "Connect with other users and experts",
      icon: Users,
      type: "Community",
      link: "/community"
    }
  ];

  const contactOptions = [
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: Mail,
      contact: "support@sui-ru.com",
      availability: "24/7"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      contact: "Available in dashboard",
      availability: "Mon-Fri 9AM-6PM UTC"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our technical team",
      icon: Phone,
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri 9AM-5PM UTC"
    }
  ];

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-5xl font-bold mb-6"
            style={{ color: colors.text }}
          >
            Help Center
          </h1>
          <p 
            className="text-xl max-w-3xl mx-auto leading-relaxed mb-8"
            style={{ color: colors.textMuted }}
          >
            Find answers to your questions, explore our documentation, and get the support you need 
            to make the most of Sui-Ru MHSMS.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
              style={{ color: colors.textMuted }} 
            />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border text-lg"
              style={{
                backgroundColor: colors.bgCard,
                borderColor: colors.border,
                color: colors.text
              }}
            />
          </div>
        </div>

        {/* Quick Help Resources */}
        <div className="mb-16">
          <h2 
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: colors.text }}
          >
            Popular Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpResources.map((resource, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: colors.primary + '20' }}
                  >
                    <resource.icon 
                      className="w-6 h-6" 
                      style={{ color: colors.primary }} 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-lg font-semibold mb-2"
                      style={{ color: colors.text }}
                    >
                      {resource.title}
                    </h3>
                    <p 
                      className="text-sm mb-3"
                      style={{ color: colors.textMuted }}
                    >
                      {resource.description}
                    </p>
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: colors.primary + '10',
                        color: colors.primary 
                      }}
                    >
                      {resource.type}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: colors.text }}
          >
            Frequently Asked Questions
          </h2>
          
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h3 
                className="text-2xl font-semibold mb-6 flex items-center"
                style={{ color: colors.text }}
              >
                <HelpCircle className="w-6 h-6 mr-3" style={{ color: colors.primary }} />
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const uniqueIndex = `${categoryIndex}-${faqIndex}`;
                  return (
                    <Card key={uniqueIndex} className="overflow-hidden">
                      <button
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-opacity-80 transition-all duration-200"
                        onClick={() => setOpenFAQ(openFAQ === uniqueIndex ? null : uniqueIndex)}
                        style={{ 
                          backgroundColor: openFAQ === uniqueIndex ? colors.bgHover + '50' : 'transparent' 
                        }}
                      >
                        <h4 className="text-lg font-semibold pr-4" style={{ color: colors.text }}>
                          {faq.question}
                        </h4>
                        {openFAQ === uniqueIndex ? (
                          <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: colors.textMuted }} />
                        ) : (
                          <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: colors.textMuted }} />
                        )}
                      </button>
                      {openFAQ === uniqueIndex && (
                        <div className="px-6 pb-6">
                          <p className="text-base leading-relaxed" style={{ color: colors.textMuted }}>
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mb-16">
          <h2 
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: colors.text }}
          >
            Contact Support
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <Card key={index} className="p-6 text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <option.icon 
                    className="w-8 h-8" 
                    style={{ color: colors.primary }} 
                  />
                </div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: colors.text }}
                >
                  {option.title}
                </h3>
                <p 
                  className="mb-4"
                  style={{ color: colors.textMuted }}
                >
                  {option.description}
                </p>
                <p 
                  className="font-medium mb-2"
                  style={{ color: colors.text }}
                >
                  {option.contact}
                </p>
                <div className="flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-2" style={{ color: colors.textMuted }} />
                  <span className="text-sm" style={{ color: colors.textMuted }}>
                    {option.availability}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <Card className="p-8 text-center">
          <h2 
            className="text-2xl font-semibold mb-4"
            style={{ color: colors.text }}
          >
            Still need help?
          </h2>
          <p 
            className="text-lg mb-6 max-w-2xl mx-auto"
            style={{ color: colors.textMuted }}
          >
            Can't find what you're looking for? Our support team is here to help you with any questions 
            or issues you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" size="lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Live Chat
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenterPage;

