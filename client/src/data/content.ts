import { Avatar, Slide, QuizQuestion, BudgetItem, Badge } from '../types/app';

export const avatars: Avatar[] = [
  {
    id: 'alex',
    name: 'Alex',
    description: 'The Smart Saver',
    color: 'bg-coral'
  },
  {
    id: 'sam',
    name: 'Sam',
    description: 'The Budget Boss',
    color: 'bg-turquoise'
  },
  {
    id: 'riley',
    name: 'Riley',
    description: 'The Coin Collector',
    color: 'bg-sunny'
  },
  {
    id: 'taylor',
    name: 'Taylor',
    description: 'The Goal Getter',
    color: 'bg-mint'
  }
];

export const learningSlides: Slide[] = [
  {
    id: 1,
    title: 'What is Money? 💰',
    content: 'Money is a tool that helps us buy things we need and want, save for future goals, and trade with others fairly.',
    points: [
      'Buy things we need and want',
      'Save for future goals',
      'Trade with others fairly'
    ]
  },
  {
    id: 2,
    title: 'Why Save Money? 🏦',
    content: 'Saving money helps us prepare for the future and reach our goals!',
    points: [
      'Emergency fund for unexpected expenses',
      'Buy bigger things we want later',
      'Learn patience and planning'
    ]
  },
  {
    id: 3,
    title: 'Needs vs Wants 🤔',
    content: 'Understanding the difference between needs and wants helps us make smart money choices.',
    points: [
      'Needs: Food, shelter, clothing, school supplies',
      'Wants: Toys, games, candy, entertainment',
      'Always pay for needs first!'
    ]
  },
  {
    id: 4,
    title: 'Making a Budget 📊',
    content: 'A budget helps us plan how to spend our money wisely.',
    points: [
      'List all your income (allowance, gifts)',
      'Plan for needs, wants, and savings',
      'Track your spending'
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What should you do with your money first?',
    options: [
      'Spend it all immediately',
      'Save some for later',
      'Hide it under your bed',
      'Give it all away'
    ],
    correctAnswer: 1,
    explanation: 'Saving some money for later is always a smart choice!'
  },
  {
    id: 2,
    question: 'Which of these is a NEED?',
    options: [
      'Video games',
      'Candy',
      'School supplies',
      'Toys'
    ],
    correctAnswer: 2,
    explanation: 'School supplies are something you need for learning!'
  },
  {
    id: 3,
    question: 'What is a budget?',
    options: [
      'A type of wallet',
      'A plan for spending money',
      'A savings account',
      'A type of coin'
    ],
    correctAnswer: 1,
    explanation: 'A budget is a plan that helps you decide how to spend your money!'
  },
  {
    id: 4,
    question: 'How much of your allowance should you try to save?',
    options: [
      'Nothing',
      'All of it',
      'At least some of it',
      'Only the coins'
    ],
    correctAnswer: 2,
    explanation: 'Saving at least some of your allowance is a great habit!'
  },
  {
    id: 5,
    question: 'What happens when you spend more than you have?',
    options: [
      'You get more money',
      'Nothing happens',
      'You go into debt',
      'You become rich'
    ],
    correctAnswer: 2,
    explanation: 'Spending more than you have means you owe money - that\'s called debt!'
  }
];

export const budgetItems: BudgetItem[] = [
  {
    id: 'school-supplies',
    name: 'School Supplies',
    price: 8,
    category: 'need',
    emoji: '📚',
    color: 'bg-coral'
  },
  {
    id: 'video-game',
    name: 'Video Game',
    price: 15,
    category: 'want',
    emoji: '🎮',
    color: 'bg-bubblegum'
  },
  {
    id: 'pizza',
    name: 'Pizza Slice',
    price: 3,
    category: 'want',
    emoji: '🍕',
    color: 'bg-sunny'
  },
  {
    id: 'savings',
    name: 'Savings Account',
    price: 5,
    category: 'save',
    emoji: '🏦',
    color: 'bg-mint'
  },
  {
    id: 'lunch',
    name: 'School Lunch',
    price: 4,
    category: 'need',
    emoji: '🥙',
    color: 'bg-turquoise'
  },
  {
    id: 'toy',
    name: 'Action Figure',
    price: 12,
    category: 'want',
    emoji: '🦸',
    color: 'bg-bubblegum'
  }
];

export const badges: Badge[] = [
  {
    id: 'first-quiz',
    name: 'First Quiz',
    description: 'Completed your first quiz!',
    emoji: '🏆',
    color: 'bg-mint',
    earned: false
  },
  {
    id: 'money-master',
    name: 'Money Master',
    description: 'Learned about money basics!',
    emoji: '💰',
    color: 'bg-turquoise',
    earned: false
  },
  {
    id: 'budget-pro',
    name: 'Budget Pro',
    description: 'Completed the budget challenge!',
    emoji: '🎯',
    color: 'bg-sunny',
    earned: false
  },
  {
    id: 'super-saver',
    name: 'Super Saver',
    description: 'Saved money in the budget game!',
    emoji: '🌟',
    color: 'bg-coral',
    earned: false
  },
  {
    id: 'all-complete',
    name: 'All Complete',
    description: 'Finished all learning modules!',
    emoji: '🎊',
    color: 'bg-bubblegum',
    earned: false
  },
  {
    id: 'shopping-master',
    name: 'Shopping Master',
    description: 'Completed the animal shopping adventure!',
    emoji: '🛍️',
    color: 'bg-bubblegum',
    earned: false
  },
  {
    id: 'expert-level',
    name: 'Expert Level',
    description: 'Achieved mastery in financial literacy!',
    emoji: '🚀',
    color: 'bg-mint',
    earned: false
  }
];
