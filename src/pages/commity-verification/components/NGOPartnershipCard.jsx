import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NGOPartnershipCard = ({ 
  ngo, 
  partnership, 
  onApply, 
  onViewDetails 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'available':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active Partnership';
      case 'pending':
        return 'Application Pending';
      case 'available':
        return 'Available';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={ngo?.logo}
            alt={ngo?.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold text-foreground">{ngo?.name}</h3>
            <p className="text-sm text-muted-foreground">{ngo?.category}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(partnership?.status || 'available')}`}>
          {getStatusText(partnership?.status || 'available')}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {ngo?.description}
      </p>
      {/* Partnership Benefits */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Partnership Benefits</h4>
        <div className="grid grid-cols-2 gap-2">
          {ngo?.benefits?.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={12} color="var(--color-success)" />
              <span className="text-xs text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Requirements */}
      {ngo?.requirements && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Requirements</h4>
          <div className="space-y-1">
            {ngo?.requirements?.map((req, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Circle" size={8} color="var(--color-muted-foreground)" />
                <span className="text-xs text-muted-foreground">{req}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Active Partnership Info */}
      {partnership?.status === 'active' && (
        <div className="mb-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-success">Active Since</p>
              <p className="text-xs text-success/80">{partnership?.startDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-success">Hours Contributed</p>
              <p className="text-xs text-success/80">{partnership?.hoursContributed}</p>
            </div>
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(ngo)}
          className="flex-1"
        >
          View Details
        </Button>
        {partnership?.status !== 'active' && (
          <Button
            size="sm"
            onClick={() => onApply(ngo)}
            disabled={partnership?.status === 'pending'}
            className="flex-1"
          >
            {partnership?.status === 'pending' ? 'Applied' : 'Apply'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default NGOPartnershipCard;