import './styles/main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import Routes from './routes/RouterProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  </StrictMode>,
)