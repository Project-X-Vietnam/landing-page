import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white py-10 text-center">
      <h1 className="text-4xl font-bold">Summer Fellowship Program 2025</h1>
      <p className="mt-4 text-lg">
        Phoenix Vietnam’s annual fellowship program for 2025 with the mission of “Growing the next generation of tech youth.”
      </p>
      <p className="mt-2 text-sm">
        Application will be closed in: <span className="font-bold">14:21:52</span>
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <Button variant="default" className="bg-white text-primary px-6 py-2">
          Apply Below
        </Button>
        <Button variant="outline" className="text-white border-white px-6 py-2">
          Learn More
        </Button>
      </div>
    </header>
  );
}