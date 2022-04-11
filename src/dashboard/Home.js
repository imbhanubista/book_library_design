import { Box, Center, Divider, GridItem, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import React,{useState, useEffect} from 'react'
import Sidebar from '../usedProps/Sidebar'
import {useSelector} from 'react-redux'
import axios from 'axios'
const Home = () => {

  const selector = useSelector(state=>state.reducer)
  let token = selector.data.data.token
  // console.log(token)

  // store api data
const [store, setStore] = useState()

// loading
const [loading, setLoading] = useState(true)
  // api call
  const getApiData = async()=>{
    let apiData = await axios({
      method:"post",
      url:"http://localhost:5000/dashboard",
      data: {token}
    })
    setStore(apiData.data.data)
    setLoading(false)
  }

  useEffect(()=>{
    getApiData()
  },[])
  
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
      <Center><Heading size={"4xl"}>
        {loading?"Loading...":
        store.totalBooks
        }
        </Heading></Center>
       </Box>


      <Box border={"2px solid blue"} borderRadius="10" p={"10"}> <Center fontSize="lg">Total Purchsed Book</Center> 
      <Center><Heading size={"4xl"}>
        {loading? "Loading...":
        store.totalPurchase
        }
        </Heading></Center>
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