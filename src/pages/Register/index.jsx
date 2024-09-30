import styles from "./register.module.css"
import RegisterForm from "../../components/RegisterForm";
import Header from "../../components/Header";
import { Flex } from "@chakra-ui/react";
import Footer from "../../components/Footer";

const Register = () => {
    return (
       <Flex className={styles.noflow}>
            <Header />
            <RegisterForm />
            <Footer />
       </Flex>
    );
}

export default Register;