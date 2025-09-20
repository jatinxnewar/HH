import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MapContainer = ({ 
  helpers, 
  selectedHelper, 
  onHelperSelect, 
  emergencyMode, 
  userLocation,
  filterRadius 
}) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [zoomLevel, setZoomLevel] = useState(13);

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  const handleMarkerClick = (helper) => {
    onHelperSelect(helper);
  };

  const getMarkerColor = (helper) => {
    if (emergencyMode && helper?.emergencyCertified) return '#EF4444';
    if (helper?.isAvailable) return '#10B981';
    return '#6B7280';
  };

  const getSkillIcon = (primarySkill) => {
    const skillIcons = {
      'Electrician': 'Zap',
      'Plumber': 'Wrench',
      'IT Support': 'Monitor',
      'Carpenter': 'Hammer',
      'Tutor': 'BookOpen',
      'Cleaner': 'Sparkles',
      'Mechanic': 'Settings',
      'Gardener': 'Leaf'
    };
    return skillIcons?.[primarySkill] || 'User';
  };

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Helper Discovery Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
        className="absolute inset-0"
      />
      {/* Map Overlay Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <button
          onClick={() => setZoomLevel(prev => Math.min(prev + 1, 18))}
          className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200"
        >
          <Icon name="Plus" size={16} />
        </button>
        <button
          onClick={() => setZoomLevel(prev => Math.max(prev - 1, 8))}
          className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200"
        >
          <Icon name="Minus" size={16} />
        </button>
        <button
          onClick={() => userLocation && setMapCenter(userLocation)}
          className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200"
        >
          <Icon name="Navigation" size={16} />
        </button>
      </div>
      {/* Emergency Mode Overlay */}
      {emergencyMode && (
        <div className="absolute top-4 left-4 bg-error text-error-foreground px-4 py-2 rounded-lg shadow-elevation-2 z-10 animate-pulse">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm font-medium">Emergency Mode Active</span>
          </div>
        </div>
      )}
      {/* Helper Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {helpers?.map((helper) => (
          <div
            key={helper?.id}
            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + (helper?.location?.lng - mapCenter?.lng) * 1000}%`,
              top: `${50 + (mapCenter?.lat - helper?.location?.lat) * 1000}%`
            }}
            onClick={() => handleMarkerClick(helper)}
          >
            <div className={`relative w-10 h-10 rounded-full border-2 border-white shadow-elevation-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              selectedHelper?.id === helper?.id ? 'ring-2 ring-primary' : ''
            }`}
            style={{ backgroundColor: getMarkerColor(helper) }}
            >
              <Icon 
                name={getSkillIcon(helper?.primarySkill)} 
                size={16} 
                color="white" 
              />
              {helper?.isAvailable && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border border-white"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-elevation-1 z-10">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
            <span className="text-xs text-muted-foreground">Busy</span>
          </div>
          {emergencyMode && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-xs text-muted-foreground">Emergency Certified</span>
            </div>
          )}
        </div>
      </div>
      {/* Distance Radius Indicator */}
      <div className="absolute bottom-4 right-4 bg-card border border-border rounded-lg px-3 py-2 shadow-elevation-1 z-10">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={14} />
          <span className="text-xs text-muted-foreground">
            {filterRadius}km radius
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;