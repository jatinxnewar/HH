import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HelperCard = ({ helper, onClose, emergencyMode }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate('/helper-profile-details', { state: { helperId: helper?.id } });
  };

  const handleDirectMessage = () => {
    // Mock direct messaging functionality
    console.log('Opening direct message with helper:', helper?.id);
  };

  const handleAssignTask = () => {
    navigate('/task-posting-dashboard', { state: { selectedHelper: helper?.id } });
  };

  const handleEmergencyRequest = () => {
    // Mock emergency request functionality
    console.log('Sending emergency request to helper:', helper?.id);
  };

  const getSkillIcon = (skill) => {
    const skillIcons = {
      'Electrician': 'Zap',
      'Plumber': 'Wrench',
      'IT Support': 'Monitor',
      'Carpenter': 'Hammer',
      'Tutor': 'BookOpen',
      'Cleaner': 'Sparkles',
      'Mechanic': 'Settings',
      'Gardener': 'Leaf'
    };
    return skillIcons?.[skill] || 'User';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        color={i < Math.floor(rating) ? 'var(--color-accent)' : 'var(--color-muted-foreground)'}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-4 space-y-4 max-w-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={helper?.avatar}
              alt={helper?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              helper?.isAvailable ? 'bg-success' : 'bg-muted-foreground'
            }`}></div>
          </div>
          <div>
            <h3 className="font-medium text-foreground">{helper?.name}</h3>
            <p className="text-sm text-muted-foreground">{helper?.primarySkill}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded-md transition-colors duration-200"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
      {/* Status and Badges */}
      <div className="flex items-center space-x-2">
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
          helper?.isAvailable 
            ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            helper?.isAvailable ? 'bg-success' : 'bg-muted-foreground'
          }`}></div>
          <span>{helper?.isAvailable ? 'Available' : 'Busy'}</span>
        </div>
        {helper?.emergencyCertified && (
          <div className="flex items-center space-x-1 px-2 py-1 bg-error/10 text-error rounded-full text-xs font-medium">
            <Icon name="Shield" size={12} />
            <span>Emergency</span>
          </div>
        )}
        {helper?.isVerified && (
          <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
            <Icon name="CheckCircle" size={12} />
            <span>Verified</span>
          </div>
        )}
      </div>
      {/* Rating and Stats */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {renderStars(helper?.rating)}
            <span className="text-sm font-medium text-foreground ml-1">
              {helper?.rating}
            </span>
            <span className="text-sm text-muted-foreground">
              ({helper?.reviewCount} reviews)
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {helper?.distance}km away
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Response Time:</span>
            <div className="font-medium text-foreground">{helper?.avgResponseTime}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Completed:</span>
            <div className="font-medium text-foreground">{helper?.completedTasks} tasks</div>
          </div>
        </div>
      </div>
      {/* Skills */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {helper?.skills?.map((skill, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-md text-xs"
            >
              <Icon name={getSkillIcon(skill)} size={12} />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Review */}
      {helper?.recentReview && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Recent Review</h4>
          <div className="bg-muted/50 rounded-md p-3">
            <p className="text-sm text-foreground">{helper?.recentReview?.comment}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-1">
                {renderStars(helper?.recentReview?.rating)}
              </div>
              <span className="text-xs text-muted-foreground">
                {helper?.recentReview?.date}
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="space-y-2">
        {emergencyMode ? (
          <Button
            variant="destructive"
            onClick={handleEmergencyRequest}
            iconName="AlertTriangle"
            iconPosition="left"
            iconSize={16}
            className="w-full"
          >
            Send Emergency Request
          </Button>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={handleDirectMessage}
              iconName="MessageCircle"
              iconPosition="left"
              iconSize={16}
            >
              Message
            </Button>
            <Button
              variant="default"
              onClick={handleAssignTask}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Assign Task
            </Button>
          </div>
        )}
        
        <Button
          variant="ghost"
          onClick={handleViewProfile}
          iconName="User"
          iconPosition="left"
          iconSize={16}
          className="w-full"
        >
          View Full Profile
        </Button>
      </div>
    </div>
  );
};

export default HelperCard;