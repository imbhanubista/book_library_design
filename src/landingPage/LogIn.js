import {
  GridItem,
  SimpleGrid,
  Box,
  Heading,
  Text,
  Divider,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Center,
} from "@chakra-ui/react";
import React from "react";
import { AddIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionReducer } from "../reducersPage/actions/action";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Nav from "../usedProps/Nav";
const LogIn = () => {
  // to navigate ho home page
  const navHome = useNavigate();
  // to handle signup
  const navSign = useNavigate();
  const signNav = () => {
    navSign("/signup");
  };
  // to handle forgot password
  const forPass = useNavigate();
  const forgotNav = () => {
    forPass("/forget");
  };
  // to save data to redux store using dispatch
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  //   react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    let logInApi = await axios({
      method: "post",
      url: "http://localhost:5000/login",
      data,
    });
    if (logInApi.data.type === "error") {
      toast.error("Something went wrong !", {
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      toast.success("Sign Up successfull !", {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(actionReducer(logInApi));
      navHome("/home");
    }
  };
  return (
    <div>
      <Nav />
      <Box p={5} m={5} borderRadius="10" boxShadow={"md"}>
        <SimpleGrid columns={"2"} spacing={70}>
          <Box>
            <GridItem alignContent={"center"} mt="25">
              <Heading>Hello,</Heading>
              <Divider></Divider>
              <Text fontSize={"3xl"}>WelCome to</Text>
              <Divider />
              <Text fontSize={"5xl"} color="#54C9C6">
                Yarti Book's Library
              </Text>
            </GridItem>
          </Box>
          <GridItem>
            <Box
              border={"2px solid #00758E"}
              borderRadius="20px"
              p={5}
              width={{ base: 400, md: 500 }}
            >
              <Heading textAlign={"center"} color="#007373">
                Login
              </Heading>{" "}
              <br />
              <Divider variant={"solid"} />
              <br />
              {/* form start from here */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type="text"
                  placeholder="Enter Your Email"
                  variant="filled"
                  size={"lg"}
                  textAlign="center"
                  {...register("email", { required: true })}
                  mb={4}
                />
                {errors.email && <span>Email shouldn't be empty</span>}

                <InputGroup mb="3">
                  <Input
                    textAlign={"center"}
                    type={show ? "text" : "password"}
                    placeholder="Enter Your password"
                    variant="filled"
                    size={"lg"}
                    {...register("password", { required: true })}
                  />
                  <InputRightElement width={"4.5rem"} size="lg">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && <span> Password shouldn't be empty</span>}
                <Center mb={3}>
                  <Button
                    mb={"3"}
                    mt="2"
                    colorScheme="blue"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Log In
                  </Button>
                </Center>
              </form>
              {/* end of form design */}
              {/* forgot password design start */}
              <Center mb={"9"}>
                <Button variant={"link"} colorScheme="blue" onClick={forgotNav}>
                  Foget Password <ArrowForwardIcon />{" "}
                </Button>
              </Center>
              <hr />
              {/* end of forget pass design */}
              <Center mb={"3"}>
                <Text color={"gray.600"}>Not a User?</Text>
              </Center>
              <Center>
                <Button variant={"ghost"} onClick={signNav} colorScheme="blue">
                  Sign Up
                </Button>
              </Center>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default LogIn;
