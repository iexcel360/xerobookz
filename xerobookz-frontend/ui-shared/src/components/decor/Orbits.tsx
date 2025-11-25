import React from "react";

export const Orbits: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Ring */}
      <div className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 animate-spin-slow" />
      
      {/* Dot on Orbit */}
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent-400 rounded-full animate-orbit" />
      
      {/* Additional smaller orbit */}
      <div className="absolute top-1/3 right-1/4 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-300/20 animate-spin-slow" style={{ animationDuration: "15s" }} />
    </div>
  );
};

