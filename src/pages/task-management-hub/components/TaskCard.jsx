import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskCard = ({ task, onViewDetails, onContactHelper, onMarkComplete, onCancelTask }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-primary text-primary-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'emergency':
        return 'text-destructive';
      case 'urgent':
        return 'text-warning';
      case 'normal':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={task?.categoryIcon} size={20} color="var(--color-primary)" />
            <h3 className="font-semibold text-foreground">{task?.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task?.status)}`}>
              {task?.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task?.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{formatTimeAgo(task?.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={14} />
              <span>${task?.budget}</span>
            </div>
            <div className={`flex items-center space-x-1 ${getUrgencyColor(task?.urgency)}`}>
              <Icon name="AlertCircle" size={14} />
              <span className="capitalize">{task?.urgency}</span>
            </div>
          </div>
        </div>
        
        {task?.urgency === 'emergency' && (
          <div className="flex items-center justify-center w-8 h-8 bg-destructive/10 rounded-full">
            <Icon name="Zap" size={16} color="var(--color-destructive)" />
          </div>
        )}
      </div>
      {task?.helper && (
        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">{task?.helper?.name}</p>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} color="var(--color-warning)" />
                <span className="text-xs text-muted-foreground">{task?.helper?.rating}</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${task?.helper?.isOnline ? 'bg-success' : 'bg-muted-foreground'}`}></div>
              <span className="text-xs text-muted-foreground">
                {task?.helper?.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            iconSize={14}
            onClick={() => onContactHelper(task?.id)}
          >
            Chat
          </Button>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {task?.status === 'active' && task?.estimatedCompletion && (
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Timer" size={14} />
              <span>ETA: {task?.estimatedCompletion}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
            onClick={() => onViewDetails(task?.id)}
          >
            Details
          </Button>
          
          {task?.status === 'active' && (
            <Button
              variant="success"
              size="sm"
              iconName="Check"
              iconPosition="left"
              iconSize={14}
              onClick={() => onMarkComplete(task?.id)}
            >
              Complete
            </Button>
          )}
          
          {task?.status === 'pending' && (
            <Button
              variant="destructive"
              size="sm"
              iconName="X"
              iconPosition="left"
              iconSize={14}
              onClick={() => onCancelTask(task?.id)}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;