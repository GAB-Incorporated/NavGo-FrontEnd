import './styles/main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import Routes from './routes/RouterProvider'
import theme from './styles/theme'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  </StrictMode>,
)