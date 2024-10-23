import { useEffect, useState } from "react";
import api from '../../api.js';
import { Box, Text, Link, Spinner, useToast } from "@chakra-ui/react";

const ChatComponent = ({ classId }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await api.get(`/files/${classId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setFiles(response.data);
                setLoading(false);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Erro desconhecido. Tente novamente mais tarde.';
                toast({
                    title: 'Falha ao carregar Mural',
                    description: errorMessage,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                setLoading(false);
            }
        };

        fetchFiles();
    }, [classId, toast, token]);

    return (
        <Box w="100%" p={5}>
            <Text fontSize="xl" mb={4}>Arquivos disponíveis no mural:</Text>
            {loading ? (
                <Spinner size="xl" />
            ) : (
                files.length > 0 ? (
                    files.map((file, index) => (
                        <Box 
                            key={index} 
                            p={3} 
                            mb={2} 
                            bg="#FF6E58" // cor laranja avermelhada
                            borderRadius="md"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Text fontWeight="bold" mb={2} color="white">
                                {file.name}
                            </Text>
                            <Box 
                                w="100%" 
                                h="150px" 
                                bg="gray.300" 
                                borderRadius="md" 
                                display="flex" 
                                alignItems="center" 
                                justifyContent="center"
                                mb={2}
                            >
                                <Text>Preview se possível</Text>
                            </Box>
                            <Link href={file.url} color="white" isExternal>
                                Baixar Arquivo
                            </Link>
                        </Box>
                    ))
                ) : (
                    <Text>Nenhum arquivo enviado nesta turma ainda.</Text>
                )
            )}
        </Box>
    );
};

export default ChatComponent;
