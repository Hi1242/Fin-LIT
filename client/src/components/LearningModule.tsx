import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { learningSlides } from '../data/content';

export default function LearningModule() {
  const { state, dispatch } = useApp();
  const currentSlide = learningSlides[state.progress.currentSlide] || learningSlides[0];
  const progress = ((state.progress.currentSlide + 1) / learningSlides.length) * 100;

  const handleNext = () => {
    if (state.progress.currentSlide < learningSlides.length - 1) {
      dispatch({ 
        type: 'UPDATE_PROGRESS', 
        payload: { currentSlide: state.progress.currentSlide + 1 } 
      });
    } else {
      // Completed all slides, earn badge and go to quiz
      dispatch({ type: 'EARN_BADGE', payload: 'money-master' });
      dispatch({ type: 'SET_SCREEN', payload: 'quiz-game' });
    }
  };

  const handlePrev = () => {
    if (state.progress.currentSlide > 0) {
      dispatch({ 
        type: 'UPDATE_PROGRESS', 
        payload: { currentSlide: state.progress.currentSlide - 1 } 
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">Progress</span>
          <span className="text-sm font-semibold text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div 
            className="bg-gradient-to-r from-coral to-turquoise h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Slide Content */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-8 mb-8 min-h-96"
        key={currentSlide.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{currentSlide.title}</h2>
          
          <div className="w-full h-48 bg-gradient-to-r from-coral to-turquoise rounded-xl mb-6 flex items-center justify-center text-8xl">
            {currentSlide.id === 1 && '💰'}
            {currentSlide.id === 2 && '🏦'}
            {currentSlide.id === 3 && '🤔'}
            {currentSlide.id === 4 && '📊'}
          </div>
          
          <div className="text-left max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 mb-4">{currentSlide.content}</p>
            <ul className="text-lg text-gray-700 space-y-2">
              {currentSlide.points.map((point, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className={`mr-2 ${
                    index === 0 ? 'text-coral' : 
                    index === 1 ? 'text-turquoise' : 'text-sunny'
                  }`}>✓</span>
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
      
      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-colors duration-300 disabled:opacity-50"
          disabled={state.progress.currentSlide === 0}
          onClick={handlePrev}
        >
          Previous
        </button>
        
        <div className="flex space-x-2">
          {learningSlides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === state.progress.currentSlide ? 'bg-coral' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <button
          className="bg-coral text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-500 transition-colors duration-300"
          onClick={handleNext}
        >
          {state.progress.currentSlide === learningSlides.length - 1 ? 'Start Quiz!' : 'Next'}
        </button>
      </div>
    </div>
  );
}
