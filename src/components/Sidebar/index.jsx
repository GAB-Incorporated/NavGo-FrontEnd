import { Box, Flex, Image } from "@chakra-ui/react";
import Tool from "./Tool";
import { GoGear } from "react-icons/go";
import { CiCircleInfo } from "react-icons/ci";
import { TbFileExport } from "react-icons/tb";
import { PiMapPinLineBold } from "react-icons/pi";
import logo from "../../assets/navgo-logo.png"
import styles from "./sidebar.module.css"
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <Box className={styles.sidebar}>
            <Box className={styles.logoWrapper}>
                <Link to="/">
                    <Image className={styles.navLogo} src={logo}/>
                </Link>
            </Box>
            <Box>
                <hr className={styles.sidebarDivider}/>
                <Flex flexDirection="column" gap="2vh">
                    <Tool ToolIcon={TbFileExport} linkTo="/mural"/>
                    <Tool ToolIcon={PiMapPinLineBold} linkTo="/mapa"/>
                </Flex>
            </Box>
            <Box mt={"auto"}>
                <hr className={styles.sidebarDivider}/>
                <Flex flexDirection="column" gap="2vh">
                    <Tool ToolIcon={GoGear} linkTo="/admDashboard"/>
                    <Tool ToolIcon={CiCircleInfo} linkTo="/sobre"/>
                </Flex>
            </Box>
        </Box>
    )
}

export default Sidebar;