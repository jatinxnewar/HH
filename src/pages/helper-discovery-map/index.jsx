// ...existing code...
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MapContainer from './components/MapContainer';
import FilterPanel from './components/FilterPanel';
import HelperCard from './components/HelperCard';
import StatsPanel from './components/StatsPanel';
import EmergencyOverlay from './components/EmergencyOverlay';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HelperDiscoveryMap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [emergencyMode, setEmergencyMode] = useState(location?.state?.emergencyMode || false);
  const [selectedHelper, setSelectedHelper] = useState(null);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [filters, setFilters] = useState({
    skills: [],
    radius: 5,
    minRating: 0,
    availableOnly: false,
    emergencyCertified: emergencyMode
  });

  // Mock helpers data
  const mockHelpers = [
    {
      id: 1,
      name: "Arjun Sharma",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      primarySkill: "Electrician",
      skills: ["Electrician", "Home Repair", "Emergency Fix"],
      rating: 4.8,
      reviewCount: 127,
      isAvailable: true,
      emergencyCertified: true,
      isVerified: true,
      distance: 0.8,
      avgResponseTime: "5min",
      completedTasks: 89,
      location: { lat: 40.7158, lng: -74.0070 },
      recentReview: {
        comment: "Fixed my electrical issue quickly and professionally. Highly recommended!",
        rating: 5,
        date: "2 days ago"
      }
    },
    {
      id: 2,
      name: "Vikram Patel",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      primarySkill: "IT Support",
      skills: ["IT Support", "Computer Repair", "Network Setup"],
      rating: 4.6,
      reviewCount: 93,
      isAvailable: true,
      emergencyCertified: false,
      isVerified: true,
      distance: 1.2,
      avgResponseTime: "8min",
      completedTasks: 156,
      location: { lat: 40.7098, lng: -74.0050 },
      recentReview: {
        comment: "Great help with my laptop setup. Very knowledgeable and patient.",
        rating: 5,
        date: "1 week ago"
      }
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
      primarySkill: "Plumber",
      skills: ["Plumber", "Pipe Repair", "Emergency Plumbing"],
      rating: 4.9,
      reviewCount: 201,
      isAvailable: false,
      emergencyCertified: true,
      isVerified: true,
      distance: 2.1,
      avgResponseTime: "12min",
      completedTasks: 234,
      location: { lat: 40.7108, lng: -74.0080 },
      recentReview: {
        comment: "Excellent plumber! Fixed our emergency leak at midnight. True professional.",
        rating: 5,
        date: "3 days ago"
      }
    },
    {
      id: 4,
      name: "Priya Reddy",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
      primarySkill: "Tutor",
      skills: ["Math Tutor", "Physics", "Test Prep"],
      rating: 4.7,
      reviewCount: 78,
      isAvailable: true,
      emergencyCertified: false,
      isVerified: true,
      distance: 1.5,
      avgResponseTime: "15min",
      completedTasks: 67,
      location: { lat: 40.7138, lng: -74.0040 },
      recentReview: {
        comment: "Helped my daughter with calculus. Very patient and effective teacher.",
        rating: 5,
        date: "5 days ago"
      }
    },
    {
      id: 5,
      name: "Ravi Singh",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
      primarySkill: "Carpenter",
      skills: ["Carpenter", "Furniture Assembly", "Home Repair"],
      rating: 4.5,
      reviewCount: 112,
      isAvailable: true,
      emergencyCertified: true,
      isVerified: true,
      distance: 3.2,
      avgResponseTime: "20min",
      completedTasks: 145,
      location: { lat: 40.7088, lng: -74.0100 },
      recentReview: {
        comment: "Built custom shelves exactly as requested. Quality workmanship!",
        rating: 4,
        date: "1 week ago"
      }
    },
    {
      id: 6,
      name: "Kavya Nair",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg",
      primarySkill: "Cleaner",
      skills: ["House Cleaning", "Deep Cleaning", "Move-in Cleaning"],
      rating: 4.8,
      reviewCount: 189,
      isAvailable: true,
      emergencyCertified: false,
      isVerified: true,
      distance: 2.8,
      avgResponseTime: "25min",
      completedTasks: 278,
      location: { lat: 40.7148, lng: -74.0030 },
      recentReview: {
        comment: "Thorough cleaning service. House looks amazing! Will book again.",
        rating: 5,
        date: "4 days ago"
      }
    }
  ];

  const [filteredHelpers, setFilteredHelpers] = useState(mockHelpers);

  useEffect(() => {
    // Get user location (mock implementation)
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
        },
        () => {
          // Use default location if geolocation fails
          console.log('Using default location');
        }
      );
    }
  }, []);

  useEffect(() => {
    // Filter helpers based on current filters
    let filtered = mockHelpers?.filter(helper => {
      // Distance filter
      if (helper?.distance > filters?.radius) return false;
      
      // Skills filter
      if (filters?.skills?.length > 0) {
        const hasMatchingSkill = filters?.skills?.some(skill => 
          helper?.skills?.some(helperSkill => 
            helperSkill?.toLowerCase()?.includes(skill?.toLowerCase())
          )
        );
        if (!hasMatchingSkill) return false;
      }
      
      // Rating filter
      if (helper?.rating < filters?.minRating) return false;
      
      // Availability filter
      if (filters?.availableOnly && !helper?.isAvailable) return false;
      
      // Emergency certified filter
      if (filters?.emergencyCertified && !helper?.emergencyCertified) return false;
      
      return true;
    });

    // Sort by distance and availability
    filtered?.sort((a, b) => {
      if (a?.isAvailable && !b?.isAvailable) return -1;
      if (!a?.isAvailable && b?.isAvailable) return 1;
      return a?.distance - b?.distance;
    });

    setFilteredHelpers(filtered);
  }, [filters]);

  const handleHelperSelect = (helper) => {
    setSelectedHelper(helper);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleEmergencyToggle = () => {
    setEmergencyMode(!emergencyMode);
    if (!emergencyMode) {
      setFilters(prev => ({ ...prev, emergencyCertified: true, availableOnly: true }));
    }
  };

  const emergencyHelpers = mockHelpers?.filter(h => h?.emergencyCertified && h?.isAvailable);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        emergencyActive={emergencyMode}
        notificationCount={3}
        userRole="seeker"
      />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Filter Panel */}
        <div className="flex-shrink-0">
          <FilterPanel
            isCollapsed={isFilterCollapsed}
            onToggle={() => setIsFilterCollapsed(!isFilterCollapsed)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            emergencyMode={emergencyMode}
          />
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative">
          <MapContainer
            helpers={filteredHelpers}
            selectedHelper={selectedHelper}
            onHelperSelect={handleHelperSelect}
            emergencyMode={emergencyMode}
            userLocation={userLocation}
            filterRadius={filters?.radius}
          />

          {/* Map Controls */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
            <Button
              variant={emergencyMode ? "destructive" : "outline"}
              onClick={handleEmergencyToggle}
              iconName="AlertTriangle"
              iconPosition="left"
              iconSize={16}
              className={emergencyMode ? 'animate-pulse' : ''}
            >
              {emergencyMode ? 'Exit Emergency' : 'Emergency Mode'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/task-posting-dashboard')}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Post New Task
            </Button>
          </div>

          {/* Helper Count Badge */}
          <div className="absolute top-4 right-4 bg-card border border-border rounded-lg px-3 py-2 shadow-elevation-1 z-10">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span className="text-sm font-medium text-foreground">
                {filteredHelpers?.length} helpers found
              </span>
            </div>
          </div>

          {/* Selected Helper Card */}
          {selectedHelper && (
            <div className="absolute bottom-4 left-4 z-10">
              <HelperCard
                helper={selectedHelper}
                onClose={() => setSelectedHelper(null)}
                emergencyMode={emergencyMode}
              />
            </div>
          )}
        </div>

        {/* Stats Panel */}
        <div className="w-80 flex-shrink-0 p-4">
          <StatsPanel
            helpers={filteredHelpers}
            selectedArea={`${filters?.radius}km radius`}
            emergencyMode={emergencyMode}
          />
        </div>
      </div>
      {/* Emergency Overlay */}
      <EmergencyOverlay
        isActive={emergencyMode}
        onDeactivate={() => setEmergencyMode(false)}
        emergencyHelpers={emergencyHelpers}
      />
      {/* Mobile Bottom Sheet for Helper Details */}
      {selectedHelper && (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-20 bg-card border-t border-border rounded-t-lg p-4 transform transition-transform duration-300">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4"></div>
          <HelperCard
            helper={selectedHelper}
            onClose={() => setSelectedHelper(null)}
            emergencyMode={emergencyMode}
          />
        </div>
      )}
    </div>
  );
};

export default HelperDiscoveryMap;