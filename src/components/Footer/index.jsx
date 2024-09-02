import { Box, Image, Text, Link } from "@chakra-ui/react";
import styles from './footer.module.css'

const Footer = () => {
    return (
        <Box className={styles.footerBody}
            as="footer"
            bottom="0"
            width="100%"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            py={10}
        >
            <Box 
                display="flex" 
                justifyContent="center" 
                flexWrap="wrap"
                width="100%" 
                maxWidth="500px"
                mt={3}
                mb={2}
            >
                <Image 
                    src="https://img.icons8.com/ios-glyphs/60/e9c568/instagram-circle.png" 
                    alt="Logo do Instagram" 
                />
                <Image 
                    src="https://img.icons8.com/ios-filled/100/e9c568/github.png" 
                    alt="Logo do Github" 
                />
                <Image src="https://img.icons8.com/ios-filled/100/e9c568/linkedin.png" 
                    alt="Logo do Linkedin" 
                />
            </Box>

            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                mb={2}
            >
                <Text>
                    <Link as="a" href="/" color="main.200" mx={2}>
                        A equipe
                    </Link>
                    <Link as="a" href="/" color="main.200" mx={2}>
                        Privacidade
                    </Link>
                    <Link as="a" href="/" color="main.200" mx={2}>
                        Repositório
                    </Link>
                </Text>
            </Box>

            <Text fontSize="medium" as="p" mb={2}>
                © 2024 NavGo.
            </Text>
        </Box>
    );
};

export default Footer;
