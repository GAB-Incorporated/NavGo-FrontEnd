import { Box, Image, Text, Link } from "@chakra-ui/react";
import styles from './footer.module.css'

const Footer = () => {
    return (
        <Box className={styles.footerBody}
            as="footer"
        >
            <Box 
                display="flex" 
                justifyContent="center" 
                flexWrap="wrap"
                width="100%" 
                maxWidth="500px"
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

            <Box>
                <Text className={styles.footerLinks}>
                    <Link as="a" href="/https://github.com/orgs/GAB-Incorporated/people" color="main.200" >
                        A equipe
                    </Link>
                    <Link as="a" href="/" color="main.200" ml="1.5vw">
                        Privacidade
                    </Link>
                    <Link as="a" href="https://github.com/GAB-Incorporated" color="main.200" ml="1.5vw">
                        Repositório
                    </Link>
                </Text>
            </Box>

            <Text className={styles.copyright} border={0} as="p" mb={2} >
                © 2024 NavGo
            </Text>
        </Box>
    );
};

export default Footer;
