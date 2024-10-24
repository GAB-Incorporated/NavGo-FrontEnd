import { InfoIcon } from "@chakra-ui/icons";
import { Box, Text, Flex, Tooltip } from "@chakra-ui/react";
import styles from './drawerClasses.module.css';
import { useEffect, useState } from "react";
import api from "../../../api";

const DrawerClasses = ({ handler, classItem }) => {
    const [lastFileName, setLastFileName] = useState('');
    const [lastFileTime, setLastFileTime] = useState('');

    // Encurta a string para caber na tela
    const truncateFileName = (name, maxLength = 20) => {
        if (name.length > maxLength) {
            return name.slice(0, maxLength) + '...';
        }
        return name;
    };

    useEffect(() => {
        const fetchLastFileInfo = async () => {
            try {
                const token = localStorage.getItem('token');  

                const response = await api.get(`/files/${classItem.class_id}/lastFile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                if (response.data) {
                    setLastFileName(response.data.lastFileName);
                    setLastFileTime(response.data.lastFileTime);
                }
            } catch (error) {
                console.log('Erro ao buscar o último arquivo: ' + error.message);
            }
        };

        if (classItem.class_id) {
            fetchLastFileInfo();
        }
    }, [classItem.class_id]);

    return (
        <Box className={styles.body} onClick={handler}>
            <Flex>
                <Text fontWeight={550} >{classItem.subject_name}</Text>
                <Text className={styles.time}>{lastFileTime}</Text>
            </Flex>
            <Box className={styles.divider}></Box>
            <Tooltip hasArrow label={classItem.description}>
                <InfoIcon boxSize={10} className={styles.icon}></InfoIcon>
            </Tooltip>
            <Flex>
                <Text className={styles.teacher}>{classItem.first_name} {classItem.last_name}:</Text>
                <Tooltip hasArrow label={lastFileName}>
                    <Text className={styles.fileName}>
                        {truncateFileName(lastFileName)}
                    </Text>
                </Tooltip>
            </Flex>
        </Box>
    );
}

export default DrawerClasses;
