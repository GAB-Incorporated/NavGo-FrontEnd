import { InfoIcon } from "@chakra-ui/icons";
import { Box, Text, Flex, Tooltip } from "@chakra-ui/react";
import styles from './drawerClasses.module.css'

const DrawerClasses = ({handler, classId}) => {

    return(
        <Box className={styles.body} onClick={handler}>
            <Flex>
                <Text>Matéria X - Professor Y</Text>
                <Text className={styles.time}>Hora</Text>
            </Flex>
            <Box className={styles.divider}>
                
            </Box>
            <Tooltip hasArrow label="Descrição tirada de algum lugar">
                <InfoIcon boxSize={10} className={styles.icon}></InfoIcon>
            </Tooltip>
            <Flex>
                <Text>Professor Fulano: </Text>
                <Text>Arquivo</Text>
            </Flex>
            {/* <Box className={styles.bottomDivider}/> */}
        </Box>
    )
}

export default DrawerClasses;