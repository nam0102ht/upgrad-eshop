import PrimarySearchAppBar from '../navbar/PrimarySearchAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Register from '../register/Register';

const theme = createTheme()

function RegisterPage() {
  return (
    <ThemeProvider theme={theme}>
      <PrimarySearchAppBar />
      <Register />
    </ThemeProvider>
  );
}

export default RegisterPage;