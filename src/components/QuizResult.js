import React from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';

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

export default function QuizResult({ score, total, onRetryWrong, onRestart, wrongQuestionsCount }) {
  return (
    <Box sx={{ minHeight: '100vh', background: palette.background, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 4, bgcolor: palette.card, boxShadow: `0 4px 24px ${palette.redShadow}` }}>
        <Stack spacing={2} alignItems="center">
          <Box sx={{ fontSize: 60 }}>🎉</Box>
          <Typography variant="h4" sx={{ color: palette.primary, fontWeight: 800 }}>Quiz Complete!</Typography>
          <Typography variant="h5" sx={{ color: palette.text, fontWeight: 700 }}>Score: {score} / {total}</Typography>
          <Typography variant="h6" sx={{ color: palette.primaryLight, fontWeight: 600 }}>{((score / total) * 100).toFixed(1)}%</Typography>
          <Stack spacing={2} sx={{ width: '100%', mt: 2 }}>
            {wrongQuestionsCount > 0 && (
              <Button
                variant="contained"
                onClick={onRetryWrong}
                sx={{
                  bgcolor: palette.primaryLight,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: 3,
                  boxShadow: `0 2px 8px ${palette.redShadow}`,
                  '&:hover': { bgcolor: palette.primary },
                }}
                fullWidth
              >
                Retry Wrong Questions ({wrongQuestionsCount})
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={onRestart}
              sx={{
                color: palette.primary,
                border: `2px solid ${palette.primary}`,
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: 3,
                boxShadow: `0 2px 8px ${palette.redShadow}`,
                '&:hover': { bgcolor: palette.primary, color: '#fff' },
              }}
              fullWidth
            >
              Start Over
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
} 