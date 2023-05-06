import Login from '../login/Login';
import PrimarySearchAppBar from '../navbar/PrimarySearchAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme()

function LoginPage() {
  return (
    <ThemeProvider theme={theme}>
      <PrimarySearchAppBar />
      <Login />
    </ThemeProvider>
  );
}

export default LoginPage;