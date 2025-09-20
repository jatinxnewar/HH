import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContacts = ({ isEmergencyActive }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const emergencyServices = [
    {
      id: 'police',
      name: 'Police',
      number: '911',
      icon: 'Shield',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Law enforcement and security emergencies'
    },
    {
      id: 'fire',
      name: 'Fire Department',
      number: '911',
      icon: 'Flame',
      color: 'text-error',
      bgColor: 'bg-error/10',
      description: 'Fire emergencies and rescue services'
    },
    {
      id: 'medical',
      name: 'Medical Emergency',
      number: '911',
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error/10',
      description: 'Medical emergencies and ambulance services'
    },
    {
      id: 'poison',
      name: 'Poison Control',
      number: '1-800-222-1222',
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Poison and chemical emergency assistance'
    }
  ];

  const personalContacts = [
    {
      id: 1,
      name: "Emergency Contact 1",
      relationship: "Family",
      number: "+1 (555) 0100",
      icon: 'User',
      isVerified: true
    },
    {
      id: 2,
      name: "Emergency Contact 2",
      relationship: "Friend",
      number: "+1 (555) 0101",
      icon: 'Users',
      isVerified: true
    },
    {
      id: 3,
      name: "Building Security",
      relationship: "Security",
      number: "+1 (555) 0102",
      icon: 'Shield',
      isVerified: false
    }
  ];

  const communityContacts = [
    {
      id: 1,
      name: "Community Safety Coordinator",
      organization: "HelpHive Community",
      number: "+1 (555) 0200",
      icon: 'Users',
      available: true
    },
    {
      id: 2,
      name: "Local NGO Emergency Line",
      organization: "Community Care Network",
      number: "+1 (555) 0201",
      icon: 'Heart',
      available: true
    }
  ];

  const handleCall = (number, contactName) => {
    setSelectedContact(contactName);
    window.open(`tel:${number}`, '_self');
  };

  const handleSMS = (number, contactName) => {
    const message = encodeURIComponent(`Emergency: I need immediate assistance. This is an automated message from HelpHive emergency system. Please respond ASAP.`);
    window.open(`sms:${number}?body=${message}`, '_self');
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
          <Icon name="Phone" size={20} color="var(--color-error)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Emergency Contacts</h3>
          <p className="text-sm text-muted-foreground">Quick access to emergency services</p>
        </div>
      </div>
      {/* Emergency Services */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Siren" size={16} color="var(--color-error)" />
          <span>Emergency Services</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {emergencyServices?.map((service) => (
            <div
              key={service?.id}
              className={`p-4 rounded-lg border ${service?.bgColor} border-current/20 ${service?.color}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${service?.bgColor}`}>
                    <Icon name={service?.icon} size={16} color="currentColor" />
                  </div>
                  <div>
                    <h5 className="font-medium">{service?.name}</h5>
                    <p className="text-sm opacity-70">{service?.number}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCall(service?.number, service?.name)}
                  className="border-current text-current hover:bg-current hover:text-white"
                  iconName="Phone"
                  iconSize={14}
                >
                  Call
                </Button>
              </div>
              <p className="text-xs opacity-60 mt-2">{service?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Personal Emergency Contacts */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Users" size={16} color="var(--color-primary)" />
          <span>Personal Contacts</span>
        </h4>
        <div className="space-y-3">
          {personalContacts?.map((contact) => (
            <div
              key={contact?.id}
              className="p-3 rounded-lg border border-border hover:border-muted-foreground/30 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Icon name={contact?.icon} size={14} color="var(--color-muted-foreground)" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h5 className="font-medium text-foreground">{contact?.name}</h5>
                      {contact?.isVerified && (
                        <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {contact?.relationship} • {contact?.number}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSMS(contact?.number, contact?.name)}
                    iconName="MessageSquare"
                    iconSize={14}
                  >
                    SMS
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCall(contact?.number, contact?.name)}
                    iconName="Phone"
                    iconSize={14}
                  >
                    Call
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Community Support */}
      <div>
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Heart" size={16} color="var(--color-secondary)" />
          <span>Community Support</span>
        </h4>
        <div className="space-y-3">
          {communityContacts?.map((contact) => (
            <div
              key={contact?.id}
              className="p-3 rounded-lg border border-border hover:border-muted-foreground/30 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Icon name={contact?.icon} size={14} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h5 className="font-medium text-foreground">{contact?.name}</h5>
                      {contact?.available && (
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {contact?.organization} • {contact?.number}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCall(contact?.number, contact?.name)}
                    disabled={!contact?.available}
                    iconName="Phone"
                    iconSize={14}
                  >
                    Call
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Emergency Protocol Info */}
      {isEmergencyActive && (
        <div className="mt-6 p-4 bg-error/5 rounded-lg border border-error/20">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} color="var(--color-error)" />
            <div>
              <h5 className="font-medium text-error mb-1">Emergency Protocol Active</h5>
              <p className="text-sm text-muted-foreground">
                Your emergency contacts have been automatically notified. 
                If this is a life-threatening emergency, call 911 immediately.
              </p>
            </div>
          </div>
        </div>
      )}
      {selectedContact && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Phone" size={14} />
            <span>Calling {selectedContact}...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContacts;