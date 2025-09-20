import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PortfolioSection = ({ portfolio }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const categories = [
    { value: 'all', label: 'All Projects', count: portfolio?.length },
    { value: 'electrical', label: 'Electrical', count: portfolio?.filter(p => p?.category === 'electrical')?.length },
    { value: 'plumbing', label: 'Plumbing', count: portfolio?.filter(p => p?.category === 'plumbing')?.length },
    { value: 'carpentry', label: 'Carpentry', count: portfolio?.filter(p => p?.category === 'carpentry')?.length },
    { value: 'it', label: 'IT Support', count: portfolio?.filter(p => p?.category === 'it')?.length }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? portfolio 
    : portfolio?.filter(project => project?.category === selectedCategory);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'electrical': return 'Zap';
      case 'plumbing': return 'Droplets';
      case 'carpentry': return 'Hammer';
      case 'it': return 'Monitor';
      default: return 'Briefcase';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="FolderOpen" size={20} color="var(--color-primary)" />
        Portfolio & Completed Work
      </h3>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.value}
            onClick={() => setSelectedCategory(category?.value)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <span>{category?.label}</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
              {category?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects?.map((project, index) => (
          <div
            key={index}
            className="group cursor-pointer bg-muted/30 rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-300"
            onClick={() => openProjectModal(project)}
          >
            <div className="relative overflow-hidden">
              <Image
                src={project?.beforeImage}
                alt={project?.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Icon 
                  name="Eye" 
                  size={24} 
                  color="white" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="absolute top-2 left-2">
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Icon name={getCategoryIcon(project?.category)} size={12} />
                  {project?.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-medium text-foreground mb-2 line-clamp-2">{project?.title}</h4>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project?.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Icon name="Calendar" size={14} />
                  <span>{project?.completedDate}</span>
                </div>
                <div className="flex items-center gap-1 text-success">
                  <Icon name="Star" size={14} />
                  <span>{project?.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredProjects?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FolderOpen" size={48} color="var(--color-muted-foreground)" />
          <p className="text-muted-foreground mt-4">No projects found in this category</p>
        </div>
      )}
      {/* Project Detail Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-150 p-4">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">{selectedProject?.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                iconName="X"
                iconSize={16}
              />
            </div>
            
            <div className="p-6">
              {/* Before/After Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Before</h4>
                  <Image
                    src={selectedProject?.beforeImage}
                    alt="Before"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">After</h4>
                  <Image
                    src={selectedProject?.afterImage}
                    alt="After"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Project Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="text-foreground capitalize">{selectedProject?.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="text-foreground">{selectedProject?.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="text-foreground">{selectedProject?.completedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cost:</span>
                      <span className="text-foreground">${selectedProject?.cost}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-3">Client Feedback</h4>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            color={i < selectedProject?.rating ? "var(--color-accent)" : "var(--color-muted-foreground)"}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-foreground">{selectedProject?.rating}/5</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{selectedProject?.clientFeedback}"</p>
                    <p className="text-xs text-muted-foreground mt-2">- {selectedProject?.clientName}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-medium text-foreground mb-3">Description</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedProject?.fullDescription}</p>
              </div>

              {/* Additional Images */}
              {selectedProject?.additionalImages && selectedProject?.additionalImages?.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-foreground mb-3">Additional Photos</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedProject?.additionalImages?.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Additional photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity duration-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSection;