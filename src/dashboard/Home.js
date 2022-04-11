import {
  Box,
  Center,
  Divider,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Sidebar from "../usedProps/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
const Home = () => {
  const selector = useSelector((state) => state.reducer);
  let token = selector.data.data.token;
  // console.log(token)

  const [loading, setLoading] = useState(true);

  // store api data
  const [store, setStore] = useState();
  // api call
  const getApiData = async () => {
    let apiData = await axios({
      method: "post",
      url: "http://localhost:5000/dashboard",
      data: { token },
    });
    setStore(apiData.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getApiData();
  }, []);
  console.log(store);
  return (
    <div>
      <Sidebar>
        <SimpleGrid row={2} spacing="10">
          <Center>
            <Box>
              <Heading size={"3xl"} mb="4" mt={"3"}>
                Yarti Technologies
              </Heading>
              <Center mb={"3"} fontSize="2xl">
                {" "}
                Present's{" "}
              </Center>
              <Center>
                {" "}
                <Text
                  color={"red.300"}
                  fontSize="3xl"
                  fontWeight={"bold"}
                  mb="2"
                >
                  Yarti online Library
                </Text>{" "}
              </Center>
            </Box>
          </Center>
          <Divider />
          <Center>
            <Box>
              <SimpleGrid columns={"2"} spacing="70">
                <Box border="2px solid green" borderRadius={"10"} p="10">
                  {" "}
                  <Center fontSize={"lg"} fontWeight="bold">
                    Total Book Published
                  </Center>
                  <Center>
                    <Heading size={"4xl"}>
                      {loading ? (
                        "Loading..."
                      ) : (
                        <Text color={"green.500"}> {store.totalBooks} </Text>
                      )}
                    </Heading>
                  </Center>
                </Box>

                <Box border={"2px solid blue"} borderRadius="10" p={"10"}>
                  {" "}
                  <Center fontSize="lg" fontWeight={"bold"}>
                    Total Purchsed Book
                  </Center>
                  <Center>
                    <Heading size={"4xl"}>
                      {loading ? (
                        "Loading..."
                      ) : (
                        <Text color={"blue.500"}> {store.totalPurchase}</Text>
                      )}
                    </Heading>
                  </Center>
                </Box>
              </SimpleGrid>
            </Box>
          </Center>
        </SimpleGrid>
        <Center mt="20">
          <footer>© 2022 Bistaify. All rights reserved.</footer>
        </Center>
      </Sidebar>
    </div>
  );
};

export default Home;
