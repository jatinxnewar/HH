// ...existing code...
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProfileHeader from './components/ProfileHeader';
import SkillsSection from './components/SkillsSection';
import ReviewsSection from './components/ReviewsSection';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import PortfolioSection from './components/PortfolioSection';
import TrustScoreBreakdown from './components/TrustScoreBreakdown';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HelperProfileDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorited, setIsFavorited] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Mock helper data
  const helperData = {
    id: "helper_001",
    name: "Arjun Sharma",
    title: "Certified Electrician & IT Specialist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    location: "Downtown Seattle, WA",
    joinedDate: "March 2022",
    isOnline: true,
    isVerified: true,
    rating: 4.8,
    reviewCount: 127,
    trustScore: 4.7,
    completedTasks: 89,
    verifications: [
      { icon: "Shield", label: "Blockchain Verified" },
      { icon: "Award", label: "NGO Certified" },
      { icon: "Users", label: "Peer Validated" },
      { icon: "AlertTriangle", label: "Emergency Certified" }
    ]
  };

  const skillsData = {
    primary: [
      {
        name: "Electrical Work",
        icon: "Zap",
        level: "Expert",
        experience: "8+ years"
      },
      {
        name: "IT Support",
        icon: "Monitor",
        level: "Advanced",
        experience: "5+ years"
      },
      {
        name: "Home Repairs",
        icon: "Hammer",
        level: "Intermediate",
        experience: "3+ years"
      },
      {
        name: "Network Setup",
        icon: "Wifi",
        level: "Advanced",
        experience: "4+ years"
      }
    ],
    certifications: [
      {
        name: "Licensed Electrician",
        type: "Government",
        issuer: "Washington State Department of Labor",
        issueDate: "January 2020",
        isVerified: true
      },
      {
        name: "CompTIA A+ Certification",
        type: "Professional",
        issuer: "CompTIA",
        issueDate: "June 2021",
        isVerified: true
      },
      {
        name: "Emergency Response Training",
        type: "Emergency",
        issuer: "Red Cross Seattle",
        issueDate: "March 2023",
        isVerified: true
      },
      {
        name: "Community Helper Badge",
        type: "NGO",
        issuer: "Seattle Community Foundation",
        issueDate: "August 2023",
        isVerified: true
      }
    ],
    emergencyCapabilities: [
      "Power Outage Resolution",
      "Network Emergency Fixes",
      "Electrical Safety Issues",
      "Critical System Recovery"
    ],
    serviceAreas: [
      "Downtown Seattle",
      "Capitol Hill",
      "Belltown",
      "South Lake Union",
      "Queen Anne"
    ]
  };

  const reviewsData = [
    {
      reviewer: {
        name: "Priya Mehta",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
      },
      rating: 5,
      date: "2024-01-15",
      comment: `Arjun was absolutely fantastic! He arrived within 20 minutes of my emergency call when my home office lost power during an important client presentation. Not only did he quickly identify and fix the electrical issue, but he also helped me get my network back up and running. His professionalism and expertise saved my business meeting. Highly recommend!`,
      taskType: "Emergency Electrical Repair",
      completionTime: "45 minutes",
      taskValue: 150,
      responseTime: "18 minutes",
      isVerified: true,
      photos: [
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop"
      ]
    },
    {
      reviewer: {
        name: "Rohan Gupta",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
      },
      rating: 5,
      date: "2024-01-10",
      comment: `Excellent service! Arjun helped me set up a complete home network system including WiFi optimization and smart home integration. He explained everything clearly and even provided tips for future maintenance. The work was completed efficiently and the pricing was very fair.`,
      taskType: "Network Setup & Configuration",
      completionTime: "2 hours",
      taskValue: 200,
      responseTime: "1 hour",
      isVerified: true,
      photos: [
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop"
      ]
    },
    {
      reviewer: {
        name: "Sonia Kapoor",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
      },
      rating: 4,
      date: "2024-01-05",
      comment: `Arjun did a great job installing new outlets in my kitchen. He was punctual, professional, and cleaned up after himself. The only minor issue was that it took slightly longer than estimated, but the quality of work was excellent.`,
      taskType: "Electrical Installation",
      completionTime: "3 hours",
      taskValue: 180,
      responseTime: "2 hours",
      isVerified: true,
      photos: []
    }
  ];

  const ratingBreakdown = [
    { stars: 5, percentage: 85, count: 108 },
    { stars: 4, percentage: 12, count: 15 },
    { stars: 3, percentage: 2, count: 3 },
    { stars: 2, percentage: 1, count: 1 },
    { stars: 1, percentage: 0, count: 0 }
  ];

  const availabilityData = {
    sun: { available: false },
    mon: { 
      available: true, 
      timeSlots: [
        { start: "08:00", end: "12:00", type: "regular" },
        { start: "13:00", end: "17:00", type: "regular" },
        { start: "18:00", end: "22:00", type: "emergency" }
      ],
      notes: "Available for regular and emergency calls"
    },
    tue: { 
      available: true, 
      timeSlots: [
        { start: "08:00", end: "12:00", type: "regular" },
        { start: "13:00", end: "17:00", type: "regular" }
      ]
    },
    wed: { 
      available: true, 
      timeSlots: [
        { start: "08:00", end: "12:00", type: "regular" },
        { start: "13:00", end: "17:00", type: "regular" },
        { start: "18:00", end: "22:00", type: "emergency" }
      ]
    },
    thu: { 
      available: true, 
      timeSlots: [
        { start: "08:00", end: "12:00", type: "regular" },
        { start: "13:00", end: "17:00", type: "regular" }
      ]
    },
    fri: { 
      available: true, 
      timeSlots: [
        { start: "08:00", end: "12:00", type: "regular" },
        { start: "13:00", end: "17:00", type: "regular" },
        { start: "18:00", end: "22:00", type: "emergency" }
      ]
    },
    sat: { 
      available: true, 
      timeSlots: [
        { start: "09:00", end: "15:00", type: "regular" }
      ],
      notes: "Weekend availability - regular hours only"
    }
  };

  const preferredAreas = [
    { name: "Downtown Seattle", distance: "0.5 miles" },
    { name: "Capitol Hill", distance: "1.2 miles" },
    { name: "Belltown", distance: "0.8 miles" },
    { name: "South Lake Union", distance: "1.0 miles" },
    { name: "Queen Anne", distance: "1.5 miles" }
  ];

  const portfolioData = [
    {
      title: "Complete Home Office Electrical Upgrade",
      category: "electrical",
      description: "Upgraded entire home office electrical system with new outlets, lighting, and surge protection",
      beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
      completedDate: "December 2023",
      duration: "2 days",
      cost: 850,
      rating: 5,
      clientName: "Meera Joshi",
      clientFeedback: "Arjun transformed my home office completely. The new electrical setup is perfect for all my equipment and the lighting makes such a difference. Professional work at a fair price.",
      fullDescription: `This project involved a complete electrical overhaul of a home office space. The client needed additional outlets for multiple monitors, a printer station, and proper lighting for video calls. I installed 8 new outlets with USB charging capabilities, upgraded the circuit breaker, added LED recessed lighting with dimmer controls, and installed a whole-office surge protection system. The work was completed over two days with minimal disruption to the client's work schedule.`,
      additionalImages: [
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d14?w=200&h=150&fit=crop"
      ]
    },
    {
      title: "Smart Home Network Installation",
      category: "it",
      description: "Complete smart home network setup with WiFi optimization and IoT device integration",
      beforeImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      completedDate: "November 2023",
      duration: "1 day",
      cost: 450,
      rating: 5,
      clientName: "Karan Desai",
      clientFeedback: "Incredible improvement in our home network performance. Arjun set up everything perfectly and taught us how to manage our smart devices efficiently.",
      fullDescription: `Comprehensive smart home network installation including mesh WiFi system setup, smart device configuration, and network security implementation. The project covered WiFi optimization for a 3-story home, integration of 15+ smart devices, and setup of network monitoring tools.`,
      additionalImages: []
    },
    {
      title: "Kitchen Plumbing Emergency Repair",
      category: "plumbing",
      description: "Emergency repair of burst pipe under kitchen sink with full cleanup",
      beforeImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
      completedDate: "October 2023",
      duration: "4 hours",
      cost: 320,
      rating: 4,
      clientName: "Deepika Iyer",
      clientFeedback: "Quick response to our emergency. Arjun fixed the burst pipe and helped with the water cleanup. Very professional service.",
      fullDescription: `Emergency response to a burst pipe situation. Arrived within 30 minutes, shut off water supply, replaced damaged pipe section, and assisted with water damage cleanup. Also provided recommendations for preventing future issues.`,
      additionalImages: []
    }
  ];

  const trustScoreData = {
    overall: 4.7,
    breakdown: [
      {
        category: "Completion Rate",
        icon: "CheckCircle",
        score: 4.9,
        description: "Percentage of tasks completed successfully",
        details: [
          { label: "Tasks Completed", value: "89/91" },
          { label: "Success Rate", value: "97.8%" },
          { label: "On-Time Delivery", value: "94.5%" }
        ]
      },
      {
        category: "Response Time",
        icon: "Clock",
        score: 4.6,
        description: "Average time to respond to requests",
        details: [
          { label: "Avg Response", value: "12 minutes" },
          { label: "Emergency Response", value: "8 minutes" },
          { label: "Regular Response", value: "45 minutes" }
        ]
      },
      {
        category: "Communication",
        icon: "MessageCircle",
        score: 4.8,
        description: "Quality of communication with clients",
        details: [
          { label: "Clarity Rating", value: "4.8/5" },
          { label: "Responsiveness", value: "4.9/5" },
          { label: "Professionalism", value: "4.7/5" }
        ]
      },
      {
        category: "Quality of Work",
        icon: "Award",
        score: 4.7,
        description: "Overall quality and satisfaction ratings",
        details: [
          { label: "Work Quality", value: "4.7/5" },
          { label: "Client Satisfaction", value: "4.8/5" },
          { label: "Repeat Clients", value: "23%" }
        ]
      }
    ]
  };

  const verificationHistory = [
    {
      title: "Blockchain Identity Verification",
      type: "blockchain",
      issuer: "HelpHive Network",
      status: "verified",
      date: "January 2024"
    },
    {
      title: "Professional License Verification",
      type: "government",
      issuer: "Washington State Licensing Board",
      status: "verified",
      date: "December 2023"
    },
    {
      title: "Community Validation",
      type: "ngo",
      issuer: "Seattle Community Foundation",
      status: "verified",
      date: "November 2023"
    },
    {
      title: "Emergency Response Certification",
      type: "emergency",
      issuer: "Red Cross Seattle",
      status: "verified",
      date: "October 2023"
    },
    {
      title: "Peer Review Validation",
      type: "peer",
      issuer: "Helper Network Community",
      status: "verified",
      date: "September 2023"
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'skills', label: 'Skills & Certifications', icon: 'Award' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'availability', label: 'Availability', icon: 'Calendar' },
    { id: 'portfolio', label: 'Portfolio', icon: 'FolderOpen' },
    { id: 'trust', label: 'Trust Score', icon: 'Shield' }
  ];

  useEffect(() => {
    const tab = searchParams?.get('tab');
    if (tab && tabs?.find(t => t?.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleMessage = () => {
    // Navigate to messaging interface
    navigate('/task-management-hub?action=message&helper=' + helperData?.id);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleEmergencyContact = () => {
    setShowContactModal(true);
  };

  const handleHireHelper = () => {
    navigate('/task-posting-dashboard?helper=' + helperData?.id);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'skills':
        return <SkillsSection skills={skillsData} />;
      case 'reviews':
        return (
          <ReviewsSection 
            reviews={reviewsData} 
            overallRating={helperData?.rating}
            ratingBreakdown={ratingBreakdown}
          />
        );
      case 'availability':
        return (
          <AvailabilityCalendar 
            availability={availabilityData}
            emergencyAvailable={true}
            preferredAreas={preferredAreas}
          />
        );
      case 'portfolio':
        return <PortfolioSection portfolio={portfolioData} />;
      case 'trust':
        return (
          <TrustScoreBreakdown 
            trustScore={trustScoreData}
            breakdown={trustScoreData?.breakdown}
            verificationHistory={verificationHistory}
          />
        );
      default:
        return (
          <div className="space-y-6">
            <SkillsSection skills={skillsData} />
            <ReviewsSection 
              reviews={reviewsData?.slice(0, 2)} 
              overallRating={helperData?.rating}
              ratingBreakdown={ratingBreakdown}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            iconName="ArrowLeft"
            iconPosition="left"
            iconSize={16}
          >
            Back to Search
          </Button>
        </div>

        {/* Profile Header */}
        <ProfileHeader 
          helper={helperData}
          onMessage={handleMessage}
          onFavorite={handleFavorite}
          onEmergencyContact={handleEmergencyContact}
          isFavorited={isFavorited}
        />

        {/* Navigation Tabs */}
        <div className="bg-card rounded-lg shadow-elevation-1 mb-6">
          <div className="border-b border-border">
            <nav className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 border-b-2 ${
                    activeTab === tab?.id
                      ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-6">
          {renderTabContent()}
        </div>

        {/* Hire Helper CTA */}
        <div className="bg-card rounded-lg shadow-elevation-2 p-6 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">Ready to hire Arjun?</h3>
          <p className="text-muted-foreground mb-4">
            Get professional help for your electrical, IT, and home repair needs
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="default"
              size="lg"
              onClick={handleHireHelper}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Post a Task
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleMessage}
              iconName="MessageCircle"
              iconPosition="left"
              iconSize={16}
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
      {/* Emergency Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-150 p-4">
          <div className="bg-card rounded-lg max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Phone" size={32} color="var(--color-error)" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Emergency Contact</h3>
              <p className="text-muted-foreground">
                Contact Arjun for urgent assistance. Emergency response time: ~15 minutes
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-foreground">Phone Call</span>
                <Button variant="destructive" size="sm">
                  Call Now
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-foreground">Emergency Message</span>
                <Button variant="outline" size="sm">
                  Send SOS
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowContactModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                fullWidth
                onClick={() => {
                  setShowContactModal(false);
                  // Handle emergency contact
                }}
              >
                Emergency Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelperProfileDetails;