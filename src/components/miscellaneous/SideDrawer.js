import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './SideDrawer.css';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/ChatLogics';
import NotificationBadge, { Effect } from "react-notification-badge";

export default function SideDrawer() {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()

    const handleSearch = async()=>{
      if(!search){
        toast({
          title: "Please Enter Something In Search",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left"
        })
        return;
      }

      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }

        const {data} = await axios.get(`/api/user?search=${search}`, config)

        setLoading(false);
        setSearchResult(data);

      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to load search results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        })
      }
    };

    const accessChat = async(userId)=>{
      try {
        setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }

      const {data} = await axios.post("/api/chat", {userId}, config);

      if(!chats.find((c)=>c._id === data._id)){
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();

      } catch (error) {
        toast({
          title: "Error fetching the chats",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        })
      }
    }

    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { user,selectedChat, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();

    const history = useHistory();

    const logoutHandler = ()=>{
      localStorage.removeItem("userInfo");
      history.push('/');
    }


  return (
    <div>
        <Box d="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
            <Tooltip label="Search users to chat" hasArrow placement='bottom-end'>
                <Button variant="ghost" onClick={onOpen}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <Text d={{base:"none", md:"flex"}} px="4">Search User</Text>
                </Button>
            </Tooltip>
            <Text fontSize="2xl" fontFamily="inherit">
              CONVOFOBIA
            </Text>
            <div id='rightDiv'>
              <Menu>
                <MenuButton p={1}>
                  <NotificationBadge
                  count={notification.length}
                  effect={Effect}
                  />
                  <NotificationsIcon style={{fontSize: 30}}></NotificationsIcon>
                </MenuButton>
                <MenuList>
                  {!notification.length && "No New Notifications"}
                  {notification.map((notif)=>(
                    <MenuItem key={notif._id} onClick={()=>{
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n)=> n !== notif));
                    }}>
                      {notif.chat.isGroupChat ? `New message in ${notif.chat.chatName}` : `New message from ${getSender(user, notif.chat.users)}` }
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton as={Button} d="flex" alignItems="center" justifyContent="center">
                  <Avatar size='sm' cursor='pointer' name={user.name} />
                  <KeyboardArrowDownIcon style={{marginTop: 5}}/>
                </MenuButton>
                <MenuList>
                  <ProfileModal user={user}>
                   <MenuItem>My Profile</MenuItem>
                  </ProfileModal>
                  <MenuDivider/>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </div>
        </Box >
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
            <DrawerBody>
            <Box d="flex" pb={2}>
              <Input placeholder='Search by name or email' mr={2} value={search} onChange={(e)=>setSearch(e.target.value)} />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {
              loading ? (<ChatLoading />) : (
                searchResult?.map(user=>(
                  <UserListItem key={user._id} user={user} handleFunction={()=>accessChat(user._id)} />
                ))
              )
            }
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
          </DrawerContent>
          
        </Drawer>
    </div>
  )
}
