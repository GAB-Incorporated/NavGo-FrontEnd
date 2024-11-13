import { Flex, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "./muralHeader.module.css";
import { MdHomeFilled } from "react-icons/md";

const DashboardHeader = ({ instituicao, pagina }) => {
    return (
        <Flex className={styles.wrapper}>
            <Link to='/subHome' className={styles.iconWrapper}>
                <MdHomeFilled color="#fff" size={30}/>
            </Link>

            <Link to='/subHome' className={styles.dbTitle}>
                {instituicao}
            </Link>

            <Box className={styles.dbDivider} />

            <Text className={styles.dbSubtitle}>
                {pagina}
            </Text>
        </Flex>
    )
}

export default DashboardHeader;
