import { Box } from "@chakra-ui/react";
import style from "./deskTool.module.css";
import { Link } from "react-router-dom";

const DeskTool = ({ ToolIcon, linkTo }) => {
    return(
        <>
        {innerWidth>=901 ? ( 
        <Link to={linkTo}>
            <Box className={style.toolWrapper}>
                <ToolIcon size={"1.3vw"}/>
            </Box>
        </Link>
        ) : (
        <Link to={linkTo}>
            <Box className={style.toolWrapper}>
                <ToolIcon size={"3vw"}/>
            </Box>
        </Link>
        )}
        </>
    )
}

export default DeskTool;