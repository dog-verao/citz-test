import React, { useState } from 'react';
import { questions as allQuestions } from './questions';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';
import { Box, Typography, Avatar } from '@mui/material';

const palette = {
  primary: '#dc2626',
  primaryDark: '#b91c1c',
  primaryLight: '#ef4444',
  background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
  card: '#ffffff',
  text: '#111827',
  textSecondary: '#374151',
  border: '#e5e7eb',
  redShadow: 'rgba(220,38,38,0.15)',
};

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [screen, setScreen] = useState('start'); // start | quiz | result
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [lastResult, setLastResult] = useState(null); // {score, wrongQuestions}
  const [wrongOnly, setWrongOnly] = useState(false);

  // Header
  const Header = () => (
    <Box
      sx={{
        width: '100%',
        bgcolor: palette.background,
        px: 2,
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `2px solid ${palette.primary}`,
        mb: 3,
        overflowX: 'hidden',
        boxSizing: 'border-box',
        maxWidth: '100vw',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          sx={{
            bgcolor: palette.primary,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 700,
            p: 0,
          }}
          alt="Canada Leaf"
        >
          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
            🍁
          </Box>
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            color: palette.primaryDark,
            fontWeight: 800,
            letterSpacing: 1,
            fontSize: '1.4rem',
          }}
        >
          Citizenship Quiz
        </Typography>
      </Box>
    </Box>
  );

  // Start screen
  if (screen === 'start') {
    return (
      <>
        <Header />
        <StartScreen
          onSelectQuestions={num => {
            setQuizQuestions(shuffle(allQuestions).slice(0, num));
            setScreen('quiz');
            setWrongOnly(false);
          }}
        />
      </>
    );
  }

  // Quiz screen
  if (screen === 'quiz') {
    return (
      <>
        <Header />
        <Quiz
          questions={quizQuestions}
          onComplete={({ score, wrongQuestions }) => {
            setLastResult({ score, wrongQuestions });
            setScreen('result');
          }}
        />
      </>
    );
  }

  // Result screen
  if (screen === 'result') {
    return (
      <>
        <Header />
        <QuizResult
          score={lastResult.score}
          total={quizQuestions.length}
          wrongQuestionsCount={lastResult.wrongQuestions.length}
          onRetryWrong={() => {
            const wrongQs = lastResult.wrongQuestions.map(idx => quizQuestions[idx]);
            setQuizQuestions(wrongQs);
            setScreen('quiz');
            setWrongOnly(true);
          }}
          onRestart={() => {
            setScreen('start');
            setQuizQuestions([]);
            setLastResult(null);
            setWrongOnly(false);
          }}
        />
      </>
    );
  }

  return null;
}

export default App;
