import { Box, Flex, Input, IconButton, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AttachmentIcon, ArrowUpIcon } from "@chakra-ui/icons";
import ChatComponent from "../../components/ChatComponent";
import { jwtDecode } from 'jwt-decode';
import Header from '../../components/MuralHeader';
import MuralDrawer from "../../components/MuralDrawer/index.jsx";
import api from '../../api.js';
import styles from './mural.module.css';

const Mural = () => {
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState('STUDENT');
    const [selectedClass, setSelectedClass] = useState(1);
    const token = localStorage.getItem("token");

    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const toast = useToast();

    useEffect(() => {
        const getUserIdFromToken = () => {
            if (token) {
                const decodedToken = jwtDecode(token);  
                return decodedToken.id_usuario;  
            }
            return null;
        };
        
        const getUserTypeFromToken = () => {
            if (token) {
                const decodedToken = jwtDecode(token);
                return decodedToken.user_type;
            }
            return 'STUDENT';
        }

        setUserId(getUserIdFromToken());
        setUserType(getUserTypeFromToken());
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        toast({
            title: "Anexado.",
            status: "info",
            duration: 1000,
            isClosable: true,
        });
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast({
                title: "Selecione um arquivo para enviar.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("classId", selectedClass);

        try {
            await api.post("/files/upload", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            toast({
                title: "Arquivo enviado com sucesso!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setSelectedFile(null);
            setMessage("");
        } catch (error) {
            toast({
                title: "Erro ao enviar arquivo",
                description: error.response?.data?.message || "Erro desconhecido. Tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleClassSelection = async (classId) => {
        try {
            const response = await api.get(`/classes/${classId}`);
            setSelectedClass(response.data);
        } catch (error) {
            toast({
                title: "Erro ao buscar a classe",
                description: error.response?.data?.message || "Erro desconhecido. Tente novamente mais tarde.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex className={styles.pageWrapper} direction="column" flex="1">
            <Header instituicao="Etec de Embu" pagina="Mural digital" />
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

            {userType === "STUDENT" ? null : (
                <Flex className={styles.messageBar}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="fileUpload"
                    />
                    <IconButton
                        as="label"
                        htmlFor="fileUpload"
                        aria-label="Anexar arquivo"
                        icon={<AttachmentIcon />}
                        variant="ghost"
                        size="lg"
                        className={styles.iconButton}
                    />
                    
                    <Input
                        placeholder="Digite sua mensagem..."
                        className={`${styles.inputField} ${selectedFile ? styles.fileAttached : ''}`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <IconButton
                        icon={<ArrowUpIcon />}
                        color="#000"
                        onClick={handleUpload}
                        className={selectedFile ? styles.fileAttached : ''}
                    />
                </Flex>
            )}
        </Flex>
    );
};

export default Mural;
