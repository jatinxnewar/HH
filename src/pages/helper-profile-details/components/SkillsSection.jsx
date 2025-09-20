import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillsSection = ({ skills }) => {
  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-success text-success-foreground';
      case 'Advanced': return 'bg-primary text-primary-foreground';
      case 'Intermediate': return 'bg-accent text-accent-foreground';
      case 'Beginner': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCertificationIcon = (type) => {
    switch (type) {
      case 'NGO': return 'Award';
      case 'Peer': return 'Users';
      case 'Blockchain': return 'Shield';
      case 'Emergency': return 'AlertTriangle';
      default: return 'CheckCircle';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Wrench" size={20} color="var(--color-primary)" />
        Skills & Certifications
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Skills */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Primary Skills</h4>
          <div className="space-y-3">
            {skills?.primary?.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name={skill?.icon} size={18} color="var(--color-primary)" />
                  <div>
                    <p className="font-medium text-foreground">{skill?.name}</p>
                    <p className="text-sm text-muted-foreground">{skill?.experience}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(skill?.level)}`}>
                  {skill?.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Certifications & Validations</h4>
          <div className="space-y-3">
            {skills?.certifications?.map((cert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <Icon 
                  name={getCertificationIcon(cert?.type)} 
                  size={18} 
                  color="var(--color-success)" 
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground">{cert?.name}</p>
                    {cert?.isVerified && (
                      <Icon name="BadgeCheck" size={14} color="var(--color-success)" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{cert?.issuer}</p>
                  <p className="text-xs text-muted-foreground">Issued: {cert?.issueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Emergency Response Capabilities */}
      {skills?.emergencyCapabilities && skills?.emergencyCapabilities?.length > 0 && (
        <div className="mt-6 p-4 bg-error/5 border border-error/20 rounded-lg">
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="AlertTriangle" size={18} color="var(--color-error)" />
            Emergency Response Capabilities
          </h4>
          <div className="flex flex-wrap gap-2">
            {skills?.emergencyCapabilities?.map((capability, index) => (
              <span key={index} className="bg-error/10 text-error px-3 py-1 rounded-full text-sm font-medium">
                {capability}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Service Areas */}
      <div className="mt-6">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Icon name="MapPin" size={18} color="var(--color-primary)" />
          Service Areas
        </h4>
        <div className="flex flex-wrap gap-2">
          {skills?.serviceAreas?.map((area, index) => (
            <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;