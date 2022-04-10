import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Routing from './routers/Routing'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './styling/theme';
import "@fontsource/raleway"
import "@fontsource/playfair-display"
import Nav from './usedProps/Nav'

function App() {
  return (
   <ChakraProvider theme={theme}>
     <ToastContainer/>
     <Routing/>
     {/* <Nav/> */}
   </ChakraProvider>
  );
}

export default App;
