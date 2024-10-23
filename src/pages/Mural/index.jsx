import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ChatComponent from "../../components/ChatComponent";
import api from '../../api.js';
import styles from "./mural.module.css";
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/MuralHeader';
import MuralDrawer from "../../components/MuralDrawer/index.jsx";

const Mural = () => {
    const [userId, setUserId] = useState(null);
    const [selectedClassId, setSelectedClassId] = useState(null);

    useEffect(() => {
        const getUserIdFromToken = () => {
            const token = localStorage.getItem('token');  
            if (token) {
                const decodedToken = jwtDecode(token);  
                return decodedToken.id_usuario;  
            }
            return null;
        };

        const userId = getUserIdFromToken();
        setUserId(userId);
    }, []);

    const handleClassSelection = (classId) => {
        setSelectedClassId(classId);
    };

    return (
        <Flex className={styles.pageWrapper}>
            <Flex flexDir="column" flex="1">
                <Header
                    instituicao="Etec de Embu"
                    pagina="Mural digital"
                />
                <Box className={styles.body}>
                    <Text fontSize="xl" mb={4}>Selecione uma Classe:</Text>
                    {userId ? (
                        <MuralDrawer
                            userId={userId}
                            onClassSelect={handleClassSelection} //Função de callback
                        />
                    ) : (
                        <Text>Carregando...</Text>
                    )}
                    
                    {/* Mostrar o ChatComponent apenas se uma classe for selecionada */}
                    {selectedClassId ? (
                        <ChatComponent classId={selectedClassId} />
                    ) : (
                        <Text>Nenhuma classe selecionada.</Text>
                    )}
                </Box>
            </Flex>
        </Flex>
    );
};

export default Mural;
