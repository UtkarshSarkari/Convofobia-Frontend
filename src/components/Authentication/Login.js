import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [show, setshow] = useState(false);
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handleClick = ()=> setshow(!show);

    const submitHandler = async()=>{
      setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      history.push('/chats')
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px" color="black">
        <FormControl id='email' isRequired>
            <FormLabel m="10px 0 5px 2px">
                Email 
            </FormLabel>
            <Input placeholder='Enter Your Email' value={email} onChange={(e)=>setemail(e.target.value)}>

            </Input>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel m="10px 0 5px 2px">
                Password
            </FormLabel>
            <InputGroup>
              <Input type={show ? "text" : "password"} placeholder='Enter Your Password' value={password} onChange={(e)=>setpassword(e.target.value)}>
              </Input>
              <InputRightElement width="4.5rem">
                <Button id='showbtn' boxShadow="none" outline="none" h="1.75rem" size="sm" onClick={handleClick}>
                  { show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button m="10px 0 0 0" id='submitbtn' colorScheme="blue" width="100%" style={{marginTop: 15}} onClick={submitHandler} isLoading={loading}>
          Login
        </Button>
        <Button m="10px 0 0 0" id='submitbtn' colorScheme="red" variant="solid" width="100%" style={{marginTop: 15}} onClick={()=>{
          setemail("guest@example.com");
          setpassword("123456");
        }}>
          Get Guest User Credentials
        </Button>
    </VStack>
  )
}
