import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustScoreBreakdown = ({ trustScore, breakdown, verificationHistory }) => {
  const getScoreColor = (score) => {
    if (score >= 4.5) return 'text-success';
    if (score >= 4.0) return 'text-primary';
    if (score >= 3.5) return 'text-accent';
    return 'text-muted-foreground';
  };

  const getScoreBackground = (score) => {
    if (score >= 4.5) return 'bg-success/10';
    if (score >= 4.0) return 'bg-primary/10';
    if (score >= 3.5) return 'bg-accent/10';
    return 'bg-muted/30';
  };

  const getVerificationIcon = (type) => {
    switch (type) {
      case 'blockchain': return 'Shield';
      case 'ngo': return 'Award';
      case 'peer': return 'Users';
      case 'government': return 'Building';
      case 'emergency': return 'AlertTriangle';
      default: return 'CheckCircle';
    }
  };

  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'pending': return 'text-accent';
      case 'expired': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Shield" size={20} color="var(--color-success)" />
        Trust Score Transparency
      </h3>
      {/* Overall Trust Score */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBackground(trustScore?.overall)} mb-3`}>
          <span className={`text-3xl font-bold ${getScoreColor(trustScore?.overall)}`}>
            {trustScore?.overall}
          </span>
        </div>
        <p className="text-muted-foreground">Overall Trust Score</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Icon name="TrendingUp" size={16} color="var(--color-success)" />
          <span className="text-sm text-success">+0.2 this month</span>
        </div>
      </div>
      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {breakdown?.map((item, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon name={item?.icon} size={16} color="var(--color-primary)" />
                <span className="font-medium text-foreground">{item?.category}</span>
              </div>
              <span className={`font-bold ${getScoreColor(item?.score)}`}>{item?.score}</span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  item?.score >= 4.5 ? 'bg-success' :
                  item?.score >= 4.0 ? 'bg-primary' :
                  item?.score >= 3.5 ? 'bg-accent' : 'bg-muted-foreground'
                }`}
                style={{ width: `${(item?.score / 5) * 100}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-muted-foreground">{item?.description}</p>
            
            {item?.details && (
              <div className="mt-2 space-y-1">
                {item?.details?.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{detail?.label}:</span>
                    <span className="text-foreground">{detail?.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Verification History */}
      <div>
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Icon name="History" size={16} color="var(--color-primary)" />
          Verification History
        </h4>
        
        <div className="space-y-3">
          {verificationHistory?.map((verification, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon 
                  name={getVerificationIcon(verification?.type)} 
                  size={18} 
                  color={`var(--color-${verification?.status === 'verified' ? 'success' : verification?.status === 'pending' ? 'accent' : 'muted-foreground'})`}
                />
                <div>
                  <p className="font-medium text-foreground">{verification?.title}</p>
                  <p className="text-sm text-muted-foreground">{verification?.issuer}</p>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  verification?.status === 'verified' ? 'bg-success/10 text-success' :
                  verification?.status === 'pending'? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon 
                    name={verification?.status === 'verified' ? 'CheckCircle' : verification?.status === 'pending' ? 'Clock' : 'XCircle'} 
                    size={10} 
                  />
                  {verification?.status}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{verification?.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Blockchain Verification */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Shield" size={18} color="var(--color-primary)" />
          <span className="font-medium text-primary">Blockchain Secured</span>
        </div>
        <p className="text-sm text-muted-foreground">
          All trust scores and verifications are recorded on the blockchain for transparency and immutability. 
          Transaction hash: <span className="font-mono text-xs">0x7f9a2b8c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b</span>
        </p>
      </div>
    </div>
  );
};

export default TrustScoreBreakdown;