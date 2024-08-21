import { Box } from "@chakra-ui/react";
import Header from "../../components/Header";
import styles from "./home.module.css"

export const Home = () => {
    return (
       <div className={styles.homeContainer}>
            <Header/>
            <Box>

            </Box>  
            {/* <Footer/> */}
       </div>
    );
}

export default Home;