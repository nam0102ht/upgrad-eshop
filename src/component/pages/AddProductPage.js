import { createTheme, ThemeProvider } from '@mui/material/styles'
import AddProduct from '../products/AddProduct';

const theme = createTheme()

function AddProductPage() {
    return (
      <ThemeProvider theme={theme}>
        <AddProduct />
      </ThemeProvider>
    );
  }
  
  export default AddProductPage;