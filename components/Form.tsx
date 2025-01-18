import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Form() {
  return (
    <form>
        {/* Section 1 - General Information */}
        <div 
            className="space-y-6 my-8 p-12 rounded-3xl bg-[linear-gradient(to_bottom_right,rgba(78,217,254,0.04),rgba(15,87,250,0.04))]"
        >
            <div className="flex justify-center items-center w-full">
                <h2 className="text-2xl  font-bold text-primary">Section 1 - General Information</h2>
            </div>
            
            {/* Full Name */}
            <div>
                <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                <Input id="name" type="text" placeholder="E.g. Nguyen Van A" required />
            </div>

            {/* Email */}
            <div>
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input id="email" type="email" placeholder="E.g. info.projectxvietnam@gmail.com" required />
            </div>

            {/* Phone Number */}
            <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                    id="phone"
                    type="text"
                    placeholder="E.g. (+84) 905-960-099"
                />
                <p className="text-sm text-subtitle mt-1">
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
                />
                <p className="text-sm text-subtitle mt-1">
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
                />
                <p className="text-sm text-subtitle mt-1">
                    Please state your full university name
                </p>
            </div>

            {/* Graduation Year */}
            <div>
                <Label htmlFor="grad_year">Graduation Year <span className="text-red-500">*</span></Label>
                <Input id="grad_year" type="text" placeholder="E.g. 2025" required />
            </div>

            {/* Major(s) */}
            <div>
                <Label htmlFor="major">Major(s) <span className="text-red-500">*</span></Label>
                <Input id="major" type="text" placeholder="E.g. Computer Science" required />
                <p className="text-sm text-subtitle mt-1">
                    Please state your full major
                </p>
            </div>

            {/* Minor(s) */}
            <div>
                <Label htmlFor="minor">Minor(s) <span className="text-red-500">*</span></Label>
                <Input id="minor" type="text" placeholder="E.g. Computer Science" required />
                <p className="text-sm text-subtitle mt-1">
                    Please state your full minor
                </p>
            </div>

            {/* Cumulative GPA */}
            <div>
                <Label htmlFor="gpa">Cumulative GPA <span className="text-red-500">*</span></Label>
                <Input id="gpa" type="number" placeholder="E.g. 4.0" required />
                <p className="text-sm text-subtitle mt-1">
                    Please state your cum. GPA on scale of 4.0
                </p>
            </div>
            

            {/* Resume */}
            <div>
                <Label htmlFor="resume">Your CV/Resume <span className="text-red-500">*</span></Label>
                <Input id="resume" type="file" accept=".pdf" required />
                <p className="text-sm text-subtitle mt-1">
                    Please upload your CV/Resume in PDF format
                </p>
            </div>

            {/* Career Interests */}
            <div>
                <Label htmlFor="career_interest">Area(s) of Interest for Internship <span className="text-red-500">*</span></Label>
                <p className="text-sm text-subtitle mt-1">
                    Please only select up to 5 areas of interest
                </p>
                <select
                id="career_interest"
                name="career_interest"
                multiple
                className="w-full border rounded-lg px-4 py-2"
                >
                <option value="swe">Software Engineering (SWE)</option>
                <option value="ai">Artificial Intelligence (AI)</option>
                <option value="ba">Business Analytics (BA)</option>
                <option value="da">Data Analytics (DA)</option>
                <option value="ds">Data Science (DS)</option>
                <option value="pm">Product Management</option>
                <option value="qa">QA/QC Testing</option>
                <option value="ux">UI/UX Design</option>
                <option value="devops">DevOps</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="blockchain">Blockchain</option>
                <option value="game">Game Development</option>
                <option value="hardware">Hardware Engineering</option>
                <option value="product-growth">Product Growth (Business in Tech)</option>
                <option value="others">Others (Please specify)</option>
                </select>
            </div>

            {/* Preferred Internship Location */}
            <div>
                <Label htmlFor="intern_location">Preferred Summer Internship Location <span className="text-red-500">*</span></Label>
                <select
                id="intern_location"
                name="intern_location"
                required
                className="w-full border rounded-lg px-4 py-2"
                >
                <option value="hcmc">HCMC</option>
                <option value="hanoi">Hanoi</option>
                <option value="remote">Remote</option>
                </select>
            </div>
        </div>

        {/* Section 2 - Personal Goals */}
        <div className="space-y-6 my-8 p-12 rounded-3xl bg-[linear-gradient(to_bottom_right,rgba(78,217,254,0.04),rgba(15,87,250,0.04))]" >
            <div className="flex justify-center items-center w-full">
                <h2 className="text-2xl  font-bold text-primary text-center w-full">Section 2 - Personal Goals</h2>
            </div>

            {/* Open Question 1 */}
            <div>
                <Label htmlFor="open_q1">
                    What are your career goals for the next 5 years? How do you think Project X Vietnam and this Fellowship program can support you in achieving them? <span className="text-red-500">*</span>
                </Label>
                <Textarea id="open_q1" placeholder="Max 250 words" className="h-60" required />
            </div>

            {/* Open Question 2 */}
            <div>
                <Label htmlFor="open_q2">
                    What preparations have you made to achieve these goals? Are you currently facing any difficulties? <span className="text-red-500">*</span>
                </Label>
                <Textarea id="open_q2" placeholder="Max 250 words" className="h-60" required />
            </div>

            {/* Open Question 3 */}
            <div>
                <Label htmlFor="open_q3">
                    What do you hope to gain from this Summer Fellowship Program this 2025? <span className="text-red-500">*</span>
                </Label>
                <Textarea id="open_q3" placeholder="Max 250 words" className="h-60" required />
            </div>

            {/* Note */}
            <div>
                <Label htmlFor="note">
                    Please share any additional information you would like us to consider while reviewing your application.
                </Label>
                <Textarea id="note" placeholder="Note here"/>
            </div>

            {/* Referral */}
            <div>
                <Label htmlFor="referral">
                    If you were referred, please provide the name of your referral contact.
                </Label>
                <Input id="referral" type="text" placeholder="E.g. Nguyen Van A"/>
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