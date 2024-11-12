import { Link } from "react-router-dom";

const MobiTool = ({ ToolIcon, linkTo, toolSize }) => {
    return(
        <Link to={linkTo}>
            <ToolIcon size={toolSize}/>
        </Link>
    )
}

export default MobiTool;