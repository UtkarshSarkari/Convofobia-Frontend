import React, { useEffect } from "react";
import './HomePage.css'; 
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp"; 
import {
  Container,
  Box,
  // Text,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  TabPanel,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export default function HomePage() {

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user){
      history.push("/chats")
    }
  }, [history])
  
  return (
    <Container maxW="xl" m="0">
      {/* <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text color="black" fontSize="4xl" fontFamily="Work sans ">
          CONVOFOBIA
        </Text>
      </Box> */}
      <Box m="40px 0 40px 50px" bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" justifyContent="center">
        <Tabs id="tabs" variant="soft-rounded" boxShadow="none" outline="none">
          <TabList boxShadow="none" border="none" mb="1em" mt="1em">
            <Tab className="tab" w="50%" boxShadow="none" border="none">LOGIN</Tab>
            <Tab className="tab" w="50%" boxShadow="none" border="none">SIGN UP</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
