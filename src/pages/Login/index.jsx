import styles from "./login.module.css";
import { Box } from "@chakra-ui/react";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";

const Login = () => {
    return (
        <Box className={styles.noflow}>
            <Header />
            <LoginForm />
            <Footer />
        </Box>
    );
}

export default Login;