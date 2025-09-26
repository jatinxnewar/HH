import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { biddingService } from '../../../services/biddingService';
import { reputationService } from '../../../services/blockchainReputation';

const BiddingManagement = ({ taskId, biddingSystemId, onBidAccepted }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBid, setSelectedBid] = useState(null);
  const [showBidDetails, setShowBidDetails] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'best_value',
    minRating: 0,
    maxPrice: null,
    verified: false,
    local: false
  });

  useEffect(() => {
    loadBids();
    
    // Set up real-time bid updates
    const interval = setInterval(loadBids, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [taskId, biddingSystemId]);

  const loadBids = async () => {
    try {
      setLoading(true);
      const bidData = await biddingService.getBidsForTask(taskId);
      setBids(bidData.bids || []);
    } catch (error) {
      console.error('Error loading bids:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBid = async (bidId) => {
    try {
      const result = await biddingService.acceptBid(taskId, bidId);
      if (result.success) {
        // Update reputation for accepted helper
        await reputationService.recordBidAcceptance(result.helperId, taskId);
        onBidAccepted?.(result);
      }
    } catch (error) {
      console.error('Error accepting bid:', error);
    }
  };

  const handleRejectBid = async (bidId) => {
    try {
      await biddingService.rejectBid(taskId, bidId);
      loadBids(); // Refresh bids
    } catch (error) {
      console.error('Error rejecting bid:', error);
    }
  };

  const getBidStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning';
      case 'accepted': return 'text-success';
      case 'rejected': return 'text-destructive';
      case 'withdrawn': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getBidStatusIcon = (status) => {
    switch (status) {
      case 'pending': return 'Clock';
      case 'accepted': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      case 'withdrawn': return 'Minus';
      default: return 'Circle';
    }
  };

  const calculateBidScore = (bid) => {
    let score = 0;
    
    // Price factor (lower is better, up to 40 points)
    const priceRatio = bid.amount / Math.max(...bids.map(b => b.amount));
    score += (1 - priceRatio) * 40;
    
    // Rating factor (up to 30 points)
    score += (bid.helper.rating / 5) * 30;
    
    // Completion rate (up to 20 points)
    score += (bid.helper.completionRate / 100) * 20;
    
    // Response time (up to 10 points)
    const avgResponseTime = 24; // hours
    const responseBonus = Math.max(0, (avgResponseTime - bid.responseTime) / avgResponseTime) * 10;
    score += responseBonus;
    
    return Math.round(score);
  };

  const filteredAndSortedBids = bids
    .filter(bid => {
      if (filters.minRating > 0 && bid.helper.rating < filters.minRating) return false;
      if (filters.maxPrice && bid.amount > filters.maxPrice) return false;
      if (filters.verified && !bid.helper.verified) return false;
      if (filters.local && bid.helper.distance > 10) return false;
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_low':
          return a.amount - b.amount;
        case 'price_high':
          return b.amount - a.amount;
        case 'rating':
          return b.helper.rating - a.helper.rating;
        case 'response_time':
          return a.responseTime - b.responseTime;
        case 'best_value':
        default:
          return calculateBidScore(b) - calculateBidScore(a);
      }
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted-foreground">Loading bids...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">
            Bid Management ({bids.length} bids)
          </h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadBids}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Filter & Sort</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Sort by</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="w-full p-2 text-sm border border-border rounded bg-background"
            >
              <option value="best_value">Best Value</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
              <option value="response_time">Fastest Response</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Min Rating</label>
            <select
              value={filters.minRating}
              onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
              className="w-full p-2 text-sm border border-border rounded bg-background"
            >
              <option value={0}>Any Rating</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={4.5}>4.5+ Stars</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.verified}
                onChange={(e) => setFilters(prev => ({ ...prev, verified: e.target.checked }))}
                className="rounded border-border"
              />
              <span className="text-sm text-foreground">Verified Only</span>
            </label>
          </div>
          <div className="flex items-end">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.local}
                onChange={(e) => setFilters(prev => ({ ...prev, local: e.target.checked }))}
                className="rounded border-border"
              />
              <span className="text-sm text-foreground">Local Helpers</span>
            </label>
          </div>
        </div>
      </div>

      {/* Bids List */}
      <div className="space-y-4">
        {filteredAndSortedBids.length === 0 ? (
          <div className="text-center p-8 bg-muted/20 rounded-lg border border-dashed border-border">
            <Icon name="Users" size={32} color="var(--color-muted-foreground)" className="mx-auto mb-3 opacity-50" />
            <h4 className="font-medium text-foreground mb-2">No Bids Yet</h4>
            <p className="text-sm text-muted-foreground">
              {bids.length === 0 
                ? "Your task is live and helpers will start bidding soon."
                : "No bids match your current filters. Try adjusting the criteria above."
              }
            </p>
          </div>
        ) : (
          filteredAndSortedBids.map((bid) => (
            <div
              key={bid.id}
              className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-sm ${
                bid.status === 'accepted' 
                  ? 'border-success bg-success/5'
                  : bid.status === 'rejected'
                  ? 'border-destructive/50 bg-destructive/5 opacity-75'
                  : 'border-border bg-card hover:border-primary/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Helper Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} color="var(--color-muted-foreground)" />
                    </div>
                    {bid.helper.verified && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                        <Icon name="Check" size={10} color="white" />
                      </div>
                    )}
                  </div>

                  {/* Bid Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-foreground">{bid.helper.name}</h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={12}
                                color={i < Math.floor(bid.helper.rating) ? 'var(--color-warning)' : 'var(--color-muted)'}
                                filled={i < Math.floor(bid.helper.rating)}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">
                              ({bid.helper.reviewCount})
                            </span>
                          </div>
                          <div className={`flex items-center space-x-1 ${getBidStatusColor(bid.status)}`}>
                            <Icon name={getBidStatusIcon(bid.status)} size={12} />
                            <span className="text-xs capitalize">{bid.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{bid.helper.completionRate}% completion rate</span>
                          <span>{bid.helper.distance} miles away</span>
                          <span>Responded in {bid.responseTime}h</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${bid.amount}</div>
                        <div className="text-xs text-muted-foreground">
                          Score: {calculateBidScore(bid)}/100
                        </div>
                      </div>
                    </div>

                    {/* Bid Message */}
                    {bid.message && (
                      <div className="bg-muted/30 rounded-lg p-3 mb-3">
                        <p className="text-sm text-foreground">{bid.message}</p>
                      </div>
                    )}

                    {/* Milestones (if any) */}
                    {bid.milestones && bid.milestones.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-foreground mb-2">Proposed Milestones:</p>
                        <div className="space-y-1">
                          {bid.milestones.map((milestone, index) => (
                            <div key={index} className="flex justify-between text-xs">
                              <span className="text-muted-foreground">{milestone.description}</span>
                              <span className="text-foreground font-medium">${milestone.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    {bid.status === 'pending' && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedBid(bid);
                              setShowBidDetails(true);
                            }}
                            iconName="Eye"
                            iconPosition="left"
                          >
                            View Profile
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectBid(bid.id)}
                            iconName="X"
                            iconPosition="left"
                          >
                            Decline
                          </Button>
                        </div>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleAcceptBid(bid.id)}
                          iconName="Check"
                          iconPosition="left"
                        >
                          Accept Bid
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bidding Stats */}
      {bids.length > 0 && (
        <div className="bg-muted/20 border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3">Bidding Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Average Bid:</span>
              <span className="text-foreground font-medium ml-2">
                ${Math.round(bids.reduce((sum, bid) => sum + bid.amount, 0) / bids.length)}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Lowest Bid:</span>
              <span className="text-foreground font-medium ml-2">
                ${Math.min(...bids.map(bid => bid.amount))}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Highest Bid:</span>
              <span className="text-foreground font-medium ml-2">
                ${Math.max(...bids.map(bid => bid.amount))}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Avg. Response:</span>
              <span className="text-foreground font-medium ml-2">
                {Math.round(bids.reduce((sum, bid) => sum + bid.responseTime, 0) / bids.length)}h
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddingManagement;