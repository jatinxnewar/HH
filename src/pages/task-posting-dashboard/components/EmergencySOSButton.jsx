import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencySOSButton = ({ onEmergencyActivate }) => {
  const [isActivating, setIsActivating] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleEmergencyClick = () => {
    setShowConfirmation(true);
  };

  const confirmEmergency = () => {
    setIsActivating(true);
    setShowConfirmation(false);
    
    // Simulate emergency activation
    setTimeout(() => {
      onEmergencyActivate();
      navigate('/emergency-sos-center');
    }, 2000);
  };

  const cancelEmergency = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg p-6 max-w-md w-full border border-border shadow-elevation-2">
          <div className="text-center">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="AlertTriangle" size={32} color="var(--color-error)" />
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Activate Emergency SOS?
            </h3>
            
            <p className="text-muted-foreground mb-6">
              This will immediately broadcast an emergency alert to all nearby helpers and emergency contacts. Only use for genuine emergencies.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={cancelEmergency}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmEmergency}
                iconName="AlertTriangle"
                iconPosition="left"
                className="flex-1"
              >
                Confirm SOS
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isActivating) {
    return (
      <div className="fixed inset-0 bg-error/10 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg p-8 max-w-md w-full border border-error shadow-elevation-2">
          <div className="text-center">
            <div className="w-20 h-20 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Icon name="AlertTriangle" size={40} color="var(--color-error)" />
            </div>
            
            <h3 className="text-xl font-bold text-error mb-2">
              SOS ACTIVATED
            </h3>
            
            <p className="text-muted-foreground mb-4">
              Broadcasting emergency alert to nearby helpers...
            </p>
            
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-error rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-error rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-error rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-error/10 to-error/5 border-2 border-error/20 rounded-lg p-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="AlertTriangle" size={32} color="var(--color-error)" />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Emergency Assistance
        </h3>
        
        <p className="text-muted-foreground mb-6 text-sm">
          Need immediate help? Activate SOS to broadcast an emergency alert to all nearby verified helpers and emergency contacts.
        </p>
        
        <Button
          variant="destructive"
          size="lg"
          onClick={handleEmergencyClick}
          iconName="AlertTriangle"
          iconPosition="left"
          className="w-full shadow-emergency animate-pulse"
        >
          ACTIVATE EMERGENCY SOS
        </Button>
        
        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>Instant broadcast</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>Verified helpers</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Phone" size={12} />
            <span>Emergency contacts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencySOSButton;