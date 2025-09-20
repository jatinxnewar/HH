import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyActivationPanel = ({ onEmergencyActivate, isActive, onDeactivate }) => {
  const [isActivating, setIsActivating] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const handleEmergencyActivation = () => {
    if (isActive) {
      onDeactivate();
      return;
    }

    setIsActivating(true);
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsActivating(false);
          setCountdown(null);
          onEmergencyActivate();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className={`bg-card rounded-xl p-8 border-2 transition-all duration-300 ${
      isActive ? 'border-error bg-error/5' : 'border-border'
    }`}>
      <div className="text-center">
        <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          isActive 
            ? 'bg-error animate-pulse shadow-lg shadow-error/30' 
            : isActivating 
            ? 'bg-error/80 animate-pulse' :'bg-error/10 hover:bg-error/20'
        }`}>
          {countdown ? (
            <span className="text-4xl font-bold text-white">{countdown}</span>
          ) : (
            <Icon 
              name="AlertTriangle" 
              size={64} 
              color={isActive ? 'white' : 'var(--color-error)'} 
            />
          )}
        </div>

        <h2 className={`text-2xl font-bold mb-4 ${
          isActive ? 'text-error' : 'text-foreground'
        }`}>
          {isActive ? 'Emergency Active' : 'Emergency SOS'}
        </h2>

        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {isActive 
            ? 'Your emergency request is active. Help is on the way. Tap to cancel if resolved.'
            : 'Press and hold to activate emergency broadcast to nearby verified helpers.'
          }
        </p>

        <Button
          variant={isActive ? "outline" : "destructive"}
          size="lg"
          onClick={handleEmergencyActivation}
          disabled={isActivating}
          className={`w-full max-w-xs mx-auto h-14 text-lg font-semibold ${
            isActive ? 'border-error text-error hover:bg-error hover:text-white' : ''
          }`}
          iconName={isActive ? "X" : "AlertTriangle"}
          iconPosition="left"
          iconSize={24}
        >
          {isActivating 
            ? `Activating in ${countdown}...` 
            : isActive 
            ? 'Cancel Emergency' :'Activate Emergency SOS'
          }
        </Button>

        {isActive && (
          <div className="mt-6 p-4 bg-error/10 rounded-lg border border-error/20">
            <div className="flex items-center justify-center space-x-2 text-error">
              <Icon name="Radio" size={16} />
              <span className="text-sm font-medium">Broadcasting to 12 nearby helpers</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyActivationPanel;