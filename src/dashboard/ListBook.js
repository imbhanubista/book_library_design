import { Box,Input, Button, Center, Divider, GridItem, Heading, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, SimpleGrid, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SideNav from '../usedProps/Sidebar'
import { ArrowDownIcon,Search2Icon} from '@chakra-ui/icons'
 
const ListBook = () => {

    // to get jwt token
    const selector = useSelector(state=>state.reducer)
    const token = selector.data.data.token
    const isAdmin = selector.data.data.isAdmin
    // to store data 
    const [store, setStore] = useState([])
    // for the filteration process
    const [copyStore, setCopyStore] = useState([])

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
        // console.log(allData.data)
setStore(allData.data.data.allBooks)
setLoading(false)
setCopyStore(allData.data.data.allBooks)
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

    // to store input data
    const [inputD, setInputD] = useState("")
    // to handle the input field of search
    const handleInput =(e)=>{
      let input = (e.target.value)
      setInputD(input)
    }

    // for search button
    const handleSearch =()=>{
      // console.log("fffff");
      console.log(copyStore);
      let searchData = copyStore.filter((hello)=>{
        // console.log(hello, "Hello i am here");
        return hello.bname.toLowerCase() === inputD.toLowerCase()
      })
    // console.log(searchData)
      setStore(searchData)
    }
    // start of delete function
    const handleDelete = async(id)=>{
      let deleteApi = await axios({
        method:"post",
        url:"http://localhost:5000/delete_book/" + id,
        data:{token}
      })
      // console.log(deleteApi , "Hello dear")
    }
    
  return (
    <SideNav>
    {loading? "Data is loading":
    <>
   <SimpleGrid columns="2" spacing="80" mb="8">
     
       <Box> <Text fontSize="45" fontWeight="bold" ml="4"><b>List of all Book</b>s</Text> </Box>
       <Box> 
       <Button float="right" onClick={handleSearch} > <Search2Icon/> </Button>
       <Input type="text" width="40" 
       placeholder="Search ... "
       variant="outer" 
       float="right"
       onChange = {handleInput}
       mr="2"
       />
        </Box>
    
   </SimpleGrid>
     
   
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


{/* start Delete FUnction */}
             {isAdmin?
             <Box>
             <Center mb="4">
               <Button onClick={()=>handleDelete(data._id)}>Delete</Button>
             </Center>
           </Box> : "" 
            }
            

            {/* ENd delete function */}
            </Box>
          </Center>
          </Box>
        </div>)
    })}
            </SimpleGrid>

    </>
    }
      <Center mt="20">
        <footer >© 2022 Bistaify. All rights reserved.</footer>
      </Center>
    </SideNav>
  )
}

export default ListBook
