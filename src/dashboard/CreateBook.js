import {
  Box,
  Button,
  Center,
  Divider,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Image,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Book from '../images/book.jpg' 
import cover from '../images/cover.jpg' 


const CreateBook = () => {
  // useRef
  const fileInput = useRef()
  // function to handle useRef
  const fileBtn = ()=>{
    fileInput.current.click()
  }

  // to navigate to home page
  const homeNav= useNavigate()

  // to navigate to home
  const nav1 = useNavigate()
  const navHome =()=>{
    nav1('/home')
  }
  // selector to get token from the redux
  const selector = useSelector(state=> state.reducer)
  // console.log(selector)
  const token = selector.data.data.token
  // console.log(token)


  // state to handle file upload
  const [coverPics, setCoverPic] = useState("")
  const handlePic =(e)=>{
    if(e.target.files){
      setCoverPic(e.target.files[0])
    }
    // setCoverPic("")
  }
  // for react hooks form
  const {register,handleSubmit,formState:{isSubmitting,errors},reset} = useForm()
  const onSubmit =async(data)=>{
    // console.log(data);
    let formData = new FormData()
    formData.append("token", token)
    formData.append("bname", data.bname)
    formData.append("author", data.author)
    formData.append("publication", data.publication)
    formData.append("edition", data.edition)
    formData.append("category", data.category)
    formData.append("coverPic", coverPics)

    let createBookApi = await axios({
      method:"post",
      url:"http://localhost:5000/add_book",
      data:
        formData
    })
    console.log(createBookApi.data)
    if(createBookApi.data.type==="error"){
      toast.error(createBookApi.data.msg, {
        position: toast.POSITION.TOP_LEFT
      });
    }
    else{
      toast.success("Book added !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    homeNav('/home')
reset()
  }
  return (
    <div>
      <Box>
        <SimpleGrid columns={2} spacing={1} mt="10">
          {/* for book library text */}
          <GridItem>
            <Center p={60} backgroundImage={cover}  ml={10} bgSize="cover" height={"200"} shadow="dark-lg">
              <Box >
                <Heading  color="black" size={"4xl"}>Add Your Book Here</Heading> 
                
              </Box>
              
            </Center>
            
          </GridItem>
          {/* for book adding form   */}
          <GridItem >
            <Center  padding={60} backgroundImage={Book} opacity="0.9" mr={"5"} height="200" shadow={"2xl"}>
              <Box >
                  <Center  >
                    <Heading color={"black"} mb="6"color ="#00758E">Add New Book</Heading>
                  </Center>
                  <Divider />
                {/* start of form design */}
                <form onSubmit={handleSubmit(onSubmit)} >
                  <Input
                    mb={4}
                    type={"text"}
                    placeholder="Enter Book Name "
                    variant={"filled"}
                    textAlign="center"
                    size={"md"}
                    {...register("bname",{required:true})}
                  />
                {errors.bname && <span>Name shouldn't be empty!!!</span>}

                  <Input
                    mb={4}
                    type={"text"}
                    placeholder="Enter Author Name "
                    variant={"filled"}
                    textAlign="center"
                    size={"md"}
                    {...register("author",{required:true})}
                  />
                  {errors.author && <span>Author name shouldn't be empty!!!</span> }

                  <Input
                    mb={4}
                    type={"text"}
                    placeholder="Enter PUblication Name "
                    variant={"filled"}
                    textAlign="center"
                    size={"md"}
                    {...register("publication",{required:true})}
                  />

                  <Input
                    mb={4}
                    type={"text"}
                    placeholder="Enter Book Edition "
                    variant={"filled"}
                    textAlign="center"
                    size={"md"}
                    {...register("edition",{required:true})}
                  />
                  <Input
                    mb={4}
                    type={"text"}
                    placeholder="Enter Book Category"
                    variant={"filled"}
                    textAlign="center"
                    size={"md"}
                    {...register("category",{required:true})}
                  />
                  <Input
                    ref={fileInput}
                    mb={4}
                    type={"file"}
                    placeholder="Enter Book Category"
                    variant={"filled"}
                    textAlign="center"
                    size={"md"}
                    display= "none"
                    onChange={handlePic}
                  />
                  <Center><Button onClick={fileBtn} mb="3">Upload</Button></Center>
                  <Center>
                    {
                      coverPics === ""? "Must Provice Cover Picture":
                      <Image borderRadius={"full"} boxSize="150px" src={URL.createObjectURL(coverPics)} alt="Image Preview"/>
                    }
                    
                  </Center>
                  <Divider/>
                  <Center>
                  <Button
                  type="submit"
                  colorScheme={"blue"}
                  isLoading={isSubmitting}
                  mb={"5"}
                  >
                    Add Book
                  </Button>
                  
                  </Center>
                  
                </form>
                {/* end of form design */}

              </Box>
              
            </Center>
            
          </GridItem>
        </SimpleGrid>
        <Center><Button variant ="link" mt="10" onClick={navHome}>HOME PAGE</Button></Center>

      </Box>
    </div>
  );
};

export default CreateBook;
