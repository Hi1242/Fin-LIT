import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { avatars } from '../data/content';

export default function AvatarSelection() {
  const { state, dispatch } = useApp();

  const handleAvatarSelect = (avatar: typeof avatars[0]) => {
    dispatch({ type: 'SELECT_AVATAR', payload: avatar });
  };

  const handleStartJourney = () => {
    if (state.selectedAvatar) {
      dispatch({ type: 'SET_SCREEN', payload: 'learning-module' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <motion.h1 
          className="text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Money Hero!
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Pick your character to start your financial adventure
        </motion.p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {avatars.map((avatar, index) => (
          <motion.div
            key={avatar.id}
            className={`avatar-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-4 ${
              state.selectedAvatar?.id === avatar.id ? 'border-coral scale-105' : 'border-transparent hover:border-coral hover:scale-105'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleAvatarSelect(avatar)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-full h-32 ${avatar.color} rounded-xl mb-4 flex items-center justify-center text-6xl`}>
              {avatar.id === 'alex' && '👨‍💼'}
              {avatar.id === 'sam' && '👩‍💼'}
              {avatar.id === 'riley' && '🧑‍🎓'}
              {avatar.id === 'taylor' && '👩‍🎓'}
            </div>
            <h3 className="text-xl font-bold text-gray-800 text-center">{avatar.name}</h3>
            <p className="text-sm text-gray-600 text-center">{avatar.description}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center">
        <motion.button
          className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform shadow-lg ${
            state.selectedAvatar 
              ? 'bg-coral text-white hover:bg-red-500 hover:scale-105' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!state.selectedAvatar}
          onClick={handleStartJourney}
          whileHover={state.selectedAvatar ? { scale: 1.05 } : {}}
          whileTap={state.selectedAvatar ? { scale: 0.95 } : {}}
        >
          Start My Money Journey!
        </motion.button>
      </div>
    </div>
  );
}
