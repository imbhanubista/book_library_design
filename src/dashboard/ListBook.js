import { Box, Button, Center, Divider, GridItem, Heading, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, SimpleGrid, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SideNav from '../usedProps/Sidebar'
import { ArrowDownIcon} from '@chakra-ui/icons'

const ListBook = () => {

    // to get jwt token
    const selector = useSelector(state=>state.reducer)
    const token = selector.data.data.token
    // to store data 
    const [store, setStore] = useState([])
    // for loading 
    const [loading, setLoading] = useState(true)
    // to get api data
    let bookList = async()=>{
      // setLoading(true)
        let allData = await axios({
            method:"post",
            url :"http://localhost:5000/all_books",
            data:{token}
        })
        console.log(allData.data)
setStore(allData.data.data.allBooks)
setLoading(false)
    }

    useEffect(()=>{
            bookList()
    },[])

    // function to call purchased book api
    const handlePurchased =async(id)=>{
      let purchasedBook = await axios({
        method:"post",
        url:"http://localhost:5000/book_purchase/"+ id ,
        data:{token}
      })
    }
  return (
    <SideNav>
    {loading? "Data is loading":
    <>
            <SimpleGrid columns={4} spacing="8" h={"inherit"}>

    {store.map((data,index)=>{
       return( <div key={index}>
          <Box border={"1px solid gray"} borderRadius="lg" bgColor={"AppWorkspace"} position="inherit" shadow={"lg"}>
          <Center shadow={"base"} mb="4">
          <Image src={"http://localhost:5000"+data.cover_photo} alt="Book Cover Photo"  mb="4" overflow={"hidden"} height="40"/>
          </Center>
          
          <Center>
            <Box > 
              <Heading size={"lg"} mb="2"> {data.bname} </Heading>
              <Center>
              <Text color={"gray.400"} mb="3">{data.author}</Text>
              </Center>
              <Center>
                <Popover usePortal>
                  <PopoverTrigger>
                <Button colorScheme={"facebook"} size="sm" mb="3">Read More <ArrowDownIcon/></Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow/>
                    <PopoverCloseButton/>
                   <Center>
                   <PopoverHeader> {data.category} </PopoverHeader>
                   </Center>
                   <Center> <PopoverBody> {data.publication} Publication </PopoverBody></Center>
                    <Center><PopoverBody> {data.edition} Edition </PopoverBody></Center>
                    <Center><PopoverBody> <Text color={"gray.500"}>Created by: {data.name}</Text> </PopoverBody></Center>
                  
                  </PopoverContent>
                </Popover>
              </Center>
              <Center><Button variant={"link"} mb="4" onClick={()=>handlePurchased(data._id)}>Purchase</Button></Center>
            </Box>
          </Center>
          </Box>
        </div>)
    })}
            </SimpleGrid>

    </>
    }
    
    </SideNav>
  )
}

export default ListBook
