import React from 'react';
import { Box, Button, Typography, Paper, Stack } from '@mui/material';

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
  shadow: 'rgba(0,0,0,0.08)',
  redShadow: 'rgba(220,38,38,0.15)',
  blur: 'rgba(255,255,255,0.9)',
};

const options = [10, 20, 40, 100];

export default function StartScreen({ onSelectQuestions }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} mt={3}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 4, boxShadow: `0 4px 24px ${palette.shadow}` }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box sx={{ fontSize: 60, mb: 1 }}>
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" style={{ width: '80px', height: '80px' }} />
          </Box>
          <Typography variant="h4" sx={{ color: palette.primary, fontWeight: 800, mb: 1 }} textAlign="center">Canadian Citizenship Quiz</Typography>
          <Typography variant="subtitle1" sx={{ color: palette.textSecondary, mb: 3 }}>Test your knowledge and prepare for the citizenship test</Typography>
          <Typography variant="h6" sx={{ color: palette.text, fontWeight: 700, mb: 2 }}>How many questions would you like to practice?</Typography>
          <Stack spacing={2} sx={{ width: '100%', mt: 1 }}>
            {options.map((num) => (
              <Button
                key={num}
                variant="contained"
                onClick={() => onSelectQuestions(num)}
                sx={{
                  bgcolor: palette.lightBg,
                  color: palette.primary,
                  border: `2px solid ${palette.border}`,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: 3,
                  boxShadow: `0 2px 8px ${palette.redShadow}`,
                  '&:hover': {
                    bgcolor: palette.primaryLight,
                    color: '#fff',
                    border: `2px solid ${palette.primary}`,
                  },
                }}
                fullWidth
              >
                {num} Questions
              </Button>
            ))}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
} 