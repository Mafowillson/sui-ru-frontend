import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Mail, Phone, Globe2, Shield, Building, AlertTriangle, ExternalLink, Share2, Users, Flag, MessageSquare, Download, FileText, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ContactPage = () => {
  const { colors } = useTheme();

  const emergencyContacts = [
    {
      organization: "ANTIC",
      fullName: "Agence Nationale des Technologies de l'Information et de la Communication",
      description: "National ICT regulatory authority",
      contacts: [
        { type: "Emergency Hotline", value: "+237 653359620", icon: Phone },
        { type: "Email", value: "emergency@antic.cm", icon: Mail },
        { type: "Website", value: "https://www.antic.cm", icon: Globe2 }
      ],
      color: colors.primary
    },
    {
      organization: "CIRT",
      fullName: "Computer Incident Response Team",
      description: "Cybersecurity incident response and coordination",
      contacts: [
        { type: "24/7 Incident Line", value: "+237 222 987 654", icon: Phone },
        { type: "Incident Email", value: "incident@cirt.cm", icon: Mail },
        { type: "Secure Portal", value: "https://secure.cirt.cm", icon: Shield }
      ],
      color: colors.danger
    }
  ];

  const devTeamContacts = [
    { type: "Technical Support", value: "+237 653359620", icon: Phone },
    { type: "Development Team", value: "info@skye8.tech", icon: Mail },
    { type: "Bug Reports", value: "info@skye8.tech", icon: AlertTriangle },
    // { type: "Feature Requests", value: "features@sui-ru.com", icon: Zap },
    // { type: "GitHub Repository", value: "https://github.com/sui-ru/mhsms", icon: Github }
  ];

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
            Emergency Contacts
          </h1>
          <p className="text-xl" style={{ color: colors.textSecondary }}>
            Important contact information for cybersecurity incidents and technical support
          </p>
        </div>

        {/* Emergency Alert Banner */}
        <Card className="p-6 mb-8 border-l-4" style={{ borderLeftColor: colors.danger }}>
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 mr-3 mt-1" style={{ color: colors.danger }} />
            <div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
                Emergency Situations
              </h2>
              <p className="text-lg" style={{ color: colors.textSecondary }}>
                For immediate cybersecurity threats, misinformation campaigns, or critical system incidents, 
                contact the appropriate emergency hotline below. For life-threatening emergencies, call local emergency services first.
              </p>
            </div>
          </div>
        </Card>

        {/* Emergency Organizations */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {emergencyContacts.map((org, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ backgroundColor: `${org.color}20` }}
                >
                  <Building className="w-6 h-6" style={{ color: org.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                    {org.organization}
                  </h3>
                  <p className="text-sm font-medium mb-1" style={{ color: org.color }}>
                    {org.fullName}
                  </p>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {org.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {org.contacts.map((contact, contactIndex) => (
                  <div key={contactIndex} className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
                    <contact.icon className="w-5 h-5 mr-3" style={{ color: org.color }} />
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: colors.text }}>
                        {contact.type}
                      </p>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        {contact.value}
                      </p>
                    </div>
                    {contact.type.includes('Website') || contact.type.includes('Portal') ? (
                      <ExternalLink className="w-4 h-4" style={{ color: colors.textMuted }} />
                    ) : (
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Development Team Section */}
        <Card className="p-8">
          <div className="text-center mb-8">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: colors.gradientPrimary }}
            >
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
              Development Team Support
            </h2>
            <p className="text-lg" style={{ color: colors.textSecondary }}>
              Technical support and development team contacts for system issues and improvements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devTeamContacts.map((contact, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg border transition-all duration-200 hover:shadow-md"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border 
                }}
              >
                <div className="flex items-center mb-2">
                  <contact.icon className="w-5 h-5 mr-3" style={{ color: colors.primary }} />
                  <h3 className="font-semibold" style={{ color: colors.text }}>
                    {contact.type}
                  </h3>
                </div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {contact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: colors.bgTertiary }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>
              Support Hours
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: colors.text }}>Emergency Support</h4>
                <p style={{ color: colors.textSecondary }}>24/7 for critical security incidents</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: colors.text }}>General Support</h4>
                <p style={{ color: colors.textSecondary }}>Monday - Friday, 8:00 AM - 6:00 PM WAT</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: colors.text }}>
            Quick Actions
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" icon={Flag}>
              Report Incident
            </Button>
            <Button variant="secondary" icon={MessageSquare}>
              Contact Support
            </Button>
            <Button variant="ghost" icon={Download}>
              Download Contact List
            </Button>
            <Button variant="ghost" icon={FileText}>
              Emergency Procedures
            </Button>
          </div>
        </Card>

        {/* Important Notice */}
        <Card className="p-6 mt-8 text-center" style={{ backgroundColor: `${colors.warning}10` }}>
          <AlertCircle className="w-8 h-8 mx-auto mb-4" style={{ color: colors.warning }} />
          <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
            Important Notice
          </h3>
          <p style={{ color: colors.textSecondary }}>
            This contact information is for official cybersecurity and technical matters only. 
            For general inquiries, please use the appropriate channels. 
            Misuse of emergency contacts may result in legal action.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;


