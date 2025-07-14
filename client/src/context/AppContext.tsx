import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Avatar, BudgetItem, GameCharacter, Store } from '../types/app';
import { badges as initialBadges } from '../data/content';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

type AppAction = 
  | { type: 'SET_SCREEN'; payload: AppState['currentScreen'] }
  | { type: 'SELECT_AVATAR'; payload: Avatar }
  | { type: 'UPDATE_PROGRESS'; payload: Partial<AppState['progress']> }
  | { type: 'ADD_TO_CART'; payload: BudgetItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'RESET_CART' }
  | { type: 'EARN_BADGE'; payload: string }
  | { type: 'LOAD_STATE'; payload: AppState }
  | { type: 'INIT_SHOPPING_GAME' }
  | { type: 'MOVE_CHARACTER'; payload: { characterId: string; position: { x: number; y: number } } }
  | { type: 'BUY_ITEM'; payload: { characterId: string; storeId: string; item: BudgetItem } }
  | { type: 'START_SHOPPING_GAME' }
  | { type: 'END_SHOPPING_GAME' }
  | { type: 'UPDATE_SHOPPING_TIMER'; payload: number };

const initialState: AppState = {
  currentScreen: 'avatar-selection',
  selectedAvatar: null,
  progress: {
    lessonsCompleted: 0,
    quizScore: 0,
    badgesEarned: [],
    totalTime: 0,
    currentSlide: 0,
    currentQuestion: 0
  },
  budget: {
    total: 20,
    spent: 0,
    remaining: 20,
    cart: [],
    categories: {
      needs: 8,
      wants: 7,
      savings: 5
    }
  },
  shoppingGame: {
    characters: [],
    stores: [],
    currentCharacter: '',
    gameStarted: false,
    gameCompleted: false,
    timeLeft: 180,
    round: 1
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };
    
    case 'SELECT_AVATAR':
      return { ...state, selectedAvatar: action.payload };
    
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        progress: { ...state.progress, ...action.payload }
      };
    
    case 'ADD_TO_CART':
      const newCart = [...state.budget.cart, action.payload];
      const newSpent = state.budget.spent + action.payload.price;
      return {
        ...state,
        budget: {
          ...state.budget,
          cart: newCart,
          spent: newSpent,
          remaining: state.budget.total - newSpent
        }
      };
    
    case 'REMOVE_FROM_CART':
      const itemToRemove = state.budget.cart.find(item => item.id === action.payload);
      if (!itemToRemove) return state;
      
      const filteredCart = state.budget.cart.filter(item => item.id !== action.payload);
      const reducedSpent = state.budget.spent - itemToRemove.price;
      return {
        ...state,
        budget: {
          ...state.budget,
          cart: filteredCart,
          spent: reducedSpent,
          remaining: state.budget.total - reducedSpent
        }
      };
    
    case 'RESET_CART':
      return {
        ...state,
        budget: {
          ...state.budget,
          cart: [],
          spent: 0,
          remaining: state.budget.total
        }
      };
    
    case 'EARN_BADGE':
      if (state.progress.badgesEarned.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        progress: {
          ...state.progress,
          badgesEarned: [...state.progress.badgesEarned, action.payload]
        }
      };
    
    case 'LOAD_STATE':
      return action.payload;
    
    case 'INIT_SHOPPING_GAME':
      return {
        ...state,
        shoppingGame: {
          ...state.shoppingGame,
          characters: [
            { id: 'player', name: 'Smart Shopper', emoji: '🧒', color: 'bg-coral', position: { x: 50, y: 200 }, money: 50, inventory: [], score: 0 }
          ],
          stores: [
            { id: 'grocery', name: 'Grocery Store', emoji: '🛒', color: 'bg-mint', position: { x: 150, y: 50 }, items: [
              { id: 'apple', name: 'Apple', price: 2, category: 'need', emoji: '🍎', color: 'bg-coral' },
              { id: 'milk', name: 'Milk', price: 3, category: 'need', emoji: '🥛', color: 'bg-turquoise' },
              { id: 'bread', name: 'Bread', price: 4, category: 'need', emoji: '🍞', color: 'bg-sunny' },
              { id: 'banana', name: 'Banana', price: 1, category: 'need', emoji: '🍌', color: 'bg-sunny' }
            ]},
            { id: 'toy', name: 'Toy Store', emoji: '🧸', color: 'bg-bubblegum', position: { x: 350, y: 50 }, items: [
              { id: 'teddy', name: 'Teddy Bear', price: 15, category: 'want', emoji: '🧸', color: 'bg-bubblegum' },
              { id: 'ball', name: 'Ball', price: 8, category: 'want', emoji: '⚽', color: 'bg-coral' },
              { id: 'puzzle', name: 'Puzzle', price: 12, category: 'want', emoji: '🧩', color: 'bg-mint' },
              { id: 'blocks', name: 'Building Blocks', price: 20, category: 'want', emoji: '🧱', color: 'bg-turquoise' }
            ]},
            { id: 'electronics', name: 'Electronics Store', emoji: '📱', color: 'bg-turquoise', position: { x: 150, y: 200 }, items: [
              { id: 'phone', name: 'Phone', price: 25, category: 'want', emoji: '📱', color: 'bg-turquoise' },
              { id: 'tablet', name: 'Tablet', price: 30, category: 'want', emoji: '📱', color: 'bg-coral' },
              { id: 'headphones', name: 'Headphones', price: 12, category: 'want', emoji: '🎧', color: 'bg-mint' }
            ]},
            { id: 'bank', name: 'Bank', emoji: '🏦', color: 'bg-sunny', position: { x: 350, y: 200 }, items: [
              { id: 'savings1', name: 'Save $5', price: 5, category: 'save', emoji: '💰', color: 'bg-sunny' },
              { id: 'savings2', name: 'Save $10', price: 10, category: 'save', emoji: '💰', color: 'bg-sunny' },
              { id: 'savings3', name: 'Save $15', price: 15, category: 'save', emoji: '💰', color: 'bg-sunny' }
            ]},
            { id: 'bank', name: 'Bank', emoji: '🏦', color: 'bg-mint', position: { x: 400, y: 400 }, items: [
              { id: 'savings', name: 'Savings Account', price: 5, category: 'save', emoji: '💰', color: 'bg-mint' },
              { id: 'piggy', name: 'Piggy Bank', price: 10, category: 'save', emoji: '🐷', color: 'bg-coral' }
            ]},
            { id: 'clothes', name: 'Clothes Shop', emoji: '👕', color: 'bg-turquoise', position: { x: 600, y: 400 }, items: [
              { id: 'shirt', name: 'T-Shirt', price: 12, category: 'need', emoji: '👕', color: 'bg-turquoise' },
              { id: 'hat', name: 'Hat', price: 8, category: 'want', emoji: '👒', color: 'bg-sunny' },
              { id: 'shoes', name: 'Shoes', price: 20, category: 'need', emoji: '👟', color: 'bg-coral' }
            ]}
          ],
          currentCharacter: 'pig',
          gameStarted: false,
          gameCompleted: false,
          timeLeft: 180,
          round: 1
        }
      };
    
    case 'MOVE_CHARACTER':
      return {
        ...state,
        shoppingGame: {
          ...state.shoppingGame,
          characters: state.shoppingGame.characters.map(char => 
            char.id === action.payload.characterId 
              ? { ...char, position: action.payload.position }
              : char
          )
        }
      };
    
    case 'BUY_ITEM':
      const character = state.shoppingGame.characters.find(c => c.id === action.payload.characterId);
      if (!character || character.money < action.payload.item.price) return state;
      
      let scoreIncrease = 0;
      if (action.payload.item.category === 'need') scoreIncrease = 15;
      else if (action.payload.item.category === 'save') scoreIncrease = 10;
      else if (action.payload.item.category === 'want') scoreIncrease = 5;
      
      return {
        ...state,
        shoppingGame: {
          ...state.shoppingGame,
          characters: state.shoppingGame.characters.map(char => 
            char.id === action.payload.characterId 
              ? { 
                  ...char, 
                  money: char.money - action.payload.item.price,
                  inventory: [...char.inventory, action.payload.item],
                  score: char.score + scoreIncrease
                }
              : char
          )
        }
      };
    
    case 'START_SHOPPING_GAME':
      return {
        ...state,
        shoppingGame: {
          ...state.shoppingGame,
          gameStarted: true,
          gameCompleted: false
        }
      };
    
    case 'END_SHOPPING_GAME':
      return {
        ...state,
        shoppingGame: {
          ...state.shoppingGame,
          gameStarted: false,
          gameCompleted: true
        }
      };
    
    case 'UPDATE_SHOPPING_TIMER':
      return {
        ...state,
        shoppingGame: {
          ...state.shoppingGame,
          timeLeft: action.payload
        }
      };
    
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('moneySmartKids');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('moneySmartKids', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
