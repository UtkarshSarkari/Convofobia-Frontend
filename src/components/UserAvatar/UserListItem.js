import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react'
import { ChatState } from '../../Context/ChatProvider'

export default function UserListItem({user, handleFunction}) {
  return (
    <div>
        <Box 
        onClick={handleFunction} 
        cursor='pointer' 
        bg="#e8e8e8" 
        _hover={{
            background: "#38b2ac",
            color: "white"
        }}
        w="100%"
        d="flex"
        alignItems="center"
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius='lg'>
        <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        // src={user.pic}
        />
        <Box>
            <Text>{user.name}</Text>
            <Text fontSize="xs">
                <b>Email : </b>
                {user.email}
            </Text>
        </Box>
        </Box>
    </div>
  )
}
