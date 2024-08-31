import styles from "./register.module.css"
import RegisterForm from "../../components/RegisterForm";
import Header from "../../components/Header";
import { Box } from "@chakra-ui/react";

const Register = () => {
    return (
       <Box className={styles.noflow}>
        <Header />
        <RegisterForm />
       </Box>
    );
}

export default Register;