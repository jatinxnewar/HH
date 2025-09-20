import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyOverlay = ({ isActive, onDeactivate, emergencyHelpers }) => {
  const [broadcastRadius, setBroadcastRadius] = useState(2);
  const [responseCount, setResponseCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (isActive) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        // Simulate helper responses
        if (Math.random() > 0.7) {
          setResponseCount(prev => prev + 1);
        }
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setTimeElapsed(0);
      setResponseCount(0);
    }
  }, [isActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const expandRadius = () => {
    setBroadcastRadius(prev => Math.min(prev + 1, 10));
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-error/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border-2 border-error rounded-lg shadow-elevation-2 p-6 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-error rounded-full flex items-center justify-center animate-pulse">
              <Icon name="AlertTriangle" size={20} color="white" />
            </div>
            <h2 className="text-lg font-semibold text-error">Emergency Broadcast Active</h2>
          </div>
          <button
            onClick={onDeactivate}
            className="p-1 hover:bg-muted rounded-md transition-colors duration-200"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Status */}
        <div className="space-y-4">
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-error font-medium">Broadcasting for:</span>
              <span className="text-lg font-mono text-error">{formatTime(timeElapsed)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-error font-medium">Responses:</span>
              <span className="text-lg font-semibold text-error">{responseCount}</span>
            </div>
          </div>

          {/* Broadcast Radius */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Broadcast Radius</span>
              <span className="text-sm text-muted-foreground">{broadcastRadius}km</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-error transition-all duration-300"
                  style={{ width: `${(broadcastRadius / 10) * 100}%` }}
                ></div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={expandRadius}
                iconName="Plus"
                iconSize={14}
                disabled={broadcastRadius >= 10}
              >
                Expand
              </Button>
            </div>
          </div>

          {/* Emergency Helpers */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">
              Emergency Certified Helpers ({emergencyHelpers?.length})
            </h3>
            <div className="max-h-32 overflow-y-auto space-y-2">
              {emergencyHelpers?.slice(0, 3)?.map((helper) => (
                <div key={helper?.id} className="flex items-center space-x-3 p-2 bg-muted/50 rounded-md">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <Icon name="User" size={14} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{helper?.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {helper?.distance}km • {helper?.avgResponseTime} avg
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={12} color="var(--color-error)" />
                    <span className="text-xs text-error font-medium">Certified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              variant="destructive"
              onClick={() => {
                // Mock emergency services contact
                console.log('Contacting emergency services...');
              }}
              iconName="Phone"
              iconPosition="left"
              iconSize={16}
              className="w-full"
            >
              Contact Emergency Services
            </Button>
            <Button
              variant="outline"
              onClick={onDeactivate}
              iconName="StopCircle"
              iconPosition="left"
              iconSize={16}
              className="w-full"
            >
              Stop Emergency Broadcast
            </Button>
          </div>

          {/* Safety Notice */}
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={14} className="text-primary mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Safety First</p>
                <p>If this is a life-threatening emergency, please call 911 immediately. This service is for urgent non-emergency assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyOverlay;