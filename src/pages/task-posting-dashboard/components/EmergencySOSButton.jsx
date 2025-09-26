import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencySOSButton = ({ onActivate, isCollapsed = false }) => {
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
      if (onActivate) onActivate();
      navigate('/emergency-sos-center');
    }, 2000);
  };

  const cancelEmergency = () => {
    setShowConfirmation(false);
  };

  // Collapsed version for when space is limited
  if (isCollapsed) {
    return (
      <div className="bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-destructive/10 rounded-full">
              <Icon name="AlertTriangle" size={20} color="var(--color-destructive)" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Need Emergency Help?</h3>
              <p className="text-sm text-muted-foreground">Get instant assistance from verified helpers</p>
            </div>
          </div>
          <Button
            onClick={handleEmergencyClick}
            variant="destructive"
            size="sm"
            iconName="AlertTriangle"
            iconPosition="left"
          >
            Emergency SOS
          </Button>
        </div>
      </div>
    );
  }

  // Activating state
  if (isActivating) {
    return (
      <div className="bg-gradient-to-r from-destructive/15 to-destructive/5 border-2 border-destructive/30 rounded-lg p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icon name="AlertTriangle" size={40} color="var(--color-destructive)" />
          </div>
          
          <h3 className="text-xl font-bold text-destructive mb-2">
            SOS ACTIVATED
          </h3>
          
          <p className="text-muted-foreground mb-4">
            Broadcasting emergency alert to nearby helpers...
          </p>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-destructive rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-destructive rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-destructive rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            <p className="text-sm text-foreground font-medium">Redirecting to Emergency Center...</p>
          </div>
        </div>
      </div>
    );
  }

  // Confirmation state
  if (showConfirmation) {
    return (
      <div className="space-y-4">
        {/* Main Emergency Panel */}
        <div className="bg-gradient-to-r from-destructive/10 to-destructive/5 border-2 border-destructive/20 rounded-lg p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="AlertTriangle" size={32} color="var(--color-destructive)" />
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Emergency Assistance
            </h3>
            
            <p className="text-muted-foreground mb-6 text-sm">
              Need immediate help? Activate SOS to broadcast an emergency alert to all nearby verified helpers and emergency contacts.
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground mb-4">
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

        {/* Confirmation Panel */}
        <div className="bg-card border-2 border-destructive/30 rounded-lg p-6 shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-destructive/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="AlertTriangle" size={32} color="var(--color-destructive)" />
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
                iconName="X"
                iconPosition="left"
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

  // Default state
  return (
    <div className="bg-gradient-to-r from-destructive/10 to-destructive/5 border-2 border-destructive/20 rounded-lg p-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="AlertTriangle" size={32} color="var(--color-destructive)" />
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
          className="w-full animate-pulse-subtle hover:animate-none"
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