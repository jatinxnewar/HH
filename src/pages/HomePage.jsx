import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

const HomePage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeTasks: 12,
    completedTasks: 156,
    totalEarnings: 2847,
    helperRating: 4.8
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [quickStats, setQuickStats] = useState({
    onlineHelpers: 234,
    avgResponseTime: 14,
    successRate: 98
  });

  useEffect(() => {
    // Mock recent activity
    setRecentActivity([
      {
        id: 1,
        type: 'task_completed',
        title: 'Kitchen Sink Repair',
        time: '2 hours ago',
        amount: 75,
        helper: 'Mike Johnson'
      },
      {
        id: 2,
        type: 'new_bid',
        title: 'Lawn Mowing Service',
        time: '4 hours ago',
        bidCount: 3
      },
      {
        id: 3,
        type: 'task_posted',
        title: 'Math Tutoring Session',
        time: '6 hours ago',
        status: 'active'
      }
    ]);
  }, []);

  const quickActions = [
    {
      title: 'Post New Task',
      description: 'Get help with anything you need',
      icon: 'Plus',
      color: 'blue',
      action: () => navigate('/task-posting-dashboard')
    },
    {
      title: 'Find Helpers',
      description: 'Browse available helpers nearby',
      icon: 'Users',
      color: 'green',
      action: () => navigate('/helper-discovery-map')
    },
    {
      title: 'Emergency SOS',
      description: 'Get immediate assistance',
      icon: 'AlertTriangle',
      color: 'red',
      action: () => navigate('/emergency-sos-center')
    },
    {
      title: 'My Profile',
      description: 'View and update your profile',
      icon: 'User',
      color: 'purple',
      action: () => navigate('/helper-profile-details')
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'task_completed': return 'CheckCircle';
      case 'new_bid': return 'DollarSign';
      case 'task_posted': return 'Plus';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'task_completed': return 'text-green-600';
      case 'new_bid': return 'text-blue-600';
      case 'task_posted': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
              <p className="text-blue-100 text-lg">Ready to get things done today?</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Star" size={20} color="#FCD34D" />
                  <span className="text-xl font-bold">{stats.helperRating}</span>
                </div>
                <p className="text-blue-100 text-sm">Your Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Online Helpers</p>
                <p className="text-2xl font-bold text-foreground">{quickStats.onlineHelpers}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Icon name="Users" size={24} color="#10B981" />
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Avg Response Time</p>
                <p className="text-2xl font-bold text-foreground">{quickStats.avgResponseTime}min</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={24} color="#3B82F6" />
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold text-foreground">{quickStats.successRate}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={24} color="#8B5CF6" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 text-left group"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  action.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  action.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                  action.color === 'red' ? 'bg-red-100 dark:bg-red-900/30' :
                  'bg-purple-100 dark:bg-purple-900/30'
                }`}>
                  <Icon name={action.icon} size={24} color={
                    action.color === 'blue' ? '#3B82F6' :
                    action.color === 'green' ? '#10B981' :
                    action.color === 'red' ? '#EF4444' :
                    '#8B5CF6'
                  } />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-muted-foreground text-sm">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Stats */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-foreground mb-4">Your Stats</h2>
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon name="Activity" size={20} color="#3B82F6" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Active Tasks</p>
                      <p className="text-sm text-gray-500">Currently ongoing</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{stats.activeTasks}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Icon name="CheckCircle" size={20} color="#10B981" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Completed</p>
                      <p className="text-sm text-gray-500">All time</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{stats.completedTasks}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Icon name="DollarSign" size={20} color="#F59E0B" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Total Earnings</p>
                      <p className="text-sm text-gray-500">This month</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">${stats.totalEarnings}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/task-management-hub')}
              >
                View All
              </Button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                {recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activity.type === 'task_completed' ? 'bg-green-100' :
                          activity.type === 'new_bid' ? 'bg-blue-100' :
                          'bg-purple-100'
                        }`}>
                          <Icon 
                            name={getActivityIcon(activity.type)} 
                            size={20} 
                            className={getActivityColor(activity.type)}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">{activity.title}</h3>
                            <span className="text-sm text-gray-500">{activity.time}</span>
                          </div>
                          <div className="mt-1">
                            {activity.amount && (
                              <p className="text-sm text-green-600 font-medium">+${activity.amount}</p>
                            )}
                            {activity.bidCount && (
                              <p className="text-sm text-blue-600">{activity.bidCount} new bids</p>
                            )}
                            {activity.helper && (
                              <p className="text-sm text-gray-500">Completed by {activity.helper}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Activity" size={48} color="#D1D5DB" className="mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No recent activity</h3>
                    <p className="text-gray-500">Your recent tasks and activities will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Community Features */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              onClick={() => navigate('/commity-verification')}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={24} color="#3B82F6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Community Verification
                  </h3>
                  <p className="text-gray-500 text-sm">Build trust with verified credentials</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={24} color="#10B981" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Community Impact</h3>
                  <p className="text-gray-500 text-sm">1,247 tasks completed this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;