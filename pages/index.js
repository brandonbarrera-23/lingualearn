import React, { useState, useEffect } from 'react';
import {BookOpen,Check,X,Star,Trophy,ChevronRight,Globe,Volume2,Mic,Type,MessageSquare,User,Sparkles,Lock,Award,Target,LogOut,Flame,} from 'lucide-react';
import { useAITutor } from '../hooks/useAITutor';

export default function LanguageTutor() {
const { aiExplanation, isLoadingAI, getAIExplanation } = useAITutor();

// ---- STATE ----
const [showAITutor, setShowAITutor] = useState(false);

const [screen, setScreen] = useState('login');
const [userName, setUserName] = useState('');
const [userEmail, setUserEmail] = useState('');
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [selectedLanguage, setSelectedLanguage] = useState(null);
const [currentLevel, setCurrentLevel] = useState(1);
const [currentLesson, setCurrentLesson] = useState(0);
const [score, setScore] = useState(0);
const [streak, setStreak] = useState(0);
const [totalScore, setTotalScore] = useState(0);
const [userProgress, setUserProgress] = useState({});
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [showResult, setShowResult] = useState(false);
const [textInput, setTextInput] = useState('');
const [showHint, setShowHint] = useState(false);
const [encouragementMessage, setEncouragementMessage] = useState('');

// ---- DATA ----
const languages = [
 {
   id: 'en',
   name: 'Inglés',
   flag: '🇬🇧',
   color: 'from-blue-500 to-blue-700',
   levels: 5,
 },
];

const levelDescriptions = {
 1: { name: 'Principiante', icon: '🌱', desc: 'Primeros pasos' },
 2: { name: 'Básico', icon: '📚', desc: 'Fundamentos esenciales' },
 3: { name: 'Intermedio', icon: '🎯', desc: 'Conversación práctica' },
 4: { name: 'Avanzado', icon: '🚀', desc: 'Dominio del idioma' },
 5: { name: 'Experto', icon: '👑', desc: 'Maestría completa' },
};

const encouragements = {
 correct: [
   '¡Excelente, {name}! 🎉',
   '¡Perfecto, {name}! Vas muy bien 👏',
   '¡Increíble, {name}! Sigue así 🌟',
   '¡Genial, {name}! Lo estás dominando 💪',
   '¡Fantástico, {name}! Eres un crack 🔥',
 ],
 incorrect: [
   'No te preocupes, {name}. ¡La práctica hace al maestro! 💪',
   'Casi lo tienes, {name}. ¡Inténtalo de nuevo! 🎯',
   '{name}, cada error es un aprendizaje 📚',
   '¡Ánimo, {name}! La próxima lo lograrás 🌟',
   'No pasa nada, {name}. ¡Sigamos adelante! 🚀',
 ],
 start: [
   '¡Vamos, {name}! Estoy aquí para ayudarte 🤝',
   '{name}, comencemos esta aventura juntos 🌍',
   '¡Adelante, {name}! Confío en ti 💫',
   'Preparado, {name}? ¡Vamos a aprender! 📖',
 ],
 streak: [
   '¡{streak} correctas seguidas, {name}! 🔥',
   '¡Racha de {streak}, {name}! Imparable 💥',
   '{name}, llevas {streak} seguidas! ⚡',
 ],
};

const lessons = {
 en: {
   1: [
     {
       type: 'multiple',
       title: 'Saludos',
       question: '¿Cómo se dice "Hola"?',
       audio: 'Hello',
       options: ['Hello', 'Goodbye', 'Thanks', 'Please'],
       correct: 0,
       hint: 'Comienza con H',
     },
     {
       type: 'translate',
       title: 'Buenos días',
       question: 'Traduce: "Buenos días"',
       audio: 'Good morning',
       correctAnswer: 'good morning',
       hint: 'Good + parte del día',
     },
     {
       type: 'multiple',
       title: 'Despedida',
       question: '¿Cómo se dice "Adiós"?',
       audio: 'Goodbye',
       options: ['Hello', 'Goodbye', 'Please', 'Thanks'],
       correct: 1,
       hint: 'Good + bye',
     },
     {
       type: 'translate',
       title: 'Gracias',
       question: 'Traduce: "Gracias"',
       audio: 'Thank you',
       correctAnswer: 'thank you',
       hint: 'Thank...',
     },
     {
       type: 'multiple',
       title: 'Por favor',
       question: '¿Cómo se dice "Por favor"?',
       audio: 'Please',
       options: ['Please', 'Thanks', 'Sorry', 'Yes'],
       correct: 0,
       hint: 'Para pedir algo',
     },
     {
       type: 'complete',
       title: 'Verbo to be',
       question: 'I __ happy',
       audio: 'I am happy',
       options: ['am', 'is', 'are', 'be'],
       correct: 0,
       hint: 'Primera persona',
     },
     {
       type: 'multiple',
       title: 'Respuestas',
       question: '¿Cómo se dice "Sí"?',
       audio: 'Yes',
       options: ['Yes', 'No', 'Maybe', 'Please'],
       correct: 0,
       hint: 'Afirmativo',
     },
     {
       type: 'translate',
       title: 'Buenas noches',
       question: 'Traduce: "Buenas noches"',
       audio: 'Good night',
       correctAnswer: 'good night',
       hint: 'Good + noche',
     },
     {
       type: 'multiple',
       title: 'Disculpa',
       question: '¿Cómo se dice "Lo siento"?',
       audio: 'Sorry',
       options: ['Sorry', 'Please', 'Thanks', 'Yes'],
       correct: 0,
       hint: 'Para disculparse',
     },
     {
       type: 'listening',
       title: 'Escucha',
       question: 'Escucha y escribe:',
       audio: 'Good afternoon',
       correctAnswer: 'good afternoon',
       hint: 'Good + tarde',
     },
   ],
   2: [
     {
       type: 'multiple',
       title: 'Números 1',
       question: '¿Cómo se dice "uno"?',
       audio: 'One',
       options: ['One', 'Two', 'Three', 'Four'],
       correct: 0,
       hint: 'Primero',
     },
     {
       type: 'translate',
       title: 'Números 2',
       question: 'Traduce: "Dos"',
       audio: 'Two',
       correctAnswer: 'two',
       hint: 'Después del uno',
     },
     {
       type: 'multiple',
       title: 'Números 3',
       question: '¿Cómo se dice "tres"?',
       audio: 'Three',
       options: ['Two', 'Three', 'Four', 'Five'],
       correct: 1,
       hint: 'Entre 2 y 4',
     },
     {
       type: 'complete',
       title: 'Artículos',
       question: 'This is __ apple',
       audio: 'This is an apple',
       options: ['a', 'an', 'the', 'one'],
       correct: 1,
       hint: 'Antes de vocal',
     },
     {
       type: 'multiple',
       title: 'Colores 1',
       question: '¿Cómo se dice "rojo"?',
       audio: 'Red',
       options: ['Blue', 'Red', 'Green', 'Yellow'],
       correct: 1,
       hint: 'Color de sangre',
     },
     {
       type: 'translate',
       title: 'Colores 2',
       question: 'Traduce: "Azul"',
       audio: 'Blue',
       correctAnswer: 'blue',
       hint: 'Color del cielo',
     },
     {
       type: 'multiple',
       title: 'Números 4',
       question: '¿Cómo se dice "cinco"?',
       audio: 'Five',
       options: ['Four', 'Five', 'Six', 'Seven'],
       correct: 1,
       hint: 'Después del cuatro',
     },
     {
       type: 'complete',
       title: 'Artículos 2',
       question: 'I have __ car',
       audio: 'I have a car',
       options: ['a', 'an', 'the', 'one'],
       correct: 0,
       hint: 'Antes de consonante',
     },
     {
       type: 'translate',
       title: 'Números 5',
       question: 'Traduce: "Diez"',
       audio: 'Ten',
       correctAnswer: 'ten',
       hint: 'Después del nueve',
     },
     {
       type: 'listening',
       title: 'Escucha',
       question: 'Escucha y escribe:',
       audio: 'I love you',
       correctAnswer: 'i love you',
       hint: 'Tres palabras de amor',
     },
   ],
   3: [
     {
       type: 'translate',
       title: 'Presentación',
       question: 'Traduce: "Me llamo María"',
       audio: 'My name is Maria',
       correctAnswer: 'my name is maria',
       hint: 'My name is...',
     },
     {
       type: 'complete',
       title: 'Preguntas',
       question: '__ are you?',
       audio: 'How are you',
       options: ['How', 'What', 'Where', 'Who'],
       correct: 0,
       hint: '¿Cómo...?',
     },
     {
       type: 'multiple',
       title: 'Familia 1',
       question: '¿Cómo se dice "madre"?',
       audio: 'Mother',
       options: ['Father', 'Mother', 'Brother', 'Sister'],
       correct: 1,
       hint: 'Mamá formal',
     },
     {
       type: 'translate',
       title: 'Familia 2',
       question: 'Traduce: "Padre"',
       audio: 'Father',
       correctAnswer: 'father',
       hint: 'Papá formal',
     },
     {
       type: 'multiple',
       title: 'Ubicación',
       question: '¿Cómo se dice "¿Dónde?"',
       audio: 'Where',
       options: ['Where', 'When', 'Why', 'Who'],
       correct: 0,
       hint: 'Lugar',
     },
     {
       type: 'complete',
       title: 'Verbo to be 2',
       question: 'She __ beautiful',
       audio: 'She is beautiful',
       options: ['am', 'is', 'are', 'be'],
       correct: 1,
       hint: 'Tercera persona',
     },
     {
       type: 'translate',
       title: 'Edad',
       question: 'Traduce: "Tengo 25 años"',
       audio: 'I am 25 years old',
       correctAnswer: 'i am 25 years old',
       hint: 'I am...',
     },
     {
       type: 'multiple',
       title: 'Ocupación',
       question: '¿Cómo se dice "trabajo"?',
       audio: 'Work',
       options: ['Work', 'Play', 'Study', 'Rest'],
       correct: 0,
       hint: 'Actividad laboral',
     },
     {
       type: 'complete',
       title: 'Preguntas 2',
       question: '__ old are you?',
       audio: 'How old are you',
       options: ['How', 'What', 'Where', 'When'],
       correct: 0,
       hint: 'Edad',
     },
     {
       type: 'listening',
       title: 'Escucha',
       question: 'Escucha y escribe:',
       audio: 'Nice to meet you',
       correctAnswer: 'nice to meet you',
       hint: 'Al conocer a alguien',
     },
   ],
   4: [
     {
       type: 'translate',
       title: 'Presente Simple',
       question: 'Traduce: "Yo trabajo todos los días"',
       audio: 'I work every day',
       correctAnswer: 'i work every day',
       hint: 'I work...',
     },
     {
       type: 'complete',
       title: 'Presente Simple 2',
       question: 'She __ to school',
       audio: 'She goes to school',
       options: ['go', 'goes', 'going', 'went'],
       correct: 1,
       hint: 'Tercera persona añade -es',
     },
     {
       type: 'multiple',
       title: 'Tiempo',
       question: '¿Cómo se dice "ayer"?',
       audio: 'Yesterday',
       options: ['Today', 'Yesterday', 'Tomorrow', 'Now'],
       correct: 1,
       hint: 'Pasado',
     },
     {
       type: 'translate',
       title: 'Pasado Simple',
       question: 'Traduce: "Yo comí pizza"',
       audio: 'I ate pizza',
       correctAnswer: 'i ate pizza',
       hint: 'I ate...',
     },
     {
       type: 'complete',
       title: 'Pasado Simple 2',
       question: 'They __ a movie yesterday',
       audio: 'They watched a movie yesterday',
       options: ['watch', 'watches', 'watched', 'watching'],
       correct: 2,
       hint: 'Pasado regular -ed',
     },
     {
       type: 'multiple',
       title: 'Frecuencia',
       question: '¿Cómo se dice "siempre"?',
       audio: 'Always',
       options: ['Always', 'Never', 'Sometimes', 'Often'],
       correct: 0,
       hint: 'Todo el tiempo',
     },
     {
       type: 'translate',
       title: 'Futuro',
       question: 'Traduce: "Iré mañana"',
       audio: 'I will go tomorrow',
       correctAnswer: 'i will go tomorrow',
       hint: 'I will...',
     },
     {
       type: 'complete',
       title: 'Presente Continuo',
       question: 'I __ studying now',
       audio: 'I am studying now',
       options: ['am', 'is', 'are', 'be'],
       correct: 0,
       hint: 'To be + -ing',
     },
     {
       type: 'multiple',
       title: 'Conectores',
       question: '¿Cómo se dice "porque"?',
       audio: 'Because',
       options: ['Because', 'But', 'And', 'Or'],
       correct: 0,
       hint: 'Para explicar',
     },
     {
       type: 'listening',
       title: 'Escucha',
       question: 'Escucha y escribe:',
       audio: 'What are you doing',
       correctAnswer: 'what are you doing',
       hint: 'Pregunta presente continuo',
     },
   ],
   5: [
     {
       type: 'translate',
       title: 'Condicional',
       question:
         'Traduce: "Si tuviera dinero, compraría una casa"',
       audio: 'If I had money I would buy a house',
       correctAnswer: 'if i had money i would buy a house',
       hint: 'If I had... I would...',
     },
     {
       type: 'complete',
       title: 'Pasado Perfecto',
       question: 'I __ already eaten',
       audio: 'I had already eaten',
       options: ['have', 'has', 'had', 'having'],
       correct: 2,
       hint: 'Pasado de have',
     },
     {
       type: 'multiple',
       title: 'Vocabulario',
       question: '¿Qué significa "although"?',
       audio: 'Although',
       options: ['Aunque', 'Porque', 'Entonces', 'Además'],
       correct: 0,
       hint: 'Contraste',
     },
     {
       type: 'translate',
       title: 'Voz Pasiva',
       question: 'Traduce: "La casa fue construida"',
       audio: 'The house was built',
       correctAnswer: 'the house was built',
       hint: 'Was + participio',
     },
     {
       type: 'complete',
       title: 'Reported Speech',
       question: 'She said she __ tired',
       audio: 'She said she was tired',
       options: ['is', 'was', 'be', 'been'],
       correct: 1,
       hint: 'Pasado indirecto',
     },
     {
       type: 'multiple',
       title: 'Phrasal Verbs',
       question: '¿Qué significa "give up"?',
       audio: 'Give up',
       options: ['Rendirse', 'Levantarse', 'Seguir', 'Empezar'],
       correct: 0,
       hint: 'Dejar de intentar',
     },
     {
       type: 'translate',
       title: 'Subjuntivo',
       question: 'Traduce: "Es importante que estudies"',
       audio: 'It is important that you study',
       correctAnswer: 'it is important that you study',
       hint: 'It is important that...',
     },
     {
       type: 'complete',
       title: 'Modales',
       question: 'You __ have told me',
       audio: 'You should have told me',
       options: ['should', 'must', 'can', 'will'],
       correct: 0,
       hint: 'Deber pasado',
     },
     {
       type: 'multiple',
       title: 'Expresiones',
       question: '¿Qué significa "piece of cake"?',
       audio: 'Piece of cake',
       options: ['Muy fácil', 'Pastel', 'Difícil', 'Aburrido'],
       correct: 0,
       hint: 'Idiom común',
     },
     {
       type: 'listening',
       title: 'Escucha',
       question: 'Escucha y escribe:',
       audio: 'Had I known I would have helped',
       correctAnswer: 'had i known i would have helped',
       hint: 'Condicional complejo',
     },
   ],
 },
};

// ---- HELPERS ----
const getRandomMessage = (type, customStreak = null) => {
 const messages = encouragements[type];
 const randomMsg =
   messages[Math.floor(Math.random() * messages.length)];
 return randomMsg
   .replace('{name}', userName)
   .replace('{streak}', customStreak || streak);
};

useEffect(() => {
 if (screen === 'lessons' && !showResult) {
   setEncouragementMessage(getRandomMessage('start'));
 }
 // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentLesson]);

const speakText = (text) => {
 if ('speechSynthesis' in window) {
   const utterance = new SpeechSynthesisUtterance(text);
   utterance.lang = 'en-US';
   utterance.rate = 0.8;
   utterance.pitch = 1;
   window.speechSynthesis.cancel();
   window.speechSynthesis.speak(utterance);
 }
};

const simulateGoogleLogin = () => {
 const email = `user${Math.floor(
   Math.random() * 10000
 )}@gmail.com`;
 setUserEmail(email);
 setIsAuthenticated(true);
 setScreen('welcome');
};

const handleLogout = () => {
 setIsAuthenticated(false);
 setUserEmail('');
 setUserName('');
 setScreen('login');
};

const getLevelProgress = (langId, level) => {
 const key = `${langId}_${level}`;
 return userProgress[key] || { completed: false, score: 0, stars: 0 };
};

const updateLevelProgress = (langId, level, score, total) => {
 const key = `${langId}_${level}`;
 const stars =
   score === total
     ? 3
     : score >= total * 0.8
     ? 2
     : score >= total * 0.6
     ? 1
     : 0;
 const newProgress = {
   ...userProgress,
   [key]: {
     completed: true,
     score,
     total,
     stars,
     lastCompleted: new Date().toISOString(),
   },
 };
 setUserProgress(newProgress);
 setTotalScore((prev) => prev + score * 10);
};

const isLevelUnlocked = (langId, level) => {
 if (level === 1) return true;
 const prevLevel = getLevelProgress(langId, level - 1);
 return prevLevel.completed;
};

const handleLanguageSelect = (lang) => {
 setSelectedLanguage(lang);
 setScreen('levels');
};

const handleLevelSelect = (level) => {
 if (!isLevelUnlocked(selectedLanguage.id, level)) return;
 setCurrentLevel(level);
 setScreen('lessons');
 setCurrentLesson(0);
 setScore(0);
 setStreak(0);
 setShowAITutor(false);
};

// ---- RESPUESTA MULTIPLE / COMPLETE ----
const handleAnswer = (index) => {
 if (showResult) return;
 setSelectedAnswer(index);
 setShowResult(true);

 const currentLessonData =
   lessons[selectedLanguage.id][currentLevel][currentLesson];
 const isCorrect = index === currentLessonData.correct;

 if (isCorrect) {
   setScore((prev) => prev + 1);
   const newStreak = streak + 1;
   setStreak(newStreak);
   setShowAITutor(false);
   setEncouragementMessage(
     newStreak >= 3
       ? getRandomMessage('streak', newStreak)
       : getRandomMessage('correct')
   );
 } else {
   setStreak(0);
   setEncouragementMessage(getRandomMessage('incorrect'));
   setShowAITutor(true);
   // Llamada al tutor IA
   getAIExplanation(
     userName,
     currentLevel,
     currentLessonData,
     index
   );
 }
};

// ---- RESPUESTA TEXTO / LISTENING ----
const handleTextSubmit = () => {
 if (showResult || !textInput.trim()) return;
 setShowResult(true);

 const currentLessonData =
   lessons[selectedLanguage.id][currentLevel][currentLesson];
 const isCorrect =
   textInput.toLowerCase().trim() ===
   currentLessonData.correctAnswer.toLowerCase().trim();

 if (isCorrect) {
   setScore((prev) => prev + 1);
   const newStreak = streak + 1;
   setStreak(newStreak);
   setShowAITutor(false);
   setEncouragementMessage(
     newStreak >= 3
       ? getRandomMessage('streak', newStreak)
       : getRandomMessage('correct')
   );
 } else {
   setStreak(0);
   setEncouragementMessage(getRandomMessage('incorrect'));
   setShowAITutor(true);
   // Aquí pasamos la respuesta escrita al tutor IA
   getAIExplanation(
     userName,
     currentLevel,
     currentLessonData,
     textInput
   );
 }
};

const nextLesson = () => {
 const totalLessons =
   lessons[selectedLanguage.id][currentLevel].length;
 if (currentLesson < totalLessons - 1) {
   setCurrentLesson((prev) => prev + 1);
   setSelectedAnswer(null);
   setShowResult(false);
   setTextInput('');
   setShowHint(false);
   setShowAITutor(false);
 } else {
   updateLevelProgress(
     selectedLanguage.id,
     currentLevel,
     score,
     totalLessons
   );
   setScreen('results');
   setShowAITutor(false);
 }
};

const resetToHome = () => {
 setScreen('home');
 setSelectedLanguage(null);
 setCurrentLesson(0);
 setScore(0);
 setStreak(0);
 setSelectedAnswer(null);
 setShowResult(false);
 setTextInput('');
 setShowHint(false);
 setShowAITutor(false);
};

// ---- LOGIN SCREEN ----
if (screen === 'login') {
 return (
   <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 flex items-center justify-center">
     <div className="max-w-md mx-auto w-full">
       <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
         <div className="mb-8">
           <div className="inline-block p-6 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full shadow-lg mb-4 animate-bounce">
             <Globe className="w-16 h-16 text-white" />
           </div>
           <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
             LinguaLearn
           </h1>
           <p className="text-gray-600 text-lg">
             Tu aventura de idiomas comienza aquí
           </p>
         </div>

         <div className="space-y-4 mb-8">
           <div className="flex items-center justify-center gap-4 text-gray-600">
             <div className="text-center">
               <Star className="w-8 h-8 text-yellow-500 mx-auto mb-1" />
               <p className="text-sm font-semibold">5 Niveles</p>
             </div>
             <div className="text-center">
               <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-1" />
               <p className="text-sm font-semibold">50 Lecciones</p>
             </div>
             <div className="text-center">
               <Target className="w-8 h-8 text-blue-500 mx-auto mb-1" />
               <p className="text-sm font-semibold">Inglés</p>
             </div>
           </div>
         </div>

         <button
           onClick={simulateGoogleLogin}
           className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
         >
           <svg className="w-6 h-6" viewBox="0 0 24 24">
             <path
               fill="#4285F4"
               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
             />
             <path
               fill="#34A853"
               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
             />
             <path
               fill="#FBBC05"
               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
             />
             <path
               fill="#EA4335"
               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
             />
           </svg>
           Empezar con Simulación
         </button>

         <p className="text-gray-500 text-sm mt-4">
           Tu progreso se guarda automáticamente
         </p>
       </div>
     </div>
   </div>
 );
}

// ---- WELCOME SCREEN ----
if (screen === 'welcome') {
 return (
   <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 flex items-center justify-center">
     <div className="max-w-md mx-auto w-full">
       <div className="bg-white rounded-3xl shadow-2xl p-8">
         <div className="text-center mb-8">
           <div className="inline-block p-4 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full shadow-lg mb-4 animate-pulse">
             <User className="w-12 h-12 text-white" />
           </div>
           <h1 className="text-3xl font-bold text-gray-800 mb-2">
             ¡Bienvenido! 👋
           </h1>
           <p className="text-gray-600 text-lg">
             ¿Cómo te gustaría que te llame?
           </p>
         </div>

         <div className="space-y-4">
           <input
             type="text"
             value={userName}
             onChange={(e) => setUserName(e.target.value)}
             onKeyPress={(e) =>
               e.key === 'Enter' &&
               userName.trim() &&
               setScreen('home')
             }
             placeholder="Tu nombre..."
             className="w-full p-4 rounded-xl text-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none transition-all"
             autoFocus
           />

           <button
             onClick={() =>
               userName.trim() && setScreen('home')
             }
             disabled={!userName.trim()}
             className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Comenzar Aventura 🚀
           </button>
         </div>
       </div>
     </div>
   </div>
 );
}

// ---- HOME SCREEN ----
if (screen === 'home') {
 return (
   <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4">
     <div className="max-w-md mx-auto">
       <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 mb-6 mt-4">
         <div className="flex items-center justify-between mb-3">
           <div>
             <h2 className="text-2xl font-bold text-white">
               ¡Hola, {userName}! 👋
             </h2>
             <p className="text-white text-sm opacity-90">
               Sigue aprendiendo hoy
             </p>
           </div>
           <button
             onClick={handleLogout}
             className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
           >
             <LogOut className="w-5 h-5 text-white" />
           </button>
         </div>
         <div className="flex items-center gap-4">
           <div className="bg-white bg-opacity-30 rounded-xl px-4 py-2 flex items-center gap-2">
             <Trophy className="w-5 h-5 text-yellow-300" />
             <span className="text-white font-bold">
               {totalScore} pts
             </span>
           </div>
           <div className="bg-white bg-opacity-30 rounded-xl px-4 py-2 flex items-center gap-2">
             <Target className="w-5 h-5 text-blue-300" />
             <span className="text-white font-bold">
               {
                 Object.values(userProgress).filter(
                   (p) => p.completed
                 ).length
               }{' '}
               completados
             </span>
           </div>
         </div>
       </div>

       <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
         <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
           <Globe className="mr-2 text-purple-600" />
           Comienza tu aprendizaje
         </h2>
         <div className="space-y-3">
           {languages.map((lang) => {
             const completedLevels = Array.from(
               { length: lang.levels },
               (_, i) => i + 1
             ).filter(
               (level) =>
                 getLevelProgress(lang.id, level).completed
             ).length;

             return (
               <button
                 key={lang.id}
                 onClick={() => handleLanguageSelect(lang)}
                 className={`w-full bg-gradient-to-r ${lang.color} text-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95`}
               >
                 <div className="flex items-center justify-between">
                   <div className="flex items-center">
                     <span className="text-3xl mr-3">
                       {lang.flag}
                     </span>
                     <div className="text-left">
                       <span className="text-xl font-semibold block">
                         {lang.name}
                       </span>
                       <span className="text-sm opacity-90">
                         {completedLevels}/{lang.levels} niveles ·
                         50 lecciones
                       </span>
                     </div>
                   </div>
                   <ChevronRight className="w-6 h-6" />
                 </div>
               </button>
             );
           })}
         </div>
       </div>

       <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-white text-center backdrop-blur-sm">
         <Sparkles className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
         <p className="text-sm font-semibold">
           ✨ Practica 10 min diarios para mejores resultados
         </p>
       </div>
     </div>
   </div>
 );
}

// ---- LEVELS SCREEN ----
if (screen === 'levels' && selectedLanguage) {
 return (
   <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 p-4">
     <div className="max-w-md mx-auto">
       <div className="flex items-center justify-between mb-6 pt-4">
         <button
           onClick={resetToHome}
           className="text-white font-semibold"
         >
           ← Volver
         </button>
         <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg">
           <Trophy className="w-5 h-5 text-yellow-500 mr-1" />
           <span className="font-bold text-gray-800">
             {totalScore}
           </span>
         </div>
       </div>

       <div className="text-center mb-6">
         <span className="text-6xl mb-3 block animate-bounce">
           {selectedLanguage.flag}
         </span>
         <h1 className="text-3xl font-bold text-white mb-2">
           {selectedLanguage.name}
         </h1>
         <p className="text-white opacity-90">
           Selecciona un nivel
         </p>
       </div>

       <div className="space-y-4">
         {Array.from(
           { length: selectedLanguage.levels },
           (_, i) => i + 1
         ).map((level) => {
           const progress = getLevelProgress(
             selectedLanguage.id,
             level
           );
           const unlocked = isLevelUnlocked(
             selectedLanguage.id,
             level
           );
           const levelInfo = levelDescriptions[level];

           return (
             <button
               key={level}
               onClick={() => handleLevelSelect(level)}
               disabled={!unlocked}
               className={`w-full rounded-2xl p-6 shadow-xl transition-all transform hover:scale-105 active:scale-95 ${
                 unlocked
                   ? 'bg-white hover:shadow-2xl'
                   : 'bg-gray-300 opacity-60 cursor-not-allowed'
               }`}
             >
               <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-3">
                   {unlocked ? (
                     <div
                       className={`p-3 rounded-full text-3xl ${
                         progress.completed
                           ? 'bg-green-100'
                           : 'bg-purple-100'
                       }`}
                     >
                       {progress.completed ? '✅' : levelInfo.icon}
                     </div>
                   ) : (
                     <div className="p-3 rounded-full bg-gray-200">
                       <Lock className="w-6 h-6 text-gray-500" />
                     </div>
                   )}
                   <div className="text-left">
                     <h3 className="text-xl font-bold text-gray-800">
                       Nivel {level} · {levelInfo.name}
                     </h3>
                     <p className="text-sm text-gray-600">
                       {progress.completed
                         ? `Completado: ${progress.score}/${progress.total}`
                         : unlocked
                         ? `${
                             lessons[selectedLanguage.id][level]
                               ?.length || 0
                           } lecciones · ${levelInfo.desc}`
                         : 'Bloqueado'}
                     </p>
                   </div>
                 </div>
                 {progress.completed && (
                   <div className="flex gap-1">
                     {Array.from({ length: 3 }).map((_, i) => (
                       <Star
                         key={i}
                         className={`w-5 h-5 ${
                           i < progress.stars
                             ? 'text-yellow-500 fill-yellow-500'
                             : 'text-gray-300'
                         }`}
                       />
                     ))}
                   </div>
                 )}
               </div>
               {unlocked && !progress.completed && (
                 <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-2 px-4 text-center font-semibold">
                   Comenzar Nivel
                 </div>
               )}
               {progress.completed && (
                 <div className="bg-green-100 text-green-700 rounded-xl py-2 px-4 text-center font-semibold">
                   Repetir Nivel
                 </div>
               )}
             </button>
           );
         })}
       </div>
     </div>
   </div>
 );
}

// ---- LESSONS SCREEN ----
if (screen === 'lessons' && selectedLanguage) {
 const currentLessonData =
   lessons[selectedLanguage.id][currentLevel][currentLesson];
 const totalLessons =
   lessons[selectedLanguage.id][currentLevel].length;
 const progress =
   ((currentLesson + 1) / totalLessons) * 100;

 const getLessonIcon = (type) => {
   switch (type) {
     case 'multiple':
       return <MessageSquare className="w-5 h-5" />;
     case 'translate':
       return <Type className="w-5 h-5" />;
     case 'complete':
       return <BookOpen className="w-5 h-5" />;
     case 'listening':
       return <Mic className="w-5 h-5" />;
     default:
       return <BookOpen className="w-5 h-5" />;
   }
 };

 const isTextCorrect =
   currentLessonData.correctAnswer &&
   textInput.toLowerCase().trim() ===
     currentLessonData.correctAnswer
       .toLowerCase()
       .trim();

 return (
   <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 pb-8">
     <div className="max-w-md mx-auto">
       <div className="flex items-center justify-between mb-4 pt-4">
         <button
           onClick={() => setScreen('levels')}
           className="text-white font-semibold"
         >
           ← Niveles
         </button>
         <div className="flex items-center gap-3">
           {streak >= 3 && (
             <div className="flex items-center bg-orange-500 rounded-full px-3 py-2 shadow-lg animate-pulse">
               <Flame className="w-5 h-5 text-white mr-1" />
               <span className="font-bold text-white">
                 {streak}
               </span>
             </div>
           )}
           <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg">
             <Star className="w-5 h-5 text-yellow-500 mr-1" />
             <span className="font-bold text-gray-800">
               {score}
             </span>
           </div>
         </div>
       </div>

       {encouragementMessage && (
         <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 mb-4 text-white text-center animate-bounce">
           <div className="flex items-center justify-center gap-2">
             <Sparkles className="w-5 h-5" />
             <p className="font-semibold">
               {encouragementMessage}
             </p>
           </div>
         </div>
       )}

       <div className="bg-white bg-opacity-30 rounded-full h-4 mb-6 overflow-hidden shadow-inner">
         <div
           className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500 shadow-lg"
           style={{ width: `${progress}%` }}
         />
       </div>

       <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
         <div className="text-center mb-6">
           <div className="flex items-center justify-center gap-2 mb-3">
             <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
               {getLessonIcon(currentLessonData.type)}
               Lección {currentLesson + 1} de {totalLessons}
             </span>
           </div>
           <h2 className="text-2xl font-bold text-gray-800 mb-3">
             {currentLessonData.title}
           </h2>
           <p className="text-gray-600 text-lg">
             {currentLessonData.question}
           </p>
         </div>

         {currentLessonData.type === 'listening' && !showResult && (
           <div className="flex justify-center mb-6">
             <button
               onClick={() => speakText(currentLessonData.audio)}
               className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
             >
               <Volume2 className="w-6 h-6" />
               <span className="font-semibold text-lg">
                 🔊 Escuchar
               </span>
             </button>
           </div>
         )}

         {showResult && (
           <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 mb-6 text-center shadow-lg">
             <p className="text-white text-sm mb-2 opacity-90 font-semibold">
               ✅ Respuesta correcta:
             </p>
             <div className="flex items-center justify-center mb-2">
               <button
                 onClick={() =>
                   speakText(currentLessonData.audio)
                 }
                 className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all mr-3"
               >
                 <Volume2 className="w-5 h-5 text-white" />
               </button>
               <p className="text-white text-3xl font-bold">
                 {currentLessonData.audio}
               </p>
             </div>
           </div>
         )}

         {(currentLessonData.type === 'multiple' ||
           currentLessonData.type === 'complete') && (
           <div className="space-y-3">
             {currentLessonData.options.map(
               (option, index) => {
                 const isSelected = selectedAnswer === index;
                 const isCorrect =
                   index === currentLessonData.correct;
                 const showCorrect = showResult && isCorrect;
                 const showIncorrect =
                   showResult && isSelected && !isCorrect;

                 return (
                   <button
                     key={index}
                     onClick={() => handleAnswer(index)}
                     disabled={showResult}
                     className={`w-full p-4 rounded-xl font-semibold text-lg transition-all transform active:scale-95 flex items-center justify-between
                       ${
                         showCorrect
                           ? 'bg-green-500 text-white shadow-lg scale-105'
                           : ''
                       }
                       ${
                         showIncorrect
                           ? 'bg-red-500 text-white shadow-lg'
                           : ''
                       }
                       ${
                         !showResult
                           ? 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 hover:from-purple-50 hover:to-pink-50 shadow-md hover:shadow-lg border-2 border-transparent hover:border-purple-300'
                           : ''
                       }
                       ${
                         showResult &&
                         !isSelected &&
                         !isCorrect
                           ? 'bg-gray-100 text-gray-400'
                           : ''
                       }
                     `}
                   >
                     <span>{option}</span>
                     {showCorrect && (
                       <Check className="w-6 h-6 animate-bounce" />
                     )}
                     {showIncorrect && (
                       <X className="w-6 h-6" />
                     )}
                   </button>
                 );
               }
             )}
           </div>
         )}

         {(currentLessonData.type === 'translate' ||
           currentLessonData.type === 'listening') && (
           <div className="space-y-4">
             <input
               type="text"
               value={textInput}
               onChange={(e) => setTextInput(e.target.value)}
               onKeyPress={(e) =>
                 e.key === 'Enter' && handleTextSubmit()
               }
               disabled={showResult}
               placeholder={`Escribe aquí, ${userName}...`}
               className={`w-full p-4 rounded-xl text-lg border-2 focus:outline-none transition-all
                 ${
                   showResult
                     ? isTextCorrect
                       ? 'border-green-500 bg-green-50'
                       : 'border-red-500 bg-red-50'
                     : 'border-purple-300 focus:border-purple-500 bg-white'
                 }
               `}
             />
             {!showResult && (
               <button
                 onClick={handleTextSubmit}
                 disabled={!textInput.trim()}
                 className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 Verificar Respuesta ✓
               </button>
             )}
             {showResult && (
               <div
                 className={`p-4 rounded-xl flex items-center gap-3 ${
                   isTextCorrect
                     ? 'bg-green-100 text-green-800 border-2 border-green-300'
                     : 'bg-red-100 text-red-800 border-2 border-red-300'
                 }`}
               >
                 {isTextCorrect ? (
                   <Check className="w-6 h-6 animate-bounce" />
                 ) : (
                   <X className="w-6 h-6" />
                 )}
                 <span className="font-semibold">
                   {isTextCorrect
                     ? `¡Exacto, ${userName}! 🎉`
                     : `Mira la respuesta correcta arriba 👆`}
                 </span>
               </div>
             )}
           </div>
         )}

         {!showResult && (
           <div className="mt-6">
             <button
               onClick={() => setShowHint(!showHint)}
               className="w-full bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 py-3 rounded-xl font-semibold hover:from-yellow-200 hover:to-yellow-300 transition-all shadow-md"
             >
               {showHint
                 ? '🙈 Ocultar Pista'
                 : `💡 ¿Necesitas ayuda, ${userName}?`}
             </button>
             {showHint && (
               <div className="mt-3 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
                 <p className="text-yellow-900 text-center font-medium">
                   💡 {currentLessonData.hint}
                 </p>
               </div>
             )}
           </div>
         )}

         {/* --- BLOQUE TUTOR IA --- */}
         {showAITutor && showResult && (
           <div className="mt-6 mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-5 shadow-lg">
             <div className="flex items-center gap-3 mb-3">
               <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-full animate-pulse">
                 <span className="text-2xl">🤖</span>
               </div>
               <h3 className="text-lg font-bold text-blue-900">
                 Tu Tutor IA te explica
               </h3>
             </div>
             {isLoadingAI ? (
               <div className="flex items-center justify-center py-4">
                 <div className="flex gap-2">
                   <div
                     className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                     style={{ animationDelay: '0ms' }}
                   />
                   <div
                     className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                     style={{ animationDelay: '150ms' }}
                   />
                   <div
                     className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                     style={{ animationDelay: '300ms' }}
                   />
                 </div>
               </div>
             ) : (
               <p className="text-blue-900 leading-relaxed">
                 {aiExplanation}
               </p>
             )}
           </div>
         )}

         {showResult && (
           <button
             onClick={() => {
               nextLesson();
               setShowHint(false);
             }}
             className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
           >
             {currentLesson < totalLessons - 1
               ? `Siguiente, ${userName}! →`
               : `Ver Resultados 🏆`}
           </button>
         )}
       </div>
     </div>
   </div>
 );
}

// ---- RESULTS SCREEN ----
if (screen === 'results') {
 const totalLessons =
   lessons[selectedLanguage.id][currentLevel].length;
 const percentage = Math.round(
   (score / totalLessons) * 100
 );
 const stars =
   score === totalLessons
     ? 3
     : score >= totalLessons * 0.8
     ? 2
     : score >= totalLessons * 0.6
     ? 1
     : 0;

 let message = '';
 let emoji = '';
 let personalMessage = '';

 if (percentage === 100) {
   message = '¡PERFECTO!';
   emoji = '🏆';
   personalMessage = `${userName}, eres increíble! Dominaste este nivel completamente`;
 } else if (percentage >= 80) {
   message = '¡EXCELENTE!';
   emoji = '🌟';
   personalMessage = `${userName}, estoy muy orgulloso de ti!`;
 } else if (percentage >= 60) {
   message = '¡BUEN TRABAJO!';
   emoji = '👍';
   personalMessage = `${userName}, vas por buen camino`;
 } else {
   message = '¡SIGUE ADELANTE!';
   emoji = '💪';
   personalMessage = `${userName}, cada intento cuenta!`;
 }

 return (
   <div className="min-h-screen bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 p-4 flex items-center justify-center">
     <div className="max-w-md mx-auto w-full">
       <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
         <div className="mb-6">
           <div className="text-7xl mb-4 animate-bounce">
             {emoji}
           </div>
           <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4 animate-pulse" />
           <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
             {message}
           </h1>
           <p className="text-gray-600 text-lg mb-2 font-semibold">
             {personalMessage}
           </p>
           <p className="text-gray-500">
             Nivel {currentLevel} - {selectedLanguage.name}
           </p>
         </div>

         <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-6 shadow-lg">
           <p className="text-white text-7xl font-bold mb-2">
             {percentage}%
           </p>
           <p className="text-white text-xl mb-3">
             Puntaje: {score}/{totalLessons}
           </p>
           <div className="flex justify-center gap-2">
             {Array.from({ length: 3 }).map((_, i) => (
               <Star
                 key={i}
                 className={`w-8 h-8 ${
                   i < stars
                     ? 'text-yellow-300 fill-yellow-300 animate-pulse'
                     : 'text-white opacity-30'
                 }`}
               />
             ))}
           </div>
         </div>

         <div className="grid grid-cols-2 gap-4 mb-6">
           <div className="bg-green-100 p-4 rounded-xl border-2 border-green-300">
             <Check className="w-8 h-8 text-green-600 mx-auto mb-1" />
             <div className="text-green-600 text-3xl font-bold">
               {score}
             </div>
             <div className="text-green-800 text-sm font-semibold">
               Correctas
             </div>
           </div>
           <div className="bg-red-100 p-4 rounded-xl border-2 border-red-300">
             <X className="w-8 h-8 text-red-600 mx-auto mb-1" />
             <div className="text-red-600 text-3xl font-bold">
               {totalLessons - score}
             </div>
             <div className="text-red-800 text-sm font-semibold">
               Incorrectas
             </div>
           </div>
         </div>

         <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-6">
           <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
           <p className="text-purple-800 font-bold text-lg">
             +{score * 10} puntos
           </p>
           <p className="text-purple-600 text-sm">
             Total acumulado: {totalScore} pts
           </p>
         </div>

         <div className="space-y-3">
           <button
             onClick={() => setScreen('levels')}
             className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
           >
             📚 Ver Otros Niveles
           </button>
           <button
             onClick={() => {
               setScreen('lessons');
               setCurrentLesson(0);
               setScore(0);
               setStreak(0);
               setSelectedAnswer(null);
               setShowResult(false);
               setTextInput('');
               setShowHint(false);
               setShowAITutor(false);
             }}
             className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
           >
             🔄 Repetir Nivel
           </button>
           <button
             onClick={resetToHome}
             className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
           >
             🏠 Ir al Inicio
           </button>
         </div>
       </div>
     </div>
   </div>
 );
}

// fallback (no debería pasar)
return null;
}
