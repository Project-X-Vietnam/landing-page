import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Header() {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const targetDate = new Date("2025-02-23T23:59:00+07:00"); // Target date in GMT+7

    const updateTimer = () => {
      const now = new Date();
      const timeDiff = targetDate.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setTimeRemaining("Time's up!");
        clearInterval(timerInterval);
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);

      setTimeRemaining(
        `${days}d ${hours.toString().padStart(2, "0")}h ${minutes
          .toString()
          .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
      );
    };

    // Start the interval for updating the timer
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Run the first update immediately
    return () => clearInterval(timerInterval); // Cleanup interval on component unmount
  }, []);

  return (
    <header className="bg-gradient-to-tr from-primary to-secondary text-white pt-20 pb-10 px-6 sm:px-10">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
        {/* Left Section - Text and Information */}
        <div className="lg:w-3/5 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
            SUMMER FELLOWSHIP<br />PROGRAM 2025
          </h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg">
            Project X Vietnam officially launch our annual Summer Fellowship Program for 2025 with the mission of “Moving forward the next generation of tech youth”.
          </p>

          {/* Timer Countdown */}
          {timeRemaining ? (
            <>
              {window.innerWidth < 768 ? (
                <>
                  <p className="mt-8 text-sm sm:text-base lg:text-lg flex flex-col">
                    <span>Application will be closed in</span>
                    <span className="font-bold text-xl sm:text-2xl">{timeRemaining}</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-8 text-sm sm:text-base lg:text-lg"> 
                    Application will be closed in <span className="font-bold text-xl sm:text-2xl">{timeRemaining}</span>
                  </p>
                </>
              )}
            </>
          ) : (
            <p className="mt-8 text-sm sm:text-base lg:text-lg text-red-500">
              Form's closed!
            </p>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            {window.innerWidth < 768 ? (
              <>
                {/* Mobile View - Learn More First */}
                <Button variant="outline" className="text-white border-white px-6 py-3 sm:px-10 sm:py-6 text-sm sm:text-lg font-bold rounded-lg border-2 hover:text-primary hover:bg-white">
                  Learn More
                </Button>
                <div className="flex flex-col">
                  <Button className="bg-white text-primary px-6 py-3 sm:px-10 sm:py-6 text-sm sm:text-lg font-bold rounded-lg border-2 border-white hover:text-primary hover:bg-white">
                    Apply Below
                  </Button>
                  <div className="flex justify-center items-center gap-6 mt-2 sm:gap-12">
                    {/* Left Column */}
                    <div className="flex flex-col items-center">
                      <img
                        src="/images/asset1_freecolor.svg"
                        alt="Icon"
                        className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180 mt-1 opacity-100"
                      />
                      <img
                        src="/images/asset1_freecolor.svg"
                        alt="Icon"
                        className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180 mt-1 opacity-70"
                      />
                      <img
                        src="/images/asset1_freecolor.svg"
                        alt="Icon"
                        className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180 mt-1 opacity-40"
                      />
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col items-center">
                      <img
                        src="/images/asset1_freecolor.svg"
                        alt="Icon"
                        className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180 mt-1 opacity-100"
                      />
                      <img
                        src="/images/asset1_freecolor.svg"
                        alt="Icon"
                        className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180 mt-1 opacity-70"
                      />
                      <img
                        src="/images/asset1_freecolor.svg"
                        alt="Icon"
                        className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180 mt-1 opacity-40"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Desktop View - Apply Below First */}
                <div>
                  <Button className="bg-white text-primary px-6 py-3 sm:px-10 sm:py-6 text-sm sm:text-lg font-bold rounded-lg border-2 border-white hover:text-primary hover:bg-white">
                    Apply Below
                  </Button>
                  <div className="flex justify-center items-center gap-6 mt-2 sm:gap-12">
                    {/* Left Column */}
                    <div className="flex flex-col items-center">
                      <img
                        src="/images/asset1_freecolor.svg"
                        alt="Icon"
                        className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180 mt-1 opacity-100"
                      />
                      <img
                        src="/images/asset1_freecolor.svg"
                        alt="Icon"
                        className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180 mt-1 opacity-70"
                      />
                      <img
                        src="/images/asset1_freecolor.svg"
                        alt="Icon"
                        className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180 mt-1 opacity-40"
                      />
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col items-center">
                      <img
                        src="/images/asset1_freecolor.svg"
                        alt="Icon"
                        className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180 mt-1 opacity-100"
                      />
                      <img
                        src="/images/asset1_freecolor.svg"
                        alt="Icon"
                        className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180 mt-1 opacity-70"
                      />
                      <img
                        src="/images/asset1_freecolor.svg"
                        alt="Icon"
                        className="h-4 w-4 sm:h-5 sm:w-5 transform rotate-180 mt-1 opacity-40"
                      />
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="text-white border-white px-6 py-3 sm:px-10 sm:py-6 text-sm sm:text-lg font-bold rounded-lg border-2 hover:text-primary hover:bg-white">
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Right Section - Logo */}
        {window.innerWidth >= 768 && (
          <div className="mt-10 ml-10 lg:mt-0 lg:w-2/5 flex justify-center">
            <img
              src="/images/logo_notext_white.svg" // Replace with your actual logo path
              alt="Program Logo"
              className="w-auto max-h-[20vh] lg:max-h-[30vh]" // Ensure the logo height is responsive
            />
          </div>
        )}
      </div>
    </header>
  );
}