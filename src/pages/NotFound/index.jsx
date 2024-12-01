import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import styles from "./notFound.module.css"

export const NotFound = () => {
    return (
        <div className={styles.homeContainer}>
            <img className={styles.imgNotFound} src='/images/notFound.png'></img>
            <p className={styles.textError}>Página Não Encontrada - 404</p>
            <p className={styles.textDescription}>
                Nós temos um mapa para se localizar, mas aqui vamos ficar devendo...
            </p>
            <Link to={"/subhome"}>
                <Button className={styles.redirectBtn}>
                    Ir a Subhome
                </Button>
            </Link>
        </div>
    );
}

export default NotFound;