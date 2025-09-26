import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TaskExecution = ({ taskId, helperId, onStatusUpdate }) => {
  const [executionData, setExecutionData] = useState({
    status: 'in_progress',
    progress: 0,
    timeSpent: 0,
    milestoneProgress: [],
    communications: [],
    deliverables: [],
    issues: []
  });
  
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    // Load execution data
    loadExecutionData();
    
    // Set up real-time updates
    const interval = setInterval(loadExecutionData, 10000);
    return () => clearInterval(interval);
  }, [taskId, helperId]);

  const loadExecutionData = async () => {
    try {
      // Mock API call - replace with actual service
      const data = {
        status: 'in_progress',
        progress: 65,
        timeSpent: 4.5, // hours
        estimatedTimeRemaining: 2.5,
        milestoneProgress: [
          {
            id: 1,
            title: 'Initial Assessment',
            status: 'completed',
            completedAt: Date.now() - 3 * 60 * 60 * 1000,
            evidence: ['assessment_photo_1.jpg', 'assessment_notes.pdf']
          },
          {
            id: 2,
            title: 'Problem Resolution',
            status: 'in_progress',
            progress: 80,
            startedAt: Date.now() - 1 * 60 * 60 * 1000
          },
          {
            id: 3,
            title: 'Final Testing & Cleanup',
            status: 'pending',
            estimatedStart: Date.now() + 1 * 60 * 60 * 1000
          }
        ],
        communications: [
          {
            id: 1,
            sender: 'helper',
            message: 'I have arrived and begun the assessment. The issue is more complex than initially thought.',
            timestamp: Date.now() - 3 * 60 * 60 * 1000,
            attachments: ['assessment_photo.jpg']
          },
          {
            id: 2,
            sender: 'seeker',
            message: 'Thank you for the update. Please proceed with the repair.',
            timestamp: Date.now() - 2.5 * 60 * 60 * 1000
          },
          {
            id: 3,
            sender: 'helper',
            message: 'Working on the repair now. Will need about 2 more hours to complete.',
            timestamp: Date.now() - 1 * 60 * 60 * 1000
          }
        ],
        deliverables: [
          {
            id: 1,
            name: 'Before Photos',
            type: 'image',
            files: ['before_1.jpg', 'before_2.jpg'],
            uploadedAt: Date.now() - 3 * 60 * 60 * 1000
          }
        ],
        issues: [],
        location: {
          lat: 40.7128,
          lng: -74.0060,
          lastUpdated: Date.now() - 30 * 60 * 1000
        }
      };
      setExecutionData(data);
    } catch (error) {
      console.error('Error loading execution data:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      // Mock API call - replace with actual service
      const newCommunication = {
        id: executionData.communications.length + 1,
        sender: 'seeker',
        message: newMessage,
        timestamp: Date.now()
      };

      setExecutionData(prev => ({
        ...prev,
        communications: [...prev.communications, newCommunication]
      }));

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleEmergencyAlert = async () => {
    try {
      // Trigger emergency alert
      console.log('Emergency alert triggered for task:', taskId);
      // This would integrate with emergency services
    } catch (error) {
      console.error('Error triggering emergency alert:', error);
    }
  };

  const handleCompleteTask = async () => {
    try {
      // Mark task as completed
      setExecutionData(prev => ({
        ...prev,
        status: 'completed',
        progress: 100,
        completedAt: Date.now()
      }));
      setShowReviewForm(true);
      onStatusUpdate?.('completed');
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleSubmitReview = async () => {
    try {
      // Submit review and rating
      console.log('Review submitted:', { rating, review });
      setShowReviewForm(false);
      onStatusUpdate?.('reviewed');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_progress': return 'text-warning';
      case 'completed': return 'text-success';
      case 'paused': return 'text-muted-foreground';
      case 'cancelled': return 'text-destructive';
      default: return 'text-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_progress': return 'Play';
      case 'completed': return 'CheckCircle';
      case 'paused': return 'Pause';
      case 'cancelled': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Task Execution</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${getStatusColor(executionData.status)}`}>
            <Icon name={getStatusIcon(executionData.status)} size={16} />
            <span className="text-sm font-medium capitalize">{executionData.status.replace('_', ' ')}</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {executionData.progress}%
            </div>
            <div className="text-sm text-muted-foreground">Complete</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${executionData.progress}%` }}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              {executionData.timeSpent}h
            </div>
            <div className="text-sm text-muted-foreground">Time Spent</div>
            {executionData.estimatedTimeRemaining && (
              <div className="text-xs text-muted-foreground mt-1">
                ~{executionData.estimatedTimeRemaining}h remaining
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {executionData.milestoneProgress.filter(m => m.status === 'completed').length}
            </div>
            <div className="text-sm text-muted-foreground">
              of {executionData.milestoneProgress.length} Milestones
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChat(!showChat)}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Chat ({executionData.communications.length})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEmergencyAlert}
              iconName="AlertTriangle"
              iconPosition="left"
            >
              Emergency
            </Button>
          </div>
          {executionData.status === 'in_progress' && executionData.progress >= 100 && (
            <Button
              variant="default"
              onClick={handleCompleteTask}
              iconName="Check"
              iconPosition="left"
            >
              Mark Complete
            </Button>
          )}
        </div>
      </div>

      {/* Milestone Progress */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Milestone Progress</h4>
        <div className="space-y-4">
          {executionData.milestoneProgress.map((milestone, index) => (
            <div key={milestone.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  milestone.status === 'completed' 
                    ? 'bg-success text-white'
                    : milestone.status === 'in_progress'
                    ? 'bg-warning text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {milestone.status === 'completed' ? (
                    <Icon name="Check" size={14} color="white" />
                  ) : milestone.status === 'in_progress' ? (
                    <Icon name="Play" size={14} color="white" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-medium text-foreground">{milestone.title}</h5>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    milestone.status === 'completed' 
                      ? 'bg-success/10 text-success'
                      : milestone.status === 'in_progress'
                      ? 'bg-warning/10 text-warning'
                      : 'bg-muted/50 text-muted-foreground'
                  }`}>
                    {milestone.status.replace('_', ' ')}
                  </span>
                </div>
                
                {milestone.status === 'in_progress' && milestone.progress !== undefined && (
                  <div className="mb-2">
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-warning h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {milestone.progress}% complete
                    </div>
                  </div>
                )}

                {milestone.completedAt && (
                  <div className="text-xs text-muted-foreground mb-2">
                    Completed: {new Date(milestone.completedAt).toLocaleString()}
                  </div>
                )}

                {milestone.estimatedStart && milestone.status === 'pending' && (
                  <div className="text-xs text-muted-foreground mb-2">
                    Estimated start: {new Date(milestone.estimatedStart).toLocaleString()}
                  </div>
                )}

                {milestone.evidence && milestone.evidence.length > 0 && (
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Paperclip" size={12} />
                    <span>{milestone.evidence.length} file(s) attached</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Communication Panel */}
      {showChat && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-medium text-foreground mb-4">Communication</h4>
          <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
            {executionData.communications.map((comm) => (
              <div key={comm.id} className={`flex ${comm.sender === 'seeker' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  comm.sender === 'seeker' 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-foreground'
                }`}>
                  <p className="text-sm">{comm.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${
                      comm.sender === 'seeker' ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {new Date(comm.timestamp).toLocaleTimeString()}
                    </span>
                    {comm.attachments && comm.attachments.length > 0 && (
                      <Icon name="Paperclip" size={12} color={comm.sender === 'seeker' ? 'white' : 'var(--color-muted-foreground)'} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              iconName="Send"
              size="sm"
            />
          </div>
        </div>
      )}

      {/* Deliverables */}
      {executionData.deliverables.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-medium text-foreground mb-4">Deliverables</h4>
          <div className="space-y-3">
            {executionData.deliverables.map((deliverable) => (
              <div key={deliverable.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="FileText" size={14} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{deliverable.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {deliverable.files.length} file(s) • {new Date(deliverable.uploadedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Helper Location (if available) */}
      {executionData.location && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">Helper Location</h4>
            <span className="text-xs text-muted-foreground">
              Last updated: {new Date(executionData.location.lastUpdated).toLocaleTimeString()}
            </span>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <Icon name="MapPin" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
            <p className="text-sm text-foreground font-medium">Helper is on-site</p>
            <p className="text-xs text-muted-foreground">
              Location tracking active for your security
            </p>
          </div>
        </div>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-foreground mb-4">Rate Your Experience</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Rating
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-2xl transition-colors duration-200"
                    >
                      <Icon
                        name="Star"
                        size={24}
                        color={star <= rating ? 'var(--color-warning)' : 'var(--color-muted)'}
                        filled={star <= rating}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Review (Optional)
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none"
                  rows={3}
                  placeholder="Share your experience..."
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  Skip
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  disabled={rating === 0}
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskExecution;