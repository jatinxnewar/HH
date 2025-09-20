import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ helper, onMessage, onFavorite, onEmergencyContact, isFavorited }) => {
  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Profile Image and Basic Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative">
            <Image
              src={helper?.avatar}
              alt={helper?.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
            />
            {helper?.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
          
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-foreground">{helper?.name}</h1>
              {helper?.isVerified && (
                <Icon name="BadgeCheck" size={20} color="var(--color-primary)" />
              )}
            </div>
            <p className="text-muted-foreground mb-2">{helper?.title}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
                <span className="text-muted-foreground">{helper?.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
                <span className="text-muted-foreground">Joined {helper?.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Score and Verification */}
        <div className="flex-1 lg:ml-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon name="Star" size={16} color="var(--color-accent)" />
                <span className="text-lg font-bold text-foreground">{helper?.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">{helper?.reviewCount} Reviews</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span className="text-lg font-bold text-foreground">{helper?.trustScore}</span>
              </div>
              <p className="text-xs text-muted-foreground">Trust Score</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon name="CheckCircle" size={16} color="var(--color-primary)" />
                <span className="text-lg font-bold text-foreground">{helper?.completedTasks}</span>
              </div>
              <p className="text-xs text-muted-foreground">Tasks Done</p>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {helper?.verifications?.map((verification, index) => (
              <div key={index} className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                <Icon name={verification?.icon} size={12} />
                <span>{verification?.label}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="default"
              onClick={onMessage}
              iconName="MessageCircle"
              iconPosition="left"
              iconSize={16}
            >
              Message
            </Button>
            
            <Button
              variant="outline"
              onClick={onFavorite}
              iconName={isFavorited ? "Heart" : "Heart"}
              iconPosition="left"
              iconSize={16}
              className={isFavorited ? "text-error border-error" : ""}
            >
              {isFavorited ? "Favorited" : "Add to Favorites"}
            </Button>
            
            <Button
              variant="destructive"
              onClick={onEmergencyContact}
              iconName="Phone"
              iconPosition="left"
              iconSize={16}
            >
              Emergency Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;