import { Flex } from "@chakra-ui/react"
import styles from "./dashboard.module.css"
import Sidebar from "../../components/Sidebar"
import DashboardPanel from "../../components/DashboardPanel"

const Dashboard = () => {
    return (
        <Flex className={styles.pageWrapper}>
            <Sidebar/>
            <DashboardPanel/>
        </Flex>
    )
}

export default Dashboard