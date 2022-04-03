import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Routing from './routers/Routing'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './styling/theme';
import "@fontsource/raleway"
import "@fontsource/playfair-display"

function App() {
  return (
   <ChakraProvider theme={theme}>
     <ToastContainer/>
     <Routing/>
   </ChakraProvider>
  );
}

export default App;