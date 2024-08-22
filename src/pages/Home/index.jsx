import { Box, Flex, Button, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import styles from "./home.module.css"

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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum  fringilla quam lacus, nec pretium ante mattis ut. Morbi sit amet quam  sit amet sapien auctor condimentum ac at nulla. Integer at augue ut  magna tempus egestas. Phasellus ac tempor elit. Vivamus laoreet augue  tempor, cursus purus ac, vestibulum ex. Pellentesque volutpat mauris  purus, ut aliquam odio luctus id. Ut ligula orci, malesuada at rutrum  eget, euismod non magna. Sed et augue sed ligula porta porta. Aliquam  semper nibh dolor, porta auctor elit vulputate et.
                            </Text>
                            <Box className={styles.buttonWrapper}>
                                <Button className={styles.mapButton} bg={"main.100"}>
                                    Abrir Mapa
                                </Button>
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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum  fringilla quam lacus, nec pretium ante mattis ut. Morbi sit amet quam  sit amet sapien auctor condimentum ac at nulla. Integer at augue ut  magna tempus egestas. Phasellus ac tempor elit. Vivamus laoreet augue  tempor, cursus purus ac, vestibulum ex. Pellentesque volutpat mauris  purus, ut aliquam odio luctus id. Ut ligula orci, malesuada at rutrum  eget, euismod non magna. Sed et augue sed ligula porta porta. Aliquam  semper nibh dolor, porta auctor elit vulputate et.
                            </Text>
                            <Box className={styles.invertedButtonWrapper}>
                                <Button className={styles.transButton} bg={"main.200"}>
                                    Transferir Arquivos
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
                </Box>  
            </Box>
            {/* <Footer/> */}
       </Flex>
    );
}

export default Home;