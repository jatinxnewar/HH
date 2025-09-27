import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const HelperSearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    service: searchParams.get('service') || '',
    location: searchParams.get('location') || '',
    priceRange: [0, 200],
    rating: 0,
    availability: 'any',
    experience: 'any',
    verified: false
  });
  const [helpers, setHelpers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Mock helper data with Indian names and instant booking (at least 2 per service)
  const mockHelpers = [
    // House Cleaning (2 profiles)
    {
      id: 1,
      name: 'Priya Sharma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: 200,
      instantRate: 400,
      skills: ['House Cleaning', 'Deep Cleaning', 'Organization'],
      location: 'Mumbai, Maharashtra',
      distance: '0.8 km',
      verified: true,
      available: true,
      instantAvailable: true,
      responseTime: '~15 min',
      completedJobs: 89,
      experience: '3+ years',
      description: 'Professional cleaner with attention to detail. Eco-friendly products available.',
      languages: ['Hindi', 'English', 'Marathi'],
      backgroundCheck: true
    },
    {
      id: 2,
      name: 'Meera Joshi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera',
      rating: 4.7,
      reviewCount: 85,
      hourlyRate: 180,
      instantRate: 360,
      skills: ['House Cleaning', 'Kitchen Cleaning', 'Bathroom Cleaning'],
      location: 'Pune, Maharashtra',
      distance: '1.1 km',
      verified: true,
      available: true,
      instantAvailable: false,
      responseTime: '~20 min',
      completedJobs: 67,
      experience: '2+ years',
      description: 'Experienced house cleaner specializing in kitchen and bathroom deep cleaning.',
      languages: ['Hindi', 'English', 'Marathi'],
      backgroundCheck: true
    },
    // Plumbing (2 profiles)
    {
      id: 3,
      name: 'Rajesh Kumar',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
      rating: 4.8,
      reviewCount: 95,
      hourlyRate: 300,
      instantRate: 600,
      skills: ['Plumbing', 'Electrical', 'General Repairs'],
      location: 'Delhi, India',
      distance: '1.2 km',
      verified: true,
      available: true,
      instantAvailable: false,
      responseTime: '~30 min',
      completedJobs: 156,
      experience: '5+ years',
      description: 'Licensed handyman specializing in home repairs and maintenance.',
      languages: ['Hindi', 'English', 'Punjabi'],
      backgroundCheck: true
    },
    {
      id: 4,
      name: 'Suresh Gupta',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh',
      rating: 4.6,
      reviewCount: 72,
      hourlyRate: 280,
      instantRate: 560,
      skills: ['Plumbing', 'Pipe Repair', 'Water Tank Cleaning'],
      location: 'Gurgaon, Haryana',
      distance: '2.3 km',
      verified: true,
      available: true,
      instantAvailable: true,
      responseTime: '~25 min',
      completedJobs: 134,
      experience: '4+ years',
      description: 'Expert plumber with specialization in modern plumbing systems and repairs.',
      languages: ['Hindi', 'English'],
      backgroundCheck: true
    },
    // Tutoring (2 profiles)
    {
      id: 5,
      name: 'Ananya Iyer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
      rating: 4.9,
      reviewCount: 68,
      hourlyRate: 250,
      instantRate: 500,
      skills: ['Tutoring', 'Math', 'Science', 'English'],
      location: 'Bangalore, Karnataka',
      distance: '2.1 km',
      verified: true,
      available: true,
      instantAvailable: true,
      responseTime: '~10 min',
      completedJobs: 203,
      experience: '4+ years',
      description: 'Certified tutor with Masters in Education. Specializes in high school subjects.',
      languages: ['English', 'Hindi', 'Tamil', 'Kannada'],
      backgroundCheck: true
    },
    {
      id: 6,
      name: 'Ramesh Pandey',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh',
      rating: 4.8,
      reviewCount: 91,
      hourlyRate: 300,
      instantRate: 600,
      skills: ['Tutoring', 'Physics', 'Chemistry', 'Mathematics'],
      location: 'Chennai, Tamil Nadu',
      distance: '1.7 km',
      verified: true,
      available: true,
      instantAvailable: false,
      responseTime: '~15 min',
      completedJobs: 178,
      experience: '6+ years',
      description: 'PhD in Physics, experienced in coaching students for competitive exams.',
      languages: ['English', 'Hindi', 'Tamil'],
      backgroundCheck: true
    },
    // Gardening (2 profiles)
    {
      id: 7,
      name: 'Vikram Singh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
      rating: 4.6,
      reviewCount: 78,
      hourlyRate: 180,
      instantRate: 350,
      skills: ['Gardening', 'Landscaping', 'Plant Care'],
      location: 'Jaipur, Rajasthan',
      distance: '1.5 km',
      verified: true,
      available: true,
      instantAvailable: true,
      responseTime: '~20 min',
      completedJobs: 67,
      experience: '2+ years',
      description: 'Expert gardener with knowledge of Indian climate plants and organic farming.',
      languages: ['Hindi', 'English', 'Rajasthani'],
      backgroundCheck: true
    },
    {
      id: 8,
      name: 'Gopal Verma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gopal',
      rating: 4.7,
      reviewCount: 56,
      hourlyRate: 160,
      instantRate: 320,
      skills: ['Gardening', 'Tree Trimming', 'Lawn Care'],
      location: 'Jodhpur, Rajasthan',
      distance: '2.8 km',
      verified: true,
      available: true,
      instantAvailable: false,
      responseTime: '~35 min',
      completedJobs: 43,
      experience: '3+ years',
      description: 'Landscaping specialist with expertise in desert plants and water-efficient gardens.',
      languages: ['Hindi', 'Rajasthani'],
      backgroundCheck: true
    },
    // Cooking (2 profiles)
    {
      id: 9,
      name: 'Kavitha Reddy',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavitha',
      rating: 4.9,
      reviewCount: 156,
      hourlyRate: 220,
      instantRate: 450,
      skills: ['Cooking', 'Indian Cuisine', 'Meal Prep'],
      location: 'Hyderabad, Telangana',
      distance: '0.9 km',
      verified: true,
      available: false,
      instantAvailable: false,
      responseTime: '~25 min',
      completedJobs: 234,
      experience: '6+ years',
      description: 'Professional chef specializing in authentic Indian cuisine and healthy meal preparations.',
      languages: ['Telugu', 'Hindi', 'English'],
      backgroundCheck: true
    },
    {
      id: 10,
      name: 'Sunita Agarwal',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita',
      rating: 4.8,
      reviewCount: 123,
      hourlyRate: 200,
      instantRate: 400,
      skills: ['Cooking', 'North Indian Cuisine', 'Party Catering'],
      location: 'Lucknow, Uttar Pradesh',
      distance: '1.4 km',
      verified: true,
      available: true,
      instantAvailable: true,
      responseTime: '~18 min',
      completedJobs: 187,
      experience: '5+ years',
      description: 'Expert in North Indian cuisine with catering experience for parties and events.',
      languages: ['Hindi', 'English'],
      backgroundCheck: true
    },
    // Car Repair (2 profiles)
    {
      id: 11,
      name: 'Arjun Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
      rating: 4.8,
      reviewCount: 142,
      hourlyRate: 280,
      instantRate: 550,
      skills: ['Car Repair', 'Bike Service', 'Vehicle Care'],
      location: 'Ahmedabad, Gujarat',
      distance: '3.2 km',
      verified: true,
      available: true,
      instantAvailable: true,
      responseTime: '~15 min',
      completedJobs: 198,
      experience: '7+ years',
      description: 'Certified automotive technician with expertise in all vehicle types.',
      languages: ['Gujarati', 'Hindi', 'English'],
      backgroundCheck: true
    },
    {
      id: 12,
      name: 'Kiran Mehta',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kiran',
      rating: 4.6,
      reviewCount: 98,
      hourlyRate: 250,
      instantRate: 500,
      skills: ['Car Repair', 'Engine Diagnostics', 'AC Repair'],
      location: 'Surat, Gujarat',
      distance: '2.6 km',
      verified: true,
      available: true,
      instantAvailable: false,
      responseTime: '~22 min',
      completedJobs: 165,
      experience: '5+ years',
      description: 'Automobile engineer specializing in engine diagnostics and AC systems.',
      languages: ['Gujarati', 'Hindi', 'English'],
      backgroundCheck: true
    }
  ];

  useEffect(() => {
    loadHelpers();
  }, [filters]);

  const loadHelpers = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredHelpers = [...mockHelpers];
    
    // Apply filters
    if (filters.service) {
      filteredHelpers = filteredHelpers.filter(helper =>
        helper.skills.some(skill => 
          skill.toLowerCase().includes(filters.service.toLowerCase())
        )
      );
    }
    
    if (filters.rating > 0) {
      filteredHelpers = filteredHelpers.filter(helper => helper.rating >= filters.rating);
    }
    
    if (filters.verified) {
      filteredHelpers = filteredHelpers.filter(helper => helper.verified);
    }
    
    if (filters.availability === 'available') {
      filteredHelpers = filteredHelpers.filter(helper => helper.available);
    }
    
    filteredHelpers = filteredHelpers.filter(helper => 
      helper.hourlyRate >= filters.priceRange[0] && helper.hourlyRate <= filters.priceRange[1]
    );
    
    setHelpers(filteredHelpers);
    setLoading(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (key === 'service' && value) {
      newParams.set('service', value);
    } else if (key === 'location' && value) {
      newParams.set('location', value);
    }
    setSearchParams(newParams);
  };

  const handleHelperSelect = (helper) => {
    navigate(`/helper/${helper.id}/book`, { state: { helper } });
  };

  const handleInstantBooking = (helper) => {
    navigate(`/helper/${helper.id}/book`, { 
      state: { 
        helper, 
        instantBooking: true,
        rate: helper.instantRate 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Helpers</h1>
          <p className="text-muted-foreground">
            Discover skilled professionals in your area
          </p>
        </div>

        {/* Quick Task Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Popular Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'House Cleaning', icon: 'Home', color: 'blue' },
              { name: 'Plumbing', icon: 'Wrench', color: 'green' },
              { name: 'Tutoring', icon: 'BookOpen', color: 'purple' },
              { name: 'Gardening', icon: 'Flower', color: 'emerald' },
              { name: 'Cooking', icon: 'ChefHat', color: 'orange' },
              { name: 'Car Repair', icon: 'Car', color: 'red' }
            ].map((category, index) => (
              <button
                key={index}
                onClick={() => handleFilterChange('service', category.name)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  filters.service === category.name
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
              >
                <Icon name={category.icon} size={24} className="mx-auto mb-2 text-current" />
                <div className="text-sm font-medium text-center text-foreground">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-card rounded-xl p-6 mb-8 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="What service do you need?"
              value={filters.service}
              onChange={(e) => handleFilterChange('service', e.target.value)}
            />
            <Input
              placeholder="Location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              iconName="Filter"
              iconPosition="left"
            >
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4}>4+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                    <option value={4.8}>4.8+ Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Availability
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option value="any">Any</option>
                    <option value="available">Available Now</option>
                    <option value="today">Available Today</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Experience
                  </label>
                  <select
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option value="any">Any Experience</option>
                    <option value="1+">1+ Years</option>
                    <option value="3+">3+ Years</option>
                    <option value="5+">5+ Years</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    id="verified-only"
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => handleFilterChange('verified', e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <label htmlFor="verified-only" className="ml-2 text-sm text-foreground">
                    Verified Only
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border border-border animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-muted rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                </div>
              </div>
            ))
          ) : helpers.length > 0 ? (
            helpers.map((helper) => (
              <div 
                key={helper.id} 
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => handleHelperSelect(helper)}
              >
                {/* Helper Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={helper.avatar}
                    alt={helper.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">{helper.name}</h3>
                      {helper.verified && (
                        <Icon name="Shield" size={16} color="#10B981" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex items-center">
                        <Icon name="Star" size={14} color="#F59E0B" />
                        <span className="text-sm font-medium text-foreground ml-1">
                          {helper.rating}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({helper.reviewCount} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{helper.location}</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {helper.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-3 mb-4">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Regular Rate:</span>
                      <span className="font-semibold text-foreground">₹{helper.hourlyRate}/hr</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Instant Rate:</span>
                      <span className="font-semibold text-orange-600">₹{helper.instantRate}/hr</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="text-foreground">{helper.distance}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Response:</span>
                    <span className="text-foreground">{helper.responseTime}</span>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="space-y-3">
                  <div className={`flex items-center space-x-1 ${
                    helper.available ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      helper.available ? 'bg-green-500' : 'bg-orange-500'
                    }`}></div>
                    <span className="text-sm font-medium">
                      {helper.available ? 'Available' : 'Busy'}
                    </span>
                    {helper.instantAvailable && (
                      <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                        Instant
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHelperSelect(helper);
                      }}
                      disabled={!helper.available}
                    >
                      Book Later
                    </Button>
                    {helper.instantAvailable && helper.available && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInstantBooking(helper);
                        }}
                      >
                        Book Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-foreground mb-2">No helpers found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelperSearchPage;