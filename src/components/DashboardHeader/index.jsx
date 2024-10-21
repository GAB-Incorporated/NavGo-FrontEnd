import { Flex, Box, Text } from "@chakra-ui/react"
import styles from "./dashboardHeader.module.css"

const DashboardHeader = ({instituicao, pagina}) => {
    return (
        <Flex className={styles.wrapper}>
            <Text className={styles.dbTitle}>
                {instituicao}
            </Text>
            <Box className={styles.dbDivider}/>
            <Text className={styles.dbSubtitle}>
                {pagina}
            </Text>
        </Flex>
    )
}

export default DashboardHeader;