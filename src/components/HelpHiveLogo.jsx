import React from 'react';

const HelpHiveLogo = ({ size = 40, className = "", simplified = false }) => {
  return (
    <div className={`${className} transition-transform duration-200 hover:scale-110`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Heart-shaped honeycomb structure */}
        {/* Left side hexagons (blue) */}
        <polygon 
          points="25,35 20,27 25,19 35,19 40,27 35,35" 
          fill="url(#blueGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          filter="url(#glow)"
        />
        <polygon 
          points="15,50 10,42 15,34 25,34 30,42 25,50" 
          fill="url(#blueGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          filter="url(#glow)"
        />
        <polygon 
          points="35,50 30,42 35,34 45,34 50,42 45,50" 
          fill="url(#blueGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          filter="url(#glow)"
        />
        
        {/* Right side hexagons (orange) */}
        <polygon 
          points="65,35 60,27 65,19 75,19 80,27 75,35" 
          fill="url(#orangeGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          filter="url(#glow)"
        />
        <polygon 
          points="75,50 70,42 75,34 85,34 90,42 85,50" 
          fill="url(#orangeGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          filter="url(#glow)"
        />
        <polygon 
          points="55,50 50,42 55,34 65,34 70,42 65,50" 
          fill="url(#orangeGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          filter="url(#glow)"
        />
        
        {/* Center connecting hexagons */}
        <polygon 
          points="45,35 40,27 45,19 55,19 60,27 55,35" 
          fill="url(#orangeGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          filter="url(#glow)"
        />
        
        {/* Bottom hexagons forming heart bottom */}
        <polygon 
          points="35,65 30,57 35,49 45,49 50,57 45,65" 
          fill="url(#blueGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          filter="url(#glow)"
        />
        <polygon 
          points="55,65 50,57 55,49 65,49 70,57 65,65" 
          fill="url(#orangeGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          filter="url(#glow)"
        />
        
        {/* Connection nodes/dots - only show if not simplified or size is large enough */}
        {(!simplified || size >= 32) && (
          <>
            <circle cx="40" cy="27" r="2" fill="#1E293B" opacity="0.8" />
            <circle cx="60" cy="27" r="2" fill="#1E293B" opacity="0.8" />
            <circle cx="30" cy="42" r="2" fill="#1E293B" opacity="0.8" />
            <circle cx="50" cy="42" r="2" fill="#1E293B" opacity="0.8" />
            <circle cx="70" cy="42" r="2" fill="#1E293B" opacity="0.8" />
            <circle cx="50" cy="57" r="2" fill="#1E293B" opacity="0.8" />
            
            {/* Connecting lines */}
            <line x1="40" y1="27" x2="60" y2="27" stroke="#1E293B" strokeWidth="1.5" opacity="0.6" />
            <line x1="30" y1="42" x2="50" y2="42" stroke="#1E293B" strokeWidth="1.5" opacity="0.6" />
            <line x1="50" y1="42" x2="70" y2="42" stroke="#1E293B" strokeWidth="1.5" opacity="0.6" />
            <line x1="40" y1="27" x2="30" y2="42" stroke="#1E293B" strokeWidth="1.5" opacity="0.6" />
            <line x1="60" y1="27" x2="70" y2="42" stroke="#1E293B" strokeWidth="1.5" opacity="0.6" />
            <line x1="50" y1="42" x2="50" y2="57" stroke="#1E293B" strokeWidth="1.5" opacity="0.6" />
          </>
        )}
      </svg>
    </div>
  );
};

export default HelpHiveLogo;