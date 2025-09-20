import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const FilterPanel = ({ 
  isCollapsed, 
  onToggle, 
  filters, 
  onFiltersChange, 
  emergencyMode 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const skillCategories = [
    { id: 'electrician', label: 'Electrician', icon: 'Zap' },
    { id: 'plumber', label: 'Plumber', icon: 'Wrench' },
    { id: 'it-support', label: 'IT Support', icon: 'Monitor' },
    { id: 'carpenter', label: 'Carpenter', icon: 'Hammer' },
    { id: 'tutor', label: 'Tutor', icon: 'BookOpen' },
    { id: 'cleaner', label: 'Cleaner', icon: 'Sparkles' },
    { id: 'mechanic', label: 'Mechanic', icon: 'Settings' },
    { id: 'gardener', label: 'Gardener', icon: 'Leaf' }
  ];

  const handleSkillToggle = (skillId) => {
    const updatedSkills = localFilters?.skills?.includes(skillId)
      ? localFilters?.skills?.filter(s => s !== skillId)
      : [...localFilters?.skills, skillId];
    
    const updatedFilters = { ...localFilters, skills: updatedSkills };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleRadiusChange = (radius) => {
    const updatedFilters = { ...localFilters, radius };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleRatingChange = (rating) => {
    const updatedFilters = { ...localFilters, minRating: rating };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleAvailabilityToggle = () => {
    const updatedFilters = { ...localFilters, availableOnly: !localFilters?.availableOnly };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleEmergencyCertifiedToggle = () => {
    const updatedFilters = { ...localFilters, emergencyCertified: !localFilters?.emergencyCertified };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      skills: [],
      radius: 5,
      minRating: 0,
      availableOnly: false,
      emergencyCertified: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-elevation-1 transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-80'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} />
            <h3 className="font-medium text-foreground">Filters</h3>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 hover:bg-muted rounded-md transition-colors duration-200"
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
        </button>
      </div>
      {!isCollapsed && (
        <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Emergency Mode Banner */}
          {emergencyMode && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-error">
                <Icon name="AlertTriangle" size={16} />
                <span className="text-sm font-medium">Emergency Mode</span>
              </div>
              <p className="text-xs text-error/80 mt-1">
                Showing emergency-certified helpers only
              </p>
            </div>
          )}

          {/* Skills Filter */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Skills</h4>
            <div className="grid grid-cols-2 gap-2">
              {skillCategories?.map((skill) => (
                <button
                  key={skill?.id}
                  onClick={() => handleSkillToggle(skill?.id)}
                  className={`flex items-center space-x-2 p-2 rounded-md text-sm transition-all duration-200 ${
                    localFilters?.skills?.includes(skill?.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name={skill?.icon} size={14} />
                  <span className="truncate">{skill?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Distance Radius */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Distance</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Radius</span>
                <span className="text-sm font-medium text-foreground">{localFilters?.radius}km</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={localFilters?.radius}
                onChange={(e) => handleRadiusChange(parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1km</span>
                <span>20km</span>
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Minimum Rating</h4>
            <div className="flex space-x-2">
              {[0, 3, 4, 4.5]?.map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                    localFilters?.minRating === rating
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name="Star" size={12} />
                  <span>{rating === 0 ? 'Any' : `${rating}+`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-foreground">Available Only</h4>
              <p className="text-xs text-muted-foreground">Show only available helpers</p>
            </div>
            <button
              onClick={handleAvailabilityToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                localFilters?.availableOnly ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  localFilters?.availableOnly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Emergency Certified Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-foreground">Emergency Certified</h4>
              <p className="text-xs text-muted-foreground">Verified for urgent situations</p>
            </div>
            <button
              onClick={handleEmergencyCertifiedToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                localFilters?.emergencyCertified ? 'bg-error' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  localFilters?.emergencyCertified ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Clear Filters */}
          <Button
            variant="outline"
            onClick={clearAllFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;