"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main home page (admin-web on port 3000)
    window.location.href = "http://localhost:3000";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-background">
      <div className="text-center animate-fade-in">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
        <p className="text-grey-600">Redirecting to XeroBookz Home...</p>
      </div>
    </div>
  );
}
