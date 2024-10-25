import { InfoIcon } from "@chakra-ui/icons";
import { Box, Text, Flex, Tooltip } from "@chakra-ui/react";
import styles from './drawerClasses.module.css';

const DrawerClasses = ({ handler, classItem }) => {
    
    // Encurta a string para caber na tela
    const truncateFileName = (name, maxLength = 20) => {
        if (name.length > maxLength) {
            return name.slice(0, maxLength) + '...';
        }
        return name;
    };

    return (
        <Box className={styles.body} onClick={handler}>
            <Flex>
                <Text fontWeight={550}>{classItem.subject_name}</Text>
                <Text className={styles.time}>{classItem.lastFileTime}</Text>
            </Flex>
            <Box className={styles.divider}></Box>
            <Tooltip hasArrow label={classItem.description}>
                <InfoIcon boxSize={10} className={styles.icon} />
            </Tooltip>
            <Flex>
                <Text className={styles.teacher}>{classItem.first_name} {classItem.last_name}:</Text>
                <Tooltip hasArrow label={classItem.lastFileName}>
                    <Text className={styles.fileName}>
                        {truncateFileName(classItem.lastFileName)}
                    </Text>
                </Tooltip>
            </Flex>
        </Box>
    );
};

export default DrawerClasses;
