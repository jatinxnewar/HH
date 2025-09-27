import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const HelperBookingPage = () => {
  const { helperId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const isInstantBooking = location.state?.instantBooking || false;
  const instantRate = location.state?.rate || 0;
  
  const helper = location.state?.helper || {
    id: helperId,
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 25,
    skills: ['House Cleaning', 'Deep Cleaning', 'Organization'],
    location: 'San Francisco, CA',
    verified: true,
    available: true,
    responseTime: '~15 min',
    completedJobs: 89,
    experience: '3+ years',
    description: 'Professional cleaner with attention to detail. Eco-friendly products available.',
    languages: ['English', 'Spanish'],
    backgroundCheck: true
  };

  const [bookingData, setBookingData] = useState({
    serviceType: '',
    date: isInstantBooking ? new Date().toISOString().split('T')[0] : '',
    time: isInstantBooking ? new Date(Date.now() + 30 * 60000).toTimeString().slice(0, 5) : '',
    duration: 2,
    description: '',
    address: '',
    specialInstructions: '',
    contactMethod: 'app',
    emergencyContact: '',
    budget: isInstantBooking ? instantRate * 2 : helper.hourlyRate * 2,
    isInstant: isInstantBooking
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    const rate = isInstantBooking ? instantRate : helper.hourlyRate;
    setBookingData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'duration' ? { budget: rate * value } : {})
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!bookingData.serviceType) newErrors.serviceType = 'Service type is required';
      if (!bookingData.date) newErrors.date = 'Date is required';
      if (!bookingData.time) newErrors.time = 'Time is required';
      if (!bookingData.description) newErrors.description = 'Description is required';
    }
    
    if (step === 2) {
      if (!bookingData.address) newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: location.pathname } });
      return;
    }

    if (!validateStep(2)) return;

    setIsBooking(true);
    
    // Simulate booking API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const booking = {
        id: `booking_${Date.now()}`,
        helperId: helper.id,
        helperName: helper.name,
        userId: user.id,
        ...bookingData,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        estimatedArrival: calculateArrivalTime()
      };
      
      // Navigate to confirmation page
      navigate('/booking/confirmation', { 
        state: { 
          booking, 
          helper 
        } 
      });
    } catch (error) {
      console.error('Booking error:', error);
      setErrors({ general: 'Failed to book helper. Please try again.' });
    } finally {
      setIsBooking(false);
    }
  };

  const calculateArrivalTime = () => {
    const bookingDateTime = new Date(`${bookingData.date}T${bookingData.time}`);
    const now = new Date();
    
    if (bookingDateTime <= now) {
      // If booking is for now or past, helper arrives in 15-30 minutes
      const arrivalTime = new Date(now.getTime() + (15 + Math.random() * 15) * 60000);
      return arrivalTime.toISOString();
    }
    
    return bookingDateTime.toISOString();
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!helper) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertTriangle" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Helper not found</h2>
          <Button onClick={() => navigate('/helper-search')}>Find Helpers</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <Icon name="ChevronLeft" size={20} />
            <span>Back to search</span>
          </button>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">Book {helper.name}</h1>
            {isInstantBooking && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                Instant Booking
              </span>
            )}
          </div>
          <p className="text-muted-foreground">
            {isInstantBooking 
              ? 'Complete your instant booking - helper will be notified immediately!' 
              : 'Complete your booking details'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border p-6">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8">
                <div className={`flex items-center space-x-2 ${
                  currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 1 ? 'bg-primary text-white' : 'bg-muted'
                  }`}>
                    {currentStep > 1 ? <Icon name="Check" size={16} /> : '1'}
                  </div>
                  <span className="font-medium">Service Details</span>
                </div>
                
                <div className="flex-1 h-0.5 mx-4 bg-border"></div>
                
                <div className={`flex items-center space-x-2 ${
                  currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 2 ? 'bg-primary text-white' : 'bg-muted'
                  }`}>
                    {currentStep > 2 ? <Icon name="Check" size={16} /> : '2'}
                  </div>
                  <span className="font-medium">Location & Review</span>
                </div>
              </div>

              {/* Step 1: Service Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Service Type
                    </label>
                    <select
                      value={bookingData.serviceType}
                      onChange={(e) => handleInputChange('serviceType', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    >
                      <option value="">Select a service</option>
                      {helper.skills.map((skill, index) => (
                        <option key={index} value={skill}>{skill}</option>
                      ))}
                    </select>
                    {errors.serviceType && <p className="text-sm text-destructive mt-1">{errors.serviceType}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Date"
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      error={errors.date}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <Input
                      label="Time"
                      type="time"
                      value={bookingData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      error={errors.time}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Duration: {bookingData.duration} hours
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="0.5"
                      value={bookingData.duration}
                      onChange={(e) => handleInputChange('duration', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>1 hour</span>
                      <span>8 hours</span>
                    </div>
                  </div>

                  <Input
                    label="Task Description"
                    type="textarea"
                    value={bookingData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    error={errors.description}
                    placeholder="Describe what you need help with..."
                    rows={4}
                  />

                  <Button onClick={handleNext} className="w-full">
                    Continue to Location
                  </Button>
                </div>
              )}

              {/* Step 2: Location & Review */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <Input
                    label="Service Address"
                    type="text"
                    value={bookingData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    error={errors.address}
                    placeholder="Enter the address where service is needed"
                  />

                  <Input
                    label="Special Instructions (Optional)"
                    type="textarea"
                    value={bookingData.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    placeholder="Any special instructions or requirements..."
                    rows={3}
                  />

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleInputChange('contactMethod', 'app')}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          bookingData.contactMethod === 'app'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon name="MessageCircle" size={20} className="mx-auto mb-1" />
                        <div className="text-sm font-medium">In-App Chat</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInputChange('contactMethod', 'phone')}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          bookingData.contactMethod === 'phone'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon name="Phone" size={20} className="mx-auto mb-1" />
                        <div className="text-sm font-medium">Phone Call</div>
                      </button>
                    </div>
                  </div>

                  {errors.general && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Icon name="AlertTriangle" size={16} color="var(--color-destructive)" />
                        <span className="text-destructive text-sm">{errors.general}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={handlePrevious} className="flex-1">
                      Previous
                    </Button>
                    <Button 
                      onClick={handleBooking} 
                      loading={isBooking}
                      className={`flex-1 ${isInstantBooking ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                      iconName={isInstantBooking ? "Zap" : "Check"}
                      iconPosition="left"
                    >
                      {isBooking 
                        ? 'Booking...' 
                        : `${isInstantBooking ? 'Book Instantly' : 'Book Now'} - ₹${bookingData.budget}`
                      }
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Helper Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-8">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={helper.avatar}
                  alt={helper.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-foreground">{helper.name}</h3>
                    {helper.verified && (
                      <Icon name="Shield" size={16} color="#10B981" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="Star" size={14} color="#F59E0B" />
                    <span className="text-sm font-medium text-foreground">
                      {helper.rating}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({helper.reviewCount})
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{helper.location}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {isInstantBooking ? 'Instant Rate:' : 'Hourly Rate:'}
                  </span>
                  <span className={`font-semibold ${isInstantBooking ? 'text-orange-600' : 'text-foreground'}`}>
                    ₹{isInstantBooking ? instantRate : helper.hourlyRate}/hr
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="text-foreground">{bookingData.duration} hours</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Response Time:</span>
                  <span className="text-foreground">{helper.responseTime}</span>
                </div>
                
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">Total Cost:</span>
                    <span className="text-xl font-bold text-primary">${bookingData.budget}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Shield" size={16} color="#10B981" />
                    <span className="text-sm font-medium text-foreground">Protected Booking</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your payment is protected. Money is held securely until service is completed.
                  </p>
                </div>
                
                {isInstantBooking && (
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Zap" size={16} color="#EA580C" />
                      <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Instant Service</span>
                    </div>
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      Helper will be notified immediately and can start within 30 minutes!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelperBookingPage;