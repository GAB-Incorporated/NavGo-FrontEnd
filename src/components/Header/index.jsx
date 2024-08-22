import { Box, Image, Text } from "@chakra-ui/react"
import navgoLogo from "../../assets/navgo-logo.png"
import styles from "./header.module.css"

export default function Header() {
    return (
        <Box className={styles.headerBody}>
            <Box className={styles.logoWrapper}>
                <Image className={styles.logo} src={navgoLogo}/>
            </Box>
            <Box className={styles.textWrapper}>
                <Text className={styles.title}>NavGo</Text>
                <Box className={styles.headerDivider}/>
                <Text className={styles.slogan}>A tecnologia facilitando a sua navegação.</Text>
            </Box>
        </Box>
    )
}