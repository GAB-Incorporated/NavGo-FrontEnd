import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar";
import styles from "./subhome.module.css"
import { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import ModalStructure from "../../components/ModalStructure";
import MapBody from "../../components/ModalBody/SubhomeBody/MapBody";
import MuralBody from "../../components/ModalBody/SubhomeBody/MuralBody";

const Subhome = () => {
    const {isOpen, onOpen, onClose } = useDisclosure()
    const [modalContent, setModalContent] = useState(<></>);
    const [modalTitle, setModalTitle] = useState("")

    const openModal = (content, title) => {
        setModalContent(content);
        setModalTitle(title)
        onOpen();
    };

    return(
        <Box w={"inherit"}>
            <ModalStructure
                isOpen={isOpen}
                onClose={onClose}
                title={modalTitle}
                contentBody={modalContent}
                headerBGColor='main.100'
                headerColor='white'
            />
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
                            <Button 
                                className={styles.subhomeBtn}
                                onClick={() => openModal(<MapBody/>, "Como Usar o Mapa")}>
                                Mapa
                            </Button>
                            <Button 
                                className={styles.subhomeBtn}
                                onClick={() => openModal(<MuralBody/>, "Como Usar o Mural")}>
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