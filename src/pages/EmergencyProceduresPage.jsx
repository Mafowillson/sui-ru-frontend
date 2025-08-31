import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
  AlertTriangle, 
  Shield, 
  Phone, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Info, 
  Zap, 
  Eye, 
  MessageSquare, 
  Globe, 
  ChevronDown,
  ChevronRight,
  Search,
  Download,
  ExternalLink,
  Flag,
  ArrowLeft,
  Database,
  Server
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const EmergencyProceduresPage = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const emergencyProcedures = [
    {
      id: 'misinformation-outbreak',
      title: 'Viral Misinformation Outbreak',
      severity: 'critical',
      category: 'Content Threats',
      icon: MessageSquare,
      description: 'Rapid spread of false information across multiple platforms',
      immediateActions: [
        'Document the misinformation content with screenshots and URLs',
        'Assess the scale and reach of the misinformation',
        'Contact platform administrators for content removal',
        'Prepare factual counter-narrative with credible sources',
        'Notify relevant authorities if it affects public safety'
      ],
      detailedSteps: [
        {
          step: 'Initial Assessment',
          actions: [
            'Identify the source and first appearance of the misinformation',
            'Determine the platforms where it is spreading',
            'Estimate the number of shares, likes, and comments',
            'Assess potential harm to individuals or communities',
            'Check if the content violates platform community guidelines'
          ]
        },
        {
          step: 'Documentation',
          actions: [
            'Take screenshots of the original post and major shares',
            'Record URLs and timestamps of all instances',
            'Document user accounts spreading the content',
            'Save any multimedia content (images, videos, audio)',
            'Create a timeline of the spread pattern'
          ]
        },
        {
          step: 'Response Coordination',
          actions: [
            'Contact platform trust and safety teams',
            'Coordinate with fact-checking organizations',
            'Prepare accurate information for public release',
            'Engage with community leaders and influencers',
            'Monitor response effectiveness and adjust strategy'
          ]
        }
      ],
      contacts: [
        { role: 'Platform Safety Teams', contact: 'Via platform reporting systems' },
        { role: 'Fact-Checkers', contact: 'factcheck@cameroon-verify.org' },
        { role: 'Media Relations', contact: 'media@sui-ru.com' }
      ],
      timeline: '0-2 hours for initial response, 24-48 hours for full containment'
    },
    {
      id: 'hate-speech-escalation',
      title: 'Hate Speech Escalation',
      severity: 'high',
      category: 'Social Threats',
      icon: Users,
      description: 'Coordinated hate speech targeting specific communities',
      immediateActions: [
        'Secure evidence of hate speech content',
        'Assess threat level to targeted communities',
        'Report to law enforcement if violence is threatened',
        'Contact community leaders for de-escalation',
        'Implement content moderation measures'
      ],
      detailedSteps: [
        {
          step: 'Threat Assessment',
          actions: [
            'Evaluate the severity and specificity of threats',
            'Identify targeted individuals or groups',
            'Assess the credibility of threat actors',
            'Determine if offline violence is likely',
            'Check for coordination across multiple accounts'
          ]
        },
        {
          step: 'Community Protection',
          actions: [
            'Alert targeted communities about the threats',
            'Provide safety recommendations and resources',
            'Coordinate with local security forces if necessary',
            'Establish communication channels for updates',
            'Monitor for escalation or new threats'
          ]
        },
        {
          step: 'Legal and Platform Action',
          actions: [
            'File reports with appropriate law enforcement',
            'Submit content violations to platform moderators',
            'Coordinate with legal teams for potential prosecution',
            'Document all evidence for legal proceedings',
            'Follow up on enforcement actions taken'
          ]
        }
      ],
      contacts: [
        { role: 'Emergency Services', contact: '117 (Police), 118 (Fire)' },
        { role: 'Human Rights Commission', contact: '+237 222 234 567' },
        { role: 'Legal Support', contact: 'legal@sui-ru.com' }
      ],
      timeline: 'Immediate response within 30 minutes, ongoing monitoring for 72 hours'
    },
    {
      id: 'data-breach',
      title: 'Data Breach Incident',
      severity: 'critical',
      category: 'Security Threats',
      icon: Database,
      description: 'Unauthorized access to sensitive user or system data',
      immediateActions: [
        'Isolate affected systems immediately',
        'Preserve forensic evidence',
        'Assess scope of data compromised',
        'Notify data protection authorities',
        'Prepare user notification communications'
      ],
      detailedSteps: [
        {
          step: 'Immediate Containment',
          actions: [
            'Disconnect affected systems from the network',
            'Change all administrative passwords',
            'Revoke access tokens and API keys',
            'Enable additional monitoring on all systems',
            'Document the timeline of the incident'
          ]
        },
        {
          step: 'Impact Assessment',
          actions: [
            'Identify what data was accessed or stolen',
            'Determine the number of affected users',
            'Assess potential misuse of the compromised data',
            'Evaluate regulatory notification requirements',
            'Calculate potential financial and reputational impact'
          ]
        },
        {
          step: 'Recovery and Notification',
          actions: [
            'Implement security patches and improvements',
            'Restore systems from clean backups if necessary',
            'Notify affected users with clear instructions',
            'Provide credit monitoring or identity protection services',
            'Conduct post-incident review and update security measures'
          ]
        }
      ],
      contacts: [
        { role: 'CIRT Cameroon', contact: '+237 222 987 654' },
        { role: 'Data Protection Authority', contact: 'dpo@antic.cm' },
        { role: 'Forensics Team', contact: 'forensics@sui-ru.com' }
      ],
      timeline: 'Immediate containment within 1 hour, full assessment within 24 hours'
    },
    {
      id: 'ddos-attack',
      title: 'DDoS Attack Response',
      severity: 'high',
      category: 'Technical Threats',
      icon: Server,
      description: 'Distributed denial of service attack overwhelming system resources',
      immediateActions: [
        'Activate DDoS mitigation services',
        'Monitor traffic patterns and sources',
        'Scale up server resources if possible',
        'Implement rate limiting and filtering',
        'Communicate with users about service disruption'
      ],
      detailedSteps: [
        {
          step: 'Attack Identification',
          actions: [
            'Analyze traffic logs for unusual patterns',
            'Identify attack vectors and source IPs',
            'Determine if attack is volumetric, protocol, or application layer',
            'Assess the sophistication and likely duration',
            'Check for any accompanying security breaches'
          ]
        },
        {
          step: 'Mitigation Deployment',
          actions: [
            'Enable cloud-based DDoS protection services',
            'Configure firewall rules to block malicious traffic',
            'Implement geographic IP blocking if appropriate',
            'Activate content delivery network (CDN) protection',
            'Coordinate with internet service provider for upstream filtering'
          ]
        },
        {
          step: 'Service Restoration',
          actions: [
            'Gradually restore services as attack subsides',
            'Monitor for secondary attacks or different vectors',
            'Conduct performance testing to ensure stability',
            'Update incident response procedures based on lessons learned',
            'Prepare detailed incident report for stakeholders'
          ]
        }
      ],
      contacts: [
        { role: 'ISP Emergency Line', contact: '+237 222 ISP HELP' },
        { role: 'Cloud Security Team', contact: 'security@cloudprovider.com' },
        { role: 'Network Operations', contact: 'noc@sui-ru.com' }
      ],
      timeline: 'Initial response within 15 minutes, full mitigation within 2-4 hours'
    },
    {
      id: 'insider-threat',
      title: 'Insider Threat Detection',
      severity: 'high',
      category: 'Personnel Security',
      icon: Eye,
      description: 'Suspicious activity from internal users or employees',
      immediateActions: [
        'Preserve audit logs and access records',
        'Temporarily suspend suspicious user accounts',
        'Secure sensitive systems and data',
        'Initiate discrete investigation',
        'Coordinate with HR and legal teams'
      ],
      detailedSteps: [
        {
          step: 'Evidence Preservation',
          actions: [
            'Capture complete audit trails of user activities',
            'Preserve email communications and file access logs',
            'Document any physical security incidents',
            'Secure workstation and mobile device forensics',
            'Maintain chain of custody for all evidence'
          ]
        },
        {
          step: 'Investigation Coordination',
          actions: [
            'Assemble investigation team with legal, HR, and security',
            'Conduct discrete interviews with relevant personnel',
            'Review background checks and employment history',
            'Analyze patterns of suspicious behavior',
            'Coordinate with external investigators if necessary'
          ]
        },
        {
          step: 'Resolution and Prevention',
          actions: [
            'Take appropriate disciplinary or legal action',
            'Implement additional monitoring and controls',
            'Review and update access control policies',
            'Provide security awareness training to all staff',
            'Conduct regular insider threat assessments'
          ]
        }
      ],
      contacts: [
        { role: 'HR Director', contact: 'hr@sui-ru.com' },
        { role: 'Legal Counsel', contact: 'legal@sui-ru.com' },
        { role: 'Security Investigations', contact: 'investigations@sui-ru.com' }
      ],
      timeline: 'Immediate containment within 2 hours, investigation 1-4 weeks'
    },
    {
      id: 'social-engineering',
      title: 'Social Engineering Attack',
      severity: 'medium',
      category: 'Human Factors',
      icon: Phone,
      description: 'Attempts to manipulate staff into revealing sensitive information',
      immediateActions: [
        'Alert all staff about the ongoing attack',
        'Document the attack methods and targets',
        'Verify identity of all unusual requests',
        'Implement additional verification procedures',
        'Report to appropriate authorities'
      ],
      detailedSteps: [
        {
          step: 'Attack Documentation',
          actions: [
            'Record details of all social engineering attempts',
            'Identify common tactics and pretexts used',
            'Document targeted individuals and departments',
            'Analyze the sophistication and knowledge of attackers',
            'Check for any successful information disclosure'
          ]
        },
        {
          step: 'Staff Protection',
          actions: [
            'Send immediate security alerts to all personnel',
            'Provide specific examples of the current attack methods',
            'Implement mandatory verification for sensitive requests',
            'Establish secure communication channels for verification',
            'Monitor for continued attempts and new variations'
          ]
        },
        {
          step: 'Long-term Prevention',
          actions: [
            'Conduct comprehensive security awareness training',
            'Implement regular phishing simulation exercises',
            'Establish clear procedures for handling sensitive requests',
            'Create incident reporting mechanisms for suspicious contacts',
            'Regularly update staff on emerging social engineering tactics'
          ]
        }
      ],
      contacts: [
        { role: 'Security Awareness Team', contact: 'awareness@sui-ru.com' },
        { role: 'IT Helpdesk', contact: '+237 653359620' },
        { role: 'Fraud Prevention', contact: 'fraud@sui-ru.com' }
      ],
      timeline: 'Immediate alert within 30 minutes, training updates within 1 week'
    }
  ];

  const filteredProcedures = emergencyProcedures.filter(procedure =>
    procedure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    procedure.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    procedure.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return colors.danger;
      case 'high': return colors.warning;
      case 'medium': return colors.primary;
      case 'low': return colors.success;
      default: return colors.textMuted;
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return XCircle;
      case 'high': return AlertTriangle;
      case 'medium': return Info;
      case 'low': return CheckCircle;
      default: return Info;
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="pt-20 min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/contact')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Contact
            </Button>
            
            <div className="flex gap-3">
              <Button variant="secondary" icon={Download}>
                Download PDF
              </Button>
              <Button variant="primary" icon={Flag} onClick={() => navigate('/report')}>
                Report Incident
              </Button>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: colors.gradientDanger }}
            >
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Emergency Response Procedures
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.textSecondary }}>
              Comprehensive guide for handling cybersecurity incidents, misinformation outbreaks, 
              and other digital threats in Cameroon's information ecosystem
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div 
                className="flex items-center px-4 py-3 rounded-lg border"
                style={{ 
                  backgroundColor: colors.bgCard,
                  borderColor: colors.border
                }}
              >
                <Search className="w-5 h-5 mr-3" style={{ color: colors.textMuted }} />
                <input
                  type="text"
                  placeholder="Search procedures by title, description, or category..."
                  className="flex-1 bg-transparent outline-none text-lg"
                  style={{ color: colors.text }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact Banner */}
          <Card className="p-6 mb-8 border-l-4" style={{ borderLeftColor: colors.danger }}>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 mr-3 mt-1" style={{ color: colors.danger }} />
                <div>
                  <h2 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
                    Emergency Contacts
                  </h2>
                  <p className="text-lg" style={{ color: colors.textSecondary }}>
                    For immediate assistance: ANTIC Emergency Hotline: +237 222 123 456 | 
                    CIRT Incident Line: +237 222 987 654 | Development Team: +237 653359620
                  </p>
                </div>
              </div>
              <Button variant="danger" icon={Phone} onClick={() => navigate('/contact')}>
                View All Contacts
              </Button>
            </div>
          </Card>
        </div>

        {/* Procedures List */}
        <div className="space-y-6">
          {filteredProcedures.map((procedure) => {
            const SeverityIcon = getSeverityIcon(procedure.severity);
            const ProcedureIcon = procedure.icon;
            const isExpanded = expandedSection === procedure.id;

            return (
              <Card key={procedure.id} className="overflow-hidden">
                <div 
                  className="p-6 cursor-pointer transition-all duration-200 hover:bg-opacity-50"
                  onClick={() => toggleSection(procedure.id)}
                  style={{ backgroundColor: isExpanded ? `${getSeverityColor(procedure.severity)}10` : 'transparent' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${getSeverityColor(procedure.severity)}20` }}
                      >
                        <ProcedureIcon className="w-6 h-6" style={{ color: getSeverityColor(procedure.severity) }} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold" style={{ color: colors.text }}>
                            {procedure.title}
                          </h3>
                          <Badge 
                            variant={
                              procedure.severity === 'critical' ? 'danger' :
                              procedure.severity === 'high' ? 'warning' :
                              procedure.severity === 'medium' ? 'primary' : 'default'
                            }
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <SeverityIcon size={12} />
                            {procedure.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="default" size="sm">
                            {procedure.category}
                          </Badge>
                        </div>
                        
                        <p className="text-lg mb-3" style={{ color: colors.textSecondary }}>
                          {procedure.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm" style={{ color: colors.textMuted }}>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {procedure.timeline}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {procedure.contacts.length} contact points
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5" style={{ color: colors.textMuted }} />
                      ) : (
                        <ChevronRight className="w-5 h-5" style={{ color: colors.textMuted }} />
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t" style={{ borderColor: colors.border }}>
                    <div className="p-6 space-y-8">
                      {/* Immediate Actions */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
                          <Zap className="w-5 h-5" style={{ color: colors.danger }} />
                          Immediate Actions (First 30 minutes)
                        </h4>
                        <div className="grid gap-3">
                          {procedure.immediateActions.map((action, index) => (
                            <div 
                              key={index}
                              className="flex items-start gap-3 p-3 rounded-lg"
                              style={{ backgroundColor: colors.bgTertiary }}
                            >
                              <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5"
                                style={{ backgroundColor: colors.danger }}
                              >
                                {index + 1}
                              </div>
                              <p style={{ color: colors.text }}>{action}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Detailed Steps */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
                          <FileText className="w-5 h-5" style={{ color: colors.primary }} />
                          Detailed Response Steps
                        </h4>
                        <div className="space-y-6">
                          {procedure.detailedSteps.map((step, stepIndex) => (
                            <div key={stepIndex} className="border rounded-lg p-4" style={{ borderColor: colors.border }}>
                              <h5 className="text-lg font-semibold mb-3" style={{ color: colors.text }}>
                                Step {stepIndex + 1}: {step.step}
                              </h5>
                              <div className="grid gap-2">
                                {step.actions.map((action, actionIndex) => (
                                  <div key={actionIndex} className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 mt-1" style={{ color: colors.success }} />
                                    <p className="text-sm" style={{ color: colors.textSecondary }}>{action}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Emergency Contacts */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
                          <Phone className="w-5 h-5" style={{ color: colors.secondary }} />
                          Emergency Contacts
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {procedure.contacts.map((contact, index) => (
                            <div 
                              key={index}
                              className="flex items-center justify-between p-3 rounded-lg border"
                              style={{ 
                                backgroundColor: colors.bgCard,
                                borderColor: colors.border 
                              }}
                            >
                              <div>
                                <p className="font-medium" style={{ color: colors.text }}>{contact.role}</p>
                                <p className="text-sm" style={{ color: colors.textSecondary }}>{contact.contact}</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                <ExternalLink size={14} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: colors.border }}>
                        <Button variant="primary" icon={Flag} onClick={() => navigate('/report')}>
                          Report This Incident
                        </Button>
                        <Button variant="secondary" icon={Phone} onClick={() => navigate('/contact')}>
                          Emergency Contacts
                        </Button>
                        <Button variant="ghost" icon={Download}>
                          Download Procedure
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {filteredProcedures.length === 0 && (
          <Card className="p-12 text-center">
            <Search className="w-16 h-16 mx-auto mb-4" style={{ color: colors.textMuted }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
              No procedures found
            </h3>
            <p style={{ color: colors.textSecondary }}>
              Try adjusting your search terms or browse all available procedures.
            </p>
          </Card>
        )}

        {/* Additional Resources */}
        <Card className="p-8 mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: colors.text }}>
            Additional Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <FileText className="w-6 h-6" style={{ color: colors.primary }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: colors.text }}>
                Incident Report Templates
              </h3>
              <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                Standardized forms for documenting security incidents
              </p>
              <Button variant="ghost" size="sm" icon={Download}>
                Download Templates
              </Button>
            </div>
            
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${colors.secondary}20` }}
              >
                <Users className="w-6 h-6" style={{ color: colors.secondary }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: colors.text }}>
                Training Materials
              </h3>
              <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                Security awareness and response training resources
              </p>
              <Button variant="ghost" size="sm" icon={ExternalLink}>
                Access Training
              </Button>
            </div>
            
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${colors.success}20` }}
              >
                <Globe className="w-6 h-6" style={{ color: colors.success }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: colors.text }}>
                External Resources
              </h3>
              <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                Links to government agencies and international organizations
              </p>
              <Button variant="ghost" size="sm" icon={ExternalLink}>
                View Resources
              </Button>
            </div>
          </div>
        </Card>

        {/* Important Notice */}
        <Card className="p-6 mt-8 text-center" style={{ backgroundColor: `${colors.warning}10` }}>
          <AlertTriangle className="w-8 h-8 mx-auto mb-4" style={{ color: colors.warning }} />
          <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
            Important Notice
          </h3>
          <p style={{ color: colors.textSecondary }}>
            These procedures are guidelines for common scenarios. Every incident is unique and may require 
            adaptation of these procedures. When in doubt, contact emergency services or the appropriate 
            authorities immediately. This document is regularly updated based on emerging threats and lessons learned.
          </p>
          <p className="mt-3 text-sm" style={{ color: colors.textMuted }}>
            Last updated: {new Date().toLocaleDateString()} | Version 2.1 | 
            Next review: {new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyProceduresPage;

