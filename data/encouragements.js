export const encouragements = {
  correct: [
    '¡Excelente, {name}! 🎉',
    '¡Perfecto, {name}! Vas muy bien 👏',
    '¡Increíble, {name}! Sigue así 🌟',
    '¡Genial, {name}! Lo estás dominando 💪',
    '¡Fantástico, {name}! Eres un crack 🔥'
  ],
  incorrect: [
    'No te preocupes, {name}. ¡La práctica hace al maestro! 💪',
    'Casi lo tienes, {name}. ¡Inténtalo de nuevo! 🎯',
    '{name}, cada error es un aprendizaje 📚',
    '¡Ánimo, {name}! La próxima lo lograrás 🌟',
    'No pasa nada, {name}. ¡Sigamos adelante! 🚀'
  ],
  start: [
    '¡Vamos, {name}! Estoy aquí para ayudarte 🤝',
    '{name}, comencemos esta aventura juntos 🌍',
    '¡Adelante, {name}! Confío en ti 💫',
    'Preparado, {name}? ¡Vamos a aprender! 📖'
  ],
  streak: [
    '¡{streak} correctas seguidas, {name}! 🔥',
    '¡Racha de {streak}, {name}! Imparable 💥',
    '{name}, llevas {streak} seguidas! ⚡'
  ]
};

export const getRandomMessage = (type, userName, streak = null) => {
  const messages = encouragements[type];
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  return randomMsg.replace('{name}', userName).replace('{streak}', streak);
};