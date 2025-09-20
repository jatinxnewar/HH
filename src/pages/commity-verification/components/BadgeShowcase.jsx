import React from 'react';
import Icon from '../../../components/AppIcon';

const BadgeShowcase = ({ badges = [], achievements = [] }) => {
  const getBadgeIcon = (type) => {
    switch (type) {
      case 'skill-master':
        return 'Award';
      case 'community-hero':
        return 'Heart';
      case 'emergency-responder':
        return 'Shield';
      case 'peer-validator':
        return 'Users';
      case 'ngo-partner':
        return 'Handshake';
      case 'trust-builder':
        return 'TrendingUp';
      default:
        return 'Star';
    }
  };

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'from-purple-500 to-pink-500';
      case 'epic':
        return 'from-blue-500 to-purple-500';
      case 'rare':
        return 'from-green-500 to-blue-500';
      case 'common':
        return 'from-gray-400 to-gray-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityText = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'Legendary';
      case 'epic':
        return 'Epic';
      case 'rare':
        return 'Rare';
      case 'common':
        return 'Common';
      default:
        return 'Common';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">Badges & Achievements</h3>
        <div className="text-sm text-muted-foreground">
          {badges?.length} badges earned
        </div>
      </div>
      {badges?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Award" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground">No badges earned yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Complete verifications to earn your first badge
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {badges?.map((badge) => (
            <div
              key={badge?.id}
              className="relative group cursor-pointer"
              title={badge?.description}
            >
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${getBadgeColor(badge?.rarity)} p-0.5`}>
                <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                  <Icon name={getBadgeIcon(badge?.type)} size={32} color="white" />
                </div>
              </div>
              <div className="text-center mt-2">
                <p className="text-xs font-medium text-foreground">{badge?.name}</p>
                <p className="text-xs text-muted-foreground">{getRarityText(badge?.rarity)}</p>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-elevation-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 w-48">
                <p className="text-sm font-medium text-foreground">{badge?.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{badge?.description}</p>
                <p className="text-xs text-accent mt-1">Earned: {badge?.earnedDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Recent Achievements */}
      {achievements?.length > 0 && (
        <div>
          <h4 className="font-medium text-foreground mb-3">Recent Achievements</h4>
          <div className="space-y-2">
            {achievements?.slice(0, 3)?.map((achievement) => (
              <div key={achievement?.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Trophy" size={16} color="white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{achievement?.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement?.description}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {achievement?.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeShowcase;