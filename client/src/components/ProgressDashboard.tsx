import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { badges, learningSlides } from '../data/content';

export default function ProgressDashboard() {
  const { state, dispatch } = useApp();

  const getProgressPercentage = (moduleIndex: number) => {
    if (moduleIndex === 0) return 100; // What is Money - completed
    if (moduleIndex === 1) return state.progress.currentSlide > 0 ? 75 : 0; // Saving Money
    if (moduleIndex === 2) return state.progress.currentQuestion > 0 ? 50 : 0; // Budgeting
    return 0; // Smart Spending
  };

  const earnedBadges = badges.filter(badge => 
    state.progress.badgesEarned.includes(badge.id)
  );

  const continueLearning = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'learning-module' });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <motion.h2 
          className="text-3xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your Progress! 🎉
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Look how much you've learned!
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Progress */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Learning Progress</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">What is Money?</span>
                <span className="text-sm font-semibold text-mint">Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-mint h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">Saving Money</span>
                <span className="text-sm font-semibold text-turquoise">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-turquoise h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">Budgeting</span>
                <span className="text-sm font-semibold text-coral">50%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-coral h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 1, delay: 0.9 }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">Smart Spending</span>
                <span className="text-sm font-semibold text-gray-400">Not Started</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-300 h-2 rounded-full" style={{ width: "0%" }} />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Badges & Achievements */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Badges Earned</h3>
          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge, index) => {
              const isEarned = state.progress.badgesEarned.includes(badge.id);
              return (
                <motion.div 
                  key={badge.id}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className={`w-16 h-16 ${isEarned ? badge.color : 'bg-gray-300'} rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg ${!isEarned ? 'opacity-50' : ''}`}>
                    <span className="text-2xl">{badge.emoji}</span>
                  </div>
                  <p className={`text-sm font-semibold ${isEarned ? 'text-gray-700' : 'text-gray-400'}`}>
                    {badge.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      
      {/* Stats Summary */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-6 mt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            className="text-center p-4 bg-coral rounded-xl text-white"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-2xl font-bold">{state.progress.currentSlide + 1}</p>
            <p className="text-sm">Lessons Completed</p>
          </motion.div>
          <motion.div 
            className="text-center p-4 bg-turquoise rounded-xl text-white"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-2xl font-bold">{state.progress.currentQuestion + 1}</p>
            <p className="text-sm">Quizzes Taken</p>
          </motion.div>
          <motion.div 
            className="text-center p-4 bg-sunny rounded-xl text-white"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-2xl font-bold">{state.progress.badgesEarned.length}</p>
            <p className="text-sm">Badges Earned</p>
          </motion.div>
          <motion.div 
            className="text-center p-4 bg-mint rounded-xl text-white"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-2xl font-bold">{state.progress.totalTime || 45}</p>
            <p className="text-sm">Minutes Learned</p>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="text-center mt-8">
        <motion.button
          className="bg-coral text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-red-500 transition-colors duration-300 transform hover:scale-105 shadow-lg"
          onClick={continueLearning}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue Learning!
        </motion.button>
      </div>
    </div>
  );
}
