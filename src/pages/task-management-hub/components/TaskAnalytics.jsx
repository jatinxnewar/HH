import React from 'react';
import Icon from '../../../components/AppIcon';

const TaskAnalytics = ({ analytics }) => {
  const analyticsCards = [
    {
      title: 'Completion Rate',
      value: `${analytics?.completionRate}%`,
      change: '+5.2%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'text-success'
    },
    {
      title: 'Avg Response Time',
      value: `${analytics?.avgResponseTime}min`,
      change: '-12min',
      changeType: 'positive',
      icon: 'Clock',
      color: 'text-primary'
    },
    {
      title: 'Total Tasks',
      value: analytics?.totalTasks,
      change: '+8',
      changeType: 'positive',
      icon: 'ClipboardList',
      color: 'text-warning'
    },
    {
      title: 'Community Score',
      value: analytics?.communityScore,
      change: '+0.3',
      changeType: 'positive',
      icon: 'Users',
      color: 'text-secondary'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Task Analytics</h2>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="Calendar" size={14} />
          <span>Last 30 days</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {analyticsCards?.map((card, index) => (
          <div key={index} className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${card?.color}`}>
                <Icon name={card?.icon} size={16} color="currentColor" />
              </div>
              <div className={`flex items-center space-x-1 text-xs ${
                card?.changeType === 'positive' ? 'text-success' : 'text-destructive'
              }`}>
                <Icon 
                  name={card?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                />
                <span>{card?.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{card?.value}</div>
            <div className="text-sm text-muted-foreground">{card?.title}</div>
          </div>
        ))}
      </div>
      {/* Task Distribution Chart */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Task Distribution</h3>
        <div className="space-y-3">
          {[
            { category: 'Plumbing', count: 12, percentage: 35, color: 'bg-primary' },
            { category: 'Electrical', count: 8, percentage: 24, color: 'bg-warning' },
            { category: 'Tutoring', count: 7, percentage: 21, color: 'bg-success' },
            { category: 'Tech Support', count: 4, percentage: 12, color: 'bg-secondary' },
            { category: 'Others', count: 3, percentage: 8, color: 'bg-muted-foreground' }
          ]?.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{item?.category}</span>
                  <span className="text-sm text-muted-foreground">{item?.count} tasks</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item?.color}`}
                    style={{ width: `${item?.percentage}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-foreground w-12 text-right">
                {item?.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Recent Activity</h3>
        <div className="space-y-3">
          {analytics?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity?.type === 'completed' ? 'bg-success/20 text-success' :
                activity?.type === 'started'? 'bg-primary/20 text-primary' : 'bg-warning/20 text-warning'
              }`}>
                <Icon 
                  name={
                    activity?.type === 'completed' ? 'CheckCircle' :
                    activity?.type === 'started' ? 'Play' : 'Clock'
                  } 
                  size={14} 
                  color="currentColor"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{activity?.title}</p>
                <p className="text-xs text-muted-foreground">{activity?.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskAnalytics;