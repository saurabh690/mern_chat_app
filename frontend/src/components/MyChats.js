import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    const toast = useToast();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer: ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/chat", config);
            setChats(data);

        } catch (error) {
            toast({
                title: "Error occured. Failed to load the search",
                status: "error",
                duration: "5000",
                isClosable: true,
                position: "bottom-left",
            });
        }
    };
    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userinfo")));
        fetchChats();
    }, [fetchAgain]);
    return (                                             //this is the design of the chat page
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir={"column"}
            alignItems={"center"}
            p={3}
            bg={"white"}
            w={{ base: "100%", md: "31%" }}
            borderRadius={"lg"}
            borderWidth={"1px"}
        >
            <Box
                pb={3}
                px={3}
                display={"flex"}
                fontSize={{ base: "28px", md: "30px" }}
                w={"100%"}
                justifyContent={"space-between"}
                alignItems="center"
            >
                My Chats
                <GroupChatModal>

                    <Button
                        dsiplay="flex"
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />}
                    >
                        Create Group Chat
                    </Button>
                </GroupChatModal>
            </Box>
            <Box
                display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
                flexDir={"column"}
                p={3}
                bg="#F8F8F8"
                width={"100%"}
                h={"100%"}
                borderRadius={"1g"}
                overflowY={"hidden"}
            >
                {chats ? (

                    <Stack overflowY="scroll">
                    {
                            chats.map((chat) => (
                                <Box
                                    onClick={() => setSelectedChat(chat)}
                                    cursor="pointer"
                                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}  //if its a selected chat than it will turn blue 
                                    color={selectedChat === chat ? "white" : "black"}
                                    px={3}
                                    py={2}
                                    borderRadius="lg"
                                    key={chat._id}
                                >
                                    <Text>
                                        {!chat.isGroupChat
                                            ? getSender(loggedUser, chat.users)  //for one on one chat it will be name of to whom we are talking with,//otherwise it will be group name
                                            : chat.chatName}                   
                                    </Text>

                                </Box>
                            ))

                        }

                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </Box>
        </Box>
    )
}

export default MyChats
