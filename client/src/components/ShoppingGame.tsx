import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { GameCharacter, Store, BudgetItem } from '../types/app';
import { ShoppingCart, DollarSign, Trophy, Clock, Store as StoreIcon, Gamepad2, Smartphone, Building2 } from 'lucide-react';

export default function ShoppingGame() {
  const { state, dispatch } = useApp();
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [purchases, setPurchases] = useState<BudgetItem[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Initialize game on mount
  useEffect(() => {
    if (!state.shoppingGame || state.shoppingGame.characters.length === 0) {
      dispatch({ type: 'INIT_SHOPPING_GAME' });
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (state.shoppingGame && state.shoppingGame.gameStarted && state.shoppingGame.timeLeft > 0) {
      const timer = setInterval(() => {
        dispatch({ type: 'UPDATE_SHOPPING_TIMER', payload: state.shoppingGame.timeLeft - 1 });
      }, 1000);
      return () => clearInterval(timer);
    } else if (state.shoppingGame && state.shoppingGame.timeLeft === 0) {
      dispatch({ type: 'END_SHOPPING_GAME' });
      dispatch({ type: 'EARN_BADGE', payload: 'shopping-master' });
    }
  }, [state.shoppingGame?.gameStarted, state.shoppingGame?.timeLeft]);

  const handleStoreClick = (store: Store) => {
    setSelectedStore(store);
    setShowStoreModal(true);
  };

  const handleMoveCharacter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerCharacter || !gameAreaRef.current) return;
    
    // Don't move if clicking on a store
    const target = e.target as HTMLElement;
    if (target.closest('.store-button')) {
      return;
    }
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left - 32, rect.width - 64)); // Keep within bounds
    const y = Math.max(0, Math.min(e.clientY - rect.top - 32, rect.height - 64));
    
    dispatch({ 
      type: 'MOVE_CHARACTER', 
      payload: { characterId: 'player', position: { x, y } } 
    });
  };

  const handleBuyItem = (item: BudgetItem) => {
    if (selectedStore && playerCharacter) {
      // Check if player can afford the item
      if (moneyLeft >= item.price) {
        // Calculate score based on item category
        let itemScore = 0;
        switch (item.category) {
          case 'need':
            itemScore = 15;
            break;
          case 'save':
            itemScore = 10;
            break;
          case 'want':
            itemScore = 5;
            break;
        }
        
        // Update score and purchases
        setTotalScore(prev => prev + itemScore);
        setPurchases(prev => [...prev, item]);
        
        // Update character's money and inventory
        dispatch({ 
          type: 'BUY_ITEM', 
          payload: { characterId: 'player', storeId: selectedStore.id, item } 
        });
        
        setShowStoreModal(false);
      }
    }
  };

  const startGame = () => {
    dispatch({ type: 'START_SHOPPING_GAME' });
    setTotalScore(0);
    setPurchases([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playerCharacter = state.shoppingGame?.characters.find(c => c.id === 'player');
  const moneySpent = purchases.reduce((sum, item) => sum + item.price, 0);
  const moneyLeft = playerCharacter ? playerCharacter.money - moneySpent : 0;

  const getStoreIcon = (storeId: string) => {
    switch (storeId) {
      case 'grocery':
        return <StoreIcon className="h-8 w-8 text-white" />;
      case 'toy':
        return <Gamepad2 className="h-8 w-8 text-white" />;
      case 'electronics':
        return <Smartphone className="h-8 w-8 text-white" />;
      case 'bank':
        return <Building2 className="h-8 w-8 text-white" />;
      default:
        return <StoreIcon className="h-8 w-8 text-white" />;
    }
  };

  if (!state.shoppingGame) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!state.shoppingGame.gameStarted && !state.shoppingGame.gameCompleted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <motion.h2 
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Smart Shopping Challenge! 🛒
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            You have $50 to spend! Move around and visit different stores to make your purchases. 
            Click anywhere to move your character, then click on stores to shop.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Player Character */}
            <motion.div
              className="bg-coral rounded-2xl p-6 shadow-lg text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-4xl mb-2">🧒</div>
              <h3 className="font-bold text-lg">Smart Shopper</h3>
              <p className="text-sm opacity-90">$50 to spend</p>
            </motion.div>
            
            {/* Game Instructions */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl mb-2">🎮</div>
              <h3 className="font-bold text-lg text-gray-800">How to Play</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>Click anywhere to move your character</p>
                <p>Visit stores to see what's available</p>
                <p>Make smart choices with your money</p>
                <p>You have 3 minutes to shop!</p>
              </div>
            </motion.div>
          </div>
          
          <motion.button
            className="bg-coral text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-red-500 transition-colors duration-300 shadow-lg"
            onClick={startGame}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Shopping Adventure!
          </motion.button>
        </div>
      </div>
    );
  }

  if (state.shoppingGame.gameCompleted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <motion.h2 
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Challenge Complete! 🎉
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Excellent work! Here's how you did:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              className="bg-blue-100 rounded-2xl p-6 shadow-lg text-center border-2 border-blue-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ShoppingCart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-bold text-lg text-blue-800">Items Bought</h3>
              <p className="text-3xl font-bold text-blue-600">{purchases.length}</p>
              <p className="text-sm text-blue-700">purchases</p>
            </motion.div>
            
            <motion.div
              className="bg-green-100 rounded-2xl p-6 shadow-lg text-center border-2 border-green-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-bold text-lg text-green-800">Money Left</h3>
              <p className="text-3xl font-bold text-green-600">${moneyLeft}</p>
              <p className="text-sm text-green-700">saved</p>
            </motion.div>
          </div>

          <motion.button
            className="bg-coral text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-coral/90 transition-colors shadow-lg"
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again! 🔄
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Game Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Smart Shopping Challenge</h2>
          <div className="flex items-center space-x-4">
            <div className="bg-coral text-white px-4 py-2 rounded-xl font-bold flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {formatTime(state.shoppingGame.timeLeft)}
            </div>
            <div className="bg-turquoise text-white px-4 py-2 rounded-xl font-bold flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              ${moneyLeft}
            </div>
            <div className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold flex items-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              {purchases.length} items
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl shadow-lg p-6 relative h-80 overflow-hidden cursor-crosshair"
        onClick={handleMoveCharacter}
      >
        {/* Player Character */}
        {playerCharacter && (
          <motion.div
            className="character-button absolute w-16 h-16 bg-coral rounded-full flex items-center justify-center text-2xl cursor-pointer shadow-lg ring-4 ring-yellow-400"
            style={{ left: playerCharacter.position.x, top: playerCharacter.position.y }}
            whileHover={{ scale: 1.1 }}
            animate={{ 
              x: [0, -2, 2, 0],
              transition: { repeat: Infinity, duration: 0.5 }
            }}
          >
            {playerCharacter.emoji}
          </motion.div>
        )}

        {/* Stores */}
        {state.shoppingGame.stores.map((store) => (
          <motion.div
            key={store.id}
            className={`store-button absolute w-20 h-20 ${store.color} rounded-2xl flex items-center justify-center cursor-pointer shadow-lg`}
            style={{ left: store.position.x, top: store.position.y }}
            onClick={(e) => {
              e.stopPropagation();
              handleStoreClick(store);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {getStoreIcon(store.id)}
          </motion.div>
        ))}

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 bg-white rounded-xl p-4 shadow-lg max-w-xs">
          <p className="text-sm text-gray-600">
            Click anywhere to move your character. Click on stores to shop!
          </p>
        </div>
      </div>

      {/* Purchase History */}
      {purchases.length > 0 && (
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Purchases</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {purchases.map((item, index) => (
              <motion.div
                key={index}
                className={`${item.color} rounded-xl p-3 text-white text-center`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-2xl mb-1">{item.emoji}</div>
                <h4 className="font-bold text-sm">{item.name}</h4>
                <p className="text-xs opacity-90">${item.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Store Modal */}
      <AnimatePresence>
        {showStoreModal && selectedStore && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md mx-4 max-h-96 overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="text-center mb-4">
                <div className="flex items-center justify-center mb-2">
                  <div className={`w-12 h-12 ${selectedStore.color} rounded-2xl flex items-center justify-center mr-3`}>
                    {getStoreIcon(selectedStore.id)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedStore.name}
                  </h3>
                </div>
                <p className="text-gray-600">
                  You have ${moneyLeft} left to spend
                </p>
              </div>
              
              <div className="space-y-3">
                {selectedStore.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center`}>
                        {item.emoji}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">${item.price}</p>
                      <button
                        className={`px-3 py-1 rounded-lg font-semibold text-sm transition-colors duration-300 ${
                          moneyLeft >= item.price
                            ? 'bg-turquoise text-white hover:bg-teal-500'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={() => handleBuyItem(item)}
                        disabled={moneyLeft < item.price}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <button
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-400 transition-colors duration-300"
                  onClick={() => setShowStoreModal(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}