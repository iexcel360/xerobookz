import React from "react";

export const Sparkles: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Small Glow Sparkles */}
      <div className="absolute top-16 left-20 w-4 h-4 bg-pink-300 rounded-full blur-md animate-pulse-slow" />
      <div className="absolute top-32 right-24 w-3 h-3 bg-yellow-300 rounded-full blur-sm animate-pulse-medium" />
      <div className="absolute bottom-40 left-1/4 w-5 h-5 bg-blue-300 rounded-full blur-md animate-pulse-fast" />
      <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-accent-300 rounded-full blur-sm animate-pulse-slow" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-20 right-1/4 w-4 h-4 bg-primary-300 rounded-full blur-md animate-pulse-medium" style={{ animationDelay: "2s" }} />
    </div>
  );
};

