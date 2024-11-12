import { useEffect, useState } from "react";
import styles from './chatComponent.module.css'
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
                const validClassId = classId ?? 1;
                
                const response = await api.get(`/files/${validClassId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                setFiles(response.data);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Erro desconhecido. Tente novamente mais tarde.';
                toast({
                    title: 'Falha ao carregar Mural',
                    description: errorMessage,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };
        fetchFiles();
    }, [classId, toast, token]);

    const formatFileNameAndDate = (fileName, uploadDate) => {
        const formattedFileName = fileName.startsWith('/') ? fileName.slice(1) : fileName;

        const date = new Date(uploadDate);

        const options = { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
        const formattedDate = date.toLocaleString('pt-BR', options).replace(',', '');

        return { formattedFileName, formattedDate };
    };

    return (
        <Box className={styles.container}>
            {loading ? (
                <Spinner size="xl" />
            ) : (
                files.length > 0 ? (
                    files.map((file, index) => {
                        const { formattedFileName, formattedDate } = formatFileNameAndDate(file.name, file.uploadDate);
                        return (
                            <Box key={index} className={styles.fileBox}>
                                <Text className={styles.fileName}>
                                    {formattedFileName}
                                </Text>
                                <Text className={styles.fileName}>
                                    {formattedDate}
                                </Text>
                                <Box className={styles.previewBox}>
                                    <Text>Preview se possível</Text>
                                </Box>
                                <Link href={file.url} className={styles.link} isExternal>
                                    Visualizar Arquivo
                                </Link>
                                <Link download href={file.downloadUrl} className={styles.link}>
                                    Baixar Arquivo
                                </Link>
                            </Box>
                        );
                    })
                ) : (
                    <Text>Nenhum arquivo enviado nessa turma ainda</Text>
                )
            )}
        </Box>
    );
};

export default ChatComponent;
