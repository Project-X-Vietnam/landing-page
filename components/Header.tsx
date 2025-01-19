import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Header() {
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const targetDate = new Date("2025-02-23T23:59:00+07:00");

    const updateTimer = () => {
      const now = new Date();
      const timeDiff = targetDate.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setTimeRemaining("Time&apos;s up!");
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

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(timerInterval);
  }, []);

  return (
    <header className="bg-gradient-to-tr from-primary to-secondary text-white pt-20 pb-10 px-6 sm:px-10">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
        <div className="lg:w-3/5 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
            SUMMER FELLOWSHIP<br />PROGRAM 2025
          </h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg">
            Project X Vietnam officially launch our annual Summer Fellowship Program for 2025 with the mission of &quot;Moving forward the next generation of tech youth&quot;.
          </p>

          {timeRemaining ? (
            <>
              {isMobile ? (
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
              Form&apos;s closed!
            </p>
          )}

          <div className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            {isMobile ? (
              <>
                <Button variant="outline" className="text-white border-white px-6 py-3 sm:px-10 sm:py-6 text-sm sm:text-lg font-bold rounded-lg border-2 hover:text-primary hover:bg-white">
                  Learn More
                </Button>
                <div className="flex flex-col">
                  <Button className="bg-white text-primary px-6 py-3 sm:px-10 sm:py-6 text-sm sm:text-lg font-bold rounded-lg border-2 border-white hover:text-primary hover:bg-white">
                    Apply Below
                  </Button>
                  <ArrowIcons />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Button className="bg-white text-primary px-6 py-3 sm:px-10 sm:py-6 text-sm sm:text-lg font-bold rounded-lg border-2 border-white hover:text-primary hover:bg-white">
                    Apply Below
                  </Button>
                  <ArrowIcons />
                </div>
                <Button variant="outline" className="text-white border-white px-6 py-3 sm:px-10 sm:py-6 text-sm sm:text-lg font-bold rounded-lg border-2 hover:text-primary hover:bg-white">
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>

        {!isMobile && (
          <div className="mt-10 ml-10 lg:mt-0 lg:w-2/5 flex justify-center">
            <img
              src="/images/logo_notext_white.svg"
              alt="Program Logo"
              className="w-auto max-h-[20vh] lg:max-h-[30vh]"
            />
          </div>
        )}
      </div>
    </header>
  );
}

function ArrowIcons() {
  return (
    <div className="flex justify-center items-center gap-6 mt-2 sm:gap-12">
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
  );
}
