import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const DonationPledge = ({ donation, onDonationChange, taskBudget }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = () => {
    onDonationChange({
      ...donation,
      enabled: !donation.enabled,
      percentage: !donation.enabled ? 5 : 0,
      cause: !donation.enabled ? 'community_support' : ''
    });
  };

  const handlePercentageChange = (percentage) => {
    onDonationChange({
      ...donation,
      percentage: Math.min(50, Math.max(0, percentage)) // Cap at 50%
    });
  };

  const handleCauseChange = (cause) => {
    onDonationChange({
      ...donation,
      cause
    });
  };

  const causes = [
    { 
      id: 'community_support', 
      name: 'Community Support Fund',
      description: 'Supporting local helpers and community initiatives',
      icon: 'Users'
    },
    { 
      id: 'emergency_response', 
      name: 'Emergency Response Fund',
      description: 'Funding emergency services and first responders',
      icon: 'Shield'
    },
    { 
      id: 'education_training', 
      name: 'Education & Training',
      description: 'Training programs for helpers and community members',
      icon: 'BookOpen'
    },
    { 
      id: 'disaster_relief', 
      name: 'Disaster Relief',
      description: 'Supporting communities affected by natural disasters',
      icon: 'Heart'
    }
  ];

  const donationAmount = Math.round((taskBudget * donation.percentage) / 100);
  const selectedCause = causes.find(c => c.id === donation.cause);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Heart" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Donation Pledge</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Optional</span>
          <button
            onClick={handleToggle}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              donation.enabled ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
              donation.enabled ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>

      {donation.enabled && (
        <div className="space-y-6 p-6 bg-muted/30 rounded-lg border border-border">
          {/* Donation Percentage */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Donation Percentage
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={donation.percentage}
                  onChange={(e) => handlePercentageChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1%</span>
                  <span>25%</span>
                  <span>50%</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{donation.percentage}%</div>
                <div className="text-sm text-muted-foreground">${donationAmount}</div>
              </div>
            </div>
          </div>

          {/* Cause Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Choose a Cause
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {causes.map((cause) => (
                <button
                  key={cause.id}
                  onClick={() => handleCauseChange(cause.id)}
                  className={`p-4 text-left border rounded-lg transition-all duration-200 hover:shadow-sm ${
                    donation.cause === cause.id
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border bg-card hover:border-muted-foreground/20'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      donation.cause === cause.id ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <Icon 
                        name={cause.icon} 
                        size={16} 
                        color={donation.cause === cause.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-sm">{cause.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {cause.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Donation Summary */}
          {selectedCause && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Heart" size={16} color="var(--color-success)" />
                  <span className="font-medium text-success">Donation Summary</span>
                </div>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm text-success hover:text-success/80 transition-colors duration-200"
                >
                  {showDetails ? 'Hide' : 'Show'} Details
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-success/80">Task Budget:</span>
                  <span className="text-success font-medium">${taskBudget}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-success/80">Donation ({donation.percentage}%):</span>
                  <span className="text-success font-medium">${donationAmount}</span>
                </div>
                <div className="flex justify-between text-sm font-medium border-t border-success/20 pt-2">
                  <span className="text-success">Total with Donation:</span>
                  <span className="text-success">${taskBudget + donationAmount}</span>
                </div>
              </div>

              {showDetails && (
                <div className="mt-4 pt-4 border-t border-success/20">
                  <div className="flex items-start space-x-3">
                    <Icon name={selectedCause.icon} size={16} color="var(--color-success)" />
                    <div>
                      <h5 className="font-medium text-success text-sm">{selectedCause.name}</h5>
                      <p className="text-xs text-success/80 mt-1">{selectedCause.description}</p>
                      <div className="mt-2 space-y-1 text-xs text-success/70">
                        <p>• Your donation will be held in smart contract escrow</p>
                        <p>• Funds are released to the cause upon task completion</p>
                        <p>• Tax-deductible receipt will be provided</p>
                        <p>• 100% of donation goes to the selected cause</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Blockchain Notice */}
          <div className="flex items-start space-x-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <Icon name="Shield" size={16} color="var(--color-primary)" className="mt-0.5" />
            <div>
              <p className="text-sm text-primary font-medium">Blockchain Transparency</p>
              <p className="text-xs text-primary/80 mt-1">
                All donations are recorded on the blockchain for complete transparency and accountability.
                You'll receive a permanent, verifiable record of your contribution.
              </p>
            </div>
          </div>
        </div>
      )}

      {!donation.enabled && (
        <div className="p-6 text-center bg-muted/20 rounded-lg border border-dashed border-border">
          <Icon name="Heart" size={32} color="var(--color-muted-foreground)" className="mx-auto mb-3 opacity-50" />
          <h4 className="font-medium text-foreground mb-2">Make a Difference</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Consider adding a small donation to support community causes and help others in need.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggle}
            iconName="Heart"
            iconPosition="left"
          >
            Add Donation
          </Button>
        </div>
      )}
    </div>
  );
};

export default DonationPledge;