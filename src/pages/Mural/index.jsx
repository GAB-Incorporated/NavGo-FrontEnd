import { Box, Text, Flex } from "@chakra-ui/react";
import ChatComponent from "../../components/ChatComponent";
import Sidebar from "../../components/Sidebar";
import styles from "./mural.module.css"

const Mural = () => {
    return(
        <Box w={"inherit"}>
            <Flex className={styles.pageWrapper}>
                <Sidebar/>
                <Box className={styles.body}>
                    <ChatComponent/>
                </Box>
            </Flex>
        </Box>
    )
}

export default Mural;