import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HelperAvailability = ({ selectedCategory, selectedLocation }) => {
  // Mock helper data
  const availableHelpers = [
    {
      id: 1,
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedTasks: 127,
      skills: ["electrician", "plumber"],
      distance: "0.8 miles",
      responseTime: "~15 min",
      isOnline: true,
      trustScore: 98
    },
    {
      id: 2,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      completedTasks: 89,
      skills: ["it-fix", "tutor"],
      distance: "1.2 miles",
      responseTime: "~20 min",
      isOnline: true,
      trustScore: 95
    },
    {
      id: 3,
      name: "David Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      completedTasks: 156,
      skills: ["carpenter", "plumber"],
      distance: "2.1 miles",
      responseTime: "~30 min",
      isOnline: false,
      trustScore: 92
    },
    {
      id: 4,
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedTasks: 203,
      skills: ["cleaning", "delivery"],
      distance: "1.5 miles",
      responseTime: "~25 min",
      isOnline: true,
      trustScore: 97
    }
  ];

  const filteredHelpers = selectedCategory 
    ? availableHelpers?.filter(helper => helper?.skills?.includes(selectedCategory))
    : availableHelpers;

  const onlineHelpers = filteredHelpers?.filter(helper => helper?.isOnline);
  const avgResponseTime = Math.round(
    onlineHelpers?.reduce((sum, helper) => sum + parseInt(helper?.responseTime), 0) / onlineHelpers?.length
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Available Helpers</h3>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>{onlineHelpers?.length} online</span>
        </div>
      </div>
      {selectedLocation && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{filteredHelpers?.length}</p>
              <p className="text-xs text-muted-foreground">Total Helpers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{onlineHelpers?.length}</p>
              <p className="text-xs text-muted-foreground">Online Now</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">~{avgResponseTime}m</p>
              <p className="text-xs text-muted-foreground">Avg Response</p>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredHelpers?.map((helper) => (
          <div
            key={helper?.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <Image
                  src={helper?.avatar}
                  alt={helper?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  helper?.isOnline ? 'bg-success' : 'bg-muted-foreground'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground truncate">{helper?.name}</h4>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} color="var(--color-accent)" fill="var(--color-accent)" />
                    <span className="text-sm font-medium text-foreground">{helper?.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="CheckCircle" size={12} color="var(--color-success)" />
                    <span>{helper?.completedTasks} tasks</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{helper?.distance}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{helper?.responseTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {helper?.skills?.slice(0, 2)?.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize"
                      >
                        {skill?.replace('-', ' ')}
                      </span>
                    ))}
                    {helper?.skills?.length > 2 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        +{helper?.skills?.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={12} color="var(--color-success)" />
                    <span className="text-xs font-medium text-success">{helper?.trustScore}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredHelpers?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground">No helpers available for this category</p>
          <p className="text-sm text-muted-foreground mt-1">Try selecting a different category or location</p>
        </div>
      )}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-800 mb-1">Helper Matching</p>
            <p className="text-blue-700">
              Helpers are automatically notified based on their skills, location, and availability when you post your task.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelperAvailability;