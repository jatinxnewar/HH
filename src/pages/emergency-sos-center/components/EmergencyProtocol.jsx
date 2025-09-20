import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyProtocol = ({ selectedSituation, isEmergencyActive }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const protocolGuides = {
    medical: {
      title: "Medical Emergency Protocol",
      icon: "Heart",
      color: "text-error",
      bgColor: "bg-error/10",
      steps: [
        {
          id: 1,
          title: "Assess the Situation",
          description: "Check if the person is conscious and breathing",
          details: `• Check for responsiveness by gently shaking shoulders\n• Look for chest movement and listen for breathing\n• Check for pulse if trained to do so\n• Note any visible injuries or medical conditions`
        },
        {
          id: 2,
          title: "Call for Help",
          description: "Contact emergency services immediately",
          details: `• Call 911 for life-threatening emergencies\n• Provide clear location information\n• Describe the medical condition clearly\n• Stay on the line for instructions`
        },
        {
          id: 3,
          title: "Provide First Aid",
          description: "Apply basic first aid if trained",
          details: `• Keep the person calm and comfortable\n• Control bleeding with direct pressure\n• Do not move someone with potential spinal injury\n• Monitor breathing and consciousness`
        },
        {
          id: 4,
          title: "Wait for Professionals",
          description: "Assist emergency responders when they arrive",
          details: `• Provide information about what happened\n• Share any known medical conditions\n• Clear the area for emergency workers\n• Follow professional instructions`
        }
      ]
    },
    security: {
      title: "Security & Safety Protocol",
      icon: "Shield",
      color: "text-warning",
      bgColor: "bg-warning/10",
      steps: [
        {
          id: 1,
          title: "Ensure Personal Safety",
          description: "Move to a safe location immediately",
          details: `• Get to a secure, well-lit area\n• Lock doors and windows if indoors\n• Avoid confrontation with threats\n• Trust your instincts about danger`
        },
        {
          id: 2,
          title: "Contact Authorities",
          description: "Report the security concern",
          details: `• Call 911 for immediate threats\n• Contact building security if available\n• Provide detailed description of the threat\n• Share your exact location`
        },
        {
          id: 3,
          title: "Document Evidence",
          description: "Record important details safely",
          details: `• Note time, location, and description\n• Take photos/videos if safe to do so\n• Remember physical descriptions\n• Keep evidence secure`
        },
        {
          id: 4,
          title: "Follow Up",
          description: "Complete necessary reporting",
          details: `• File police report if required\n• Notify relevant authorities\n• Update security measures\n• Seek support if needed`
        }
      ]
    },
    technical: {
      title: "Technical Emergency Protocol",
      icon: "Zap",
      color: "text-primary",
      bgColor: "bg-primary/10",
      steps: [
        {
          id: 1,
          title: "Assess the Danger",
          description: "Identify potential hazards",
          details: `• Check for electrical hazards\n• Look for gas leaks or water damage\n• Identify fire or explosion risks\n• Ensure area is safe to approach`
        },
        {
          id: 2,
          title: "Shut Off Utilities",
          description: "Turn off relevant utilities if safe",
          details: `• Turn off electricity at main breaker\n• Shut off gas at the meter\n• Turn off water at main valve\n• Do not touch electrical equipment if wet`
        },
        {
          id: 3,
          title: "Contact Professionals",
          description: "Call appropriate emergency services",
          details: `• Call 911 for immediate dangers\n• Contact utility companies\n• Reach out to qualified technicians\n• Notify building management`
        },
        {
          id: 4,
          title: "Secure the Area",
          description: "Prevent further damage or injury",
          details: `• Keep people away from hazards\n• Ventilate area if safe to do so\n• Document damage for insurance\n• Wait for professional assessment`
        }
      ]
    },
    general: {
      title: "General Emergency Protocol",
      icon: "HelpCircle",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      steps: [
        {
          id: 1,
          title: "Stay Calm",
          description: "Take a moment to assess the situation",
          details: `• Take deep breaths to stay focused\n• Assess immediate dangers\n• Prioritize safety over property\n• Think before acting`
        },
        {
          id: 2,
          title: "Get Help",
          description: "Contact appropriate assistance",
          details: `• Use HelpHive emergency system\n• Call friends or family if needed\n• Contact professional services\n• Don't hesitate to ask for help`
        },
        {
          id: 3,
          title: "Communicate Clearly",
          description: "Provide clear information to helpers",
          details: `• Explain the situation clearly\n• Provide your exact location\n• Describe what help you need\n• Stay available for questions`
        },
        {
          id: 4,
          title: "Follow Instructions",
          description: "Listen to professional guidance",
          details: `• Follow helper instructions carefully\n• Ask questions if unclear\n• Provide updates as needed\n• Express gratitude for assistance`
        }
      ]
    }
  };

  const safetyTips = [
    {
      icon: "AlertTriangle",
      title: "Stay Calm",
      description: "Panic can lead to poor decisions. Take deep breaths and think clearly."
    },
    {
      icon: "Phone",
      title: "Communicate Location",
      description: "Always provide your exact location when requesting emergency help."
    },
    {
      icon: "Users",
      title: "Don\'t Act Alone",
      description: "Get help from others when possible. Two people are safer than one."
    },
    {
      icon: "Shield",
      title: "Safety First",
      description: "Your personal safety is more important than property or possessions."
    }
  ];

  const currentProtocol = selectedSituation?.category ? protocolGuides?.[selectedSituation?.category] : protocolGuides?.general;

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentProtocol?.bgColor}`}>
          <Icon name={currentProtocol?.icon} size={20} color={currentProtocol?.color} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{currentProtocol?.title}</h3>
          <p className="text-sm text-muted-foreground">Step-by-step emergency guidance</p>
        </div>
      </div>
      {/* Protocol Steps */}
      <div className="space-y-3 mb-6">
        {currentProtocol?.steps?.map((step, index) => (
          <div
            key={step?.id}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleSection(step?.id)}
              className="w-full p-4 text-left hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                    isEmergencyActive ? currentProtocol?.bgColor + ' ' + currentProtocol?.color : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{step?.title}</h4>
                    <p className="text-sm text-muted-foreground">{step?.description}</p>
                  </div>
                </div>
                <Icon 
                  name={expandedSection === step?.id ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  color="var(--color-muted-foreground)" 
                />
              </div>
            </button>

            {expandedSection === step?.id && (
              <div className="px-4 pb-4 border-t border-border bg-muted/20">
                <div className="pt-3">
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                    {step?.details}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Safety Tips */}
      <div className="border-t border-border pt-6">
        <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Lightbulb" size={16} color="var(--color-accent)" />
          <span>Safety Tips</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {safetyTips?.map((tip, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-muted/30 border border-muted"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={tip?.icon} size={14} color="var(--color-accent)" />
                </div>
                <div>
                  <h5 className="font-medium text-foreground text-sm">{tip?.title}</h5>
                  <p className="text-xs text-muted-foreground mt-1">{tip?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Emergency Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="destructive"
            size="lg"
            onClick={() => window.open('tel:911', '_self')}
            className="flex-1"
            iconName="Phone"
            iconPosition="left"
            iconSize={16}
          >
            Call 911
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open('https://www.redcross.org/get-help/how-to-prepare-for-emergencies/mobile-apps', '_blank')}
            className="flex-1"
            iconName="ExternalLink"
            iconPosition="left"
            iconSize={16}
          >
            First Aid Guide
          </Button>
        </div>
      </div>
      {/* Current Emergency Status */}
      {isEmergencyActive && selectedSituation && (
        <div className="mt-6 p-4 bg-error/5 rounded-lg border border-error/20">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" />
            <div>
              <h5 className="font-medium text-error mb-1">Active Emergency</h5>
              <p className="text-sm text-muted-foreground">
                Following {currentProtocol?.title?.toLowerCase()} for {selectedSituation?.category} emergency.
                Urgency level: <span className="font-medium">{selectedSituation?.urgency}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyProtocol;