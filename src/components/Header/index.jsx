import { Box, Image, Text } from "@chakra-ui/react"
import styles from "./header.module.css"

const Header = () => {
    return (
        <Box className={styles.headerBody}>
            <Box className={styles.logoWrapper}>
                <Image className={styles.logo} src='/images/navgo-logo.png'/>
            </Box>
            <Box className={styles.textWrapper}>
                <Text className={styles.title}>NavGo</Text>
                <Box className={styles.headerDivider}/>
                <Text className={styles.slogan}>A tecnologia facilitando a sua navegação</Text>
            </Box>
        </Box>
    )
}

export default Header;