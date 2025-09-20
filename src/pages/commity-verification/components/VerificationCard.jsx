import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationCard = ({ 
  title, 
  description, 
  status, 
  progress, 
  reward, 
  iconName, 
  onAction, 
  actionText,
  completedDate,
  requirements = []
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'in-progress':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'pending':
        return 'text-muted-foreground bg-muted border-border';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'in-progress':
        return 'bg-warning';
      default:
        return 'bg-muted-foreground/30';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(status)}`}>
            <Icon name={iconName} size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {status === 'completed' && (
          <div className="flex items-center space-x-1 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-xs font-medium">Verified</span>
          </div>
        )}
      </div>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium text-foreground">{progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(status)}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {/* Requirements */}
      {requirements?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Requirements</h4>
          <ul className="space-y-1">
            {requirements?.map((req, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name={req?.completed ? "CheckCircle" : "Circle"} size={12} color={req?.completed ? "var(--color-success)" : "currentColor"} />
                <span className={req?.completed ? "line-through" : ""}>{req?.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Reward */}
      {reward && (
        <div className="flex items-center space-x-2 mb-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <Icon name="Award" size={16} color="var(--color-accent)" />
          <span className="text-sm font-medium text-accent">{reward}</span>
        </div>
      )}
      {/* Completion Date */}
      {completedDate && (
        <div className="text-xs text-muted-foreground mb-4">
          Completed on {completedDate}
        </div>
      )}
      {/* Action Button */}
      {actionText && onAction && (
        <Button
          variant={status === 'completed' ? 'outline' : 'default'}
          size="sm"
          onClick={onAction}
          disabled={status === 'completed'}
          fullWidth
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default VerificationCard;