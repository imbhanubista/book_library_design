import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";

const Error = () => {
  return (
    <div>
      <Box p="300">
        <Center>
          <Heading fontSize={"9xl"} color="red">
            404
          </Heading>
          <Text fontSize={"4xl"} fontWeight="extrabold">
            Error
          </Text>
        </Center>
        <Center>You are in wrong route</Center>
      </Box>
    </div>
  );
};

export default Error;
