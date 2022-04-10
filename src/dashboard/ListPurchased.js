import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr,Image, Heading, Text, Popover, PopoverTrigger, Button, PopoverContent, PopoverAnchor, PopoverArrow, PopoverCloseButton, PopoverHeader, Center, PopoverBody } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SideNav from '../usedProps/Sidebar'
import { ViewIcon } from '@chakra-ui/icons'

const ListPurchased = () => {

 
  // to store api data
  const [store, setStore] = useState([])
    // to get the token
    const selector = useSelector(state=>state.reducer)
        let token = selector.data.data.token
        // console.log(token)

         // state to make sure data is loading
  const [loading,setLoading] = useState(true)

    // to get the list of purchased books
    const getPurchased = async()=>{
        let purchaseddata = await axios({
            method:"post",
            url:"http://localhost:5000/purchased",
            data: {token}
        })
       setStore(purchaseddata.data.data.allBooksP)
       console.log(purchaseddata.data.data.allBooksP)
       setLoading(false)
    }
    useEffect(()=>{
      getPurchased()
    },[])

  return (
    <SideNav>
{loading?"Data is Loading !!!":
<TableContainer >
  <Table variant={"striped"} colorScheme="telegram" size={"sm"}  whiteSpace="nowrap">
    <TableCaption placement='top' fontSize={40} mb="10"> <u>List of purchased books</u> </TableCaption>
    <Thead mb='15'>
      <Tr>
        <Th fontSize={"2xl"}>Cover Photo</Th>
        <Th fontSize={"2xl"}>Book Name</Th>
        <Th fontSize={"2xl"}>Author</Th>
        <Th fontSize={"2xl"}>Category</Th>
        <Th fontSize="2xl">Details</Th>
      </Tr>
    </Thead>
    <Tbody>
    {store.map((data,index)=>{
      return(
       
        <Tr mt={10}>
        <Td> <Image src={"http://localhost:5000"+data.cover_photo} boxSize="sm" boxSize="100px" /> </Td>
        <Td> <Heading fontSize={25}>{data.bname}</Heading> </Td>
        <Td> <Text fontSize={25} fontWeight="bold">{data.author}</Text> </Td>
        <Td> <Text fontSize={20} fontWeight="bold"> {data.category}</Text> </Td>
        <Td> 
          <Popover>
            <PopoverTrigger>
              <Button>View <ViewIcon ml="2"/> </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow/>
              <PopoverCloseButton/>
              <Center><PopoverHeader> {data.publication} Publication</PopoverHeader></Center>
              <Center>
                <PopoverBody>{data.edition} Edition</PopoverBody>
              </Center>
              <Center> 
                <PopoverBody>Purchased Date: {data.purchase_date} </PopoverBody>
              </Center>
            </PopoverContent>
          </Popover>
           </Td>
      </Tr>
      
     
      )
    })}
    </Tbody>
  </Table>
</TableContainer>
}
<Center mt="20">
        <footer >© 2022 Bistaify. All rights reserved.</footer>
      </Center>
    </SideNav>
  )
}

export default ListPurchased
