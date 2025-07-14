export interface Avatar {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Slide {
  id: number;
  title: string;
  content: string;
  image?: string;
  points: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface BudgetItem {
  id: string;
  name: string;
  price: number;
  category: 'need' | 'want' | 'save';
  emoji: string;
  color: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  earned: boolean;
}

export interface Store {
  id: string;
  name: string;
  emoji: string;
  color: string;
  position: { x: number; y: number };
  items: BudgetItem[];
}

export interface GameCharacter {
  id: string;
  name: string;
  emoji: string;
  color: string;
  position: { x: number; y: number };
  money: number;
  inventory: BudgetItem[];
  score: number;
}

export interface ShoppingGameState {
  characters: GameCharacter[];
  stores: Store[];
  currentCharacter: string;
  gameStarted: boolean;
  gameCompleted: boolean;
  timeLeft: number;
  round: number;
}

export interface AppState {
  currentScreen: 'avatar-selection' | 'learning-module' | 'quiz-game' | 'budgeting-game' | 'shopping-game' | 'progress-dashboard';
  selectedAvatar: Avatar | null;
  progress: {
    lessonsCompleted: number;
    quizScore: number;
    badgesEarned: string[];
    totalTime: number;
    currentSlide: number;
    currentQuestion: number;
  };
  budget: {
    total: number;
    spent: number;
    remaining: number;
    cart: BudgetItem[];
    categories: {
      needs: number;
      wants: number;
      savings: number;
    };
  };
  shoppingGame: ShoppingGameState;
}
