'use client'
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";
import Metrics from "@/components/Metrics";
import { Button } from "@/components/ui/button";
import Partners from "@/components/Partners";
import TechFocused from "@/components/TechFocused";
import Testimonial from "@/components/Testimonial";

export default function SFP2025() {
  return (
    <div
      className = "bg-background min-h-screen"
      style = {{ backgroundColor: 'rgba(78, 217, 254, 0.05)' }}
    >
      <Header />
      <main className="py-10 max-w-6xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* Timeline */}
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold">
            Timeline Summer Fellowship Program 2025
          </h2>
        <Timeline />

        {/* Metrics of Success */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Metrics of Success
        </h2>
        <Metrics />
        
        {/* Partners */}
        <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Our Partners
        </h2>
        <Partners />

        {/* Tech-focused */}
        <div className="flex mt-5 items-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">We are</h2>
            <div className="bg-primary p-2 rounded-[20px] ml-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">tech-focused</h2>
            </div>
        </div>
        <TechFocused />

        {/* Testimonials */}
        <h2 className="text-center mt-10 text-2xl sm:text-3xl lg:text-4xl text-black font-semibold">What our mentees are <br/> saying about <span className="text-primary">Project X</span></h2>
        <Testimonial />
      </main>
    </div>
    
  );
}