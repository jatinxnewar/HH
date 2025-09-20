import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SituationAssessment = ({ onSituationSelect, selectedSituation, isEmergencyActive }) => {
  const [selectedCategory, setSelectedCategory] = useState(selectedSituation?.category || '');
  const [urgencyLevel, setUrgencyLevel] = useState(selectedSituation?.urgency || 'high');
  const [description, setDescription] = useState(selectedSituation?.description || '');

  const emergencyCategories = [
    {
      id: 'medical',
      name: 'Medical Emergency',
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20',
      description: 'Health-related emergencies requiring immediate medical attention'
    },
    {
      id: 'security',
      name: 'Security/Safety',
      icon: 'Shield',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      description: 'Personal safety, theft, or security concerns'
    },
    {
      id: 'technical',
      name: 'Technical Crisis',
      icon: 'Zap',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      description: 'Electrical, plumbing, or technical failures'
    },
    {
      id: 'general',
      name: 'General Assistance',
      icon: 'HelpCircle',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      description: 'Other urgent situations requiring immediate help'
    }
  ];

  const urgencyLevels = [
    { id: 'critical', label: 'Critical', color: 'text-error', description: 'Life-threatening situation' },
    { id: 'high', label: 'High', color: 'text-warning', description: 'Urgent but not life-threatening' },
    { id: 'medium', label: 'Medium', color: 'text-primary', description: 'Important but manageable' }
  ];

  const handleSubmit = () => {
    if (selectedCategory) {
      onSituationSelect({
        category: selectedCategory,
        urgency: urgencyLevel,
        description: description?.trim(),
        timestamp: new Date()?.toISOString()
      });
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="ClipboardList" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Situation Assessment</h3>
          <p className="text-sm text-muted-foreground">Help us understand your emergency</p>
        </div>
      </div>
      {/* Emergency Categories */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">Emergency Type</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {emergencyCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedCategory === category?.id
                  ? `${category?.borderColor} ${category?.bgColor}`
                  : 'border-border hover:border-muted-foreground/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  selectedCategory === category?.id ? category?.bgColor : 'bg-muted'
                }`}>
                  <Icon 
                    name={category?.icon} 
                    size={16} 
                    color={selectedCategory === category?.id ? category?.color : 'var(--color-muted-foreground)'} 
                  />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    selectedCategory === category?.id ? category?.color : 'text-foreground'
                  }`}>
                    {category?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{category?.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Urgency Level */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">Urgency Level</label>
        <div className="flex space-x-3">
          {urgencyLevels?.map((level) => (
            <button
              key={level?.id}
              onClick={() => setUrgencyLevel(level?.id)}
              className={`flex-1 p-3 rounded-lg border-2 transition-all duration-200 ${
                urgencyLevel === level?.id
                  ? 'border-current bg-current/10' :'border-border hover:border-muted-foreground/30'
              } ${level?.color}`}
            >
              <div className="text-center">
                <div className="font-medium text-sm">{level?.label}</div>
                <div className="text-xs opacity-70 mt-1">{level?.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Brief Description (Optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e?.target?.value)}
          placeholder="Briefly describe your situation to help responders prepare..."
          className="w-full p-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          rows={3}
          maxLength={200}
        />
        <div className="text-xs text-muted-foreground mt-1 text-right">
          {description?.length}/200 characters
        </div>
      </div>
      {/* Submit Button */}
      <Button
        variant="destructive"
        size="lg"
        onClick={handleSubmit}
        disabled={!selectedCategory || isEmergencyActive}
        className="w-full"
        iconName="Send"
        iconPosition="right"
        iconSize={16}
      >
        {isEmergencyActive ? 'Assessment Submitted' : 'Submit Assessment'}
      </Button>
      {selectedCategory && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={14} />
            <span>
              This will help match you with the most appropriate emergency responders
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SituationAssessment;