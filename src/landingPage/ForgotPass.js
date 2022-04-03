import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ForgotPass = () => {
  // navigation to reset password
  const resetNav = useNavigate();
  // navigation to login button
  const navLog = useNavigate();
  const logNav = () => {
    navLog("/login");
  };
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      let forgetApi = await axios({
        method: "post",
        url: "http://localhost:5000/forgot_pass",
        data,
      });
      if (forgetApi.data.type === "error") {
        toast.error(forgetApi.data.msg, {
          position: toast.POSITION.CENTER,
        });
      } else {
        toast.success("Reset code is sent to " + data.email, {
          position: toast.POSITION.TOP_CENTER,
        });
        resetNav("/reset?email=" + data.email);
      }
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.CENTER,
      });
    }
  };
  return (
    <div>
      <Center mt={"20"}>
        <Box boxShadow={"md"} p={"8"} color="#007373">
          <Heading mb={"8"}>Forgot Password?</Heading>
          <Divider />

          {/* start of form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type={"text"}
              placeholder="Enter Your Email"
              variant={"filled"}
              size="lg"
              textAlign={"center"}
              {...register("email", { required: true })}
              mb="6"
            />
            {errors.email && <span>Enter your email!!!</span>}
            <Center mb={"6"}>
              <Button
                color="#007373"
                variant={"outline"}
                isLoading={isSubmitting}
                type="submit"
              >
                Continue <ArrowForwardIcon />{" "}
              </Button>
            </Center>
          </form>
          {/* end of form */}
          <Divider />
          <Text>
            Remember Password?{" "}
            <Button variant={"link"} ml="10" color={"blue"} onClick={logNav}>
              Login
            </Button>{" "}
          </Text>
        </Box>
      </Center>
    </div>
  );
};

export default ForgotPass;
