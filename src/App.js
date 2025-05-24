import React, { useState } from 'react';
import { questions as allQuestions } from './questions';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';
import { Box, Typography, Avatar, Stack } from '@mui/material';

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

export const Footer = () => (
  <Box sx={{ width: '100%', bgcolor: 'white', py: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', bottom: 0 }}>
    <Typography variant="body2" sx={{ color: palette.textSecondary }}>
      Created with ❤️ by <a href="mailto:contatoaguiarti@gmail.com">Tiago Aguiar</a>
    </Typography>
  </Box>
);

function App() {
  const [screen, setScreen] = useState('start');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [, setWrongOnly] = useState(false);

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
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" style={{ width: '40px', height: '40px' }} />
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
      <Stack sx={{ background: palette.background }} spacing={2}>
        <Header />
        <StartScreen
          onSelectQuestions={num => {
            setQuizQuestions(shuffle(allQuestions).slice(0, num));
            setScreen('quiz');
            setWrongOnly(false);
          }}
        />
        <Footer />
      </Stack>
    );
  }

  // Quiz screen
  if (screen === 'quiz') {
    return (
      <Stack sx={{ background: palette.background }} spacing={2}>
        <Header />
        <Quiz
          questions={quizQuestions}
          onComplete={({ score, wrongQuestions }) => {
            setLastResult({ score, wrongQuestions });
            setScreen('result');
          }}
        />
        <Footer />
      </Stack>
    );
  }

  // Result screen
  if (screen === 'result') {
    return (
      <Stack sx={{ background: palette.background }}>
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
        <Footer />
      </Stack>
    );
  }

  return null;
}

export default App;
