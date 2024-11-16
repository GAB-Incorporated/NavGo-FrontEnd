import { Box, Flex, Button, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

export const Home = () => {

    return (
       <Flex className={styles.homeContainer}>
            <Header />
            <Box className={styles.sectionImage1}>
                <Box className={styles.sectionBody1}>
                    <Flex className={styles.contentWrapper1}>
                        <Text className={styles.title}>
                            MAPA DA INSTITUIÇÃO
                        </Text>
                        <Text className={styles.description1}>
                            O Mapa NavGo permite uma identificação precisa e eficiente dos diversos espaços da instituição com a funcionalidade de rotas integrada, cada estudante tem a garantia de encontrar o caminho correto e se orientar facilmente dentro do ambiente acadêmico.
                        </Text>
                        <Box className={styles.buttonWrapper1}>
                            <Link to={"/login/map"}>
                                <Button className={styles.sectionButton1}>
                                    Abrir Mapa
                                </Button>
                            </Link>
                            <Link to={"/login"}>
                                <Button className={styles.sectionButton1}>
                                    Utilização
                                </Button>
                            </Link>
                        </Box>
                    </Flex>
                </Box>  
            </Box>
            <Box className={styles.sectionImage2}>
                <Box className={styles.sectionBody2}>
                    <Flex className={styles.contentWrapper2}>
                        <Text className={styles.title2}>
                            TRANSFERÊNCIA DE ARQUIVOS
                        </Text>
                        <Text className={styles.description2}>
                            O Mural NavGo aprimora a experiência acadêmica ao concentrar todos os materiais de aula em um único ambiente digital, de fácil acesso, oferecendo uma plataforma acessível e organizada para todos os estudantes, e elimina a necessidade de utilizar ferramentas externas não especializadas no contexto educacional.
                        </Text>
                        <Box className={styles.buttonWrapper2}>
                            <Link to={"/login/mural"}>
                                <Button className={styles.sectionButton2}>
                                    Transferir Arquivos
                                </Button>
                            </Link>
                            <Link to={"/login"}>
                                <Button className={styles.sectionButton2}>
                                    Utilização
                                </Button>
                            </Link>
                        </Box>
                    </Flex>
                </Box>  
            </Box>
            <Footer />
       </Flex>
    );
}

export default Home;