import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { uploadFile, submitFormData } from '@/lib/form-submission';
import { toast } from "sonner";
import { useState } from "react";

// Định nghĩa kiểu dữ liệu cho formData
interface ApplicationFormData {
    name: string;
    email: string;
    phone: string;
    location: string;
    university: string;
    grad_year: string;
    major: string;
    minor: string;
    gpa: string;
    open_q1: string;
    open_q2: string;
    open_q3: string;
    note: string;
    referral: string;
    career_interest: string[];
    intern_location: string[];
    source: string[];
  }

export default function Form() {
  // State for selected areas of interest & locations
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Form data state
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    university: '',
    grad_year: '',
    major: '',
    minor: '',
    gpa: '',
    open_q1: '',
    open_q2: '',
    open_q3: '',
    note: '',
    referral: '',
    career_interest: [],
    intern_location: [],
    source: [],
  });


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

  const sources = [
    "Social Media",
    "Email Marketing",
    "Media Support & Partnership",
    "KOL/KOC",
    "Ambassador",
    "Community",
    "Referral",
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
    } else if (type === "source") {
      setSelectedSources((prev) =>
        prev.includes(id) ? prev.filter((source) => source !== id) : [...prev, id]
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    if (selectedOptions.length === 0) {
      toast.error("Please select at least one area of interest");
      return;
    }

    if (selectedLocations.length === 0) {
      toast.error("Please select at least one preferred location");
      return;
    }

    if (selectedSources.length === 0) {
      toast.error("Please select at least one source");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload file first
    const fileToken = await uploadFile(resumeFile, formData.name);

    // Tạo ApplicationFormData object
    const applicationData: ApplicationFormData = {
      ...formData,
      career_interest: selectedOptions.map(id =>
        options.find(opt => opt.id === id)?.label || ''
      ),
      intern_location: selectedLocations.map(id =>
        locations.find(loc => loc.id === id)?.label || ''
      ),
      source: selectedSources,
    };

    const formDataToSubmit = new FormData();
    Object.entries(applicationData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formDataToSubmit.append(`${key}[]`, item);
          });
        } else {
          formDataToSubmit.append(key, value);
        }
    });

      // Then submit form data
      const success = await submitFormData(formDataToSubmit, fileToken);

      if (success) {
        toast.success("Application submitted successfully!");
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          university: '',
          grad_year: '',
          major: '',
          minor: '',
          gpa: '',
          open_q1: '',
          open_q2: '',
          open_q3: '',
          note: '',
          referral: '',
          career_interest: [],
          intern_location: [],
          source: [],
        });
        setSelectedOptions([]);
        setSelectedLocations([]);
        setSelectedSources([]);
        setResumeFile(null);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast.error("Failed to submit application. Please try again later.");
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Section 1 - General Information */}
      <div className="space-y-6 my-8 p-12 rounded-3xl bg-[linear-gradient(to_bottom_right,rgba(78,217,254,0.05),rgba(15,87,250,0.05))]">
        <div className="flex justify-center items-center w-full">
          <h2 className="sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Section 1 - General Information
          </h2>
        </div>

        {/* Full Name */}
        <div>
          <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="E.g. Nguyen Van A"
            className="text-sm"
            required
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="E.g. info.projectxvietnam@gmail.com"
            className="text-sm"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="text"
            value={formData.phone}
            onChange={handleInputChange}
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
            value={formData.location}
            onChange={handleInputChange}
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
            value={formData.university}
            onChange={handleInputChange}
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
          <Input
            id="grad_year"
            type="text"
            value={formData.grad_year}
            onChange={handleInputChange}
            placeholder="E.g. 2025"
            className="text-sm"
            required
          />
        </div>

        {/* Major(s) */}
        <div>
          <Label htmlFor="major">Major(s) <span className="text-red-500">*</span></Label>
          <Input
            id="major"
            type="text"
            value={formData.major}
            onChange={handleInputChange}
            placeholder="E.g. Computer Science"
            className="text-sm"
            required
          />
          <p className="text-xs md:text-sm text-subtitle mt-1">
            Please state your full major
          </p>
        </div>

        {/* Minor(s) */}
        <div>
          <Label htmlFor="minor">Minor(s)</Label>
          <Input
            id="minor"
            type="text"
            value={formData.minor}
            onChange={handleInputChange}
            placeholder="E.g. Computer Science"
            className="text-sm"
          />
          <p className="text-xs md:text-sm text-subtitle mt-1">
            Please state your full minor
          </p>
        </div>

        {/* Cumulative GPA */}
        <div>
          <Label htmlFor="gpa">Cumulative GPA <span className="text-red-500">*</span></Label>
          <Input
            id="gpa"
            type="number"
            value={formData.gpa}
            onChange={handleInputChange}
            placeholder="E.g. 4.0"
            className="text-sm"
            required
            step="0.01"
            min="0"
            max="4"
          />
          <p className="text-xs md:text-sm text-subtitle mt-1">
            Please state your cum. GPA on scale of 4.0
          </p>
        </div>

        {/* Resume */}
        <div>
          <Label htmlFor="resume">Your CV/Resume <span className="text-red-500">*</span></Label>
          <Input
            id="resume"
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className="text-sm"
            required
          />
          <p className="text-xs md:text-sm text-subtitle mt-1">
            Please upload your CV/Resume in PDF format. Make sure the file size is under 20MB.
          </p>
        </div>

        {/* Career Interests */}
        <div>
          <Label htmlFor="career_interest">
            Area(s) of Interest for Internship <span className="text-red-500">*</span>
          </Label>
          <p className="text-xs md:text-sm text-subtitle mt-1">
            Please only select up to 5 areas of interest
          </p>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`flex items-center justify-center border rounded-lg px-4 py-2 text-left text-xs md:text-sm transition-all ${
                  selectedOptions.includes(option.id)
                    ? "bg-primary opacity-80 text-white border-primary"
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
          <p className="text-xs md:text-sm text-subtitle mt-1">
            Please select your preferred internship locations
          </p>
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
      <div className="space-y-6 my-8 p-12 rounded-3xl bg-[linear-gradient(to_bottom_right,rgba(78,217,254,0.05),rgba(15,87,250,0.05))]">
        <div className="flex justify-center items-center w-full">
          <h2 className="sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-center w-full">
            Section 2 - Personal Goals
          </h2>
        </div>

        {/* Open Question 1 */}
        <div>
          <Label htmlFor="open_q1">
            What are your career goals for the next 5 years? How do you think Project X Vietnam and this Fellowship program can support you in achieving them? <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="open_q1"
            value={formData.open_q1}
            onChange={handleInputChange}
            placeholder="Max 250 words"
            className="h-60 text-sm mt-2"
            required
          />
        </div>

        {/* Open Question 2 */}
        <div>
          <Label htmlFor="open_q2">
            What preparations have you made to achieve these goals? Are you currently facing any difficulties? <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="open_q2"
            value={formData.open_q2}
            onChange={handleInputChange}
            placeholder="Max 250 words"
            className="h-60 text-sm mt-2"
            required
          />
        </div>

        {/* Open Question 3 */}
        <div>
          <Label htmlFor="open_q3">
            What do you hope to gain from this Summer Fellowship Program this 2025? <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="open_q3"
            value={formData.open_q3}
            onChange={handleInputChange}
            placeholder="Max 250 words"
            className="h-60 text-sm mt-2"
            required
          />
        </div>

        {/* Note */}
        <div>
          <Label htmlFor="note">
            Please share any additional information you would like us to consider while reviewing your application.
          </Label>
          <Textarea
            id="note"
            value={formData.note}
            onChange={handleInputChange}
            placeholder="Note here"
            className="text-sm mt-2"
          />
        </div>

        {/* Referral */}
        <div>
          <Label htmlFor="referral">
            If you were referred, please provide the name of your referral contact.
          </Label>
          <Input
            id="referral"
            type="text"
            value={formData.referral}
            onChange={handleInputChange}
            placeholder="E.g. Nguyen Van A"
            className="text-sm"
          />
        </div>

        {/* Source */}
        <div>
          <Label htmlFor="source">
            Where have you heard about Project X Summer Fellowship Program from? <span className="text-red-500">*</span>
          </Label>
          <p className="text-xs md:text-sm text-subtitle mt-1">
            Please select the source(s) that best apply to you.
          </p>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {sources.map((source, index) => (
              <button
                key={index}
                type="button"
                className={`flex items-center justify-center border rounded-lg px-4 py-2 text-left text-xs md:text-sm transition-all ${
                  selectedSources.includes(source)
                    ? "bg-primary opacity-80 text-white border-primary"
                    : "bg-white text-subtitle border-gray-400"
                }`}
                onClick={() => handleToggle(source, "source")}
              >
                {source}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center items-center">
        <Button
          type="submit"
          disabled={isSubmitting}
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
          <span className="relative z-10">
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </span>
        </Button>
      </div>
    </form>
  );
}
