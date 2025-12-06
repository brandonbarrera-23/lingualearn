export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userName, currentLevel, lessonData, wrongAnswer, correctAnswer } = req.body;

  const prompt = `Eres un tutor de inglés amigable y paciente. Un estudiante llamado ${userName} cometió un error en una lección de nivel ${currentLevel}.

Pregunta: ${lessonData.question}
Respuesta del estudiante: "${wrongAnswer}"
Respuesta correcta: "${correctAnswer}"

Por favor, proporciona una explicación breve (máximo 3 oraciones) y amigable en español sobre:
1. Por qué la respuesta del estudiante es incorrecta
2. Una explicación simple de la respuesta correcta
3. Un consejo para recordarlo

Usa un tono motivador y cercano. Hazlo corto y fácil de entender.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_AI_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de Google AI:', errorData);
      throw new Error('Error en la API de Google');
    }

    const data = await response.json();
    const explanation = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                       'Lo siento, no pude generar una explicación.';
    
    res.status(200).json({ explanation });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Error al obtener respuesta de IA',
      message: error.message 
    });
  }
}