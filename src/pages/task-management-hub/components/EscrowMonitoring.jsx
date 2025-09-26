import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { smartContractService } from '../../../services/smartContract';

const EscrowMonitoring = ({ taskId, escrowContractId }) => {
  const [escrowData, setEscrowData] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (escrowContractId) {
      loadEscrowData();
      // Set up real-time monitoring
      const interval = setInterval(loadEscrowData, 15000);
      return () => clearInterval(interval);
    }
  }, [escrowContractId]);

  const loadEscrowData = async () => {
    try {
      setLoading(true);
      const data = await smartContractService.getEscrowStatus(escrowContractId);
      setEscrowData(data);
      setMilestones(data.milestones || []);
    } catch (error) {
      console.error('Error loading escrow data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMilestoneApproval = async (milestoneId) => {
    try {
      setProcessing(true);
      await smartContractService.approveMilestone(escrowContractId, milestoneId);
      await loadEscrowData(); // Refresh data
    } catch (error) {
      console.error('Error approving milestone:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleDisputeMilestone = async (milestoneId, reason) => {
    try {
      setProcessing(true);
      await smartContractService.disputeMilestone(escrowContractId, milestoneId, reason);
      await loadEscrowData(); // Refresh data
    } catch (error) {
      console.error('Error disputing milestone:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleFinalApproval = async () => {
    try {
      setProcessing(true);
      await smartContractService.releaseEscrow(escrowContractId);
      await loadEscrowData(); // Refresh data
    } catch (error) {
      console.error('Error releasing escrow:', error);
    } finally {
      setProcessing(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning';
      case 'approved': return 'text-success';
      case 'disputed': return 'text-destructive';
      case 'released': return 'text-success';
      case 'locked': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return 'Clock';
      case 'approved': return 'CheckCircle';
      case 'disputed': return 'AlertTriangle';
      case 'released': return 'Unlock';
      case 'locked': return 'Lock';
      default: return 'Circle';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted-foreground">Loading escrow data...</span>
      </div>
    );
  }

  if (!escrowData) {
    return (
      <div className="text-center p-8 bg-muted/20 rounded-lg border border-dashed border-border">
        <Icon name="Shield" size={32} color="var(--color-muted-foreground)" className="mx-auto mb-3 opacity-50" />
        <h4 className="font-medium text-foreground mb-2">No Escrow Contract</h4>
        <p className="text-sm text-muted-foreground">
          This task does not have an active escrow contract.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Smart Contract Escrow</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {escrowData.contractAddress?.slice(0, 8)}...
          </span>
        </div>
      </div>

      {/* Escrow Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              ${escrowData.totalAmount}
            </div>
            <div className="text-sm text-muted-foreground">Total Escrowed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              ${escrowData.releasedAmount || 0}
            </div>
            <div className="text-sm text-muted-foreground">Released</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              ${escrowData.totalAmount - (escrowData.releasedAmount || 0)}
            </div>
            <div className="text-sm text-muted-foreground">Remaining</div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon(escrowData.status)} 
              size={16} 
              color={`var(--color-${escrowData.status === 'pending' ? 'warning' : escrowData.status === 'approved' || escrowData.status === 'released' ? 'success' : escrowData.status === 'disputed' ? 'destructive' : 'muted-foreground'})`} 
            />
            <span className={`font-medium ${getStatusColor(escrowData.status)}`}>
              {escrowData.status.charAt(0).toUpperCase() + escrowData.status.slice(1)}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Auto-release: {escrowData.autoReleaseTime ? 
              new Date(escrowData.autoReleaseTime).toLocaleDateString() : 
              'Not set'
            }
          </div>
        </div>
      </div>

      {/* Milestones */}
      {milestones.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-medium text-foreground mb-4">Milestone Payments</h4>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`border rounded-lg p-4 ${
                  milestone.status === 'approved' 
                    ? 'border-success bg-success/5'
                    : milestone.status === 'disputed'
                    ? 'border-destructive bg-destructive/5'
                    : 'border-border bg-background'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-foreground">
                        Milestone {index + 1}: {milestone.title}
                      </span>
                      <div className={`flex items-center space-x-1 ${getStatusColor(milestone.status)}`}>
                        <Icon name={getStatusIcon(milestone.status)} size={12} />
                        <span className="text-xs capitalize">{milestone.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {milestone.description}
                    </p>
                    {milestone.completedAt && (
                      <p className="text-xs text-muted-foreground">
                        Completed: {new Date(milestone.completedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      ${milestone.amount}
                    </div>
                    {milestone.status === 'approved' && milestone.releasedAt && (
                      <div className="text-xs text-success">
                        Released {new Date(milestone.releasedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {milestone.deliverables && milestone.deliverables.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-foreground mb-2">Deliverables:</p>
                    <div className="space-y-1">
                      {milestone.deliverables.map((deliverable, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs">
                          <Icon name="CheckCircle" size={10} color="var(--color-success)" />
                          <span className="text-muted-foreground">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {milestone.status === 'pending' && (
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDisputeMilestone(milestone.id, 'Quality concerns')}
                      disabled={processing}
                      iconName="AlertTriangle"
                      iconPosition="left"
                    >
                      Raise Dispute
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleMilestoneApproval(milestone.id)}
                      disabled={processing}
                      iconName="Check"
                      iconPosition="left"
                    >
                      Approve & Release
                    </Button>
                  </div>
                )}

                {milestone.status === 'disputed' && (
                  <div className="pt-3 border-t border-destructive/20">
                    <div className="bg-destructive/10 border border-destructive/20 rounded p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="AlertTriangle" size={14} color="var(--color-destructive)" />
                        <span className="font-medium text-destructive text-sm">Dispute Active</span>
                      </div>
                      <p className="text-xs text-destructive/80">
                        This milestone is under dispute. An arbitrator will review the case and make a decision.
                        You will be notified when the dispute is resolved.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insurance Coverage */}
      {escrowData.insuranceCoverage > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Shield" size={16} color="var(--color-primary)" />
            <h4 className="font-medium text-foreground">Insurance Coverage</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Coverage Amount</p>
              <p className="text-lg font-bold text-primary">
                ${Math.round((escrowData.totalAmount * escrowData.insuranceCoverage) / 100)}
              </p>
              <p className="text-xs text-muted-foreground">
                {escrowData.insuranceCoverage}% of task value
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Policy Status</p>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                <span className="text-sm font-medium text-success">Active</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Valid until task completion
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Final Actions */}
      {escrowData.status === 'pending' && milestones.every(m => m.status === 'approved') && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-success mb-2">Ready for Final Approval</h4>
              <p className="text-sm text-success/80">
                All milestones have been completed and approved. You can now release the final payment.
              </p>
            </div>
            <Button
              variant="default"
              onClick={handleFinalApproval}
              disabled={processing}
              iconName="Unlock"
              iconPosition="left"
            >
              Release Payment
            </Button>
          </div>
        </div>
      )}

      {/* Blockchain Transaction History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Transaction History</h4>
        <div className="space-y-3">
          {escrowData.transactions?.map((tx, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="Link" size={14} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{tx.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(tx.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{tx.amount && `$${tx.amount}`}</p>
                <a 
                  href={`https://etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-primary/80"
                >
                  View on Etherscan
                </a>
              </div>
            </div>
          )) || (
            <p className="text-sm text-muted-foreground text-center py-4">
              No transactions recorded yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EscrowMonitoring;