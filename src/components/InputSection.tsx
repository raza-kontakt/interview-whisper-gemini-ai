
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface InputSectionProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  resume: string;
  setResume: (resume: string) => void;
  jobDescription: string;
  setJobDescription: (description: string) => void;
}

const InputSection = ({
  apiKey,
  setApiKey,
  resume,
  setResume,
  jobDescription,
  setJobDescription,
}: InputSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="mb-4">
        <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">
          Gemini API Key
        </label>
        <Input
          id="api-key"
          type="password"
          placeholder="Enter your Gemini API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Get your API key from{" "}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="text-purple-600 hover:underline"
          >
            Google AI Studio
          </a>
        </p>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between items-center border-dashed"
          >
            {isOpen ? "Hide Context" : "Add Resume & Job Description"}
            <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                Resume
              </label>
              <Textarea
                id="resume"
                placeholder="Paste your resume here..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                className="w-full h-32"
              />
            </div>
            
            <div>
              <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-32"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default InputSection;
