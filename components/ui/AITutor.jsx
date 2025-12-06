import { Sparkles } from 'lucide-react';

export const AITutor = ({ isLoading, explanation }) => {
  return (
    <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-full animate-pulse">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-blue-900">🤖 Tu Tutor IA te explica</h3>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      ) : (
        <p className="text-blue-900 leading-relaxed">{explanation}</p>
      )}
    </div>
  );
};