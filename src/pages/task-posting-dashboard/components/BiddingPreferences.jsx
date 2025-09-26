import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BiddingPreferences = ({ preferences, onPreferencesChange, taskData }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [estimatedBids, setEstimatedBids] = useState(null);

  useEffect(() => {
    // Simulate bid estimation based on preferences
    const baseBids = 5;
    let multiplier = 1;

    if (preferences.biddingType === 'open') multiplier *= 2;
    if (preferences.autoAccept) multiplier *= 0.7;
    if (preferences.helperFilters.length > 0) multiplier *= 0.8;
    if (preferences.maxBids > baseBids) multiplier *= (preferences.maxBids / baseBids);

    setEstimatedBids({
      estimated: Math.round(baseBids * multiplier),
      timeToFill: preferences.biddingType === 'blind' ? '2-4 hours' : '30 mins - 2 hours'
    });
  }, [preferences]);

  const handleBiddingTypeChange = (type) => {
    onPreferencesChange({
      ...preferences,
      biddingType: type
    });
  };

  const handleToggle = (key) => {
    onPreferencesChange({
      ...preferences,
      [key]: !preferences[key]
    });
  };

  const handleSliderChange = (key, value) => {
    onPreferencesChange({
      ...preferences,
      [key]: value
    });
  };

  const handleFilterToggle = (filter) => {
    const filters = preferences.helperFilters.includes(filter)
      ? preferences.helperFilters.filter(f => f !== filter)
      : [...preferences.helperFilters, filter];
    
    onPreferencesChange({
      ...preferences,
      helperFilters: filters
    });
  };

  const biddingTypes = [
    {
      id: 'blind',
      title: 'Blind Bidding',
      description: 'Helpers bid without seeing other bids',
      icon: 'EyeOff',
      pros: ['Fair pricing', 'Prevents bid manipulation', 'Better value'],
      cons: ['Longer bidding time', 'Less transparency'],
      recommended: true
    },
    {
      id: 'open',
      title: 'Open Bidding',
      description: 'All bids are visible to everyone',
      icon: 'Eye',
      pros: ['Fast bidding', 'Transparent process', 'Quick decisions'],
      cons: ['Potential bid wars', 'Higher prices'],
      recommended: false
    }
  ];

  const helperFilterOptions = [
    {
      id: 'verified_only',
      title: 'Verified Helpers Only',
      description: 'Helpers with verified identity and skills',
      icon: 'CheckCircle'
    },
    {
      id: 'high_rating',
      title: 'High Rating (4.5+)',
      description: 'Helpers with excellent reviews',
      icon: 'Star'
    },
    {
      id: 'local_helpers',
      title: 'Local Helpers',
      description: 'Helpers within 10 miles',
      icon: 'MapPin'
    },
    {
      id: 'previous_experience',
      title: 'Previous Experience',
      description: 'Helpers who have done similar tasks',
      icon: 'Award'
    },
    {
      id: 'quick_responders',
      title: 'Quick Responders',
      description: 'Helpers who respond within 1 hour',
      icon: 'Clock'
    },
    {
      id: 'insurance_covered',
      title: 'Insurance Covered',
      description: 'Helpers with liability insurance',
      icon: 'Shield'
    }
  ];

  const calculateBiddingFee = () => {
    const taskValue = taskData?.budget || 0;
    const baseFee = Math.max(1, taskValue * 0.025); // 2.5% base fee
    
    let feeMultiplier = 1;
    if (preferences.biddingType === 'blind') feeMultiplier *= 0.8; // Discount for blind bidding
    if (preferences.autoAccept) feeMultiplier *= 0.9; // Discount for auto-accept
    if (preferences.helperFilters.length > 2) feeMultiplier *= 1.1; // Premium for strict filtering
    
    return Math.round(baseFee * feeMultiplier * 100) / 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Bidding Preferences</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
            Smart Matching
          </span>
        </div>
      </div>

      {/* Bidding Type Selection */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Bidding Type</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {biddingTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleBiddingTypeChange(type.id)}
              className={`p-4 text-left border rounded-lg transition-all duration-200 hover:shadow-sm ${
                preferences.biddingType === type.id
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border bg-card hover:border-muted-foreground/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  preferences.biddingType === type.id ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <Icon 
                    name={type.icon} 
                    size={16} 
                    color={preferences.biddingType === type.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium text-foreground text-sm">{type.title}</h5>
                    {type.recommended && (
                      <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{type.description}</p>
                  
                  {showAdvanced && (
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-success font-medium">Pros:</span>
                        <ul className="mt-1 space-y-0.5">
                          {type.pros.map((pro, index) => (
                            <li key={index} className="text-xs text-muted-foreground flex items-center space-x-1">
                              <Icon name="Plus" size={8} color="var(--color-success)" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-xs text-warning font-medium">Cons:</span>
                        <ul className="mt-1 space-y-0.5">
                          {type.cons.map((con, index) => (
                            <li key={index} className="text-xs text-muted-foreground flex items-center space-x-1">
                              <Icon name="Minus" size={8} color="var(--color-warning)" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bidding Settings */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Bidding Settings</h4>
        
        {/* Max Bids */}
        <div className="p-4 border border-border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Hash" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">Maximum Bids</span>
            </div>
            <span className="text-sm font-bold text-primary">{preferences.maxBids}</span>
          </div>
          
          <input
            type="range"
            min="3"
            max="20"
            value={preferences.maxBids}
            onChange={(e) => handleSliderChange('maxBids', parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider mb-2"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>3</span>
            <span>10</span>
            <span>20</span>
          </div>
        </div>

        {/* Bidding Duration */}
        <div className="p-4 border border-border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">Bidding Duration</span>
            </div>
            <span className="text-sm font-bold text-primary">{preferences.biddingDuration}h</span>
          </div>
          
          <input
            type="range"
            min="1"
            max="72"
            value={preferences.biddingDuration}
            onChange={(e) => handleSliderChange('biddingDuration', parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider mb-2"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1h</span>
            <span>24h</span>
            <span>72h</span>
          </div>
        </div>

        {/* Auto-Accept */}
        <div className="p-4 border border-border rounded-lg bg-card">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon name="Zap" size={16} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-foreground text-sm mb-1">Auto-Accept Best Bid</h5>
                <p className="text-xs text-muted-foreground mb-2">
                  Automatically accept the best qualifying bid when bidding ends
                </p>
                
                {preferences.autoAccept && (
                  <div className="space-y-2 mt-3">
                    <div className="text-xs text-muted-foreground">Auto-accept criteria:</div>
                    <ul className="space-y-0.5">
                      <li className="text-xs text-muted-foreground flex items-center space-x-1">
                        <Icon name="Check" size={8} color="var(--color-success)" />
                        <span>Meets all helper filters</span>
                      </li>
                      <li className="text-xs text-muted-foreground flex items-center space-x-1">
                        <Icon name="Check" size={8} color="var(--color-success)" />
                        <span>Within budget range</span>
                      </li>
                      <li className="text-xs text-muted-foreground flex items-center space-x-1">
                        <Icon name="Check" size={8} color="var(--color-success)" />
                        <span>Best value for money</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => handleToggle('autoAccept')}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                preferences.autoAccept ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                preferences.autoAccept ? 'translate-x-5' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Helper Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">Helper Filters</h4>
          <span className="text-xs text-muted-foreground">
            {preferences.helperFilters.length} selected
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {helperFilterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterToggle(filter.id)}
              className={`p-3 text-left border rounded-lg transition-all duration-200 hover:shadow-sm ${
                preferences.helperFilters.includes(filter.id)
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border bg-card hover:border-muted-foreground/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-1.5 rounded-lg ${
                  preferences.helperFilters.includes(filter.id) ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <Icon 
                    name={filter.icon} 
                    size={14} 
                    color={preferences.helperFilters.includes(filter.id) ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                  />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground text-xs">{filter.title}</h5>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {filter.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bid Estimation */}
      {estimatedBids && (
        <div className="p-4 bg-muted/20 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">Bid Estimation</span>
            </div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-primary hover:text-primary/80 transition-colors duration-200"
            >
              {showAdvanced ? 'Hide' : 'Show'} Advanced
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Expected Bids:</span>
              <span className="text-foreground font-medium ml-2">
                ~{estimatedBids.estimated}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Time to Fill:</span>
              <span className="text-foreground font-medium ml-2">
                {estimatedBids.timeToFill}
              </span>
            </div>
          </div>

          {showAdvanced && (
            <div className="mt-3 pt-3 border-t border-border space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Platform Fee:</span>
                <span>${calculateBiddingFee()}</span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate:</span>
                <span>95%</span>
              </div>
              <div className="flex justify-between">
                <span>Avg. Bid Time:</span>
                <span>23 minutes</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Notifications */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Bid Notifications</h4>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={14} color="var(--color-muted-foreground)" />
              <span className="text-sm text-foreground">New bid alerts</span>
            </div>
            <button
              onClick={() => handleToggle('notifyNewBids')}
              className={`relative w-8 h-4 rounded-full transition-colors duration-200 ${
                preferences.notifyNewBids ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                preferences.notifyNewBids ? 'translate-x-4' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
              <span className="text-sm text-foreground">Bidding deadline reminders</span>
            </div>
            <button
              onClick={() => handleToggle('notifyDeadline')}
              className={`relative w-8 h-4 rounded-full transition-colors duration-200 ${
                preferences.notifyDeadline ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                preferences.notifyDeadline ? 'translate-x-4' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Smart Matching Notice */}
      <div className="flex items-start space-x-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
        <Icon name="Zap" size={16} color="var(--color-primary)" className="mt-0.5" />
        <div>
          <p className="text-sm text-primary font-medium">AI-Powered Matching</p>
          <p className="text-xs text-primary/80 mt-1">
            Our AI analyzes helper skills, ratings, and availability to recommend the best matches 
            for your task. Smart filtering ensures you get quality bids from qualified helpers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BiddingPreferences;