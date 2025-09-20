import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyMapView = ({ isEmergencyActive, selectedHelper, userLocation }) => {
  const [mapMode, setMapMode] = useState('helpers'); // 'helpers' or 'route'
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(true);

  // Mock coordinates for demonstration
  const mockUserLocation = userLocation || { lat: 40.7128, lng: -74.0060 };
  const mockHelperLocations = [
    { id: 1, lat: 40.7138, lng: -74.0050, name: "Dr. Sarah Chen", status: "responding" },
    { id: 2, lat: 40.7118, lng: -74.0070, name: "Marcus Johnson", status: "en_route" },
    { id: 3, lat: 40.7148, lng: -74.0040, name: "Elena Rodriguez", status: "available" }
  ];

  const generateMapUrl = () => {
    const baseUrl = "https://www.google.com/maps/embed/v1/view";
    const apiKey = "YOUR_API_KEY"; // In real implementation, use environment variable
    const center = `${mockUserLocation?.lat},${mockUserLocation?.lng}`;
    
    // For demo purposes, using a simple embed URL
    return `https://www.google.com/maps?q=${mockUserLocation?.lat},${mockUserLocation?.lng}&z=15&output=embed`;
  };

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          console.log('Location shared:', position?.coords);
          // In real implementation, send location to selected helper
        },
        (error) => {
          console.error('Location sharing failed:', error);
        }
      );
    }
  };

  const handleDirections = () => {
    if (selectedHelper) {
      const directionsUrl = `https://www.google.com/maps/dir/${mockUserLocation?.lat},${mockUserLocation?.lng}/${selectedHelper?.lat || 40.7138},${selectedHelper?.lng || -74.0050}`;
      window.open(directionsUrl, '_blank');
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Map" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Emergency Map</h3>
              <p className="text-sm text-muted-foreground">
                {isEmergencyActive ? 'Live tracking active' : 'Map view'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMapMode('helpers')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                mapMode === 'helpers' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Helpers
            </button>
            <button
              onClick={() => setMapMode('route')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                mapMode === 'route' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
              disabled={!selectedHelper}
            >
              Route
            </button>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-80 bg-muted">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Emergency Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={generateMapUrl()}
          className="border-0"
        />

        {/* Map Overlays */}
        {isEmergencyActive && (
          <>
            {/* User Location Indicator */}
            <div className="absolute top-4 left-4 bg-error text-error-foreground px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Your Location</span>
            </div>

            {/* Helper Count */}
            <div className="absolute top-4 right-4 bg-card border border-border px-3 py-2 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} color="var(--color-primary)" />
                <span className="text-sm font-medium text-foreground">
                  {mockHelperLocations?.length} Nearby
                </span>
              </div>
            </div>

            {/* Selected Helper Info */}
            {selectedHelper && (
              <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg p-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-error/10 rounded-full flex items-center justify-center">
                      <Icon name="Navigation" size={16} color="var(--color-error)" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{selectedHelper?.name}</p>
                      <p className="text-sm text-muted-foreground">En route to your location</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDirections}
                    iconName="ExternalLink"
                    iconPosition="right"
                    iconSize={14}
                  >
                    Directions
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* No Emergency State */}
        {!isEmergencyActive && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-card rounded-lg p-6 text-center max-w-sm mx-4">
              <Icon name="MapPin" size={32} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
              <h4 className="font-medium text-foreground mb-2">Map Inactive</h4>
              <p className="text-sm text-muted-foreground">
                Activate emergency mode to see live helper locations and tracking
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Map Controls */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsTrackingEnabled(!isTrackingEnabled)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isTrackingEnabled
                  ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
              }`}
            >
              <Icon name="Crosshair" size={16} />
              <span>{isTrackingEnabled ? 'Tracking On' : 'Tracking Off'}</span>
            </button>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>Updated 30s ago</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLocationShare}
              disabled={!isEmergencyActive}
              iconName="Share"
              iconPosition="left"
              iconSize={14}
            >
              Share Location
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(generateMapUrl()?.replace('embed', 'view'), '_blank')}
              iconName="ExternalLink"
              iconPosition="left"
              iconSize={14}
            >
              Full Map
            </Button>
          </div>
        </div>
      </div>
      {/* Legend */}
      {isEmergencyActive && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-center space-x-6 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-muted-foreground">Your Location</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Responding Helpers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Selected Helper</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyMapView;