import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";


export default function Form() {
    // State for selected areas of interest & locations
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const options = [
    { id: "swe", label: "Software Engineering (SWE)" },
    { id: "ai", label: "Artificial Intelligence (AI)" },
    { id: "ba", label: "Business Analytics (BA)" },
    { id: "da", label: "Data Analytics (DA)" },
    { id: "ds", label: "Data Science (DS)" },
    { id: "pm", label: "Product Management" },
    { id: "qa", label: "QA/QC Testing" },
    { id: "ux", label: "UI/UX Design" },
    { id: "devops", label: "DevOps" },
    { id: "cybersecurity", label: "Cybersecurity" },
    { id: "blockchain", label: "Blockchain" },
    { id: "game", label: "Game Development" },
    { id: "hardware", label: "Hardware Engineering" },
    { id: "product-growth", label: "Product Growth (Business in Tech)" },
  ];

  const locations = [
    { id: "hcmc", label: "HCMC" },
    { id: "hanoi", label: "Hanoi" },
    { id: "remote", label: "Remote" },
  ];

  const handleToggle = (id: string, type: string) => {
    if (type === "interest") {
      setSelectedOptions((prev) =>
        prev.includes(id) ? prev.filter((option) => option !== id) : [...prev, id]
      );
    } else if (type === "location") {
      setSelectedLocations((prev) =>
        prev.includes(id) ? prev.filter((location) => location !== id) : [...prev, id]
      );
    }
  };


  return (
    <form>
        {/* Section 1 - General Information */}
        <div 
            className="space-y-6 my-8 p-12 rounded-3xl bg-[linear-gradient(to_bottom_right,rgba(78,217,254,0.05),rgba(15,87,250,0.05))]"
        >
            <div className="flex justify-center items-center w-full">
                <h2 className="sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Section 1 - General Information</h2>
            </div>
            
            {/* Full Name */}
            <div>
                <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                <Input id="name" type="text" placeholder="E.g. Nguyen Van A" className="text-sm" required />
            </div>

            {/* Email */}
            <div>
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input id="email" type="email" placeholder="E.g. info.projectxvietnam@gmail.com" className="text-sm" required />
            </div>

            {/* Phone Number */}
            <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                    id="phone"
                    type="text"
                    placeholder="E.g. (+84) 905-960-099"
                    className="text-sm"
                />
                <p className="text-xs md:text-sm text-subtitle mt-1">
                    {`Please follow this format: {Country Code} {Phone Number}. E.g. (+84) 905-960-099`}
                </p>
            </div>

            {/* Location */}
            <div>
                <Label htmlFor="location">Location this Summer <span className="text-red-500">*</span></Label>
                <Input
                id="location"
                type="text"
                placeholder="E.g. HCMC, Vietnam"
                required
                className="text-sm"
                />
                <p className="text-xs md:text-sm text-subtitle mt-1">
                {`Please follow this format: {City}, {Country}`}
                </p>
            </div>

            {/* University */}
            <div>
                <Label htmlFor="university">University <span className="text-red-500">*</span></Label>
                <Input
                id="university"
                type="text"
                placeholder="E.g. Ho Chi Minh City University of Technology"
                required
                className="text-sm"
                />
                <p className="text-xs md:text-sm text-subtitle mt-1">
                    Please state your full university name
                </p>
            </div>

            {/* Graduation Year */}
            <div>
                <Label htmlFor="grad_year">Graduation Year <span className="text-red-500">*</span></Label>
                <Input id="grad_year" type="text" placeholder="E.g. 2025" className="text-sm" required />
            </div>

            {/* Major(s) */}
            <div>
                <Label htmlFor="major">Major(s) <span className="text-red-500">*</span></Label>
                <Input id="major" type="text" placeholder="E.g. Computer Science" className="text-sm" required />
                <p className="text-xs md:text-sm text-subtitle mt-1">
                    Please state your full major
                </p>
            </div>

            {/* Minor(s) */}
            <div>
                <Label htmlFor="minor">Minor(s) <span className="text-red-500">*</span></Label>
                <Input id="minor" type="text" placeholder="E.g. Computer Science" className="text-sm" required />
                <p className="text-xs md:text-sm text-subtitle mt-1">
                    Please state your full minor
                </p>
            </div>

            {/* Cumulative GPA */}
            <div>
                <Label htmlFor="gpa">Cumulative GPA <span className="text-red-500">*</span></Label>
                <Input id="gpa" type="number" placeholder="E.g. 4.0" className="text-sm" required />
                <p className="text-xs md:text-sm text-subtitle mt-1">
                    Please state your cum. GPA on scale of 4.0
                </p>
            </div>
            

            {/* Resume */}
            <div>
                <Label htmlFor="resume">Your CV/Resume <span className="text-red-500">*</span></Label>
                <Input id="resume" type="file" accept=".pdf" className="text-sm" required />
                <p className="text-xs md:text-sm text-subtitle mt-1">
                    Please upload your CV/Resume in PDF format
                </p>
            </div>

            {/* Career Interests */}
            <div>
            <Label htmlFor="career_interest">Area(s) of Interest for Internship <span className="text-red-500">*</span></Label>
            <p className="text-xs md:text-sm text-subtitle mt-1">Please only select up to 5 areas of interest</p>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {options.map((option) => (
                <button
                    key={option.id}
                    type="button"
                    className={`flex items-center justify-center border rounded-lg px-4 py-2 text-left text-xs md:text-sm transition-all ${
                    selectedOptions.includes(option.id)
                        ? "bg-primary  opacity-80 text-white border-primary"
                        : "bg-white text-subtitle border-gray-400"
                    }`}
                    onClick={() => handleToggle(option.id, "interest")}
                    disabled={selectedOptions.length >= 5 && !selectedOptions.includes(option.id)}
                >
                    {option.label}
                </button>
                ))}
            </div>
            <p className="mt-2 text-xs md:text-sm text-subtitle">
                {selectedOptions.length}/5 options selected
            </p>
            </div>

            {/* Preferred Internship Location */}
            <div>
                <Label htmlFor="intern_location">
                Preferred Summer Internship Location <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs md:text-sm text-subtitle mt-1">Please select your preferred internship locations</p>
                <div className="grid grid-cols-3 gap-4 mt-2">
                {locations.map((location) => (
                    <button
                    key={location.id}
                    type="button"
                    className={`flex items-center justify-center border rounded-lg px-4 py-2 text-left text-sm transition-all ${
                        selectedLocations.includes(location.id)
                        ? "bg-primary opacity-80 text-white border-primary"
                        : "bg-white text-subtitle border-gray-400"
                    }`}
                    onClick={() => handleToggle(location.id, "location")}
                    >
                    {location.label}
                    </button>
                ))}
                </div>
            </div>
        </div>

        {/* Section 2 - Personal Goals */}
        <div className="space-y-6 my-8 p-12 rounded-3xl bg-[linear-gradient(to_bottom_right,rgba(78,217,254,0.05),rgba(15,87,250,0.05))]" >
            <div className="flex justify-center items-center w-full">
                <h2 className="sm:text-xl md:text-2xl  font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center w-full">Section 2 - Personal Goals</h2>
            </div>

            {/* Open Question 1 */}
            <div>
                <Label htmlFor="open_q1">
                    What are your career goals for the next 5 years? How do you think Project X Vietnam and this Fellowship program can support you in achieving them? <span className="text-red-500">*</span>
                </Label>
                <Textarea id="open_q1" placeholder="Max 250 words" className="h-60 text-sm mt-2" required />
            </div>

            {/* Open Question 2 */}
            <div>
                <Label htmlFor="open_q2">
                    What preparations have you made to achieve these goals? Are you currently facing any difficulties? <span className="text-red-500">*</span>
                </Label>
                <Textarea id="open_q2" placeholder="Max 250 words" className="h-60 text-sm mt-2" required />
            </div>

            {/* Open Question 3 */}
            <div>
                <Label htmlFor="open_q3">
                    What do you hope to gain from this Summer Fellowship Program this 2025? <span className="text-red-500">*</span>
                </Label>
                <Textarea id="open_q3" placeholder="Max 250 words" className="h-60 text-sm mt-2" required />
            </div>

            {/* Note */}
            <div>
                <Label htmlFor="note">
                    Please share any additional information you would like us to consider while reviewing your application.
                </Label>
                <Textarea id="note" placeholder="Note here" className="text-sm mt-2"/>
            </div>

            {/* Referral */}
            <div>
                <Label htmlFor="referral">
                    If you were referred, please provide the name of your referral contact.
                </Label>
                <Input id="referral" type="text" placeholder="E.g. Nguyen Van A" className="text-sm"/>
            </div>
        </div>
      
        {/* Submit Button */}
        <div className="w-full flex justify-center items-center">
            <Button
                type="submit"
                className="relative py-8 px-14 text-white text-xl font-bold rounded-2xl overflow-hidden group"
            >
                {/* Animated Gradient Background */}
                <span
                    className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary 
                    animate-gradient-x transition-transform duration-[2000ms] ease-in-out group-hover:animate-gradient-y"
                ></span>

                {/* Overlay for Glow */}
                <span
                    className="absolute inset-0 bg-gradient-to-br from-secondary to-primary opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-[2000ms]"
                ></span>

                {/* Button Text */}
                <span className="relative z-10">Submit Application</span>
            </Button>
            
        </div>
      
    </form>
  );
}