import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyTaskSection = ({ emergencyTasks, onBroadcastSOS, onViewEmergencyTask }) => {
  return (
    <div className="bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/20 rounded-lg p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center animate-pulse">
            <Icon name="AlertTriangle" size={20} color="var(--color-destructive)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Emergency Tasks</h2>
            <p className="text-sm text-muted-foreground">Priority assistance requests</p>
          </div>
        </div>
        
        <Button
          variant="destructive"
          iconName="Zap"
          iconPosition="left"
          iconSize={16}
          onClick={onBroadcastSOS}
          className="animate-pulse"
        >
          Broadcast SOS
        </Button>
      </div>
      {emergencyTasks?.length > 0 ? (
        <div className="space-y-4">
          {emergencyTasks?.map((task) => (
            <div key={task?.id} className="bg-card border border-destructive/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name={task?.categoryIcon} size={16} color="var(--color-destructive)" />
                    <h3 className="font-semibold text-foreground">{task?.title}</h3>
                    <span className="px-2 py-1 bg-destructive text-destructive-foreground rounded-full text-xs font-medium">
                      EMERGENCY
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{task?.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-destructive">
                      <Icon name="Clock" size={14} />
                      <span>{task?.timeElapsed}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="MapPin" size={14} />
                      <span>{task?.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="Users" size={14} />
                      <span>{task?.helpersNotified} helpers notified</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-destructive rounded-full animate-ping"></div>
                  <span className="text-xs font-medium text-destructive">ACTIVE</span>
                </div>
              </div>

              {task?.responses && task?.responses?.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-foreground mb-2">Helper Responses:</p>
                  <div className="flex -space-x-2">
                    {task?.responses?.slice(0, 3)?.map((response, index) => (
                      <div key={index} className="w-8 h-8 bg-primary/10 border-2 border-card rounded-full flex items-center justify-center">
                        <Icon name="User" size={12} color="var(--color-primary)" />
                      </div>
                    ))}
                    {task?.responses?.length > 3 && (
                      <div className="w-8 h-8 bg-muted border-2 border-card rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          +{task?.responses?.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-sm text-success">
                    <Icon name="CheckCircle" size={14} />
                    <span>{task?.helpersEnRoute || 0} en route</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    iconSize={14}
                    onClick={() => onViewEmergencyTask(task?.id)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    iconName="Phone"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Call 911
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={24} color="var(--color-success)" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Emergency Tasks</h3>
          <p className="text-sm text-muted-foreground mb-4">
            All clear! No emergency assistance requests at the moment.
          </p>
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            onClick={onBroadcastSOS}
          >
            Create Emergency Request
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmergencyTaskSection;