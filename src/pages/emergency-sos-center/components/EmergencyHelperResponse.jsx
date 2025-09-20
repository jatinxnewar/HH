import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EmergencyHelperResponse = ({ isEmergencyActive, selectedSituation }) => {
  const [respondingHelpers, setRespondingHelpers] = useState([]);
  const [selectedHelper, setSelectedHelper] = useState(null);

  // Mock responding helpers data
  const mockHelpers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      specialization: "Emergency Medical",
      rating: 4.9,
      responseTime: "2 min",
      distance: "0.3 miles",
      status: "responding",
      estimatedArrival: "5-8 minutes",
      certifications: ["EMT", "CPR", "First Aid"],
      emergencyBadge: true,
      phone: "+1 (555) 0123",
      isVerified: true
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      specialization: "Security & Safety",
      rating: 4.8,
      responseTime: "1 min",
      distance: "0.5 miles",
      status: "en_route",
      estimatedArrival: "3-5 minutes",
      certifications: ["Security", "Crisis Response"],
      emergencyBadge: true,
      phone: "+1 (555) 0124",
      isVerified: true
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      specialization: "Technical Emergency",
      rating: 4.7,
      responseTime: "3 min",
      distance: "0.8 miles",
      status: "available",
      estimatedArrival: "8-12 minutes",
      certifications: ["Electrical", "Emergency Repair"],
      emergencyBadge: true,
      phone: "+1 (555) 0125",
      isVerified: true
    }
  ];

  useEffect(() => {
    if (isEmergencyActive) {
      // Simulate helpers responding over time
      const timer1 = setTimeout(() => {
        setRespondingHelpers([mockHelpers?.[0]]);
      }, 1000);

      const timer2 = setTimeout(() => {
        setRespondingHelpers(prev => [...prev, mockHelpers?.[1]]);
      }, 2500);

      const timer3 = setTimeout(() => {
        setRespondingHelpers(prev => [...prev, mockHelpers?.[2]]);
      }, 4000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setRespondingHelpers([]);
      setSelectedHelper(null);
    }
  }, [isEmergencyActive]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'responding': return 'text-warning bg-warning/10 border-warning/20';
      case 'en_route': return 'text-primary bg-primary/10 border-primary/20';
      case 'available': return 'text-secondary bg-secondary/10 border-secondary/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'responding': return 'Responding';
      case 'en_route': return 'En Route';
      case 'available': return 'Available';
      default: return 'Unknown';
    }
  };

  const handleSelectHelper = (helper) => {
    setSelectedHelper(helper);
  };

  const handleCallHelper = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  if (!isEmergencyActive) {
    return (
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Users" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Active Emergency</h3>
          <p className="text-muted-foreground">
            Activate emergency mode to see responding helpers
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} color="var(--color-error)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Emergency Responders</h3>
            <p className="text-sm text-muted-foreground">
              {respondingHelpers?.length} helpers responding
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-error">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live</span>
        </div>
      </div>
      {respondingHelpers?.length === 0 ? (
        <div className="text-center py-6">
          <div className="animate-spin w-8 h-8 border-2 border-error border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Broadcasting emergency to nearby helpers...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {respondingHelpers?.map((helper) => (
            <div
              key={helper?.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                selectedHelper?.id === helper?.id
                  ? 'border-error bg-error/5' :'border-border hover:border-muted-foreground/30'
              }`}
              onClick={() => handleSelectHelper(helper)}
            >
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Image
                    src={helper?.avatar}
                    alt={helper?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {helper?.emergencyBadge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-error rounded-full flex items-center justify-center">
                      <Icon name="Shield" size={12} color="white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-foreground">{helper?.name}</h4>
                        {helper?.isVerified && (
                          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{helper?.specialization}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(helper?.status)}`}>
                      {getStatusText(helper?.status)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} color="var(--color-accent)" />
                      <span>{helper?.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{helper?.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>ETA: {helper?.estimatedArrival}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex space-x-1">
                      {helper?.certifications?.slice(0, 2)?.map((cert, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-xs rounded-full text-muted-foreground"
                        >
                          {cert}
                        </span>
                      ))}
                      {helper?.certifications?.length > 2 && (
                        <span className="px-2 py-1 bg-muted text-xs rounded-full text-muted-foreground">
                          +{helper?.certifications?.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          handleCallHelper(helper?.phone);
                        }}
                        iconName="Phone"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Call
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          handleSelectHelper(helper);
                        }}
                        iconName="MessageCircle"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedHelper && (
        <div className="mt-6 p-4 bg-error/5 rounded-lg border border-error/20">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={20} color="var(--color-error)" />
            <div>
              <p className="font-medium text-error">Helper Selected</p>
              <p className="text-sm text-muted-foreground">
                {selectedHelper?.name} has been notified and is responding to your emergency
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyHelperResponse;