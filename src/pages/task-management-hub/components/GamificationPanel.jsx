import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GamificationPanel = ({ userStats, achievements, volunteerOpportunities }) => {
  const levelProgress = (userStats?.currentXP / userStats?.nextLevelXP) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Community Impact</h2>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="Trophy" size={14} />
          <span>Level {userStats?.level}</span>
        </div>
      </div>
      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progress to Level {userStats?.level + 1}</span>
          <span className="text-sm text-muted-foreground">{userStats?.currentXP}/{userStats?.nextLevelXP} XP</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="h-3 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          ></div>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">{userStats?.tasksCompleted}</div>
          <div className="text-xs text-muted-foreground">Tasks Completed</div>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-success mb-1">{userStats?.communityScore}</div>
          <div className="text-xs text-muted-foreground">Community Score</div>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-warning mb-1">{userStats?.helpersHelped}</div>
          <div className="text-xs text-muted-foreground">Helpers Helped</div>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-secondary mb-1">{userStats?.volunteerHours}</div>
          <div className="text-xs text-muted-foreground">Volunteer Hours</div>
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Recent Achievements</h3>
        <div className="space-y-2">
          {achievements?.slice(0, 3)?.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement?.color}`}>
                <Icon name={achievement?.icon} size={16} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{achievement?.title}</p>
                <p className="text-xs text-muted-foreground">{achievement?.description}</p>
              </div>
              <div className="text-xs text-muted-foreground">
                +{achievement?.xp} XP
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Leaderboard Preview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Community Leaderboard</h3>
          <Button variant="ghost" size="sm" iconName="ExternalLink" iconSize={12}>
            View All
          </Button>
        </div>
        <div className="space-y-2">
          {[
            { rank: 1, name: 'Sarah Johnson', score: 2847, isUser: false },
            { rank: 2, name: 'Mike Chen', score: 2654, isUser: false },
            { rank: 3, name: 'You', score: userStats?.communityScore, isUser: true },
            { rank: 4, name: 'Emma Davis', score: 2398, isUser: false }
          ]?.map((user, index) => (
            <div key={index} className={`flex items-center space-x-3 p-2 rounded-lg ${
              user?.isUser ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                user?.rank === 1 ? 'bg-warning text-warning-foreground' :
                user?.rank === 2 ? 'bg-muted text-muted-foreground' :
                user?.rank === 3 ? 'bg-accent text-accent-foreground': 'bg-muted text-muted-foreground'
              }`}>
                {user?.rank}
              </div>
              <div className="flex-1">
                <span className={`text-sm font-medium ${user?.isUser ? 'text-primary' : 'text-foreground'}`}>
                  {user?.name}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{user?.score}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Volunteer Opportunities */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Volunteer Opportunities</h3>
        <div className="space-y-3">
          {volunteerOpportunities?.slice(0, 2)?.map((opportunity, index) => (
            <div key={index} className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">{opportunity?.title}</h4>
                  <p className="text-xs text-muted-foreground">{opportunity?.organization}</p>
                </div>
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                  +{opportunity?.xpReward} XP
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Calendar" size={12} />
                  <span>{opportunity?.date}</span>
                  <Icon name="Clock" size={12} />
                  <span>{opportunity?.duration}</span>
                </div>
                <Button variant="secondary" size="sm" iconName="Heart" iconSize={12}>
                  Join
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;