'use client'
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";

export default function SFP2025() {
  return (
    <div
      className = "bg-background min-h-screen"
      style = {{ backgroundColor: 'rgba(78, 217, 254, 0.05)' }}
    >
      <Header />
      <main className="py-10 max-w-6xl mx-auto px-2 sm:px-4 lg:px-6">
        <h2 className="text-xl sm:text-2xl lg:text-4xl font-semibold">
            Timeline Summer Fellowship Program 2025
          </h2>
        <Timeline />
      </main>
    </div>
    
  );
}