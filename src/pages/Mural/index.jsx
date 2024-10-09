import { Box, Flex } from "@chakra-ui/react";
import ChatComponent from "../../components/ChatComponent";
import Sidebar from "../../components/Sidebar";
import styles from "./mural.module.css";

const Mural = () => {
    
    //testes
    const subjectId = 1; 
    const courseId = 2;

    return (
        <Box w={"inherit"}>
            <Flex className={styles.pageWrapper}>
                <Sidebar />
                <Box className={styles.body}>
                    <ChatComponent subjectId={subjectId} courseId={courseId} />
                </Box>
            </Flex>
        </Box>
    );
};

export default Mural;
