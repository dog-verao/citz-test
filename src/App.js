import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
  Avatar,
} from '@mui/material';
import { keyframes } from '@mui/system';
import { questions } from './questions';

// Animations
const correctAnswer = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const wrongAnswer = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;

const palette = {
  background: '#F4E7E1',
  accent: '#FF9B45',
  highlight: '#D5451B',
  dark: '#521C0D',
};

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [showOnlyWrong, setShowOnlyWrong] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getQuestionsToShow = () => {
    if (showOnlyWrong) {
      return wrongQuestions.map(index => questions[index]);
    }
    return questions;
  };
  const questionsToShow = getQuestionsToShow();
  const currentQuestion = questionsToShow[currentQuestionIndex];
  const progress = (currentQuestionIndex / questionsToShow.length) * 100;

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleConfirm = () => {
    if (!selectedAnswer) {
      setSnackbarMessage('Please select an answer');
      setOpenSnackbar(true);
      return;
    }
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    setAnimationType(isCorrect ? 'correct' : 'wrong');
    setShowAnimation(true);
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setWrongQuestions([...wrongQuestions, questions.indexOf(currentQuestion)]);
    }
    setTimeout(() => {
      setShowAnimation(false);
      if (currentQuestionIndex < questionsToShow.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
      } else {
        setShowResults(true);
      }
    }, 700);
  };

  const handleRestart = (onlyWrong = false) => {
    setShowOnlyWrong(onlyWrong);
    setCurrentQuestionIndex(0);
    setScore(0);
    setWrongQuestions([]);
    setShowResults(false);
    setSelectedAnswer('');
  };

  // HEADER
  const Header = () => (
    <Box
      sx={{
        width: '100%',
        bgcolor: palette.background,
        px: isMobile ? 1 : 4,
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `2px solid ${palette.accent}`,
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          sx={{ bgcolor: palette.accent, width: 36, height: 36 }}
          src="/canada-leaf.png"
          alt="Canada Leaf"
        >
          🍁
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            color: palette.highlight,
            fontWeight: 800,
            letterSpacing: 1,
            fontSize: isMobile ? '1.1rem' : '1.4rem',
          }}
        >
          Citizenship Quiz
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: palette.dark,
          color: '#fff',
          px: 2.5,
          py: 0.7,
          borderRadius: 3,
          fontWeight: 700,
          fontSize: isMobile ? '1rem' : '1.1rem',
          boxShadow: '0 2px 8px rgba(82,28,13,0.08)',
        }}
      >
        Score: {score}/{questionsToShow.length}
      </Box>
    </Box>
  );

  // RESULTS
  if (showResults) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: palette.background }}>
        <Header />
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4, bgcolor: '#fff' }}>
            <Typography variant="h4" gutterBottom sx={{ color: palette.highlight, fontWeight: 800 }}>
              Quiz Complete!
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ color: palette.dark, fontWeight: 700 }}>
              Score: {score} out of {questionsToShow.length}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: palette.accent, fontWeight: 600 }}>
              Percentage: {((score / questionsToShow.length) * 100).toFixed(1)}%
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: palette.highlight,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: 3,
                  '&:hover': { bgcolor: palette.dark },
                }}
                onClick={() => handleRestart(false)}
                fullWidth
              >
                Try All Questions Again
              </Button>
              {wrongQuestions.length > 0 && (
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: palette.accent,
                    color: palette.dark,
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    '&:hover': { bgcolor: palette.highlight, color: '#fff' },
                  }}
                  onClick={() => handleRestart(true)}
                  fullWidth
                >
                  Review Wrong Answers
                </Button>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  // MAIN QUIZ
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: palette.background }}>
      <Header />
      <Container maxWidth="sm" sx={{ pb: 6 }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: palette.highlight,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
              fontSize: isMobile ? '0.95rem' : '1.1rem',
            }}
          >
            Question {currentQuestionIndex + 1} of {questionsToShow.length}
          </Typography>
        </Box>
        <CircularProgress
          variant="determinate"
          value={progress}
          sx={{
            width: '100%',
            mb: 2,
            color: palette.accent,
            background: '#fff',
            height: 10,
            borderRadius: 5,
          }}
        />
        <Paper
          elevation={3}
          sx={{
            p: isMobile ? 2 : 4,
            borderRadius: 4,
            bgcolor: '#fff',
            animation: showAnimation
              ? `${animationType === 'correct' ? correctAnswer : wrongAnswer} 0.5s ease-in-out`
              : 'none',
            mb: 3,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: palette.dark, fontWeight: 700, fontSize: isMobile ? '1.1rem' : '1.3rem' }}>
            {currentQuestion.question}
          </Typography>
          <RadioGroup value={selectedAnswer} onChange={handleAnswerSelect}>
            {currentQuestion.alternatives.map((alternative, index) => {
              const letter = String.fromCharCode(65 + index);
              const value = String.fromCharCode(97 + index);
              const isSelected = selectedAnswer === value;
              return (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    borderRadius: 3,
                    bgcolor: isSelected ? palette.background : '#fff',
                    border: isSelected ? `2px solid ${palette.highlight}` : `2px solid #eee`,
                    transition: 'all 0.2s',
                    boxShadow: isSelected ? `0 2px 8px ${palette.accent}22` : 'none',
                  }}
                >
                  <FormControlLabel
                    value={value}
                    control={<Radio sx={{ color: palette.accent, '&.Mui-checked': { color: palette.highlight } }} />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: isSelected ? palette.highlight : palette.background,
                            color: isSelected ? '#fff' : palette.dark,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            border: isSelected ? `2px solid ${palette.highlight}` : `2px solid ${palette.background}`,
                            transition: 'all 0.2s',
                          }}
                        >
                          {letter}
                        </Box>
                        <Typography sx={{ color: palette.dark, fontWeight: 500, fontSize: isMobile ? '1rem' : '1.08rem' }}>
                          {alternative}
                        </Typography>
                      </Box>
                    }
                    sx={{ width: '100%', m: 0, p: 0, pl: 1 }}
                  />
                </Box>
              );
            })}
          </RadioGroup>
        </Paper>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!selectedAnswer}
          fullWidth
          sx={{
            bgcolor: palette.highlight,
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.15rem',
            borderRadius: 3,
            py: 1.5,
            letterSpacing: 1,
            mt: 2,
            boxShadow: '0 2px 12px #D5451B22',
            '&:hover': { bgcolor: palette.dark },
          }}
        >
          CONFIRM ANSWER
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert severity="warning" onClose={() => setOpenSnackbar(false)}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default App;
