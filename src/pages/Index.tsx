
import InterviewAssistant from "@/components/InterviewAssistant";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Whisper AI</h1>
          <p className="text-gray-600">
            Your AI-powered interview assistant. Ask questions out loud and get instant feedback.
          </p>
        </header>

        <main className="bg-white rounded-xl shadow-sm p-6 min-h-[600px]">
          <InterviewAssistant />
        </main>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Powered by Gemini AI and Web Speech API</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
