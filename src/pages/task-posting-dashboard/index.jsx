import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TaskDescriptionForm from './components/TaskDescriptionForm';
import CategorySelector from './components/CategorySelector';
import LocationSelector from './components/LocationSelector';
import BudgetSelector from './components/BudgetSelector';
import UrgencySelector from './components/UrgencySelector';
import HelperAvailability from './components/HelperAvailability';
import EmergencySOSButton from './components/EmergencySOSButton';
import DonationPledge from './components/DonationPledge';
import SmartContractSettings from './components/SmartContractSettings';
import BiddingPreferences from './components/BiddingPreferences';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { smartContractService } from '../../services/smartContract';
import { biddingService } from '../../services/biddingService';

const TaskPostingDashboard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    category: '',
    location: null,
    budget: { min: 0, max: 0 },
    urgency: 'standard',
    images: [],
    anonymity: false,
    blindBidding: false,
    emergencyMode: false,
    donation: { enabled: false, percentage: 0, cause: '' },
    milestones: []
  });

  const [smartContractSettings, setSmartContractSettings] = useState({
    escrowEnabled: true,
    milestonePayments: true,
    disputeResolution: false,
    autoRelease: true,
    autoReleaseHours: 24,
    insuranceCoverage: 0
  });

  const [biddingPreferences, setBiddingPreferences] = useState({
    biddingType: 'blind',
    maxBids: 10,
    biddingDuration: 24,
    autoAccept: false,
    helperFilters: ['verified_only'],
    notifyNewBids: true,
    notifyDeadline: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dynamicPricing, setDynamicPricing] = useState(null);
  const [availableHelpers, setAvailableHelpers] = useState([]);

  const steps = [
    { id: 1, title: 'Task Details', icon: 'FileText' },
    { id: 2, title: 'Category & Location', icon: 'MapPin' },
    { id: 3, title: 'Budget & Urgency', icon: 'DollarSign' },
    { id: 4, title: 'Settings & Review', icon: 'Settings' }
  ];

  useEffect(() => {
    if (taskData.category && taskData.urgency && taskData.budget.max > 0) {
      updateDynamicPricing();
    }
  }, [taskData.category, taskData.urgency, taskData.budget]);

  const updateDynamicPricing = async () => {
    try {
      const pricing = await biddingService.applyDynamicPricing(taskData);
      setDynamicPricing(pricing);
    } catch (error) {
      console.error('Error calculating dynamic pricing:', error);
    }
  };

  const handleTaskDataChange = (field, value) => {
    setTaskData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (image) => {
    setTaskData(prev => ({
      ...prev,
      images: [...prev.images, image]
    }));
  };

  const handleImageRemove = (imageId) => {
    setTaskData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const handleEmergencyActivation = () => {
    setTaskData(prev => ({
      ...prev,
      emergencyMode: true,
      urgency: 'emergency',
      blindBidding: false // Emergency mode uses instant matching
    }));
    setCurrentStep(4); // Skip to final step for emergency
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return taskData.title && taskData.description;
      case 2:
        return taskData.category && taskData.location;
      case 3:
        return taskData.budget.min > 0 && taskData.budget.max > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmitTask = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      // Create enhanced task data with all settings
      const enhancedTaskData = {
        ...taskData,
        id: `task_${Date.now()}`,
        createdAt: Date.now(),
        status: 'posted',
        dynamicPricing: dynamicPricing,
        smartContract: smartContractSettings,
        bidding: biddingPreferences
      };

      // Set up smart contract escrow if enabled
      if (smartContractSettings.escrowEnabled) {
        const escrowContract = await smartContractService.createEscrowContract({
          taskId: enhancedTaskData.id,
          amount: enhancedTaskData.budget.max,
          milestonePayments: smartContractSettings.milestonePayments,
          autoReleaseHours: smartContractSettings.autoReleaseHours,
          insuranceCoverage: smartContractSettings.insuranceCoverage
        });
        enhancedTaskData.escrowContractId = escrowContract.contractId;
      }

      // Initialize bidding system
      const biddingSystem = await biddingService.initializeBidding({
        taskId: enhancedTaskData.id,
        biddingType: biddingPreferences.biddingType,
        maxBids: biddingPreferences.maxBids,
        duration: biddingPreferences.biddingDuration,
        autoAccept: biddingPreferences.autoAccept,
        helperFilters: biddingPreferences.helperFilters
      });
      enhancedTaskData.biddingSystemId = biddingSystem.systemId;

      // Handle donation if enabled
      if (taskData.donation.enabled) {
        const donationAmount = Math.round((taskData.budget.max * taskData.donation.percentage) / 100);
        const donationContract = await smartContractService.setupDonationEscrow({
          taskId: enhancedTaskData.id,
          amount: donationAmount,
          cause: taskData.donation.cause
        });
        enhancedTaskData.donationContractId = donationContract.contractId;
      }

      if (taskData.emergencyMode) {
        // Trigger emergency SOS system
        const sosResult = await biddingService.triggerSOSNotification(enhancedTaskData);
        console.log('Emergency SOS activated:', sosResult);
        
        // Navigate to emergency center for real-time tracking
        navigate('/emergency-sos-center', { 
          state: { 
            taskId: enhancedTaskData.id,
            emergencyId: sosResult.emergencyId,
            escrowContractId: enhancedTaskData.escrowContractId
          }
        });
      } else {
        // Regular task posting flow
        console.log('Task posted with full blockchain integration:', enhancedTaskData);
        
        // Navigate to task management hub to track bids and progress
        navigate('/task-management-hub', {
          state: {
            newTaskId: enhancedTaskData.id,
            blindBidding: taskData.blindBidding
          }
        });
      }
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('Error posting task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TaskDescriptionForm
            title={taskData.title}
            description={taskData.description}
            onTitleChange={(value) => handleTaskDataChange('title', value)}
            onDescriptionChange={(value) => handleTaskDataChange('description', value)}
            images={taskData.images}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
          />
        );
      case 2:
        return (
          <div className="space-y-8">
            <CategorySelector
              selectedCategory={taskData.category}
              onCategorySelect={(value) => handleTaskDataChange('category', value)}
            />
            <LocationSelector
              selectedLocation={taskData.location}
              onLocationSelect={(value) => handleTaskDataChange('location', value)}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <BudgetSelector
              selectedCategory={taskData.category}
              selectedUrgency={taskData.urgency}
              budget={taskData.budget}
              onBudgetChange={(value) => handleTaskDataChange('budget', value)}
            />
            <UrgencySelector
              selectedUrgency={taskData.urgency}
              onUrgencySelect={(value) => handleTaskDataChange('urgency', value)}
            />
            {dynamicPricing && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
                  <h3 className="font-medium text-foreground">Dynamic Pricing Active</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Original Range</p>
                    <p className="text-lg font-semibold text-foreground">
                      ${dynamicPricing.originalAmount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Adjusted Range</p>
                    <p className="text-lg font-semibold text-primary">
                      ${dynamicPricing.adjustedAmount}
                    </p>
                  </div>
                </div>
                {dynamicPricing.factors.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-foreground mb-2">Pricing Factors:</p>
                    <div className="space-y-1">
                      {dynamicPricing.factors.map((factor, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{factor.description}</span>
                          <span className="text-foreground">+{((factor.multiplier - 1) * 100).toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <SmartContractSettings
              settings={smartContractSettings}
              onSettingsChange={setSmartContractSettings}
              taskData={taskData}
            />
            <BiddingPreferences
              preferences={biddingPreferences}
              onPreferencesChange={setBiddingPreferences}
              taskData={taskData}
            />
            <DonationPledge
              donation={taskData.donation}
              onDonationChange={(value) => handleTaskDataChange('donation', value)}
              taskBudget={taskData.budget.max}
            />
            <HelperAvailability
              selectedCategory={taskData.category}
              selectedLocation={taskData.location}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        emergencyActive={false}
        notificationCount={0}
        userRole="seeker"
      />
      
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Post a Task</h1>
            <p className="text-muted-foreground">
              Get help from certified helpers in your area
            </p>
          </div>
          {taskData.emergencyMode && (
            <div className="flex items-center space-x-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
              <Icon name="AlertTriangle" size={16} />
              <span className="font-medium">Emergency Mode Active</span>
            </div>
          )}
        </div>

        {/* Step Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  currentStep >= step.id 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-border text-muted-foreground'
                }`}>
                  {currentStep > step.id ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Assistance Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <EmergencySOSButton onActivate={handleEmergencyActivation} isCollapsed={true} />
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {steps.length}
              </span>
            </div>

            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmitTask}
                disabled={!validateStep(4) || isSubmitting}
                loading={isSubmitting}
                iconName={taskData.emergencyMode ? "AlertTriangle" : "Send"}
                iconPosition="left"
                variant={taskData.emergencyMode ? "destructive" : "default"}
              >
                {isSubmitting 
                  ? 'Posting...' 
                  : taskData.emergencyMode 
                    ? 'Activate Emergency SOS' 
                    : 'Post Task'
                }
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPostingDashboard;

