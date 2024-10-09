import { useEffect, useState } from "react";
import api from '../../api.js'
import { Box, Text, Link, Spinner } from "@chakra-ui/react";

const ChatComponent = ({ classId }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    const fetchFiles = async () => {
        try {
            const response = await api.get(`/api/files/${classId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setFiles(response.data.files); 
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar arquivos:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [classId]);

    return (
        <Box w="100%" p={5}>
            <Text fontSize="xl" mb={4}>Arquivos disponíveis no mural:</Text>
            {loading ? (
                <Spinner size="xl"/>
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
                    <Text>Nenhum arquivo disponível.</Text>
                )
            )}
        </Box>
    );
};

export default ChatComponent;
