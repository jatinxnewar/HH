import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, helper } = location.state || {};
  
  const [timeToArrival, setTimeToArrival] = useState('');
  const [helperStatus, setHelperStatus] = useState('confirmed'); // confirmed, on_way, arrived
  const [showContactOptions, setShowContactOptions] = useState(false);

  useEffect(() => {
    if (!booking || !helper) {
      navigate('/');
      return;
    }

    // Calculate time to arrival
    const updateTimeToArrival = () => {
      const arrivalTime = new Date(booking.estimatedArrival);
      const now = new Date();
      const timeDiff = arrivalTime.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        setTimeToArrival('Arrived');
        setHelperStatus('arrived');
      } else {
        const minutes = Math.floor(timeDiff / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
          setTimeToArrival(`${hours}h ${minutes % 60}m`);
        } else {
          setTimeToArrival(`${minutes}m`);
        }
        
        // Simulate helper status updates
        if (minutes <= 10) {
          setHelperStatus('on_way');
        }
      }
    };

    updateTimeToArrival();
    const interval = setInterval(updateTimeToArrival, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [booking, helper, navigate]);

  const handleContactHelper = (method) => {
    if (method === 'chat') {
      navigate(`/chat/${helper.id}`, { state: { helper, booking } });
    } else if (method === 'call') {
      // In a real app, this would initiate a call
      alert(`Calling ${helper.name}...`);
    }
  };

  const handleEmergencyContact = () => {
    navigate('/emergency-sos-center', { state: { booking, helper } });
  };

  if (!booking || !helper) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertTriangle" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Booking not found</h2>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (helperStatus) {
      case 'confirmed':
        return { name: 'Check', color: '#10B981' };
      case 'on_way':
        return { name: 'MapPin', color: '#F59E0B' };
      case 'arrived':
        return { name: 'CheckCircle', color: '#10B981' };
      default:
        return { name: 'Clock', color: '#6B7280' };
    }
  };

  const getStatusMessage = () => {
    switch (helperStatus) {
      case 'confirmed':
        return `${helper.name} has confirmed your booking and will arrive in ${timeToArrival}`;
      case 'on_way':
        return `${helper.name} is on the way and will arrive in ${timeToArrival}`;
      case 'arrived':
        return `${helper.name} has arrived at your location`;
      default:
        return 'Confirming booking...';
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Check" size={40} color="#10B981" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Your helper is on the way</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon 
                    name={getStatusIcon().name} 
                    size={24} 
                    color={getStatusIcon().color} 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {helperStatus === 'arrived' ? 'Helper Arrived!' : 'Tracking Your Helper'}
                  </h3>
                  <p className="text-muted-foreground">{getStatusMessage()}</p>
                </div>
                {timeToArrival && helperStatus !== 'arrived' && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{timeToArrival}</div>
                    <div className="text-sm text-muted-foreground">estimated</div>
                  </div>
                )}
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-foreground">Confirmed</span>
                </div>
                <div className="flex-1 h-0.5 mx-4 bg-border"></div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    helperStatus === 'on_way' || helperStatus === 'arrived' 
                      ? 'bg-green-500' : 'bg-border'
                  }`}></div>
                  <span className={`text-sm ${
                    helperStatus === 'on_way' || helperStatus === 'arrived'
                      ? 'text-foreground' : 'text-muted-foreground'
                  }`}>On the way</span>
                </div>
                <div className="flex-1 h-0.5 mx-4 bg-border"></div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    helperStatus === 'arrived' ? 'bg-green-500' : 'bg-border'
                  }`}></div>
                  <span className={`text-sm ${
                    helperStatus === 'arrived' ? 'text-foreground' : 'text-muted-foreground'
                  }`}>Arrived</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowContactOptions(!showContactOptions)}
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="flex-1"
                >
                  Contact Helper
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleEmergencyContact}
                  iconName="AlertTriangle"
                  iconPosition="left"
                >
                  Emergency
                </Button>
              </div>

              {/* Contact Options */}
              {showContactOptions && (
                <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => handleContactHelper('chat')}
                      iconName="MessageCircle"
                      iconPosition="left"
                    >
                      Chat
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleContactHelper('call')}
                      iconName="Phone"
                      iconPosition="left"
                    >
                      Call
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Service Details */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Service Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="text-foreground">{booking.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date & Time:</span>
                  <span className="text-foreground">
                    {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="text-foreground">{booking.duration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground">{booking.address}</span>
                </div>
                {booking.description && (
                  <div>
                    <span className="text-muted-foreground block mb-1">Description:</span>
                    <p className="text-foreground text-sm">{booking.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Helper Info Sidebar */}
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

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Experience:</span>
                  <span className="text-foreground">{helper.experience}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed Jobs:</span>
                  <span className="text-foreground">{helper.completedJobs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Languages:</span>
                  <span className="text-foreground">{helper.languages.join(', ')}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-foreground">Total Cost:</span>
                  <span className="text-xl font-bold text-primary">${booking.budget}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Shield" size={14} color="#10B981" />
                    <span>Payment protected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} color="#6B7280" />
                    <span>Charged after completion</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/task-management-hub')}
                  className="w-full"
                >
                  View All Bookings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;