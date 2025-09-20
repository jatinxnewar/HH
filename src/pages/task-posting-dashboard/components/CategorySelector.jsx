import React from 'react';
import Icon from '../../../components/AppIcon';

const CategorySelector = ({ selectedCategory, onCategorySelect }) => {
  const categories = [
    {
      id: 'electrician',
      name: 'Electrician',
      icon: 'Zap',
      description: 'Electrical repairs and installations',
      color: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    {
      id: 'plumber',
      name: 'Plumber',
      icon: 'Wrench',
      description: 'Plumbing fixes and maintenance',
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      id: 'carpenter',
      name: 'Carpenter',
      icon: 'Hammer',
      description: 'Furniture and woodwork',
      color: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    {
      id: 'it-fix',
      name: 'IT Fix',
      icon: 'Monitor',
      description: 'Computer and tech support',
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    {
      id: 'tutor',
      name: 'Student Tutor',
      icon: 'BookOpen',
      description: 'Academic help and tutoring',
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    {
      id: 'cleaning',
      name: 'Cleaning',
      icon: 'Sparkles',
      description: 'House cleaning services',
      color: 'bg-pink-100 text-pink-800 border-pink-200'
    },
    {
      id: 'delivery',
      name: 'Delivery',
      icon: 'Truck',
      description: 'Package and item delivery',
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    },
    {
      id: 'other',
      name: 'Other',
      icon: 'MoreHorizontal',
      description: 'Custom service request',
      color: 'bg-gray-100 text-gray-800 border-gray-200'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="Grid3X3" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-semibold text-foreground">Select Service Category</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategorySelect(category?.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-elevation-1 animate-press ${
              selectedCategory === category?.id
                ? 'border-primary bg-primary/10 shadow-elevation-1'
                : 'border-border bg-card hover:border-primary/30'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`p-2 rounded-lg ${category?.color}`}>
                <Icon name={category?.icon} size={20} />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm text-foreground">{category?.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{category?.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;