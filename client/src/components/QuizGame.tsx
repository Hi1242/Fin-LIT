import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { quizQuestions } from '../data/content';

export default function QuizGame() {
  const { state, dispatch } = useApp();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  
  const currentQuestion = quizQuestions[state.progress.currentQuestion] || quizQuestions[0];
  const progress = ((state.progress.currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (state.progress.currentQuestion < quizQuestions.length - 1) {
        dispatch({ 
          type: 'UPDATE_PROGRESS', 
          payload: { currentQuestion: state.progress.currentQuestion + 1 } 
        });
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        // Quiz completed
        dispatch({ type: 'UPDATE_PROGRESS', payload: { quizScore: score } });
        dispatch({ type: 'EARN_BADGE', payload: 'first-quiz' });
        dispatch({ type: 'SET_SCREEN', payload: 'budgeting-game' });
      }
    }, 2000);
  };

  const resetQuiz = () => {
    dispatch({ type: 'UPDATE_PROGRESS', payload: { currentQuestion: 0 } });
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <motion.h2 
          className="text-3xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Quiz Challenge! 🎯
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Test your money knowledge
        </motion.p>
      </div>
      
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-600">
              Question {state.progress.currentQuestion + 1} of {quizQuestions.length}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-600">Score:</span>
              <span className="bg-sunny text-gray-800 px-3 py-1 rounded-full font-bold">
                {score}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-turquoise h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="quiz-question mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            {currentQuestion.question}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                className={`p-4 rounded-xl text-left font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedAnswer === index 
                    ? 'bg-coral text-white' 
                    : 'bg-gray-100 hover:bg-coral hover:text-white'
                } ${
                  showExplanation && index === currentQuestion.correctAnswer
                    ? 'bg-green-500 text-white'
                    : showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer
                    ? 'bg-red-500 text-white'
                    : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: showExplanation ? 1 : 1.05 }}
                whileTap={{ scale: showExplanation ? 1 : 0.95 }}
              >
                {String.fromCharCode(65 + index)}) {option}
              </motion.button>
            ))}
          </div>
        </div>
        
        {showExplanation && (
          <motion.div
            className="mb-6 p-4 bg-blue-50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-blue-800 font-semibold">
              {currentQuestion.explanation}
            </p>
          </motion.div>
        )}
        
        <div className="text-center">
          <button
            className="bg-turquoise text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-500 transition-colors duration-300 disabled:opacity-50"
            disabled={selectedAnswer === null || showExplanation}
            onClick={handleSubmitAnswer}
          >
            Submit Answer
          </button>
        </div>
      </motion.div>
      
      <div className="text-center">
        <button
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-colors duration-300"
          onClick={resetQuiz}
        >
          Reset Quiz
        </button>
      </div>
    </div>
  );
}
