import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ChatComponent from "../../components/ChatComponent";
import Sidebar from "../../components/Sidebar";
import api from '../../api.js'
import styles from "./mural.module.css";
import { jwtDecode } from 'jwt-decode';

const Mural = () => {
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [classes, setClasses] = useState([]);

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

        const fetchClasses = async () => {
            if (userId) {
                try {
                    const response = await api.get(`/classes/user/${userId}`);
                    setClasses(response.data);
                } catch (error) {

                    //A implementar
                    console.log('aí ferra' + error);
                }
            } else {
                console.log('Token não encontrado ou inválido');
            }
        };

        fetchClasses();
    }, []);

    return (
        <Box w={"inherit"}>
            <Flex className={styles.pageWrapper}>
                <Sidebar />
                <Box className={styles.body}>
                    <Text fontSize="xl" mb={4}>Selecione uma Classe:</Text>
                    <Flex wrap="wrap" mb={4}>
                        {classes.map((classItem) => (
                            <Button
                                key={classItem.class_id}
                                onClick={() => setSelectedClassId(classItem.class_id)}
                                m={2}
                            >
                                {classItem.class_id}
                            </Button>
                        ))}
                    </Flex>

                    {selectedClassId ? (
                        <ChatComponent classId={selectedClassId} />
                    ) : (
                        <Text>Nenhuma classe selecionada.</Text>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

export default Mural;
