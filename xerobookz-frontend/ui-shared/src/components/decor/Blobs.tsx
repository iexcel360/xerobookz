import React from "react";

export const Blobs: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-purple-300 to-pink-300 opacity-20 blur-3xl rounded-full animate-blob"
      />
      <div
        className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-br from-blue-300 to-cyan-300 opacity-20 blur-3xl rounded-full animate-blob"
        style={{ animationDelay: "700ms" }}
      />
      <div
        className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-green-300 to-teal-300 opacity-20 blur-3xl rounded-full animate-blob"
        style={{ animationDelay: "1000ms" }}
      />
    </div>
  );
};

