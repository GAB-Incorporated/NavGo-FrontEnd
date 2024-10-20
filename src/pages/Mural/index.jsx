import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ChatComponent from "../../components/ChatComponent";
import Sidebar from "../../components/Sidebar";
import api from '../../api.js'
import styles from "./mural.module.css";

const Mural = () => {
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [classes, setClasses] = useState([]);
    const userId = 2;

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await api.get(`/classes/user/${userId}`); // Certifique-se de que o endpoint esteja correto

                setClasses(response.data);

            } catch (error) {
                console.log('aí ferra')
            }
        };

        fetchClasses();
    }, [userId]);

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
                                {classItem.subject_id}
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
