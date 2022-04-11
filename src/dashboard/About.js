import React from "react";
import SideNav from "../usedProps/Sidebar";
import { Center, Heading } from "@chakra-ui/react";
const About = () => {
  return (
    <SideNav>
      <Center>
        Hello this is demo project of book management
        <br />
        <Heading ml={4} color="green.400">
          {" "}
          Happy Coding !!!{" "}
        </Heading>
      </Center>

      <Center mt="20">
        <footer>© 2022 Bistaify. All rights reserved.</footer>
      </Center>
    </SideNav>
  );
};

export default About;
