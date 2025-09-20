import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationTimeline = ({ events = [] }) => {
  const getEventIcon = (type) => {
    switch (type) {
      case 'skill-validation':
        return 'Award';
      case 'peer-review':
        return 'Users';
      case 'ngo-partnership':
        return 'Heart';
      case 'emergency-certification':
        return 'AlertTriangle';
      case 'community-endorsement':
        return 'ThumbsUp';
      default:
        return 'Circle';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'skill-validation':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'peer-review':
        return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'ngo-partnership':
        return 'text-error bg-error/10 border-error/20';
      case 'emergency-certification':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'community-endorsement':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (events?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Verification Timeline</h3>
        <div className="text-center py-8">
          <Icon name="Clock" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground">No verification activities yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Start building your trust score by completing verifications
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-semibold text-foreground mb-4">Verification Timeline</h3>
      <div className="space-y-4">
        {events?.map((event, index) => (
          <div key={event?.id} className="flex items-start space-x-4">
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getEventColor(event?.type)}`}>
                <Icon name={getEventIcon(event?.type)} size={16} />
              </div>
              {index < events?.length - 1 && (
                <div className="w-0.5 h-8 bg-border mt-2"></div>
              )}
            </div>

            {/* Event Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">{event?.title}</h4>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{formatDate(event?.timestamp)}</p>
                  <p className="text-xs text-muted-foreground">{formatTime(event?.timestamp)}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{event?.description}</p>
              
              {/* Event Details */}
              {event?.details && (
                <div className="mt-2 p-2 bg-muted/50 rounded-lg">
                  {event?.details?.points && (
                    <div className="flex items-center space-x-2">
                      <Icon name="TrendingUp" size={12} color="var(--color-success)" />
                      <span className="text-xs text-success">+{event?.details?.points} trust points</span>
                    </div>
                  )}
                  {event?.details?.badge && (
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon name="Award" size={12} color="var(--color-accent)" />
                      <span className="text-xs text-accent">{event?.details?.badge} badge earned</span>
                    </div>
                  )}
                  {event?.details?.validator && (
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon name="User" size={12} color="var(--color-muted-foreground)" />
                      <span className="text-xs text-muted-foreground">Validated by {event?.details?.validator}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationTimeline;