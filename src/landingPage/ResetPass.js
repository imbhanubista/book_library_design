import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Divider, Heading, Input, InputGroup, InputRightElement, Text,  } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import ReactCodeInput from 'react-code-input'
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ResetPass = () => {
  const location = useLocation()
// to get email from query
const query = new URLSearchParams(location.search)
  // for show and hide button
  const [show, setShow] = useState(false)
  const [cPass, setCPass] = useState(false)
  const handleClick =()=> setShow(!show)
  const handleCpass =()=> setCPass(!cPass)

  // to store the code 
  const [resetCode , setResetCode] = useState()
  const handleCode =(e)=>{
    console.log(e)
    setResetCode(e)
  }
  // to navigate to login page
  const logNav = useNavigate()


  // react hook form
  const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm()
  const onSubmit = async(data)=>{
    try{
      console.log(resetCode);

      let resetApi = await axios({
        method:"post",
        url:"http://localhost:5000/reset",
         data: { 
           ...data,
          code:resetCode,
          email: query.get("email")}
        
      })
      if(resetApi.data.type ==="error"){
        toast.error(resetApi.data.msg, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
      else{
        toast.success("Successfully password changed!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        logNav('/login')
      }
    }
    catch(err){
      Swal.fire("Error", err.message, "error")
    }
  }
  return (
    <div>
      <Center >
        <Box boxShadow={"lg"} border={"1px solid #072150"} borderRadius="12" p={"7"} mt="10">
          {/* start of heading */}
          <Heading color={"#007373"} mb="7">Change Your Password</Heading>
          {/* end of heading */}
      <Divider/>
          {/* email section */}
          <Center>
            <Text> Type the code,we sent to</Text> <br />
          </Center>
          <Center mb={"4"}>
            <Text> {query.get("email")} </Text>
          </Center>
          {/* end of email section */}
      
      {/* start of react code input */}
     <Center mb={"4"}>
     <ReactCodeInput type="password" fields={4} autoFocus={true} onChange={handleCode}/>
     </Center>
      {/* end of code input */}

    <form onSubmit={handleSubmit(onSubmit)}>
      {/* start of password field */}
      <InputGroup mb="4">
      <Input
      type={show?"text":"password"}
      variant="filled"
      placeholder="Enter new password!"
      size={"lg"}
      textAlign="center"
      {...register("password",{required:true})}
      />
      <InputRightElement size="lg" width={"5rem"}>
        <Button h={"1.85rem" } size="lg" onClick={handleClick}>
              {show ? <ViewOffIcon/> : <ViewIcon/>}
        </Button>
      </InputRightElement>
      </InputGroup>

      {/* end of password field */}
        {errors.password && <span>Password field is empty</span>}
      {/* start of conform password */}
      <InputGroup mb="4">
      <Input 
      type={cPass?"text":"password"}
      placeholder="Enter conform Password!"
      variant={"filled"}
      size="lg"
      textAlign={"center"}
      {...register("cpassword",{required:true})}
      />
      {/* for view icon */}
      <InputRightElement size="lg" width={"5rem"}>
      <Button h={"1.85rem"} size="lg" onClick={handleCpass}>
        {cPass? <ViewOffIcon/> : <ViewIcon/>}
      </Button>
      </InputRightElement>
      </InputGroup>
    {errors.cpassword && <span>Conform password is empty</span>}
      {/* end of conform password */}

      {/* start of change password button */}
      <Center>
        <Button colorScheme={"blue"} color="white"  type="submit" isLoading={isSubmitting}>
          Change Password
        </Button>
      </Center>
      {/* end of change password button */}
    </form>

        </Box>
      </Center>
    </div>
  );
};

export default ResetPass;
