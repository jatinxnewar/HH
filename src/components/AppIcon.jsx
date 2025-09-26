import React from "react";

const AppIcon = ({ name, size = 20, color = "currentColor", className = "", ...props }) => {
  const iconMap = {
    // Navigation icons
    Home: "🏠",
    Plus: "➕",
    CheckSquare: "✅",
    Users: "👥",
    User: "👤",
    Settings: "⚙️",
    Bell: "🔔",
    Menu: "☰",
    X: "✖️",
    ChevronDown: "⌄",
    ChevronUp: "⌃",
    ChevronLeft: "‹",
    ChevronRight: "›",
    
    // Action icons
    Heart: "❤️",
    AlertTriangle: "⚠️",
    RefreshCw: "🔄",
    LogOut: "🚪",
    Send: "📤",
    Check: "✓",
    
    // UI icons
    Search: "🔍",
    Filter: "🔽",
    MapPin: "📍",
    Clock: "🕐",
    DollarSign: "$",
    FileText: "📄",
    Camera: "📷",
    Upload: "⬆️",
    Download: "⬇️",
    Edit: "✏️",
    Trash: "🗑️",
    Eye: "👁️",
    EyeOff: "🙈",
    
    // Theme icons
    Sun: "☀️",
    Moon: "🌙",
    
    // Emergency icons
    Phone: "📞",
    Shield: "🛡️",
    Zap: "⚡",
    
    // Social icons
    Star: "⭐",
    ThumbsUp: "👍",
    MessageCircle: "💬",
    Share: "📤",
    
    // Default fallback
    Default: "🔆"
  };

  const icon = iconMap[name] || iconMap.Default;
  
  return (
    <span 
      {...props}
      className={`inline-flex items-center justify-center ${className}`}
      style={{ 
        fontSize: `${size}px`, 
        color: color,
        lineHeight: 1,
        width: `${size}px`,
        height: `${size}px`,
        ...props.style 
      }}
    >
      {icon}
    </span>
  );
};

export default AppIcon;
