import { useState } from 'react';

export const useAITutor = () => {
  const [aiExplanation, setAiExplanation] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const getAIExplanation = async (userName, currentLevel, lessonData, wrongAnswerIndex, userText = null) => {
    setIsLoadingAI(true);
    setAiExplanation('');
    
    try {
      const wrongAnswer = wrongAnswerIndex !== null ? lessonData.options[wrongAnswerIndex] : userText;
      const correctAnswer = lessonData.audio;
      
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          currentLevel,
          lessonData,
          wrongAnswer,
          correctAnswer
        })
      });

      if (!response.ok) {
        throw new Error('Error al obtener explicación');
      }

      const data = await response.json();
      setAiExplanation(data.explanation);
      
    } catch (error) {
      console.error('Error:', error);
      setAiExplanation('¡No te preocupes! Recuerda revisar la respuesta correcta y practicar más. ¡Tú puedes! 💪');
    } finally {
      setIsLoadingAI(false);
    }
  };

  return { aiExplanation, isLoadingAI, getAIExplanation, setAiExplanation };
};