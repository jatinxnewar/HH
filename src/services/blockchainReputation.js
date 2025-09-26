// Blockchain Integration Service for reputation and rewards
export class BlockchainReputationService {
  constructor() {
    // Use fallback contract address for development
    this.reputationContract = '0xabcdef1234567890abcdef1234567890abcdef12';
  }

  async recordTaskCompletion(taskId, helperId, clientId, rating, feedback) {
    const reputationData = {
      taskId,
      helperId,
      clientId,
      rating: Math.min(5, Math.max(1, rating)), // Ensure rating is 1-5
      feedback: feedback.substring(0, 500), // Limit feedback length
      timestamp: Date.now(),
      verified: true,
      onChain: true
    };

    // Mock blockchain transaction
    const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    
    // Calculate reputation impact
    const reputationImpact = this.calculateReputationImpact(rating, taskId);
    
    return {
      success: true,
      transactionHash,
      reputationData,
      reputationImpact,
      tokenRewards: this.calculateTokenRewards(rating, taskId),
      badgesEarned: this.checkBadgeEligibility(helperId, rating)
    };
  }

  calculateReputationImpact(rating, taskId) {
    const basePoints = rating * 20; // 20-100 points based on rating
    const taskComplexityBonus = Math.random() * 10; // Mock complexity bonus
    const consistencyBonus = Math.random() * 5; // Mock consistency bonus
    
    return {
      basePoints,
      bonusPoints: taskComplexityBonus + consistencyBonus,
      totalPoints: basePoints + taskComplexityBonus + consistencyBonus,
      previousScore: 850, // Mock previous score
      newScore: 850 + basePoints + taskComplexityBonus + consistencyBonus
    };
  }

  calculateTokenRewards(rating, taskId) {
    const baseTokens = rating * 5; // 5-25 tokens based on rating
    const perfectScoreBonus = rating === 5 ? 10 : 0;
    const emergencyBonus = taskId.includes('emergency') ? 15 : 0;
    
    return {
      baseTokens,
      bonusTokens: perfectScoreBonus + emergencyBonus,
      totalTokens: baseTokens + perfectScoreBonus + emergencyBonus,
      tokenSymbol: 'HELP',
      usdValue: (baseTokens + perfectScoreBonus + emergencyBonus) * 0.1 // Mock $0.10 per token
    };
  }

  checkBadgeEligibility(helperId, rating) {
    const badges = [];
    
    // Mock badge logic
    if (rating === 5) {
      badges.push({
        id: 'perfect_score',
        name: 'Perfect Score',
        description: 'Received a 5-star rating',
        rarity: 'common',
        tokenReward: 5
      });
    }
    
    // Random chance for other badges
    if (Math.random() > 0.8) {
      badges.push({
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Completed task faster than estimated',
        rarity: 'rare',
        tokenReward: 15
      });
    }
    
    if (Math.random() > 0.95) {
      badges.push({
        id: 'community_hero',
        name: 'Community Hero',
        description: 'Outstanding service to the community',
        rarity: 'epic',
        tokenReward: 50
      });
    }
    
    return badges;
  }

  async recordDonation(donorId, amount, cause, taskId) {
    const donationRecord = {
      donorId,
      amount,
      cause,
      taskId,
      timestamp: Date.now(),
      transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      verified: true,
      taxDeductible: true
    };

    return {
      success: true,
      donationRecord,
      donorRewards: {
        reputationPoints: amount * 2, // 2 points per dollar donated
        badges: amount >= 50 ? ['generous_donor'] : [],
        taxReceipt: {
          receiptId: `receipt_${Date.now()}`,
          amount,
          date: new Date().toISOString(),
          eligibleForDeduction: true
        }
      }
    };
  }

  async getHelperReputation(helperId) {
    // Mock reputation data - would query blockchain in real implementation
    return {
      helperId,
      overallScore: 892,
      totalTasks: 127,
      averageRating: 4.7,
      badges: [
        { id: 'skill_master', count: 3, latestEarned: Date.now() - 86400000 },
        { id: 'speed_demon', count: 12, latestEarned: Date.now() - 172800000 },
        { id: 'community_hero', count: 1, latestEarned: Date.now() - 2592000000 }
      ],
      tokenBalance: 1247,
      recentReviews: [
        { rating: 5, feedback: 'Excellent work!', timestamp: Date.now() - 86400000 },
        { rating: 4, feedback: 'Good job, minor delays', timestamp: Date.now() - 172800000 }
      ],
      trustMetrics: {
        responseTime: 12, // minutes
        completionRate: 0.96,
        onTimeDelivery: 0.89,
        communicationScore: 4.8
      }
    };
  }
}

export const reputationService = new BlockchainReputationService();
export const blockchainReputation = new BlockchainReputationService(); // Legacy export for compatibility