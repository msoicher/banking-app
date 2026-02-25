import { useState, useMemo } from 'react';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';

const queryClient = new QueryClient();

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light',
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#FF7A64' },
          secondary: { main: '#1E1E2E' },
        },
        typography: {
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        },
        shape: { borderRadius: 12 },
      }),
    [mode],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" color="secondary" elevation={0}>
          <Toolbar>
            <Typography variant="h6" fontWeight={700} letterSpacing={-0.5}>
              Up Banking
            </Typography>
            <IconButton
              sx={{ ml: 'auto' }}
              color="inherit"
              onClick={() => setMode((m) => {
                const next = m === 'light' ? 'dark' : 'light';
                localStorage.setItem('theme', next);
                return next;
              })}
              aria-label="Toggle dark mode"
            >
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Dashboard />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
