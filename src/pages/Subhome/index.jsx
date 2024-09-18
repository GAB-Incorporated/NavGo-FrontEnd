import { Box, Flex, Text, Image } from "@chakra-ui/react"
import Footer from "../../components/Footer";
import styles from "./subhome.module.css"
import logo from "../../assets/navgo-logo.png"
import { Link } from "react-router-dom";

const Subhome = () => {
    return(
        <Box w={"inherit"}>
            <Flex className={styles.pageWrapper}>
                <Box className={styles.sidebar}>
                    <Box className={styles.logoWrapper}>
                        <Image className={styles.navLogo} src={logo}/>
                        <Text className={styles.navText}>NavGO</Text>
                    </Box>
                    <Image className={styles.toolIcon}/>
                    <Image className={styles.toolIcon}/>
                    <Link to={'/admDashboard'}>
                        <Text>Painel administrativo</Text>
                    </Link>
                </Box>
                <Box className={styles.body}>
                    <Text className={styles.infoText}>
                        Bem-Vindo ao NavGO!
                    </Text>
                    <Text className={styles.infoText}>
                        Na barra ao lado temos as ferramentas disponiveis atualmente!
                    </Text>
                    <Text className={styles.infoText}>
                        Qualquer dúvida entre em contato com o administrador do seu curso!
                    </Text>
                    <Text className={styles.signature}>
                        Ass. Os Programmerz
                    </Text>
                </Box>
            </Flex>
            <Footer/>
        </Box>
    )   
}

export default Subhome;