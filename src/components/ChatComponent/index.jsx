import { useEffect, useState } from "react";
import api from '../../api.js'
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
                        <Box key={index} p={3} mb={2} bg="gray.100" borderRadius="md">
                            <Link href={file.url} color="blue.500" isExternal>
                                {file.name}
                            </Link>
                        </Box>
                    ))
                ) : (
                    <Text>Nenhum enviado nessa turma ainda.</Text>
                )
            )}
        </Box>
    );
};

export default ChatComponent;
