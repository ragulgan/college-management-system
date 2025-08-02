import AppRoutes from './routes/appRoutes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
