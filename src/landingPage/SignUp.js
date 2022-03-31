import React, { useRef, useState } from "react";
import {
  Input,
  Button,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Heading,
  Box,
  Center,
  Divider,
  Text,
  Image
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { AddIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import style from "../styling/landing.style.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // for password show hide
  const [show, setShow] = React.useState(false);

  // to navigate the route to login 
  const nav1 = useNavigate()
  const navBtn =()=>{
    nav1('/login')
  }

  const handleClick = () => setShow(!show);
  // for useRef
  const fileRef = useRef();
  const handleFile = () => {
    fileRef.current.click();
  };

  // state to store image
  const [image, setImage] = useState("");

  //function to handle image
  const handleImage = (e) => {
    if (e.target.files) {
      console.log(e.target.files);
      setImage(e.target.files[0]);
    }
  };
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // alert("here")
    let formData = new FormData();
    console.log(data);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("age", data.age);
    formData.append("sex", data.sex);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("profile", image);
    formData.append("password", data.password);
    let signUpData = await axios({
      method: "post",
      url: "http://localhost:5000/signup",
      data: formData,
    });
    if(signUpData.data.type === "error"){
      toast.error("Something went wrong !", {
        position: toast.POSITION.TOP_LEFT
      });
    }
    else{
      toast.success("Sign Up successfull !", {
        position: toast.POSITION.TOP_CENTER
      });
      nav1('/login')
    }
    
  };

  return (
    <Center mt={10}>
      <Box border={"2px"} borderColor={"#00758E"} borderRadius={"20px"} p= {{base : 8, md : 8}} width = {{base : 500, md : 500}}>
        <Heading color={"#007373"} textAlign="center">
          Sign Up
        </Heading>{" "}
        <br />
        <Divider variant={"dashed"} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Enter Name"
            variant="filled"
            {...register("name", { required: true })}
            mb  = {4}
            mt  = {2}
          />
          {errors.name && <span>Name shouldn't be empty</span>}
          
          <Input
            type="text"
            placeholder="Enter Email"
            variant="filled"
            {...register("email", { required: true })}
            mb  = {4}
            mt  = {2}
          />
          {errors.email?.type === "required" && "Enter Email!!"}
         
          <Input
            type="text"
            placeholder="Enter Age"
            variant="filled"
            {...register("age", { required: true })}
            mb  = {4}
            mt  = {2}
          />
          {errors.age?.type === "required" && "Enter age!!"}
         
          <Select 
           mb  = {4}
           mt  = {2}
          variant="filled" {...register("sex", { required: true })}>
            <option value="none" selected disabled hidden>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>{" "}
          {errors.sex?.type === "required" && "Enter gender!!"}
      
          <Input
            type="text"
            placeholder="Enter Address"
            variant="filled"
            {...register("address", { required: true })}
            mb  = {4}
            mt  = {2}
          />
          {errors.address?.type === "required" && "Enter address!!"}
         
          <InputGroup 
           mb  = {4}
            mt  = {2}>
          
            <InputLeftAddon children="+977"  />
            <Input
              type="tel"
              placeholder="phone number"
              variant="filled"
              {...register("phone", { required: true })}
            />
          </InputGroup>
          {errors.phone?.type === "required" && "Enter Phone Number!!"}
          {/* for password */}
          <InputGroup 
           mb  = {1}
           mt  = {2}
          >
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              variant="filled"
              {...register("password", { required: true })}
            />
            <InputRightElement width={"4.5rem"}>
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password?.type === "required" && "Password is Empty!!"}
          {/* for file Upload */}
          <br/>
          <Input
            ref={fileRef}
            type="file"
            accept="image/jpg, image/png,image/jpeg"
            placeholder="Upload File"
            variant="filled"
            display="none"
            onChange={handleImage}
          />
          {/* {errors.profile?.type=== 'required' && "File is Empty!!"} */}
          
          <Center>
          <Button
            leftIcon={<AddIcon />}
            variant="outline"
            colorScheme="teal"
            onClick={handleFile}
            width="40"
            size="sm"
            float="center"
            mb  = {3}
            mt  = {1}
            // {...register("profile",{required:true})}
          >
            Upload
          </Button> 
          
          </Center>
          <Center>
          {image!==""?
        <Center> 
          <Image borderRadius={"full"} boxSize= "250px"  src={URL.createObjectURL(image)} alt="Your Profile"/> 
           </Center> : "Upload Image" 
        }
          </Center>
          
          {" "}
          <br />
          {/* <div style={{ marginTop: 7, marginBottom: 7 }}> */}
           <Center>
           <Button
              variant="outline"
              colorScheme="blue"
              type="submit"
              isFullWidth
              // size="sm"
              // ml="40"
              isLoading={isSubmitting}
            >
              Sign In
            </Button>
           </Center>
          {/* </div> */}
        </form>
        <Center>
        <Text color='gray.500' isTruncated
        mt={'2'}
        mb={1}
        >
          Already a User?
        </Text>    
        </Center>
        <Center>
        <Button mt={2} color={"#00758e"} onClick={navBtn} variant="ghost" >Login</Button>
        </Center>
      </Box>
    </Center>
  );
};

export default SignUp;
