import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import EmergencyActivationPanel from './components/EmergencyActivationPanel';
import SituationAssessment from './components/SituationAssessment';
import EmergencyHelperResponse from './components/EmergencyHelperResponse';
import EmergencyMapView from './components/EmergencyMapView';
import EmergencyContacts from './components/EmergencyContacts';
import EmergencyProtocol from './components/EmergencyProtocol';
import Icon from '../../components/AppIcon';

const EmergencySOSCenter = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [selectedSituation, setSelectedSituation] = useState(null);
  const [selectedHelper, setSelectedHelper] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [emergencyStartTime, setEmergencyStartTime] = useState(null);

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
        },
        (error) => {
          console.error('Location access denied:', error);
          // Use default location (New York City)
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    } else {
      // Use default location if geolocation not supported
      setUserLocation({ lat: 40.7128, lng: -74.0060 });
    }
  }, []);

  const handleEmergencyActivate = () => {
    setIsEmergencyActive(true);
    setEmergencyStartTime(new Date());
    
    // Auto-notify emergency contacts
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Emergency SOS Activated', {
        body: 'Your emergency request has been broadcast to nearby helpers.',
        icon: '/favicon.ico'
      });
    }
  };

  const handleEmergencyDeactivate = () => {
    setIsEmergencyActive(false);
    setSelectedSituation(null);
    setSelectedHelper(null);
    setEmergencyStartTime(null);
  };

  const handleSituationSelect = (situation) => {
    setSelectedSituation(situation);
  };

  const formatEmergencyDuration = () => {
    if (!emergencyStartTime) return '';
    
    const now = new Date();
    const diff = Math.floor((now - emergencyStartTime) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        emergencyActive={isEmergencyActive} 
        notificationCount={isEmergencyActive ? 3 : 0}
        userRole="seeker"
      />
      
      <main className="container mx-auto px-6 py-8">
        {/* Emergency Status Bar */}
        {isEmergencyActive && (
          <div className="mb-6 p-4 bg-error/10 border-2 border-error/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-error rounded-full animate-pulse"></div>
                <div>
                  <h2 className="text-lg font-semibold text-error">Emergency Active</h2>
                  <p className="text-sm text-muted-foreground">
                    Duration: {formatEmergencyDuration()} • Broadcasting to nearby helpers
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Radio" size={16} color="var(--color-error)" />
                <span className="text-sm font-medium text-error">Live</span>
              </div>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} color="var(--color-error)" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Emergency SOS Center</h1>
              <p className="text-muted-foreground">
                Critical situation management and emergency response coordination
              </p>
            </div>
          </div>

          {!isEmergencyActive && (
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} color="var(--color-primary)" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Emergency Response System</h3>
                  <p className="text-sm text-muted-foreground">
                    This system connects you with verified emergency responders in your area. 
                    For life-threatening emergencies, always call 911 first.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Emergency Activation & Assessment */}
          <div className="lg:col-span-1 space-y-6">
            <EmergencyActivationPanel
              onEmergencyActivate={handleEmergencyActivate}
              onDeactivate={handleEmergencyDeactivate}
              isActive={isEmergencyActive}
            />
            
            <SituationAssessment
              onSituationSelect={handleSituationSelect}
              selectedSituation={selectedSituation}
              isEmergencyActive={isEmergencyActive}
            />
          </div>

          {/* Middle Column - Helper Response & Map */}
          <div className="lg:col-span-1 space-y-6">
            <EmergencyHelperResponse
              isEmergencyActive={isEmergencyActive}
              selectedSituation={selectedSituation}
              selectedHelper={selectedHelper}
            />
            
            <EmergencyMapView
              isEmergencyActive={isEmergencyActive}
              selectedHelper={selectedHelper}
              userLocation={userLocation}
            />
          </div>

          {/* Right Column - Contacts & Protocol */}
          <div className="lg:col-span-1 space-y-6">
            <EmergencyContacts
              isEmergencyActive={isEmergencyActive}
            />
            
            <EmergencyProtocol
              selectedSituation={selectedSituation}
              isEmergencyActive={isEmergencyActive}
            />
          </div>
        </div>

        {/* Emergency Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="Shield" size={20} color="var(--color-success)" />
              <span className="text-sm font-medium text-muted-foreground">
                Secured by blockchain technology
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              All emergency interactions are logged on the blockchain for accountability and safety. 
              Your privacy is protected while ensuring community trust and response verification.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmergencySOSCenter;