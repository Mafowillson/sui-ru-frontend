import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronDown, ChevronUp, Mail } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const FAQPage = () => {
  const { colors } = useTheme();
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What is Sui-Ru MHSMS?",
      answer: "Sui-Ru MHSMS (Misinformation and Hate Speech Monitoring System) is an advanced AI-powered platform that monitors social media platforms in real-time to detect, analyze, and respond to misinformation and hate speech content."
    },
    {
      question: "How does the AI detection work?",
      answer: "Our system uses advanced machine learning algorithms, natural language processing, and pattern recognition to analyze text, images, and video content. The AI models are trained on vast datasets and continuously updated to improve accuracy and detect new types of harmful content."
    },
    {
      question: "Which platforms does the system monitor?",
      answer: "We monitor major social media platforms including Facebook, Twitter, Instagram, WhatsApp, TikTok, and YouTube. Our coverage is continuously expanding to include new platforms and communication channels."
    },
    {
      question: "How accurate is the detection system?",
      answer: "Our AI models achieve over 95% accuracy in detecting misinformation and hate speech. However, all flagged content is reviewed by human analysts to ensure accuracy and reduce false positives."
    },
    {
      question: "What happens when harmful content is detected?",
      answer: "When harmful content is detected, it's immediately flagged in our system, analyzed by our AI for threat level assessment, and then reviewed by human analysts. Depending on the severity, we may alert relevant authorities or platform moderators."
    },
    {
      question: "Is user privacy protected?",
      answer: "Yes, we strictly adhere to privacy regulations and ethical guidelines. We only analyze publicly available content and do not access private messages or personal data. All data is processed securely and anonymized where possible."
    },
    {
      question: "How can I report suspicious content?",
      answer: "You can report suspicious content through our Report page, which provides a secure form for submitting URLs, screenshots, or descriptions of potentially harmful content. Our team will investigate all reports promptly."
    },
    {
      question: "Who has access to the monitoring data?",
      answer: "Access to monitoring data is strictly controlled and limited to authorized personnel including security analysts, researchers, and relevant government agencies. All access is logged and audited for security purposes."
    }
  ];

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Frequently Asked Questions
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Find answers to common questions about Sui-Ru MHSMS
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-opacity-80 transition-all duration-200"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                style={{ backgroundColor: openFAQ === index ? colors.bgTertiary : 'transparent' }}
              >
                <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5" style={{ color: colors.textSecondary }} />
                ) : (
                  <ChevronDown className="w-5 h-5" style={{ color: colors.textSecondary }} />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <p className="text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        <Card className="p-6 mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>
            Still have questions?
          </h2>
          <p className="text-lg mb-6" style={{ color: colors.textSecondary }}>
            Contact our support team for additional assistance
          </p>
          <Button variant="primary" icon={Mail}>
            Contact Support
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default FAQPage;


