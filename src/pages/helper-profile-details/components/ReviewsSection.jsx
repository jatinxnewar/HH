import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ reviews, overallRating, ratingBreakdown }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All Reviews' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const filteredReviews = selectedFilter === 'all' 
    ? reviews 
    : reviews?.filter(review => review?.rating === parseInt(selectedFilter));

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews?.slice(0, 3);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        color={index < rating ? "var(--color-accent)" : "var(--color-muted-foreground)"}
      />
    ));
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffInDays = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
        Reviews & Feedback
      </h3>
      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
            <span className="text-3xl font-bold text-foreground">{overallRating}</span>
            <div className="flex items-center gap-1">
              {renderStars(Math.floor(overallRating))}
            </div>
          </div>
          <p className="text-muted-foreground">Based on {reviews?.length} reviews</p>
          <div className="flex items-center justify-center lg:justify-start gap-2 mt-2">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <span className="text-sm text-success">Blockchain Verified Reviews</span>
          </div>
        </div>

        <div className="space-y-2">
          {ratingBreakdown?.map((breakdown, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-8">{breakdown?.stars}★</span>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${breakdown?.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-muted-foreground w-12">{breakdown?.count}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Filter Options */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setSelectedFilter(option?.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedFilter === option?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {option?.label}
          </button>
        ))}
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews?.map((review, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-start gap-4">
              <Image
                src={review?.reviewer?.avatar}
                alt={review?.reviewer?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground">{review?.reviewer?.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {renderStars(review?.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{getTimeAgo(review?.date)}</span>
                    </div>
                  </div>
                  
                  {review?.isVerified && (
                    <div className="flex items-center gap-1 bg-success/10 text-success px-2 py-1 rounded-full">
                      <Icon name="BadgeCheck" size={12} />
                      <span className="text-xs">Verified</span>
                    </div>
                  )}
                </div>

                <p className="text-foreground mb-3">{review?.comment}</p>

                {/* Task Details */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="Briefcase" size={14} />
                    <span>{review?.taskType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    <span>Completed in {review?.completionTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="DollarSign" size={14} />
                    <span>${review?.taskValue}</span>
                  </div>
                </div>

                {/* Before/After Photos */}
                {review?.photos && review?.photos?.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {review?.photos?.map((photo, photoIndex) => (
                      <Image
                        key={photoIndex}
                        src={photo}
                        alt={`Task completion photo ${photoIndex + 1}`}
                        className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity duration-200"
                      />
                    ))}
                  </div>
                )}

                {/* Response Time Badge */}
                {review?.responseTime && (
                  <div className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                    <Icon name="Zap" size={12} />
                    <span>Responded in {review?.responseTime}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More/Less Button */}
      {filteredReviews?.length > 3 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
          >
            {showAllReviews ? 'Show Less' : `Show All ${filteredReviews?.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;