import { Box, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { GoGear } from "react-icons/go";
import { CiCircleInfo } from "react-icons/ci";
import { TbFileExport } from "react-icons/tb";
import { PiMapPinLineBold } from "react-icons/pi";
import { MdHomeFilled } from "react-icons/md";
import logo from "../../assets/navgo-logo.png"
import styles from "./sidebar.module.css"
import { Link } from "react-router-dom";
import DeskTool from "./DeskTool";
import MobiTool from "./MobiTool";
import ModalStructure from '../ModalStructure'
import DashboardAlert from "../ModalBody/DashboardAlert";

const Sidebar = () => {
    const {isOpen, onOpen, onClose } = useDisclosure()
    const [modalContent, setModalContent] = useState(<></>);
    const [modalTitle, setModalTitle] = useState("")

    const openModal = (content, title) => {
        setModalContent(content);
        setModalTitle(title)
        onOpen();
    };

    return (
        <>
        {innerWidth>=601 ? (
            <Box className={styles.sidebar}>
                <Box className={styles.logoWrapper}>
                    <Link to="/">
                        <Image className={styles.navLogo} src={logo}/>
                    </Link>
                </Box>
                <Box>
                    <hr className={styles.sidebarDivider}/>
                    <Flex flexDirection="column" gap="2vh">
                        <DeskTool ToolIcon={MdHomeFilled} linkTo="/subhome"/>
                    </Flex>
                    <hr className={styles.sidebarDivider}/>
                    <Flex flexDirection="column" gap="2vh">
                        <DeskTool ToolIcon={TbFileExport} linkTo="/mural"/>
                        <DeskTool ToolIcon={PiMapPinLineBold} linkTo="/map"/>
                    </Flex>
                </Box>
                <Box mt={"auto"}>
                    <hr className={styles.sidebarDivider}/>
                    <Flex flexDirection="column" gap="2vh">
                        <DeskTool ToolIcon={GoGear} linkTo="/dashboard"/>
                        <DeskTool ToolIcon={CiCircleInfo} linkTo="/sobre"/>
                    </Flex>
                </Box>
            </Box>
        ) : (
        <>
        <ModalStructure
                isOpen={isOpen}
                onClose={onClose}
                title={modalTitle}
                contentBody={modalContent}
            />
        <Flex justifyContent="space-between">
            <Flex className={styles.normalWrapper}>
                <Box className={styles.focusWrapperL}>
                    <MobiTool ToolIcon={PiMapPinLineBold} toolSize={"10vw"} linkTo="/map"/>
                </Box>
                <Flex className={styles.toolsBar}>
                    <Link to="/">
                        <Image className={styles.mobileLogo} src={logo}/>
                    </Link>
                    <MobiTool ToolIcon={MdHomeFilled} toolSize={"8vw"} linkTo="/subhome"/>
                    <GoGear size={"8vw"} onClick={() => openModal(<DashboardAlert/>, "Acesso Barrado!")}/>
                    <MobiTool ToolIcon={CiCircleInfo} toolSize={"8vw"} linkTo="/sobre"/>
                </Flex>
                <Box className={styles.focusWrapperR}>
                    <MobiTool ToolIcon={TbFileExport} toolSize={"12vw"} linkTo="/mural"/>
                </Box>
            </Flex>
            
        </Flex>
        </>
        )}
        </>
    )
}

export default Sidebar;