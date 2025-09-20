import React from 'react';
import Icon from '../../../components/AppIcon';

const UrgencySelector = ({ selectedUrgency, onUrgencySelect }) => {
  const urgencyLevels = [
    {
      id: 'routine',
      name: 'Routine',
      description: 'Can wait a few days',
      icon: 'Clock',
      color: 'bg-green-100 text-green-800 border-green-200',
      multiplier: '1x',
      responseTime: '24-48 hours'
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Need help today',
      icon: 'Calendar',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      multiplier: '1.2x',
      responseTime: '4-8 hours'
    },
    {
      id: 'urgent',
      name: 'Urgent',
      description: 'Need help within hours',
      icon: 'Zap',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      multiplier: '1.5x',
      responseTime: '1-2 hours'
    },
    {
      id: 'emergency',
      name: 'Emergency',
      description: 'Critical situation',
      icon: 'AlertTriangle',
      color: 'bg-red-100 text-red-800 border-red-200',
      multiplier: '2x',
      responseTime: '15-30 minutes'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="Timer" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-semibold text-foreground">Urgency Level</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {urgencyLevels?.map((level) => (
          <button
            key={level?.id}
            onClick={() => onUrgencySelect(level?.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-elevation-1 animate-press ${
              selectedUrgency === level?.id
                ? 'border-primary bg-primary/10 shadow-elevation-1'
                : 'border-border bg-card hover:border-primary/30'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${level?.color} flex-shrink-0`}>
                <Icon name={level?.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground">{level?.name}</h4>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {level?.multiplier}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{level?.description}</p>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-muted-foreground">{level?.responseTime}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Urgency affects pricing and helper priority</p>
            <p>Higher urgency levels increase the base rate and notify helpers with priority alerts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgencySelector;