import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PeerValidationForm = ({ helper, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [skills, setSkills] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const skillOptions = [
    'Punctuality', 'Communication', 'Technical Skills', 'Problem Solving',
    'Professionalism', 'Quality of Work', 'Reliability', 'Friendliness'
  ];

  const handleSkillToggle = (skill) => {
    setSkills(prev => 
      prev?.includes(skill) 
        ? prev?.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (rating === 0) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    onSubmit({
      helperId: helper?.id,
      rating,
      feedback,
      skills,
      timestamp: new Date()?.toISOString()
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Validate Helper</h3>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      {/* Helper Info */}
      <div className="flex items-center space-x-3 mb-6 p-4 bg-muted/50 rounded-lg">
        <img
          src={helper?.avatar}
          alt={helper?.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-medium text-foreground">{helper?.name}</h4>
          <p className="text-sm text-muted-foreground">{helper?.category}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Overall Rating *
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5]?.map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 hover:scale-110 transition-transform duration-200"
              >
                <Icon
                  name="Star"
                  size={24}
                  color={star <= (hoveredRating || rating) ? "var(--color-warning)" : "var(--color-muted-foreground)"}
                  className={star <= (hoveredRating || rating) ? "fill-current" : ""}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {rating > 0 && `${rating} star${rating > 1 ? 's' : ''}`}
            </span>
          </div>
        </div>

        {/* Skills Validation */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Validated Skills
          </label>
          <div className="grid grid-cols-2 gap-2">
            {skillOptions?.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleSkillToggle(skill)}
                className={`p-2 text-sm rounded-lg border transition-all duration-200 ${
                  skills?.includes(skill)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:bg-muted'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <Input
          label="Additional Feedback"
          type="text"
          placeholder="Share your experience working with this helper..."
          value={feedback}
          onChange={(e) => setFeedback(e?.target?.value)}
          description="Your feedback helps build community trust"
        />

        {/* Blockchain Notice */}
        <div className="flex items-start space-x-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <Icon name="Shield" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <p className="text-sm text-primary font-medium">Blockchain Secured</p>
            <p className="text-xs text-primary/80">
              This validation will be permanently recorded on the blockchain for transparency
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={rating === 0 || isSubmitting}
            loading={isSubmitting}
            className="flex-1"
          >
            Submit Validation
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PeerValidationForm;