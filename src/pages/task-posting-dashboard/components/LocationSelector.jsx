import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const LocationSelector = ({ selectedLocation, onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock location suggestions
  const locationSuggestions = [
    {
      id: 1,
      address: "123 Main Street, Downtown",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      lat: 40.7589,
      lng: -73.9851,
      type: "home"
    },
    {
      id: 2,
      address: "456 Oak Avenue, Midtown",
      city: "New York", 
      state: "NY",
      zipCode: "10018",
      lat: 40.7505,
      lng: -73.9934,
      type: "work"
    },
    {
      id: 3,
      address: "789 Pine Road, Upper East Side",
      city: "New York",
      state: "NY", 
      zipCode: "10075",
      lat: 40.7736,
      lng: -73.9566,
      type: "other"
    }
  ];

  const filteredSuggestions = locationSuggestions?.filter(location =>
    location?.address?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    location?.city?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleLocationSelect = (location) => {
    onLocationSelect(location);
    setSearchQuery(location?.address);
    setShowSuggestions(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const mockCurrentLocation = {
            id: 'current',
            address: "Current Location",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude,
            type: "current"
          };
          handleLocationSelect(mockCurrentLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to mock location
          handleLocationSelect(locationSuggestions?.[0]);
        }
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="MapPin" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-semibold text-foreground">Task Location</h3>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Input
            label="Search Address"
            type="text"
            placeholder="Enter address or landmark"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e?.target?.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />

          {showSuggestions && filteredSuggestions?.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevation-2 z-10 max-h-60 overflow-y-auto">
              {filteredSuggestions?.map((location) => (
                <button
                  key={location?.id}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors duration-200 border-b border-border last:border-b-0"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-primary/10 rounded">
                      <Icon 
                        name={location?.type === 'home' ? 'Home' : location?.type === 'work' ? 'Building' : 'MapPin'} 
                        size={14} 
                        color="var(--color-primary)" 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{location?.address}</p>
                      <p className="text-xs text-muted-foreground">
                        {location?.city}, {location?.state} {location?.zipCode}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={getCurrentLocation}
          className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-200 animate-press"
        >
          <Icon name="Navigation" size={16} />
          <span className="text-sm font-medium">Use Current Location</span>
        </button>

        {selectedLocation && (
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Icon name="MapPin" size={16} color="var(--color-success)" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{selectedLocation?.address}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedLocation?.city}, {selectedLocation?.state} {selectedLocation?.zipCode}
                </p>
              </div>
            </div>

            <div className="mt-4 h-48 bg-muted rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Task Location"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${selectedLocation?.lat},${selectedLocation?.lng}&z=15&output=embed`}
                className="border-0"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;