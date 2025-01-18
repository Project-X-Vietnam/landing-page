'use client'

import Header from "@/components/Header";
import Form from "@/components/Form";

export default function HomePage() {
  return (
    <div 
      className="bg-background min-h-screen" 
      style={{ backgroundColor: 'rgba(78, 217, 254, 0.05)' }}
    >
      <Header />
      <main className="py-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center w-full my-4 pb-4 space-x-4">
          <img
            src="/images/asset1_primary.svg"
            alt="Left Icon"
            className="h-6 w-6 transform rotate-90"
          />

          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            APPLICATION FORM
          </h2>

          <img
            src="/images/asset1_secondary.svg"
            alt="Left Icon"
            className="h-6 w-6 transform -rotate-90"
          />

        </div>
        <Form />
      </main>
    </div>
  );
}