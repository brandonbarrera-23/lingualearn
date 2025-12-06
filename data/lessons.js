export const lessons = {
  en: {
    1: [
      { type: 'multiple', title: 'Saludos', question: '¿Cómo se dice "Hola"?', audio: 'Hello', options: ['Hello', 'Goodbye', 'Thanks', 'Please'], correct: 0, hint: 'Comienza con H' },
      { type: 'translate', title: 'Buenos días', question: 'Traduce: "Buenos días"', audio: 'Good morning', correctAnswer: 'good morning', hint: 'Good + parte del día' },
      { type: 'multiple', title: 'Despedida', question: '¿Cómo se dice "Adiós"?', audio: 'Goodbye', options: ['Hello', 'Goodbye', 'Please', 'Thanks'], correct: 1, hint: 'Good + bye' },
      { type: 'translate', title: 'Gracias', question: 'Traduce: "Gracias"', audio: 'Thank you', correctAnswer: 'thank you', hint: 'Thank...' },
      { type: 'multiple', title: 'Por favor', question: '¿Cómo se dice "Por favor"?', audio: 'Please', options: ['Please', 'Thanks', 'Sorry', 'Yes'], correct: 0, hint: 'Para pedir algo' },
      { type: 'complete', title: 'Verbo to be', question: 'I __ happy', audio: 'I am happy', options: ['am', 'is', 'are', 'be'], correct: 0, hint: 'Primera persona' },
      { type: 'multiple', title: 'Respuestas', question: '¿Cómo se dice "Sí"?', audio: 'Yes', options: ['Yes', 'No', 'Maybe', 'Please'], correct: 0, hint: 'Afirmativo' },
      { type: 'translate', title: 'Buenas noches', question: 'Traduce: "Buenas noches"', audio: 'Good night', correctAnswer: 'good night', hint: 'Good + noche' },
      { type: 'multiple', title: 'Disculpa', question: '¿Cómo se dice "Lo siento"?', audio: 'Sorry', options: ['Sorry', 'Please', 'Thanks', 'Yes'], correct: 0, hint: 'Para disculparse' },
      { type: 'listening', title: 'Escucha', question: 'Escucha y escribe:', audio: 'Good afternoon', correctAnswer: 'good afternoon', hint: 'Good + tarde' }
    ],
    // Aquí irían los niveles 2, 3, 4, 5 completos
  }
};