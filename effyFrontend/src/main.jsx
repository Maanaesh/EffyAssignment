import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  config: {
    initialColorMode: "light", // Set default to light mode
    useSystemColorMode: false,  // Disable system preference for color mode
  },
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
