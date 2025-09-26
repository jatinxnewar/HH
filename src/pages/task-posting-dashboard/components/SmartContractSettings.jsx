import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SmartContractSettings = ({ settings, onSettingsChange, taskData }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [estimatedGas, setEstimatedGas] = useState(null);

  useEffect(() => {
    // Simulate gas estimation based on selected features
    const baseGas = 21000;
    let additionalGas = 0;

    if (settings.escrowEnabled) additionalGas += 50000;
    if (settings.milestonePayments) additionalGas += 30000;
    if (settings.disputeResolution) additionalGas += 40000;
    if (settings.autoRelease) additionalGas += 20000;
    if (settings.insuranceCoverage > 0) additionalGas += 35000;

    const totalGas = baseGas + additionalGas;
    const gasPrice = 20; // Gwei
    const ethPrice = 2000; // USD
    const gasCostEth = (totalGas * gasPrice) / 1e9;
    const gasCostUsd = gasCostEth * ethPrice;

    setEstimatedGas({
      totalGas,
      costEth: gasCostEth,
      costUsd: gasCostUsd
    });
  }, [settings]);

  const handleToggle = (key) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key]
    });
  };

  const handleSliderChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  const features = [
    {
      key: 'escrowEnabled',
      title: 'Smart Contract Escrow',
      description: 'Funds are held in smart contract until task completion',
      icon: 'Lock',
      recommended: true,
      gasImpact: 'Medium',
      benefits: ['Automatic fund release', 'Fraud protection', 'Transparent transactions']
    },
    {
      key: 'milestonePayments',
      title: 'Milestone-Based Payments',
      description: 'Split payments across task milestones',
      icon: 'CheckCircle',
      recommended: true,
      gasImpact: 'Low',
      benefits: ['Risk reduction', 'Progress incentives', 'Flexible payment structure']
    },
    {
      key: 'disputeResolution',
      title: 'Automated Dispute Resolution',
      description: 'Built-in arbitration system for conflicts',
      icon: 'Scale',
      recommended: false,
      gasImpact: 'High',
      benefits: ['Fair conflict resolution', 'Reduced manual intervention', 'Transparent decisions']
    },
    {
      key: 'autoRelease',
      title: 'Auto-Release Timer',
      description: 'Automatic fund release after completion timeout',
      icon: 'Clock',
      recommended: true,
      gasImpact: 'Low',
      benefits: ['Prevents fund lock-up', 'Reduces friction', 'Automated process']
    }
  ];

  const calculateInsurancePremium = () => {
    const taskValue = taskData?.budget || 0;
    const coveragePercent = settings.insuranceCoverage;
    const premium = (taskValue * coveragePercent * 0.02) / 100; // 2% of covered amount
    return Math.max(5, premium); // Minimum $5 premium
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Smart Contract Settings</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            Blockchain Protected
          </span>
        </div>
      </div>

      {/* Core Features */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Core Features</h4>
        <div className="space-y-3">
          {features.map((feature) => (
            <div
              key={feature.key}
              className={`p-4 border rounded-lg transition-all duration-200 ${
                settings[feature.key]
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-muted-foreground/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${
                    settings[feature.key] ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={feature.icon} 
                      size={16} 
                      color={settings[feature.key] ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-foreground text-sm">{feature.title}</h5>
                      {feature.recommended && (
                        <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{feature.description}</p>
                    
                    {showAdvanced && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4 text-xs">
                          <span className="text-muted-foreground">Gas Impact:</span>
                          <span className={`px-2 py-0.5 rounded-full ${
                            feature.gasImpact === 'Low' ? 'bg-success/10 text-success' :
                            feature.gasImpact === 'Medium' ? 'bg-warning/10 text-warning' :
                            'bg-destructive/10 text-destructive'
                          }`}>
                            {feature.gasImpact}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">Benefits:</span>
                          <ul className="space-y-0.5">
                            {feature.benefits.map((benefit, index) => (
                              <li key={index} className="text-xs text-muted-foreground flex items-center space-x-1">
                                <Icon name="Check" size={10} color="var(--color-success)" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggle(feature.key)}
                    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                      settings[feature.key] ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                      settings[feature.key] ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insurance Coverage */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">Insurance Coverage</h4>
          <span className="text-xs text-muted-foreground">Optional</span>
        </div>
        <div className="p-4 border border-border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">Coverage Level</span>
            </div>
            <span className="text-sm font-bold text-primary">{settings.insuranceCoverage}%</span>
          </div>
          
          <input
            type="range"
            min="0"
            max="100"
            step="25"
            value={settings.insuranceCoverage}
            onChange={(e) => handleSliderChange('insuranceCoverage', parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider mb-2"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground mb-4">
            <span>No Coverage</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>Full Coverage</span>
          </div>

          {settings.insuranceCoverage > 0 && (
            <div className="bg-muted/30 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Task Value:</span>
                <span className="text-foreground font-medium">${taskData?.budget || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Covered Amount:</span>
                <span className="text-foreground font-medium">
                  ${Math.round(((taskData?.budget || 0) * settings.insuranceCoverage) / 100)}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-2">
                <span className="text-muted-foreground">Premium:</span>
                <span className="text-primary font-medium">${calculateInsurancePremium().toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auto-Release Timer */}
      {settings.autoRelease && (
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Auto-Release Timer</h4>
          <div className="p-4 border border-border rounded-lg bg-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">Release after completion</span>
              <span className="text-sm font-bold text-primary">{settings.autoReleaseHours}h</span>
            </div>
            
            <input
              type="range"
              min="1"
              max="168"
              value={settings.autoReleaseHours}
              onChange={(e) => handleSliderChange('autoReleaseHours', parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider mb-2"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1h</span>
              <span>24h</span>
              <span>72h</span>
              <span>1 week</span>
            </div>
          </div>
        </div>
      )}

      {/* Gas Estimation */}
      {estimatedGas && (
        <div className="p-4 bg-muted/20 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} color="var(--color-warning)" />
              <span className="text-sm font-medium text-foreground">Estimated Gas Cost</span>
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
              <span className="text-muted-foreground">ETH Cost:</span>
              <span className="text-foreground font-medium ml-2">
                {estimatedGas.costEth.toFixed(6)} ETH
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">USD Cost:</span>
              <span className="text-foreground font-medium ml-2">
                ${estimatedGas.costUsd.toFixed(2)}
              </span>
            </div>
          </div>

          {showAdvanced && (
            <div className="mt-3 pt-3 border-t border-border space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Total Gas Units:</span>
                <span>{estimatedGas.totalGas.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Gas Price:</span>
                <span>20 Gwei</span>
              </div>
              <div className="flex justify-between">
                <span>ETH Price:</span>
                <span>$2,000</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-start space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg">
        <Icon name="Shield" size={16} color="var(--color-success)" className="mt-0.5" />
        <div>
          <p className="text-sm text-success font-medium">Blockchain Security</p>
          <p className="text-xs text-success/80 mt-1">
            All transactions are secured by smart contracts on the Ethereum blockchain. 
            Your funds are protected by cryptographic security and cannot be manipulated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartContractSettings;