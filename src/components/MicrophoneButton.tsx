
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MicrophoneButtonProps {
  isListening: boolean;
  toggleListening: () => void;
}

const MicrophoneButton = ({ isListening, toggleListening }: MicrophoneButtonProps) => {
  return (
    <Button
      onClick={toggleListening}
      className={`p-6 rounded-full ${
        isListening 
          ? "bg-red-500 hover:bg-red-600 animate-pulse" 
          : "bg-purple-600 hover:bg-purple-700"
      }`}
    >
      {isListening ? (
        <Mic className="h-8 w-8 text-white" />
      ) : (
        <MicOff className="h-8 w-8 text-white" />
      )}
    </Button>
  );
};

export default MicrophoneButton;
