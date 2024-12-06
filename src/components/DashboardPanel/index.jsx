import { Box, Tabs, TabIndicator, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import DashboardHeader from "../DashboardHeader";
import styles from "./dashboardPanel.module.css"
import SummaryTab from "../Tabs/Summary"
import CoursesTab from "../Tabs/Courses"
import SubjectsTab from "../Tabs/Subjects"
import TeachersTab from "../Tabs/Teachers"
import StudentsTab from "../Tabs/Students"
import BuildingsTab from "../Tabs/Buildings"

const DashboardPanel = () => {
    return (
        <Box w="100%" className={styles.dbBody}>
            <DashboardHeader
                instituicao="ETEC de Embu"
                pagina="Painel Administrativo"
            />
            <Tabs isFitted m="0 5%" mt="1%" variant="unstyled">
                <TabList m="0% 10%">
                    <Tab className={styles.tabText}>Resumo</Tab>
                    <Tab className={styles.tabText}>Cursos</Tab>
                    {/* <Tab className={styles.tabText}>Matérias</Tab>
                    <Tab className={styles.tabText}>Professores</Tab>
                    <Tab className={styles.tabText}>Alunos</Tab>
                    <Tab className={styles.tabText}>Construções</Tab> */}
                </TabList>
                <TabIndicator mt='-0.8vh' height='2px' bg='black' borderRadius='1px' />
                <TabPanels>
                    <TabPanel>
                        <SummaryTab/>
                    </TabPanel>
                    <TabPanel>
                        <CoursesTab/>
                    </TabPanel>
                    <TabPanel>
                        <SubjectsTab/>
                    </TabPanel>
                    <TabPanel>
                        <TeachersTab/>
                    </TabPanel>
                    <TabPanel>
                        <StudentsTab/>
                    </TabPanel>
                    <TabPanel>
                        <BuildingsTab/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default DashboardPanel;