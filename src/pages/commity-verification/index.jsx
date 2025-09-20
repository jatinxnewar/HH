import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import VerificationCard from './components/VerificationCard';
import TrustScorePanel from './components/TrustScorePanel';
import PeerValidationForm from './components/PeerValidationForm';
import NGOPartnershipCard from './components/NGOPartnershipCard';
import VerificationTimeline from './components/VerificationTimeline';
import BadgeShowcase from './components/BadgeShowcase';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CommunityVerification = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showValidationForm, setShowValidationForm] = useState(false);
  const [selectedHelper, setSelectedHelper] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Mock data for verification categories
  const verificationCategories = [
    {
      id: 'skill-validation',
      title: 'Skill Validation',
      description: 'Get your technical skills verified by community experts',
      status: 'in-progress',
      progress: 75,
      reward: '+15 Trust Points',
      iconName: 'Award',
      actionText: 'Continue Validation',
      requirements: [
        { text: 'Submit skill portfolio', completed: true },
        { text: 'Complete practical test', completed: true },
        { text: 'Get peer endorsements', completed: false },
        { text: 'Expert review', completed: false }
      ]
    },
    {
      id: 'peer-review',
      title: 'Peer Reviews',
      description: 'Collect reviews from community members you\'ve helped',
      status: 'completed',
      progress: 100,
      reward: 'Community Hero Badge',
      iconName: 'Users',
      actionText: 'View Reviews',
      completedDate: 'September 15, 2024',
      requirements: [
        { text: 'Complete 5 tasks', completed: true },
        { text: 'Maintain 4+ star rating', completed: true },
        { text: 'Get 10 peer reviews', completed: true }
      ]
    },
    {
      id: 'emergency-cert',
      title: 'Emergency Response',
      description: 'Certification for handling emergency assistance requests',
      status: 'pending',
      progress: 0,
      reward: 'Emergency Responder Badge',
      iconName: 'AlertTriangle',
      actionText: 'Start Certification',
      requirements: [
        { text: 'Complete safety training', completed: false },
        { text: 'Pass emergency protocols test', completed: false },
        { text: 'Background verification', completed: false }
      ]
    },
    {
      id: 'community-endorsement',
      title: 'Community Endorsement',
      description: 'Get endorsed by local community leaders and organizations',
      status: 'in-progress',
      progress: 40,
      reward: '+25 Trust Points',
      iconName: 'ThumbsUp',
      actionText: 'Request Endorsements',
      requirements: [
        { text: 'Complete community service', completed: true },
        { text: 'Get 3 leader endorsements', completed: false },
        { text: 'Attend community meeting', completed: false }
      ]
    }
  ];

  // Mock data for trust score
  const trustScoreData = {
    currentScore: 78,
    maxScore: 100,
    rank: 1247,
    totalUsers: 45230,
    factors: [
      { name: 'Skill Verification', score: 85, maxScore: 100, icon: 'Award' },
      { name: 'Peer Reviews', score: 92, maxScore: 100, icon: 'Users' },
      { name: 'Task Completion', score: 76, maxScore: 100, icon: 'CheckCircle' },
      { name: 'Response Time', score: 68, maxScore: 100, icon: 'Clock' },
      { name: 'Community Engagement', score: 45, maxScore: 100, icon: 'Heart' }
    ],
    recommendations: [
      { action: 'Complete emergency response certification', points: 15 },
      { action: 'Improve average response time', points: 8 },
      { action: 'Participate in community events', points: 12 }
    ]
  };

  // Mock data for NGO partnerships
  const ngoPartnerships = [
    {
      id: 'habitat-humanity',
      name: 'Habitat for Humanity',
      category: 'Housing & Construction',
      logo: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=100&h=100&fit=crop&crop=center',
      description: 'Partner with us to provide affordable housing solutions and construction expertise to families in need.',
      benefits: ['Skill Certification', 'Community Impact', 'Networking', 'Tax Benefits'],
      requirements: ['Construction Skills', 'Background Check', '20+ Hours/Month'],
      partnership: { status: 'active', startDate: 'March 2024', hoursContributed: 156 }
    },
    {
      id: 'red-cross',
      name: 'American Red Cross',
      category: 'Emergency Response',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&crop=center',
      description: 'Join our emergency response team and help communities during disasters and emergencies.',
      benefits: ['Emergency Training', 'Leadership Skills', 'Recognition', 'Certification'],
      requirements: ['First Aid Training', 'Availability 24/7', 'Physical Fitness'],
      partnership: { status: 'pending' }
    },
    {
      id: 'local-food-bank',
      name: 'Community Food Bank',
      category: 'Food Security',
      logo: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=100&h=100&fit=crop&crop=center',
      description: 'Help distribute food and organize community meals for families facing food insecurity.',
      benefits: ['Community Service', 'Organizational Skills', 'Social Impact', 'Flexible Hours'],
      requirements: ['Food Safety Training', '10+ Hours/Month', 'Team Player']
    }
  ];

  // Mock data for helpers available for validation
  const availableHelpers = [
    {
      id: 'helper-1',
      name: 'Sarah Johnson',
      category: 'Electrician',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      completedTasks: 23,
      rating: 4.8
    },
    {
      id: 'helper-2',
      name: 'Mike Chen',
      category: 'IT Support',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      completedTasks: 18,
      rating: 4.6
    }
  ];

  // Mock data for verification timeline
  const timelineEvents = [
    {
      id: 'event-1',
      type: 'peer-review',
      title: 'Peer Review Completed',
      description: 'Received 5-star review from Maria Rodriguez for electrical work',
      timestamp: '2024-09-18T14:30:00Z',
      details: {
        points: 5,
        validator: 'Maria Rodriguez'
      }
    },
    {
      id: 'event-2',
      type: 'skill-validation',
      title: 'Skill Assessment Passed',
      description: 'Successfully completed electrical safety assessment',
      timestamp: '2024-09-15T10:15:00Z',
      details: {
        points: 15,
        badge: 'Electrical Expert'
      }
    },
    {
      id: 'event-3',
      type: 'ngo-partnership',
      title: 'NGO Partnership Activated',
      description: 'Started partnership with Habitat for Humanity',
      timestamp: '2024-09-10T09:00:00Z',
      details: {
        points: 25,
        badge: 'Community Partner'
      }
    },
    {
      id: 'event-4',
      type: 'community-endorsement',
      title: 'Community Endorsement',
      description: 'Endorsed by Downtown Neighborhood Association',
      timestamp: '2024-09-05T16:45:00Z',
      details: {
        points: 20,
        validator: 'Downtown Neighborhood Association'
      }
    }
  ];

  // Mock data for badges and achievements
  const userBadges = [
    {
      id: 'badge-1',
      name: 'Community Hero',
      type: 'community-hero',
      rarity: 'epic',
      description: 'Completed 50+ community service hours',
      earnedDate: 'September 15, 2024'
    },
    {
      id: 'badge-2',
      name: 'Skill Master',
      type: 'skill-master',
      rarity: 'rare',
      description: 'Verified expert in electrical work',
      earnedDate: 'September 10, 2024'
    },
    {
      id: 'badge-3',
      name: 'Peer Validator',
      type: 'peer-validator',
      rarity: 'common',
      description: 'Provided 25+ peer validations',
      earnedDate: 'September 5, 2024'
    },
    {
      id: 'badge-4',
      name: 'Trust Builder',
      type: 'trust-builder',
      rarity: 'rare',
      description: 'Maintained 4.5+ star rating for 6 months',
      earnedDate: 'August 28, 2024'
    }
  ];

  const recentAchievements = [
    {
      id: 'achievement-1',
      title: 'Top 10% Helper',
      description: 'Ranked in top 10% of helpers in your area',
      date: '2 days ago'
    },
    {
      id: 'achievement-2',
      title: 'Quick Responder',
      description: 'Responded to 95% of requests within 30 minutes',
      date: '1 week ago'
    },
    {
      id: 'achievement-3',
      title: 'Community Champion',
      description: 'Completed 100 hours of community service',
      date: '2 weeks ago'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'peer-validation', label: 'Peer Validation', icon: 'Users' },
    { id: 'ngo-partnerships', label: 'NGO Partnerships', icon: 'Heart' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'badges', label: 'Badges', icon: 'Award' }
  ];

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: 'New peer validation request available',
        timestamp: new Date()?.toISOString()
      };
      setNotifications(prev => [newNotification, ...prev?.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleVerificationAction = (categoryId) => {
    console.log('Starting verification for:', categoryId);
    // Handle verification action
  };

  const handlePeerValidation = (validationData) => {
    console.log('Peer validation submitted:', validationData);
    setShowValidationForm(false);
    setSelectedHelper(null);
    // Handle validation submission
  };

  const handleNGOApplication = (ngo) => {
    console.log('Applying to NGO:', ngo?.name);
    // Handle NGO application
  };

  const handleNGODetails = (ngo) => {
    console.log('Viewing NGO details:', ngo?.name);
    // Handle NGO details view
  };

  const startPeerValidation = (helper) => {
    setSelectedHelper(helper);
    setShowValidationForm(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header notificationCount={notifications?.length} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Community Verification</h1>
              <p className="text-muted-foreground mt-2">
                Build trust through peer validation, NGO partnerships, and community engagement
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                <Icon name="Shield" size={20} color="var(--color-primary)" />
                <span className="text-sm font-medium text-primary">Blockchain Secured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Verification Categories */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Verification Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {verificationCategories?.map((category) => (
                    <VerificationCard
                      key={category?.id}
                      title={category?.title}
                      description={category?.description}
                      status={category?.status}
                      progress={category?.progress}
                      reward={category?.reward}
                      iconName={category?.iconName}
                      actionText={category?.actionText}
                      completedDate={category?.completedDate}
                      requirements={category?.requirements}
                      onAction={() => handleVerificationAction(category?.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    iconName="Users"
                    iconPosition="left"
                    onClick={() => setActiveTab('peer-validation')}
                    className="justify-start"
                  >
                    Validate Peers
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Heart"
                    iconPosition="left"
                    onClick={() => setActiveTab('ngo-partnerships')}
                    className="justify-start"
                  >
                    Join NGO
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Award"
                    iconPosition="left"
                    onClick={() => setActiveTab('badges')}
                    className="justify-start"
                  >
                    View Badges
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <TrustScorePanel
                currentScore={trustScoreData?.currentScore}
                maxScore={trustScoreData?.maxScore}
                rank={trustScoreData?.rank}
                totalUsers={trustScoreData?.totalUsers}
                factors={trustScoreData?.factors}
                recommendations={trustScoreData?.recommendations}
              />
            </div>
          </div>
        )}

        {activeTab === 'peer-validation' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {showValidationForm && selectedHelper ? (
                <PeerValidationForm
                  helper={selectedHelper}
                  onSubmit={handlePeerValidation}
                  onCancel={() => {
                    setShowValidationForm(false);
                    setSelectedHelper(null);
                  }}
                />
              ) : (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Available for Validation</h3>
                  <div className="space-y-4">
                    {availableHelpers?.map((helper) => (
                      <div key={helper?.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img
                            src={helper?.avatar}
                            alt={helper?.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-foreground">{helper?.name}</h4>
                            <p className="text-sm text-muted-foreground">{helper?.category}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center space-x-1">
                                <Icon name="Star" size={12} color="var(--color-warning)" className="fill-current" />
                                <span className="text-xs text-muted-foreground">{helper?.rating}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{helper?.completedTasks} tasks</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => startPeerValidation(helper)}
                        >
                          Validate
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <VerificationTimeline events={timelineEvents?.filter(e => e?.type === 'peer-review')} />
            </div>
          </div>
        )}

        {activeTab === 'ngo-partnerships' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">NGO Partnerships</h2>
              <p className="text-muted-foreground">
                Partner with verified NGOs to contribute to your community and earn trust points
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ngoPartnerships?.map((ngo) => (
                <NGOPartnershipCard
                  key={ngo?.id}
                  ngo={ngo}
                  partnership={ngo?.partnership}
                  onApply={handleNGOApplication}
                  onViewDetails={handleNGODetails}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <VerificationTimeline events={timelineEvents} />
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Upcoming Opportunities</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <Icon name="Calendar" size={16} color="var(--color-primary)" />
                  <div>
                    <p className="text-sm font-medium text-primary">Community Meeting</p>
                    <p className="text-xs text-primary/80">September 25, 2024 at 7:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
                  <div>
                    <p className="text-sm font-medium text-warning">Emergency Training</p>
                    <p className="text-xs text-warning/80">October 2, 2024 at 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                  <Icon name="Heart" size={16} color="var(--color-success)" />
                  <div>
                    <p className="text-sm font-medium text-success">Volunteer Drive</p>
                    <p className="text-xs text-success/80">October 10, 2024 at 9:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BadgeShowcase badges={userBadges} achievements={recentAchievements} />
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Badge Progress</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Emergency Responder</span>
                    <span className="text-xs text-muted-foreground">2/3 requirements</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div className="h-2 bg-warning rounded-full" style={{ width: '67%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Complete emergency training to unlock</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">NGO Partner</span>
                    <span className="text-xs text-muted-foreground">1/2 requirements</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div className="h-2 bg-primary rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Complete 50 volunteer hours</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityVerification;