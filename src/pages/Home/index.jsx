import { Box, Flex, Button, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer"
import styles from "./home.module.css"
import { Link } from "react-router-dom";

export const Home = () => {
    return (
       <Flex className={styles.homeContainer}>
            <Header/>
            <Box className={styles.container}>
                <Box className={styles.mapImage}>
                    <Box className={styles.mapBody}>
                        <Flex className={styles.contentWrapper}>
                            <Text className={styles.title}>
                                MAPA DA INSTITUIÇÃO
                            </Text>
                            <Text className={styles.description}>
                                O Mapa NavGo de sua instituição pode ser usado para a identificação dos diversos locais e suas funções, desde salas de aula até espaços comunitários. Acompanhado de uma ferramenta de rota, o estudante é garantido de se localizar corretamente em seu ambiente e poder se informar e familiarizar rapidamente, alavancando sua experiência.
                            </Text>
                            <Box className={styles.buttonWrapper}>
                                <Link to={"/login/map"}>
                                    <Button className={styles.mapButton} bg={"main.100"}>
                                        Abrir Mapa
                                    </Button>
                                </Link>
                                <Link to={"/login"}>
                                    <Button className={styles.mapButton} bg={"main.100"}>
                                        Utilização
                                    </Button>
                                </Link>
                            </Box>
                        </Flex>
                    </Box>
                </Box>  
            </Box>
            <Box className={styles.container}>
                <Box className={styles.transImage}>
                    <Box className={styles.transBody}>
                        <Flex className={styles.invertedContentWrapper}>
                            <Text className={styles.title}>
                                TRANSFERÊNCIA DE ARQUIVOS
                            </Text>
                            <Text className={styles.invertedDescription}>
                                O Mural NavGo proporciona ao estudante uma experiência aprimorada de seus estudos academicos, concentrando seus materiais de aula em um só lugar, agrupando arquivos importantes para o estudo de sua terminada disciplina em um lugar de fácil acesso para todos, eliminando a necessidade do uso de ferramentas de terceiros não focadas em instituições educacionais.
                            </Text>
                            <Box className={styles.invertedButtonWrapper}>
                                <Link to={"/login/mural"}>
                                    <Button className={styles.transButton} bg={"main.200"}>
                                        Transferir Arquivos
                                    </Button>
                                </Link>
                                <Link to={"/login"}>
                                    <Button className={styles.transButton} bg={"main.200"}>
                                        Utilização
                                    </Button>
                                </Link>
                            </Box>
                        </Flex>
                    </Box>
                </Box>  
            </Box>
            <Footer/>
       </Flex>
    );
}

export default Home;