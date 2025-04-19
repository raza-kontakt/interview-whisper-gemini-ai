
import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MicrophoneButton from "./MicrophoneButton";
import ConversationDisplay from "./ConversationDisplay";
import InputSection from "./InputSection";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const InterviewAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiKey, setApiKey] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Your browser doesn't support speech recognition. Please use Chrome, Edge, or Safari.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    
    recognitionRef.current.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("");
      
      if (event.results[0].isFinal) {
        processTranscript(transcript);
      }
    };
    
    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [apiKey, resume, jobDescription]);
  
  const toggleListening = () => {
    if (!apiKey) {
      alert("Please enter your Gemini API key first");
      return;
    }
    
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };
  
  const processTranscript = async (transcript: string) => {
    if (!transcript.trim()) return;
    
    // Check if the transcript contains a question
    if (!hasQuestion(transcript)) return;
    
    setMessages(prev => [...prev, { role: "user", content: transcript }]);
    setIsProcessing(true);
    
    try {
      const response = await getGeminiResponse(transcript);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error getting response from Gemini:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I couldn't generate a response. Please check your API key and try again." 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const hasQuestion = (text: string): boolean => {
    // Simple heuristic to detect questions
    const questionPatterns = [
      /\?$/,
      /^(what|how|why|when|where|who|which|can|could|would|will|do|does|did|is|are|am|should|tell me)/i
    ];
    
    return questionPatterns.some(pattern => pattern.test(text.trim()));
  };
  
  const getGeminiResponse = async (question: string): Promise<string> => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      let prompt = `You are an interview coach helping a candidate prepare for a job interview. 
      Provide a concise and helpful answer (maximum 2-3 sentences) to this interview question: "${question}"`;
      
      if (resume && jobDescription) {
        prompt += `\n\nConsider the following context to make your answer more relevant:
        RESUME: ${resume}
        JOB DESCRIPTION: ${jobDescription}`;
      } else if (resume) {
        prompt += `\n\nConsider the candidate's resume for context: ${resume}`;
      } else if (jobDescription) {
        prompt += `\n\nConsider the job description for context: ${jobDescription}`;
      }
      
      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini API error:", error);
      throw error;
    }
  };
  
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <ConversationDisplay messages={messages} isProcessing={isProcessing} />
      
      <div className="flex justify-center my-6">
        <MicrophoneButton isListening={isListening} toggleListening={toggleListening} />
      </div>
      
      <InputSection 
        apiKey={apiKey}
        setApiKey={setApiKey}
        resume={resume}
        setResume={setResume}
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
      />
    </div>
  );
};

export default InterviewAssistant;
