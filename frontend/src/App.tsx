import { CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#FF7A64' },   // Up Bank's coral
    secondary: { main: '#1E1E2E' },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 12 },
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" color="secondary" elevation={0}>
          <Toolbar>
            <Typography variant="h6" fontWeight={700} letterSpacing={-0.5}>
              Up Banking
            </Typography>
          </Toolbar>
        </AppBar>
        <Dashboard />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
