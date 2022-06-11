import { Avatar, Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ProfileModal({user, children}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
        {
            children ? ( <span onClick={onOpen}>{children}</span> ) : ( 
            // <IconButton
            //     d={{base: "flex"}}
            //     // icon = {<ViewIcon/>}
            //     onClick={onOpen}
            //     />
            <span onClick={onOpen}><VisibilityIcon style={{display: "flex",cursor: "pointer", fontSize: "28px"}} /></span>
            ) 
        }
        <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
        <ModalOverlay />
        <ModalContent h='410px'>
          <ModalHeader fontSize="40px" fontFamily="inherit" d="flex" justifyContent="center">{user.name}</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody d='flex' flexDirection='column' alignItems='center' justifyContent='space-around'>
          <Avatar size='2xl' cursor='pointer' name={user.name} /> 
          <Text fontSize={{base:"28px", md: "28px"}} fontFamily="inherit">
              Email: {user.email}
          </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose} w="100%">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
  