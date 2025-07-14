import React from 'react';
import { useApp } from '../context/AppContext';
import AvatarSelection from '../components/AvatarSelection';
import LearningModule from '../components/LearningModule';
import QuizGame from '../components/QuizGame';
import BudgetingGame from '../components/BudgetingGame';
import ShoppingGame from '../components/ShoppingGame';
import ProgressDashboard from '../components/ProgressDashboard';
import Navigation from '../components/Navigation';

export default function Home() {
  const { state } = useApp();

  const renderCurrentScreen = () => {
    switch (state.currentScreen) {
      case 'avatar-selection':
        return <AvatarSelection />;
      case 'learning-module':
        return <LearningModule />;
      case 'quiz-game':
        return <QuizGame />;
      case 'budgeting-game':
        return <BudgetingGame />;
      case 'shopping-game':
        return <ShoppingGame />;
      case 'progress-dashboard':
        return <ProgressDashboard />;
      default:
        return <AvatarSelection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentScreen()}
      <Navigation />
    </div>
  );
}
