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
      
      const prompt = `Eres un tutor de inglés amigable y paciente. Un estudiante llamado ${userName} cometió un error en una lección de nivel ${currentLevel}.

Pregunta: ${lessonData.question}
Respuesta del estudiante: "${wrongAnswer}"
Respuesta correcta: "${correctAnswer}"

Por favor, proporciona una explicación breve (máximo 3 oraciones) y amigable en español sobre:
1. Por qué la respuesta del estudiante es incorrecta
2. Una explicación simple de la respuesta correcta
3. Un consejo para recordarlo

Usa un tono motivador y cercano. Hazlo corto y fácil de entender.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            { role: 'user', content: prompt }
          ]
        })
      });

      const data = await response.json();
      const explanation = data.content.find(item => item.type === 'text')?.text || 
                         'Lo siento, no pude generar una explicación en este momento.';
      
      setAiExplanation(explanation);
    } catch (error) {
      console.error('Error al obtener explicación de IA:', error);
      setAiExplanation('¡No te preocupes! Recuerda revisar la respuesta correcta y practicar más. ¡Tú puedes! 💪');
    } finally {
      setIsLoadingAI(false);
    }
  };

  return { aiExplanation, isLoadingAI, getAIExplanation, setAiExplanation };
};