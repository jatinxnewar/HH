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
  const [photos, setPhotos] = useState([]);
  const [showTips, setShowTips] = useState(false);
  const [validationHistory, setValidationHistory] = useState([]);
  const [recommendHelper, setRecommendHelper] = useState(false);
  const [workQuality, setWorkQuality] = useState('');

  const skillOptions = [
    'Punctuality', 'Communication', 'Technical Skills', 'Problem Solving',
    'Professionalism', 'Quality of Work', 'Reliability', 'Friendliness'
  ];

  const workQualityOptions = [
    'Excellent - Exceeded expectations',
    'Good - Met all requirements',
    'Average - Satisfactory work',
    'Below Average - Some issues',
    'Poor - Major problems'
  ];

  const validationTips = [
    'Be honest and fair in your assessment',
    'Consider the helper\'s effort and attitude',
    'Rate based on the specific service provided',
    'Include specific details in your feedback',
    'Focus on constructive criticism'
  ];

  const handleSkillToggle = (skill) => {
    setSkills(prev => 
      prev?.includes(skill) 
        ? prev?.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotos(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: event.target.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const loadValidationHistory = () => {
    // Simulate loading previous validations
    setValidationHistory([
      { date: '2025-10-08', rating: 5, service: 'House Cleaning' },
      { date: '2025-09-15', rating: 4, service: 'Plumbing' },
      { date: '2025-08-22', rating: 5, service: 'Gardening' }
    ]);
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
      photos,
      workQuality,
      recommendHelper,
      timestamp: new Date()?.toISOString()
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">Validate Helper</h3>
          <button
            onClick={() => setShowTips(!showTips)}
            className="p-1 hover:bg-muted rounded-full transition-colors duration-200"
            title="Validation Tips"
          >
            <Icon name="HelpCircle" size={16} />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={loadValidationHistory}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            title="View History"
          >
            <Icon name="History" size={16} />
          </button>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
      </div>

      {/* Validation Tips */}
      {showTips && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Validation Tips</h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            {validationTips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="CheckCircle" size={12} className="mt-0.5 text-blue-600" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Validation History */}
      {validationHistory.length > 0 && (
        <div className="mb-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Previous Validations</h4>
          <div className="space-y-2">
            {validationHistory.map((validation, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{validation.service}</span>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(validation.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={12} color="var(--color-warning)" className="fill-current" />
                    ))}
                  </div>
                  <span className="text-muted-foreground">{validation.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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

        {/* Work Quality Assessment */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Work Quality Assessment *
          </label>
          <select
            value={workQuality}
            onChange={(e) => setWorkQuality(e.target.value)}
            className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
          >
            <option value="">Select work quality...</option>
            {workQualityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Upload Work Photos (Optional)
          </label>
          <div className="space-y-3">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full p-2 border border-border rounded-lg bg-background text-foreground file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-primary file:text-primary-foreground file:rounded"
            />
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recommendation */}
        <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
          <input
            type="checkbox"
            id="recommend"
            checked={recommendHelper}
            onChange={(e) => setRecommendHelper(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="recommend" className="text-sm font-medium text-foreground">
            I would recommend this helper to others
          </label>
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
            disabled={rating === 0 || !workQuality || isSubmitting}
            loading={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Recording to Blockchain...' : 'Submit Validation'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PeerValidationForm;