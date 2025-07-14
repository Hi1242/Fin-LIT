import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Navigation() {
  const { state, dispatch } = useApp();

  const navigateToScreen = (screen: typeof state.currentScreen) => {
    dispatch({ type: 'SET_SCREEN', payload: screen });
  };

  if (state.currentScreen === 'avatar-selection') {
    return null;
  }

  return (
    <motion.div
      className="fixed left-4 top-20 bg-white rounded-2xl shadow-lg p-4 z-50"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col space-y-6">
        <button
          className={`nav-item flex flex-col items-center space-y-1 px-3 py-3 rounded-xl transition-colors duration-300 ${
            state.currentScreen === 'avatar-selection' ? 'bg-coral text-white' : 'hover:bg-gray-100'
          }`}
          onClick={() => navigateToScreen('avatar-selection')}
        >
          <span className="text-xl">🏠</span>
          <span className="text-xs font-semibold text-gray-600">Home</span>
        </button>
        
        <button
          className={`nav-item flex flex-col items-center space-y-1 px-3 py-3 rounded-xl transition-colors duration-300 ${
            state.currentScreen === 'learning-module' ? 'bg-coral text-white' : 'hover:bg-gray-100'
          }`}
          onClick={() => navigateToScreen('learning-module')}
        >
          <span className="text-xl">📚</span>
          <span className="text-xs font-semibold text-gray-600">Learn</span>
        </button>
        
        <button
          className={`nav-item flex flex-col items-center space-y-1 px-3 py-3 rounded-xl transition-colors duration-300 ${
            state.currentScreen === 'quiz-game' ? 'bg-coral text-white' : 'hover:bg-gray-100'
          }`}
          onClick={() => navigateToScreen('quiz-game')}
        >
          <span className="text-xl">🎮</span>
          <span className="text-xs font-semibold text-gray-600">Quiz</span>
        </button>
        
        <button
          className={`nav-item flex flex-col items-center space-y-1 px-3 py-3 rounded-xl transition-colors duration-300 ${
            state.currentScreen === 'budgeting-game' ? 'bg-coral text-white' : 'hover:bg-gray-100'
          }`}
          onClick={() => navigateToScreen('budgeting-game')}
        >
          <span className="text-xl">💸</span>
          <span className="text-xs font-semibold text-gray-600">Budget</span>
        </button>
        
        <button
          className={`nav-item flex flex-col items-center space-y-1 px-3 py-3 rounded-xl transition-colors duration-300 ${
            state.currentScreen === 'shopping-game' ? 'bg-coral text-white' : 'hover:bg-gray-100'
          }`}
          onClick={() => navigateToScreen('shopping-game')}
        >
          <span className="text-xl">🛒</span>
          <span className="text-xs font-semibold text-gray-600">Shop</span>
        </button>
        
        <button
          className={`nav-item flex flex-col items-center space-y-1 px-3 py-3 rounded-xl transition-colors duration-300 ${
            state.currentScreen === 'progress-dashboard' ? 'bg-coral text-white' : 'hover:bg-gray-100'
          }`}
          onClick={() => navigateToScreen('progress-dashboard')}
        >
          <span className="text-xl">📊</span>
          <span className="text-xs font-semibold text-gray-600">Progress</span>
        </button>
      </div>
    </motion.div>
  );
}
