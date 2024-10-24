import { Box, Button, Flex, Text } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar";
import styles from "./subhome.module.css"
import DashboardHeader from "../../components/DashboardHeader";

const Subhome = () => {
    return(
        <Box w={"inherit"}>
            <Flex className={styles.pageWrapper}>
                <Sidebar/>
                <Box className={styles.body}>
                    <DashboardHeader 
                        instituicao="ETEC de Embu"
                        pagina="Introdução"    
                    />
                    <Box className={styles.info}>
                        <Text className={styles.infoText} marginBottom={"2vw"}>
                            Primeira vez por aqui?
                        </Text>
                        <Text className={styles.infoText}>
                            Não sabe usar alguma das plataformas?
                        </Text>
                        <Text className={styles.infoText}>
                            Veja o nosso tutorial!
                        </Text>
                        <Flex className={styles.btnsWrapper}>
                            <Button className={styles.subhomeBtn}>
                                Mapa
                            </Button>
                            <Button className={styles.subhomeBtn}>
                                Mural
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        </Box>
    )   
}

export default Subhome;