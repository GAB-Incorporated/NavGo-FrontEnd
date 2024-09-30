import { Box } from "@chakra-ui/react";
import style from "./tool.module.css";
import { Link } from "react-router-dom";

const Tool = ({ ToolIcon, linkTo }) => {
    return(
        <Link to={linkTo}>
            <Box className={style.toolWrapper}>
                <ToolIcon size={"1.3vw"}/>
            </Box>
        </Link>
    )
}

export default Tool;