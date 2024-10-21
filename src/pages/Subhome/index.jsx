import { Box, Flex, Text } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar";
import styles from "./subhome.module.css"

const Subhome = () => {
    return(
        <Box w={"inherit"}>
            <Flex className={styles.pageWrapper}>
                <Sidebar/>
                <Box className={styles.body}>
                    <Text className={styles.infoText}>
                        Bem-Vindo ao NavGO!
                    </Text>
                    <Text className={styles.infoText}>
                        Na barra ao lado temos as ferramentas disponiveis atualmente!
                    </Text>
                    <Text className={styles.infoText}>
                        Qualquer dúvida entre em contato com o administrador do seu curso!
                    </Text>
                    <Text className={styles.signature}>
                        Ass. Os Programmerz
                    </Text>
                </Box>
            </Flex>
        </Box>
    )   
}

export default Subhome;