import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  taskCounts 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Tasks', count: taskCounts?.all },
    { value: 'active', label: 'Active', count: taskCounts?.active },
    { value: 'pending', label: 'Pending', count: taskCounts?.pending },
    { value: 'completed', label: 'Completed', count: taskCounts?.completed },
    { value: 'cancelled', label: 'Cancelled', count: taskCounts?.cancelled }
  ];

  const urgencyOptions = [
    { value: 'all', label: 'All Urgency' },
    { value: 'emergency', label: 'Emergency', color: 'text-destructive' },
    { value: 'urgent', label: 'Urgent', color: 'text-warning' },
    { value: 'normal', label: 'Normal', color: 'text-primary' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'plumbing', label: 'Plumbing', icon: 'Wrench' },
    { value: 'electrical', label: 'Electrical', icon: 'Zap' },
    { value: 'tutoring', label: 'Tutoring', icon: 'BookOpen' },
    { value: 'cleaning', label: 'Cleaning', icon: 'Sparkles' },
    { value: 'tech', label: 'Tech Support', icon: 'Monitor' },
    { value: 'moving', label: 'Moving Help', icon: 'Truck' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Filter Tasks</h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={14}
          onClick={onClearFilters}
        >
          Clear All
        </Button>
      </div>
      {/* Status Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Status</h3>
        <div className="space-y-2">
          {statusOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onFilterChange('status', option?.value)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                filters?.status === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 hover:bg-muted text-foreground'
              }`}
            >
              <span className="text-sm font-medium">{option?.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                filters?.status === option?.value
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {option?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Urgency Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Urgency</h3>
        <div className="space-y-2">
          {urgencyOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onFilterChange('urgency', option?.value)}
              className={`w-full flex items-center space-x-2 p-3 rounded-lg text-left transition-all duration-200 ${
                filters?.urgency === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 hover:bg-muted text-foreground'
              }`}
            >
              {option?.value !== 'all' && (
                <Icon 
                  name="AlertCircle" 
                  size={14} 
                  color={filters?.urgency === option?.value ? 'currentColor' : `var(--color-${option?.value === 'emergency' ? 'destructive' : option?.value === 'urgent' ? 'warning' : 'primary'})`}
                />
              )}
              <span className={`text-sm font-medium ${option?.color || ''}`}>
                {option?.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Category</h3>
        <div className="space-y-2">
          {categoryOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onFilterChange('category', option?.value)}
              className={`w-full flex items-center space-x-2 p-3 rounded-lg text-left transition-all duration-200 ${
                filters?.category === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 hover:bg-muted text-foreground'
              }`}
            >
              {option?.icon && (
                <Icon 
                  name={option?.icon} 
                  size={14} 
                  color="currentColor"
                />
              )}
              <span className="text-sm font-medium">{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Date Range Filter */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Date Range</h3>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Time' },
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'This Week' },
            { value: 'month', label: 'This Month' }
          ]?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onFilterChange('dateRange', option?.value)}
              className={`w-full flex items-center space-x-2 p-3 rounded-lg text-left transition-all duration-200 ${
                filters?.dateRange === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 hover:bg-muted text-foreground'
              }`}
            >
              <Icon name="Calendar" size={14} color="currentColor" />
              <span className="text-sm font-medium">{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;