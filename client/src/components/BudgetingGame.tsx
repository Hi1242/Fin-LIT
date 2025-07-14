import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { budgetItems } from '../data/content';

export default function BudgetingGame() {
  const { state, dispatch } = useApp();
  const [showResults, setShowResults] = useState(false);

  const handleAddToCart = (item: typeof budgetItems[0]) => {
    if (state.budget.remaining >= item.price) {
      dispatch({ type: 'ADD_TO_CART', payload: item });
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const handleReviewBudget = () => {
    setShowResults(true);
    
    // Check if they saved money
    const savedMoney = state.budget.cart.some(item => item.category === 'save');
    if (savedMoney) {
      dispatch({ type: 'EARN_BADGE', payload: 'super-saver' });
    }
    
    // Check if they completed the budget challenge
    dispatch({ type: 'EARN_BADGE', payload: 'budget-pro' });
    
    setTimeout(() => {
      dispatch({ type: 'SET_SCREEN', payload: 'shopping-game' });
    }, 3000);
  };

  const resetBudget = () => {
    dispatch({ type: 'RESET_CART' });
    setShowResults(false);
  };

  const getCategoryTotal = (category: string) => {
    return state.budget.cart
      .filter(item => item.category === category)
      .reduce((total, item) => total + item.price, 0);
  };

  const isItemInCart = (itemId: string) => {
    return state.budget.cart.some(item => item.id === itemId);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <motion.h2 
          className="text-3xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Budget Challenge! 💸
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Help {state.selectedAvatar?.name || 'Alex'} spend their allowance wisely
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Budget Overview */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Budget</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-mint rounded-xl">
              <span className="font-semibold">Total Allowance:</span>
              <span className="font-bold text-xl">${state.budget.total}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-xl">
              <span className="font-semibold">Spent:</span>
              <span className="font-bold text-xl text-coral">${state.budget.spent}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-sunny rounded-xl">
              <span className="font-semibold">Remaining:</span>
              <span className="font-bold text-xl">${state.budget.remaining}</span>
            </div>
          </div>
          
          {/* Budget Categories */}
          <div className="mt-6">
            <h4 className="font-bold text-gray-800 mb-3">Budget Categories</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-semibold">Needs</span>
                <span className="text-sm font-bold">${getCategoryTotal('need')}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-semibold">Wants</span>
                <span className="text-sm font-bold">${getCategoryTotal('want')}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-semibold">Savings</span>
                <span className="text-sm font-bold">${getCategoryTotal('save')}</span>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          {state.budget.cart.length > 0 && (
            <div className="mt-6">
              <h4 className="font-bold text-gray-800 mb-3">Your Cart</h4>
              <div className="space-y-2">
                {state.budget.cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-semibold">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold">${item.price}</span>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Shopping Items */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Shopping Options</h3>
          <div className="space-y-4">
            {budgetItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {item.emoji}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">${item.price}</p>
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                      isItemInCart(item.id)
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : state.budget.remaining >= item.price
                        ? 'bg-turquoise text-white hover:bg-teal-500'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => handleAddToCart(item)}
                    disabled={isItemInCart(item.id) || state.budget.remaining < item.price}
                  >
                    {isItemInCart(item.id) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 text-center space-y-4">
            <button
              className="bg-coral text-white px-8 py-3 rounded-xl font-bold hover:bg-red-500 transition-colors duration-300"
              onClick={handleReviewBudget}
              disabled={state.budget.cart.length === 0}
            >
              Review My Budget
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-400 transition-colors duration-300"
              onClick={resetBudget}
            >
              Reset Budget
            </button>
          </div>
        </motion.div>
      </div>

      {/* Results Modal */}
      {showResults && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Great Job! 🎉</h3>
              <p className="text-gray-600 mb-6">You've completed the budget challenge!</p>
              <div className="space-y-2">
                <p><strong>Total Spent:</strong> ${state.budget.spent}</p>
                <p><strong>Money Saved:</strong> ${state.budget.remaining}</p>
                <p><strong>Needs:</strong> ${getCategoryTotal('need')}</p>
                <p><strong>Wants:</strong> ${getCategoryTotal('want')}</p>
                <p><strong>Savings:</strong> ${getCategoryTotal('save')}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
