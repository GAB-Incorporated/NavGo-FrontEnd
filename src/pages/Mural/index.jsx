import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ChatComponent from "../../components/ChatComponent";
import styles from "./mural.module.css";
import {jwtDecode} from 'jwt-decode';
import Header from '../../components/MuralHeader';
import MuralDrawer from "../../components/MuralDrawer/index.jsx";
import api from '../../api.js';

const Mural = () => {
    const [userId, setUserId] = useState(null);
    const [selectedClass, setSelectedClass] = useState(1);

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

    const handleClassSelection = async (classId) => {
        try {
            const response = await api.get(`/classes/${classId}`);
            setSelectedClass(response.data);
            console.log(selectedClass);
        } catch (error) {
            console.error("Erro ao buscar a classe:", error);
        }
    };

    return (
        <Flex className={styles.pageWrapper}>
            <Flex flexDir="column" flex="1">
                <Header
                    instituicao="Etec de Embu"
                    pagina="Mural digital"
                />
                <MuralDrawer
                    userId={userId}
                    onClassSelect={handleClassSelection}
                    selectedClass={selectedClass}
                />
                <Box className={styles.body}>
                    {selectedClass ? (
                        <ChatComponent classId={selectedClass.class_id} />
                    ) : (
                        <Text>Nenhuma classe selecionada.</Text>
                    )}
                </Box>
            </Flex>
        </Flex>
    );
};

export default Mural;
