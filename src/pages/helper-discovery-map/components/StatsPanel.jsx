import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsPanel = ({ helpers, selectedArea, emergencyMode }) => {
  const availableHelpers = helpers?.filter(h => h?.isAvailable)?.length;
  const emergencyCertified = helpers?.filter(h => h?.emergencyCertified)?.length;
  const avgRating = helpers?.reduce((sum, h) => sum + h?.rating, 0) / helpers?.length;
  const avgResponseTime = helpers?.reduce((sum, h) => sum + parseInt(h?.avgResponseTime), 0) / helpers?.length;

  const stats = [
    {
      label: 'Available Helpers',
      value: availableHelpers,
      total: helpers?.length,
      icon: 'Users',
      color: 'text-success'
    },
    {
      label: 'Emergency Certified',
      value: emergencyCertified,
      total: helpers?.length,
      icon: 'Shield',
      color: 'text-error'
    },
    {
      label: 'Average Rating',
      value: avgRating?.toFixed(1),
      icon: 'Star',
      color: 'text-accent'
    },
    {
      label: 'Avg Response Time',
      value: `${Math.round(avgResponseTime)}min`,
      icon: 'Clock',
      color: 'text-primary'
    }
  ];

  const skillDistribution = helpers?.reduce((acc, helper) => {
    acc[helper.primarySkill] = (acc?.[helper?.primarySkill] || 0) + 1;
    return acc;
  }, {});

  const topSkills = Object.entries(skillDistribution)?.sort(([,a], [,b]) => b - a)?.slice(0, 5);

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Area Statistics</h3>
        {emergencyMode && (
          <div className="flex items-center space-x-1 text-error text-sm">
            <Icon name="AlertTriangle" size={14} />
            <span>Emergency Mode</span>
          </div>
        )}
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center space-x-2">
              <Icon name={stat?.icon} size={16} className={stat?.color} />
              <span className="text-sm text-muted-foreground">{stat?.label}</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-semibold text-foreground">{stat?.value}</span>
              {stat?.total && (
                <span className="text-sm text-muted-foreground">/ {stat?.total}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Availability Chart */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Availability</h4>
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-success transition-all duration-500"
              style={{ width: `${(availableHelpers / helpers?.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm text-muted-foreground">
            {Math.round((availableHelpers / helpers?.length) * 100)}%
          </span>
        </div>
      </div>
      {/* Top Skills */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Popular Skills</h4>
        <div className="space-y-2">
          {topSkills?.map(([skill, count], index) => (
            <div key={skill} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  index === 0 ? 'bg-primary' : 
                  index === 1 ? 'bg-secondary' : 
                  index === 2 ? 'bg-accent' : 'bg-muted-foreground'
                }`}></div>
                <span className="text-sm text-foreground">{skill}</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">{count}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Response Time Distribution */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Response Times</h4>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>&lt; 5min</span>
            <span>5-15min</span>
            <span>&gt; 15min</span>
          </div>
          <div className="flex space-x-1 h-2">
            <div className="flex-1 bg-success rounded-l"></div>
            <div className="flex-1 bg-accent"></div>
            <div className="flex-1 bg-error rounded-r"></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>45%</span>
            <span>35%</span>
            <span>20%</span>
          </div>
        </div>
      </div>
      {/* Area Info */}
      <div className="pt-2 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Coverage Area:</span>
          <span className="font-medium text-foreground">{selectedArea || '5km radius'}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-muted-foreground">Last Updated:</span>
          <span className="font-medium text-foreground">Just now</span>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;