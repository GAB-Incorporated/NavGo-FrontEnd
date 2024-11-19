import { Flex, Box, Text, Icon } from "@chakra-ui/react"
import styles from "./dashboardHeader.module.css"
import { MdHomeFilled } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DashboardHeader = ({instituicao, pagina, isMural = null}) => {
    const navigate = useNavigate()
    return (
        <Flex className={styles.wrapper}>
            <Text className={styles.dbTitle}>
                {instituicao}
            </Text>
            <Box className={styles.dbDivider}/>
            <Text className={styles.dbSubtitle}>
                {pagina}
            </Text>
            {isMural && (
                <Icon as={MdHomeFilled}
                    _hover={{cursor: "pointer", color: "lightgray"}}
                    transition={"color 0.3s ease-in-out"}
                    onClick={() => navigate("/subhome")}
                    boxSize={10} 
                    position="absolute" 
                    right="5"
                    alignSelf="center"/>
            )}
        </Flex>
    )
}

export default DashboardHeader;