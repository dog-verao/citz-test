import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Stack, Alert, Snackbar, LinearProgress } from '@mui/material';

const palette = {
  primary: '#dc2626',
  primaryDark: '#b91c1c',
  primaryLight: '#ef4444',
  background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
  card: '#ffffff',
  lightBg: '#f9fafb',
  text: '#111827',
  textSecondary: '#374151',
  textMuted: '#6b7280',
  textDisabled: '#9ca3af',
  border: '#e5e7eb',
  borderHover: '#dc2626',
  progressBg: '#e5e7eb',
  progressFill: 'linear-gradient(90deg, #dc2626, #ef4444)',
  shadow: 'rgba(0,0,0,0.08)',
  redShadow: 'rgba(220,38,38,0.15)',
  blur: 'rgba(255,255,255,0.9)',
  successBorder: '#10b981',
  successBg: '#ecfdf5',
  successText: '#065f46',
  errorBorder: '#ef4444',
  errorBg: '#fef2f2',
  errorText: '#dc2626',
  infoBorder: '#dbeafe',
  infoBg: '#eff6ff',
  infoText: '#1e40af',
};

export default function Quiz({ questions, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  const handleSelect = (value) => setSelected(value);

  const handleConfirm = () => {
    if (!selected) {
      setSnackbarMessage('Please select an answer');
      setOpenSnackbar(true);
      return;
    }
    setShowExplanation(true);
    if (selected === q.correct_answer) {
      setScore(score + 1);
    } else {
      setWrongQuestions([...wrongQuestions, current]);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelected('');
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete({ score, wrongQuestions });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: palette.background, display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 6, pb: 6 }}>
      {/* Progress Bar and Score */}
      <Paper elevation={3}
        sx={{
          width: 380,
          maxWidth: '95vw',
          mb: 4,
          borderRadius: 4,
          p: 2.5,
          bgcolor: palette.card,
          boxShadow: `0 4px 24px ${palette.shadow}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle2" sx={{ color: palette.text, fontWeight: 600 }}>
            Question {current + 1} of {questions.length}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: palette.primary, fontWeight: 700 }}>
            Score: {score}/{questions.length}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 5,
            background: palette.progressBg,
            '& .MuiLinearProgress-bar': {
              background: palette.progressFill,
            },
          }}
        />
      </Paper>
      <Paper elevation={3} sx={{
        maxWidth: '98vw',
        p: 4,
        borderRadius: 4,
        bgcolor: palette.card,
        boxShadow: `0 4px 24px ${palette.shadow}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}>
        <Typography variant="h6" sx={{ color: palette.text, fontWeight: 800, fontSize: '1.25rem', mb: 3, textAlign: 'left' }}>
          {q.question}
        </Typography>
        <Stack spacing={2} sx={{ mb: 3 }}>
          {q.alternatives.map((alt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const value = String.fromCharCode(97 + idx);
            const isSelected = selected === value;
            const isCorrect = showExplanation && value === q.correct_answer;
            const isWrong = showExplanation && value === selected && value !== q.correct_answer;
            return (
              <Button
                key={value}
                variant="outlined"
                onClick={() => !showExplanation && handleSelect(value)}
                fullWidth
                sx={{
                  justifyContent: 'flex-start',
                  pl: 2,
                  pr: 2,
                  py: 1.5,
                  borderRadius: 3,
                  border: isSelected ? `2px solid ${palette.primary}` : `2px solid ${palette.border}`,
                  color: isSelected ? palette.primary : palette.text,
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  background: isSelected ? palette.background : palette.card,
                  boxShadow: isSelected ? `0 2px 8px ${palette.redShadow}` : 'none',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  '&:hover': {
                    border: `2px solid ${palette.primary}`,
                    color: palette.primary,
                    background: palette.background,
                  },
                  ...(isCorrect && {
                    border: `2px solid ${palette.successBorder}`,
                    color: palette.successText,
                    background: palette.successBg,
                  }),
                  ...(isWrong && {
                    border: `2px solid ${palette.errorBorder}`,
                    color: palette.errorText,
                    background: palette.errorBg,
                  }),
                }}
                disabled={showExplanation}
                startIcon={<Box sx={{
                  width: 32,
                  height: 32,
                  bgcolor: isSelected || isCorrect || isWrong ? 'transparent' : palette.lightBg,
                  color: isSelected ? palette.primary : isCorrect ? palette.successText : isWrong ? palette.errorText : palette.text,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  border: isSelected ? `2px solid ${palette.primary}` : `2px solid ${palette.border}`,
                  ...(isCorrect && {
                    border: `2px solid ${palette.successBorder}`,
                    color: palette.successText,
                  }),
                  ...(isWrong && {
                    border: `2px solid ${palette.errorBorder}`,
                    color: palette.errorText,
                  }),
                  mr: 1.5,
                }}>{letter}</Box>}
              >
                {alt}
              </Button>
            );
          })}
        </Stack>
        {!showExplanation && (
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={!selected}
            fullWidth
            sx={{
              bgcolor: palette.primary,
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.15rem',
              borderRadius: 3,
              py: 1.5,
              letterSpacing: 1,
              mt: 1,
              boxShadow: `0 2px 12px ${palette.redShadow}`,
              '&:hover': { bgcolor: palette.primaryDark },
            }}
          >
            Confirm Answer
          </Button>
        )}
        {showExplanation && (
          <Box sx={{ mt: 3 }}>
            <Alert
              severity={selected === q.correct_answer ? 'success' : 'error'}
              sx={{
                border: selected === q.correct_answer ? `2px solid ${palette.successBorder}` : `2px solid ${palette.errorBorder}`,
                bgcolor: selected === q.correct_answer ? palette.successBg : palette.errorBg,
                color: selected === q.correct_answer ? palette.successText : palette.errorText,
                fontWeight: 600,
                mb: 2,
              }}
            >
              {selected === q.correct_answer ? 'Correct!' : 'Incorrect.'}
            </Alert>
            <Alert
              severity="info"
              sx={{
                border: `2px solid ${palette.infoBorder}`,
                bgcolor: palette.infoBg,
                color: palette.infoText,
                fontWeight: 500,
              }}
            >
              <b>Explanation:</b> {q.explanation}
            </Alert>
            <Button
              variant="contained"
              onClick={handleNext}
              fullWidth
              sx={{
                bgcolor: palette.primaryLight,
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: 3,
                py: 1.2,
                mt: 3,
                boxShadow: `0 2px 8px ${palette.redShadow}`,
                '&:hover': { bgcolor: palette.primary },
              }}
            >
              {current < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </Box>
        )}
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="warning" onClose={() => setOpenSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
} 