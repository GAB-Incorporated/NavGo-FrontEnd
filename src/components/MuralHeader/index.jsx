import { Flex, Box, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import styles from "./muralHeader.module.css"

const DashboardHeader = ({instituicao, pagina}) => {
    return (
        <Flex className={styles.wrapper}>
            <Link to='/' className={styles.dbTitle}>
                    {instituicao}
            </Link>
            <Box className={styles.dbDivider}/>
            <Text className={styles.dbSubtitle}>
                {pagina}
            </Text>
        </Flex>
    )
}

export default DashboardHeader;