import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustScorePanel = ({ 
  currentScore, 
  maxScore = 100, 
  rank, 
  totalUsers,
  factors = [],
  recommendations = []
}) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-success/10 border-success/20';
    if (score >= 60) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  const scorePercentage = (currentScore / maxScore) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">Trust Score</h2>
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${getScoreBackground(currentScore)}`}>
          <span className={`text-2xl font-bold ${getScoreColor(currentScore)}`}>
            {currentScore}
          </span>
        </div>
        <div className="mt-3">
          <p className="text-sm text-muted-foreground">
            Rank #{rank} of {totalUsers?.toLocaleString()} users
          </p>
        </div>
      </div>
      {/* Score Breakdown */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">Score Factors</h3>
        <div className="space-y-3">
          {factors?.map((factor, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name={factor?.icon} size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm text-foreground">{factor?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-muted rounded-full h-2">
                  <div 
                    className="h-2 bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${(factor?.score / factor?.maxScore) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground w-8 text-right">
                  {factor?.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recommendations */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Improve Your Score</h3>
        <div className="space-y-2">
          {recommendations?.map((rec, index) => (
            <div key={index} className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
              <Icon name="TrendingUp" size={16} color="var(--color-primary)" className="mt-0.5" />
              <div>
                <p className="text-sm text-foreground">{rec?.action}</p>
                <p className="text-xs text-success">+{rec?.points} points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustScorePanel;