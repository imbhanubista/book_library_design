import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Playfair Display, sans-serif',
    body: 'Raleway, sans-serif',
  },
  colors : {
    brand : {
      100 : "red",
      200 : "red",
      300 : "red",
      400 : "red",
      500 : "red",
      600 : "red",
      700 : "red",
      800 : "red",
      900 : "red",
    }
  }
  
},

// withDefaultColorScheme({
//   colorScheme : "brand"
// })
)

export default theme