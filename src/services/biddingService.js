// Bidding System Service
export class BiddingService {
  constructor() {
    this.activeBids = new Map();
    this.sealedBids = new Map();
  }

  async submitBlindBid(taskId, helperId, bidData) {
    const blindBid = {
      id: `bid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      taskId,
      helperId,
      encryptedBid: this.encryptBid(bidData),
      timestamp: Date.now(),
      status: 'sealed',
      helperProfile: bidData.helperProfile,
      estimatedCompletion: bidData.estimatedCompletion,
      proposal: bidData.proposal,
      milestones: bidData.milestones || []
    };

    // Store the actual bid data separately (in real app, this would be encrypted)
    this.sealedBids.set(blindBid.id, {
      ...bidData,
      bidId: blindBid.id,
      revealKey: `key_${Math.random().toString(36).substr(2, 16)}`
    });

    if (!this.activeBids.has(taskId)) {
      this.activeBids.set(taskId, []);
    }
    this.activeBids.get(taskId).push(blindBid);

    return {
      success: true,
      bidId: blindBid.id,
      message: 'Blind bid submitted successfully',
      estimatedRevealTime: Date.now() + (bidData.bidDuration || 3600000) // 1 hour default
    };
  }

  encryptBid(bidData) {
    // Mock encryption - in real app, use proper encryption
    const dataString = JSON.stringify({
      amount: bidData.amount,
      completion: bidData.estimatedCompletion,
      proposal: bidData.proposal.substring(0, 100) // Truncate for encryption
    });
    return btoa(dataString); // Base64 encoding as mock encryption
  }

  async revealBids(taskId) {
    const taskBids = this.activeBids.get(taskId) || [];
    const revealedBids = [];

    for (const bid of taskBids) {
      if (this.sealedBids.has(bid.id)) {
        const sealedData = this.sealedBids.get(bid.id);
        revealedBids.push({
          ...bid,
          amount: sealedData.amount,
          status: 'revealed',
          completionTime: sealedData.estimatedCompletion,
          proposal: sealedData.proposal,
          milestones: sealedData.milestones,
          revealedAt: Date.now()
        });
      }
    }

    // Sort by amount (lowest first) and other factors
    revealedBids.sort((a, b) => {
      const scoreA = this.calculateBidScore(a);
      const scoreB = this.calculateBidScore(b);
      return scoreB - scoreA; // Higher score first
    });

    this.activeBids.set(taskId, revealedBids);
    return revealedBids;
  }

  calculateBidScore(bid) {
    const helper = bid.helperProfile;
    const priceScore = Math.max(0, 100 - (bid.amount / 10)); // Lower price = higher score
    const ratingScore = (helper.rating || 0) * 20; // Rating out of 5 * 20
    const completionScore = helper.completionRate ? helper.completionRate * 100 : 50;
    const responseScore = Math.max(0, 100 - (helper.averageResponseTime || 30));
    
    return (priceScore * 0.3) + (ratingScore * 0.4) + (completionScore * 0.2) + (responseScore * 0.1);
  }

  async applyDynamicPricing(taskData) {
    const basePricing = {
      amount: taskData.budget.max || 100,
      factors: []
    };

    // Time-based surge pricing
    const now = new Date();
    const isRushHour = (now.getHours() >= 17 && now.getHours() <= 19);
    const isWeekend = (now.getDay() === 0 || now.getDay() === 6);
    const isLateNight = (now.getHours() >= 22 || now.getHours() <= 6);

    let multiplier = 1.0;
    
    if (taskData.urgency === 'emergency') {
      multiplier *= 2.0;
      basePricing.factors.push({ type: 'emergency', multiplier: 2.0, description: 'Emergency service premium' });
    } else if (taskData.urgency === 'urgent') {
      multiplier *= 1.5;
      basePricing.factors.push({ type: 'urgent', multiplier: 1.5, description: 'Urgent service premium' });
    }

    if (isRushHour) {
      multiplier *= 1.2;
      basePricing.factors.push({ type: 'rush_hour', multiplier: 1.2, description: 'Rush hour surcharge' });
    }

    if (isWeekend) {
      multiplier *= 1.15;
      basePricing.factors.push({ type: 'weekend', multiplier: 1.15, description: 'Weekend service fee' });
    }

    if (isLateNight) {
      multiplier *= 1.3;
      basePricing.factors.push({ type: 'late_night', multiplier: 1.3, description: 'After-hours premium' });
    }

    // Demand-based pricing (mock data)
    const demandLevel = Math.random(); // 0-1
    if (demandLevel > 0.8) {
      multiplier *= 1.25;
      basePricing.factors.push({ type: 'high_demand', multiplier: 1.25, description: 'High demand surcharge' });
    }

    return {
      originalAmount: basePricing.amount,
      adjustedAmount: Math.round(basePricing.amount * multiplier),
      multiplier,
      factors: basePricing.factors,
      recommendedRange: {
        min: Math.round(basePricing.amount * multiplier * 0.8),
        max: Math.round(basePricing.amount * multiplier * 1.2)
      }
    };
  }

  async getBidsForTask(taskId) {
    return this.activeBids.get(taskId) || [];
  }

  async acceptBid(bidId, taskId) {
    const bids = this.activeBids.get(taskId) || [];
    const acceptedBid = bids.find(bid => bid.id === bidId);
    
    if (!acceptedBid) {
      throw new Error('Bid not found');
    }

    // Update bid status
    acceptedBid.status = 'accepted';
    acceptedBid.acceptedAt = Date.now();

    // Reject other bids
    bids.forEach(bid => {
      if (bid.id !== bidId && bid.status !== 'rejected') {
        bid.status = 'rejected';
        bid.rejectedAt = Date.now();
      }
    });

    return {
      success: true,
      acceptedBid,
      nextStep: 'escrow_creation',
      escrowAmount: acceptedBid.amount,
      helperInfo: acceptedBid.helperProfile
    };
  }

  async triggerSOSNotification(taskData) {
    const nearbyHelpers = await this.findNearbyEmergencyHelpers(taskData.location);
    const notifications = [];

    for (const helper of nearbyHelpers) {
      notifications.push({
        helperId: helper.id,
        type: 'emergency_sos',
        priority: 'critical',
        message: `Emergency task available: ${taskData.title}`,
        location: taskData.location,
        estimatedDistance: helper.distance,
        urgencyLevel: taskData.urgency,
        potentialEarnings: taskData.budget.max * 1.5, // Emergency premium
        sentAt: Date.now(),
        responseRequired: true,
        expiresAt: Date.now() + 300000 // 5 minutes to respond
      });
    }

    return {
      success: true,
      notificationsSent: notifications.length,
      notifications,
      emergencyId: `sos_${Date.now()}`,
      estimatedResponseTime: '5-15 minutes'
    };
  }

  async findNearbyEmergencyHelpers(location, radius = 5) {
    // Mock nearby emergency-certified helpers
    return [
      {
        id: 'helper_emt_001',
        name: 'Emergency Mike',
        rating: 4.9,
        distance: 0.8,
        specializations: ['emergency_response', 'first_aid'],
        responseTime: 8,
        isOnline: true,
        emergencyCertified: true
      },
      {
        id: 'helper_emt_002', 
        name: 'Quick Response Sarah',
        rating: 4.8,
        distance: 1.2,
        specializations: ['emergency_plumbing', 'electrical_emergency'],
        responseTime: 12,
        isOnline: true,
        emergencyCertified: true
      }
    ];
  }
}

export const biddingService = new BiddingService();