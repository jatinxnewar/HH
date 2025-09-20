// ...existing code...
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TaskCard from './components/TaskCard';
import FilterPanel from './components/FilterPanel';
import TaskAnalytics from './components/TaskAnalytics';
import EmergencyTaskSection from './components/EmergencyTaskSection';
import GamificationPanel from './components/GamificationPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TaskManagementHub = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: 'all',
    urgency: 'all',
    category: 'all',
    dateRange: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock data for tasks
  const mockTasks = [
    {
      id: 1,
      title: 'Kitchen Sink Leak Repair',
      description: 'Water is leaking from under the kitchen sink. Need immediate plumbing assistance to prevent water damage.',
      category: 'plumbing',
      categoryIcon: 'Wrench',
      status: 'active',
      urgency: 'urgent',
      budget: 75,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      estimatedCompletion: '2 hours',
      helper: {
        name: 'Ankit Verma',
        rating: 4.8,
        isOnline: true
      }
    },
    {
      id: 2,
      title: 'Math Tutoring Session',
      description: 'Need help with calculus homework for upcoming exam. Looking for experienced tutor.',
      category: 'tutoring',
      categoryIcon: 'BookOpen',
      status: 'pending',
      urgency: 'normal',
      budget: 40,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      helper: null
    },
    {
      id: 3,
      title: 'Emergency Power Outage',
      description: 'Complete power outage in apartment. Need electrician immediately for safety check.',
      category: 'electrical',
      categoryIcon: 'Zap',
      status: 'active',
      urgency: 'emergency',
      budget: 150,
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      estimatedCompletion: '1 hour',
      helper: {
        name: 'Neha Agarwal',
        rating: 4.9,
        isOnline: true
      }
    },
    {
      id: 4,
      title: 'Computer Virus Removal',
      description: 'Laptop infected with malware. Need tech support to clean and secure system.',
      category: 'tech',
      categoryIcon: 'Monitor',
      status: 'completed',
      urgency: 'normal',
      budget: 60,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      helper: {
        name: 'Amit Jain',
        rating: 4.7,
        isOnline: false
      }
    },
    {
      id: 5,
      title: 'Moving Furniture Help',
      description: 'Need assistance moving heavy furniture to new apartment. Two helpers preferred.',
      category: 'moving',
      categoryIcon: 'Truck',
      status: 'pending',
      urgency: 'normal',
      budget: 120,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      helper: null
    }
  ];

  // Mock emergency tasks
  const mockEmergencyTasks = [
    {
      id: 101,
      title: 'Gas Leak Emergency',
      description: 'Strong gas smell in kitchen area. Need immediate professional assistance.',
      categoryIcon: 'AlertTriangle',
      timeElapsed: '15 min ago',
      location: '0.3 miles away',
      helpersNotified: 12,
      helpersEnRoute: 2,
      responses: [
        { helperId: 1, name: 'Emergency Plumber 1' },
        { helperId: 2, name: 'Emergency Plumber 2' },
        { helperId: 3, name: 'Emergency Plumber 3' }
      ]
    }
  ];

  // Mock analytics data
  const mockAnalytics = {
    completionRate: 87,
    avgResponseTime: 23,
    totalTasks: 34,
    communityScore: 4.6,
    recentActivity: [
      {
        type: 'completed',
        title: 'Computer repair task completed',
        time: '2 hours ago'
      },
      {
        type: 'started',
        title: 'New plumbing task started',
        time: '4 hours ago'
      },
      {
        type: 'pending',
        title: 'Tutoring request posted',
        time: '6 hours ago'
      }
    ]
  };

  // Mock user stats and achievements
  const mockUserStats = {
    level: 7,
    currentXP: 2847,
    nextLevelXP: 3000,
    tasksCompleted: 34,
    communityScore: 4.6,
    helpersHelped: 18,
    volunteerHours: 24
  };

  const mockAchievements = [
    {
      title: 'Task Master',
      description: 'Completed 30+ tasks',
      icon: 'Trophy',
      color: 'bg-warning',
      xp: 100
    },
    {
      title: 'Community Helper',
      description: 'Helped 15+ different helpers',
      icon: 'Users',
      color: 'bg-success',
      xp: 75
    },
    {
      title: 'Quick Responder',
      description: 'Average response time under 30 min',
      icon: 'Zap',
      color: 'bg-primary',
      xp: 50
    }
  ];

  const mockVolunteerOpportunities = [
    {
      title: 'Community Garden Cleanup',
      organization: 'Green City Initiative',
      date: 'Dec 23, 2024',
      duration: '3 hours',
      xpReward: 150
    },
    {
      title: 'Senior Tech Support',
      organization: 'Elder Care Society',
      date: 'Dec 25, 2024',
      duration: '2 hours',
      xpReward: 100
    }
  ];

  // Filter tasks based on current filters and search
  const filteredTasks = mockTasks?.filter(task => {
    const matchesStatus = filters?.status === 'all' || task?.status === filters?.status;
    const matchesUrgency = filters?.urgency === 'all' || task?.urgency === filters?.urgency;
    const matchesCategory = filters?.category === 'all' || task?.category === filters?.category;
    const matchesSearch = task?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         task?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    return matchesStatus && matchesUrgency && matchesCategory && matchesSearch;
  });

  // Calculate task counts for filter panel
  const taskCounts = {
    all: mockTasks?.length,
    active: mockTasks?.filter(t => t?.status === 'active')?.length,
    pending: mockTasks?.filter(t => t?.status === 'pending')?.length,
    completed: mockTasks?.filter(t => t?.status === 'completed')?.length,
    cancelled: mockTasks?.filter(t => t?.status === 'cancelled')?.length
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      urgency: 'all',
      category: 'all',
      dateRange: 'all'
    });
    setSearchQuery('');
  };

  const handleViewDetails = (taskId) => {
    navigate(`/task-details/${taskId}`);
  };

  const handleContactHelper = (taskId) => {
    navigate(`/helper-profile-details?taskId=${taskId}`);
  };

  const handleMarkComplete = (taskId) => {
    console.log('Marking task complete:', taskId);
    // Implementation for marking task complete
  };

  const handleCancelTask = (taskId) => {
    console.log('Cancelling task:', taskId);
    // Implementation for cancelling task
  };

  const handleBroadcastSOS = () => {
    navigate('/emergency-sos-center');
  };

  const handleViewEmergencyTask = (taskId) => {
    navigate(`/emergency-task-details/${taskId}`);
  };

  const handleCreateNewTask = () => {
    navigate('/task-posting-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        emergencyActive={mockEmergencyTasks?.length > 0}
        notificationCount={3}
        userRole="seeker"
      />
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Task Management Hub</h1>
            <p className="text-muted-foreground">
              Track and manage your service requests with real-time updates
            </p>
          </div>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            onClick={handleCreateNewTask}
          >
            New Task
          </Button>
        </div>

        {/* Emergency Section */}
        {mockEmergencyTasks?.length > 0 && (
          <div className="mb-8">
            <EmergencyTaskSection
              emergencyTasks={mockEmergencyTasks}
              onBroadcastSOS={handleBroadcastSOS}
              onViewEmergencyTask={handleViewEmergencyTask}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              taskCounts={taskCounts}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'grid' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name="Grid3X3" size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'list' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name="List" size={16} />
                </button>
              </div>
            </div>

            {/* Task Results */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTasks?.length} of {mockTasks?.length} tasks
              </p>
            </div>

            {/* Task List */}
            {filteredTasks?.length > 0 ? (
              <div className={`${viewMode === 'grid' ? 'space-y-4' : 'space-y-3'}`}>
                {filteredTasks?.map((task) => (
                  <TaskCard
                    key={task?.id}
                    task={task}
                    onViewDetails={handleViewDetails}
                    onContactHelper={handleContactHelper}
                    onMarkComplete={handleMarkComplete}
                    onCancelTask={handleCancelTask}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={24} color="var(--color-muted-foreground)" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  variant="outline"
                  iconName="RotateCcw"
                  iconPosition="left"
                  iconSize={16}
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <TaskAnalytics analytics={mockAnalytics} />
            <GamificationPanel
              userStats={mockUserStats}
              achievements={mockAchievements}
              volunteerOpportunities={mockVolunteerOpportunities}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagementHub;