import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Products from "../products/Products";

const theme = createTheme()

export default function ProductPage() {
  return (
    <ThemeProvider theme={theme}>
      <Products />
    </ThemeProvider>
  );
}