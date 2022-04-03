import { Box, Center, Divider, GridItem, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../usedProps/Sidebar'
const Home = () => {
  return (
    <div>
      <Sidebar> 
    <SimpleGrid row={2} spacing="10">
<Center>
<Box>  
  <Heading size={"3xl"} mb="4" mt={"3"} >Yarti Technologies</Heading>
  <Center mb={"3"} fontSize="2xl"> Present's  </Center>
  <Center> <Text color={"red"} fontSize="3xl" fontWeight={"bold"} mb="2">Yarti online Library</Text> </Center>
   </Box>
</Center>
<Divider/>
<Center>
  <Box>
    <SimpleGrid columns={"2"} spacing="70">
      <Box border="2px solid green" borderRadius={"10"} p="10"> <Center fontSize={"lg"}>Total Book Published</Center>
      <Center><Heading size={"4xl"}>10</Heading></Center>
       </Box>


      <Box border={"2px solid blue"} borderRadius="10" p={"10"}> <Center fontSize="lg">Total Purchsed Book</Center> 
      <Center><Heading size={"4xl"}>20</Heading></Center>
      </Box>
    </SimpleGrid>
  </Box>
</Center>
    </SimpleGrid>
         </Sidebar>
    </div>
  )
}

export default Home