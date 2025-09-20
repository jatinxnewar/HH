import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const BudgetSelector = ({ 
  selectedCategory, 
  selectedUrgency, 
  budget, 
  onBudgetChange 
}) => {
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock AI pricing calculation
  useEffect(() => {
    if (selectedCategory && selectedUrgency) {
      const basePrices = {
        'electrician': { min: 80, max: 150 },
        'plumber': { min: 90, max: 180 },
        'carpenter': { min: 70, max: 140 },
        'it-fix': { min: 60, max: 120 },
        'tutor': { min: 25, max: 50 },
        'cleaning': { min: 40, max: 80 },
        'delivery': { min: 15, max: 35 },
        'other': { min: 30, max: 100 }
      };

      const urgencyMultipliers = {
        'routine': 1.0,
        'standard': 1.2,
        'urgent': 1.5,
        'emergency': 2.0
      };

      const basePrice = basePrices?.[selectedCategory] || basePrices?.other;
      const multiplier = urgencyMultipliers?.[selectedUrgency] || 1.0;

      const suggestion = {
        min: Math.round(basePrice?.min * multiplier),
        max: Math.round(basePrice?.max * multiplier),
        recommended: Math.round(((basePrice?.min + basePrice?.max) / 2) * multiplier),
        factors: {
          category: selectedCategory,
          urgency: selectedUrgency,
          location: 'New York, NY',
          timeOfDay: 'Standard hours',
          marketDemand: 'Moderate'
        }
      };

      setAiSuggestion(suggestion);
      
      if (!budget?.min && !budget?.max) {
        onBudgetChange({
          min: suggestion?.min,
          max: suggestion?.max
        });
      }
    }
  }, [selectedCategory, selectedUrgency]);

  const handleBudgetChange = (type, value) => {
    const numValue = parseInt(value) || 0;
    onBudgetChange({
      ...budget,
      [type]: numValue
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="DollarSign" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Budget Range</h3>
        </div>
        {aiSuggestion && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <Icon name="Brain" size={14} />
            <span>AI Suggestion</span>
            <Icon name={showDetails ? "ChevronUp" : "ChevronDown"} size={14} />
          </button>
        )}
      </div>
      {aiSuggestion && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
              <span className="font-medium text-foreground">AI Fair Price Range</span>
            </div>
            <div className="text-lg font-bold text-primary">
              ${aiSuggestion?.min} - ${aiSuggestion?.max}
            </div>
          </div>

          <div className="flex items-center justify-center mb-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Recommended</p>
              <p className="text-2xl font-bold text-success">${aiSuggestion?.recommended}</p>
            </div>
          </div>

          {showDetails && (
            <div className="border-t border-primary/20 pt-3 mt-3">
              <p className="text-sm font-medium text-foreground mb-2">Pricing factors:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="text-foreground capitalize">{aiSuggestion?.factors?.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Urgency:</span>
                  <span className="text-foreground capitalize">{aiSuggestion?.factors?.urgency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground">{aiSuggestion?.factors?.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Demand:</span>
                  <span className="text-foreground">{aiSuggestion?.factors?.marketDemand}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Minimum Budget
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
            <input
              type="number"
              value={budget?.min || ''}
              onChange={(e) => handleBudgetChange('min', e?.target?.value)}
              placeholder="0"
              className="w-full pl-8 pr-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Maximum Budget
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
            <input
              type="number"
              value={budget?.max || ''}
              onChange={(e) => handleBudgetChange('max', e?.target?.value)}
              placeholder="0"
              className="w-full pl-8 pr-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              min="0"
            />
          </div>
        </div>
      </div>
      {budget?.min && budget?.max && (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Budget Range</span>
            <span className="text-lg font-bold text-primary">
              ${budget?.min} - ${budget?.max}
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: '70%' }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Market Min</span>
            <span>Your Range</span>
            <span>Market Max</span>
          </div>
        </div>
      )}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-amber-800 mb-1">Budget Tips</p>
            <p className="text-amber-700">
              Set a realistic range to attract quality helpers. Higher budgets typically get faster responses and better service quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSelector;