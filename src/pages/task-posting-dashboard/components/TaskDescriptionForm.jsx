import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const TaskDescriptionForm = ({ 
  title, 
  description, 
  onTitleChange, 
  onDescriptionChange,
  images,
  onImageUpload,
  onImageRemove
}) => {
  const handleImageDrop = (e) => {
    e?.preventDefault();
    const files = Array.from(e?.dataTransfer?.files);
    handleImageFiles(files);
  };

  const handleImageFiles = (files) => {
    files?.forEach(file => {
      if (file?.type?.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onImageUpload({
            id: Date.now() + Math.random(),
            file,
            preview: e?.target?.result,
            name: file?.name
          });
        };
        reader?.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="FileText" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-semibold text-foreground">Task Details</h3>
      </div>
      <div className="space-y-4">
        <Input
          label="Task Title"
          type="text"
          placeholder="Brief description of what you need help with"
          value={title}
          onChange={(e) => onTitleChange(e?.target?.value)}
          required
          maxLength={100}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Detailed Description
            <span className="text-destructive ml-1">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e?.target?.value)}
            placeholder="Provide detailed information about the task, location specifics, and any special requirements..."
            className="w-full h-32 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            required
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground">
            {description?.length}/500 characters
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Task Images (Optional)
          </label>
          
          <div
            onDrop={handleImageDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-200 cursor-pointer"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            <Icon name="Upload" size={24} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-1">
              Drag and drop images here, or click to select
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG up to 5MB each (max 3 images)
            </p>
          </div>

          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageFiles(Array.from(e?.target?.files))}
          />

          {images?.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {images?.map((image) => (
                <div key={image?.id} className="relative group">
                  <img
                    src={image?.preview}
                    alt={image?.name}
                    className="w-full h-20 object-cover rounded-lg border border-border"
                  />
                  <button
                    onClick={() => onImageRemove(image?.id)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDescriptionForm;