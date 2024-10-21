import { AddIcon } from '@chakra-ui/icons';
import styles from './summary.module.css'
import { Flex, Box, Text, IconButton, Tabs, Tab, TabList, TabIndicator, TabPanels, TabPanel, Image, useToast, useDisclosure } from "@chakra-ui/react";
import ModalStructure from '../../ModalStructure';
import CreateCourseBody from "../../ModalBody/CourseBody/CreateCourse";
import { useEffect, useState } from 'react';
import api from '../../../api';
import CreateBuilding from '../../ModalBody/BuildingBody/CreateBuilding';
import CreateSubjectBody from '../../ModalBody/SubjectBody/CreateSubject';
import Buildings from '../../ModalBody/Buildings';

const SummaryTab = () => {
    const toast = useToast();
    const [courses, setCourses] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [subjects, setSubjects] = useState([])
    const [students, setStudents] = useState([])
    const [courseIsSelected, setCourseIsSelected] = useState(false)
    const [courseHasSubjects, setCourseHasSubjects] = useState(Boolean)
    const [courseHasStudents, setCourseHasStudents] = useState(Boolean)
    const {isOpen, onOpen, onClose } = useDisclosure()
    const [modalContent, setModalContent] = useState(<></>);
    const [modalTitle, setModalTitle] = useState("")

    const fetchCourses = async () => {
        try {
            let courseData = await api.get('/courses')
            setCourses(courseData.data.message);
        } catch (error) {
            toast({
                title: 'Falha ao carregar os Cursos',
                description: error.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            });
        }
    }

    const fetchBuildings = async () => {
        try {
            let buildingData = await api.get('/buildings')
            setBuildings(buildingData.data);
        } catch (error) {
            toast({
                title: 'Falha ao carregar os Construções',
                description: error.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            });
        }
    }

    const fetchCourseData = (courseId, courseName) => {
        setCourseIsSelected(true)
        fetchCourseStudents(courseName)
        fetchCourseSubjects(courseId)
    }

    const fetchCourseSubjects = async (courseId) => {
        try {
            const subjectArr = []
            let subjectData = await api.get('/subjects')
            console.log(subjectData.data)
            subjectData.data.map(subject => {
                if (subject.course_id == courseId) {
                    subjectArr.push(subject)
                }
            })

            console.log(subjectArr)

            if (subjectArr.length > 0) setCourseHasSubjects(true)
            else setCourseHasSubjects(false)

            console.log("SUBJECTS UPDADE"+courseHasSubjects)
            setSubjects(subjectArr);
        } catch (error) {
            toast({
                title: 'Falha ao carregar as Materias',
                description: error.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            });
        }
    }

    const fetchCourseStudents = async (courseName) => {
        try {
            const studentArr = []
            let studentData = await api.get('/user/students')
            console.log(studentData.data)
            studentData.data.map(student => {
                if (student.course_name == courseName) {
                    studentArr.push(student)
                    console.log("ADDED"+student.first_name)
                }
            })

            if (students.length > 0) {
                setCourseHasStudents(true) 
                console.log("Tem estudante")}
            else {
                setCourseHasStudents(false) 
                console.log("Não Tem estudante")}
            setStudents(studentArr);
        } catch (error) {
            toast({
                title: 'Falha ao carregar as Alunos',
                description: error.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            });
        }
    }

    const openModal = (content, title) => {
        setModalContent(content);
        setModalTitle(title)
        onOpen();
    };

    useEffect(() => {
        fetchCourses()
        fetchBuildings()
    }, [])

    return (
        <Box>
            <Flex className={styles.mainInfo}>
                <ModalStructure
                    isOpen={isOpen}
                    onClose={onClose}
                    title={modalTitle}
                    contentBody={modalContent}
                />
                <Box>
                    <Flex className={styles.boxHeader} w={"40vw"}>
                        <Text className={styles.headerTitle}>Cursos</Text>
                        <IconButton
                            onClick={() => openModal(<CreateCourseBody/>, "Adicionar Curso")}
                            className={styles.addIcon} 
                            icon= {<AddIcon/>}
                            fontSize={"15px"}
                            boxSize={"1.4vw"}
                            size={"x-sm"}
                        />
                    </Flex>
                    <Box className={styles.boxBody}>
                        {courses.map((course) => (
                            <Box
                                key={course.course_id}
                                _hover={{cursor: 'pointer'}}
                                className={styles.independentTabInfo}
                                onClick={() => fetchCourseData(course.course_id, course.course_name)}    
                            >
                                <Text key={course.course_name}>{course.course_name}</Text>
                                <Flex alignItems="center" padding="0.5vh 0" key={course.course_name+"Flex"}>
                                    <Image key={course.course_name+"Image"} className={styles.independent_icons} src="/src/assets/course_coordinator.png"/>
                                    <Text key={course.course_name+"Text"} className={styles.independent_small}>{course.coordinator_id}</Text>
                                </Flex>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box>
                    <Flex className={styles.boxHeader} w={"40vw"}>
                        <Text className={styles.headerTitle}>Construções</Text>
                        <IconButton
                            onClick={() => openModal(<CreateBuilding/>, "Adicionar Construção")}
                            className={styles.addIcon} 
                            icon= {<AddIcon/>}
                            fontSize={"15px"}
                            boxSize={"1.4vw"}
                            size={"x-sm"}
                        />
                    </Flex>
                    <Box className={styles.boxBody}>
                        {buildings.map((building) => (
                            <Box key={building.building_name+"Box"} className={styles.independentTabInfo}>
                                <Text>{building.building_name}</Text>
                                <Flex 
                                    alignItems="center" 
                                    padding="0.5vh 0"
                                    _hover={{cursor: 'pointer'}}
                                    onClick={() => openModal(<Buildings buildingName={building.building_name}/>, "Lista de Locais")}
                                >
                                    <Image className={styles.independent_icons} src="/src/assets/locations.png"/>
                                    <Text className={styles.independent_small}>Visualizar Locais</Text>
                                </Flex>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Flex>
            <Text className={styles.separationText}>Informações do Curso Selecionado</Text>
            <Flex className={styles.courseInfo}>
                <Box>
                    <Flex className={styles.boxHeader}  w="30vw">
                        <Text className={styles.headerTitle}>Professores</Text>
                    </Flex>
                    <Box className={styles.boxBody}>
                        {courseIsSelected ? <></> : (
                            <Flex className={styles.infoWrapper}>
                                <Text className={styles.message}>
                                    Selecione um Curso para as informações aparecerem aqui.
                                </Text>
                            </Flex>)}
                    </Box>
                </Box>
                <Box>
                    <Flex className={styles.boxHeader}  w="50vw">
                        <Text className={styles.headerTitle}>Materias</Text>
                        <IconButton
                            onClick={() => openModal(<CreateSubjectBody/>, "Adicionar Matéria")}
                            className={styles.addIcon} 
                            icon= {<AddIcon/>}
                            fontSize={"15px"}
                            boxSize={"1.4vw"}
                            size={"x-sm"}
                        />
                    </Flex>
                    <Box className={styles.boxBody}>
                        {courseIsSelected ? courseHasSubjects ? subjects.map((subject) => (
                            <Flex key={subject.subject_name} className={styles.independentTabInfo}>
                                <Image className={styles.icons} src="/src/assets/locations.png"/>
                                <Box>
                                    <Text>{subject.subject_name}</Text>
                                    <Text className={styles.independent_small}>Módulo X</Text>
                                </Box>
                            </Flex>
                        )) : (
                            <Flex className={styles.warningWrapper}>
                                <Text className={styles.message}>
                                    Curso selecionado, não possui matérias vinculadas.
                                </Text>
                            </Flex>) : (
                            <Flex className={styles.infoWrapper}>
                                <Text className={styles.message}>
                                    Selecione um Curso para as informações aparecerem aqui.
                                </Text>
                            </Flex>)}
                    </Box>
                </Box>
            </Flex>
            <Flex className={styles.studentsInfo}>
                <Tabs isFitted m="0 5%" mt="1%" variant="unstyled">
                    <TabList m="0% 10%">
                        <Tab className={styles.tabText}>Módulo I</Tab>
                        <Tab className={styles.tabText}>Módulo II</Tab>
                        <Tab className={styles.tabText}>Módulo III</Tab>
                    </TabList>
                    <TabIndicator mt='-0.8vh' height='2px' bg='black' borderRadius='1px' />
                    <TabPanels>
                        <TabPanel>
                            <Box>
                                <Flex className={styles.boxHeader} w="82vw">
                                    <Text className={styles.headerTitle}>Alunos</Text>
                                </Flex>
                                <Flex className={styles.boxBody} justifyContent="space-between">
                                    {courseIsSelected ? courseHasStudents ? students.map((student) => {
                                        if (student.module_number == 1) {
                                            return (
                                                <Flex key={student.first_name+"ModI"} className={styles.independentTabInfo} padding="1vh 0" pl="1vh" w="32%">
                                                    <Image className={styles.icons} src="/src/assets/student.png"/>
                                                    <Text>{student.first_name+" "+student.last_name}</Text>
                                                </Flex>
                                            )
                                        } else {
                                            return (
                                                <Box key={"Boxinha"} p="1vw 0" w="100%">
                                                    <Text fontSize="1.5vw" textAlign="center">Nenhum estudante nesse módulo</Text>
                                                </Box>
                                            )
                                        }
                                    }) : (
                                        <Flex className={styles.warningWrapper} w="100%">
                                            <Text className={styles.message}>
                                                Curso selecionado, não possui alunos vinculados.
                                            </Text>
                                        </Flex>) : (
                                        <Flex className={styles.infoWrapper} w="100%">
                                            <Text className={styles.message}>
                                                Selecione um Curso para as informações aparecerem aqui.
                                            </Text>
                                        </Flex>)}
                                </Flex>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box>                              
                                <Flex className={styles.boxHeader} w="82vw">
                                    <Text className={styles.headerTitle}>Alunos</Text>
                                </Flex>
                                <Flex className={styles.boxBody} justifyContent="space-between">
                                    {courseIsSelected ? courseHasStudents ? students.map((student) => {
                                        if (student.module_number == 2) {
                                            return (
                                                <Flex key={student.first_name+"ModII"} className={styles.independentTabInfo} padding="1vh 0" pl="1vh" w="32%">
                                                    <Image className={styles.icons} src="/src/assets/student.png"/>
                                                    <Text>{student.first_name+" "+student.last_name}</Text>
                                                </Flex>
                                            )
                                        } else {
                                            return (
                                                <Box key={"ModII Erro"} p="1vw 0" w="100%">
                                                    <Text fontSize="1.5vw" textAlign="center">Nenhum estudante nesse módulo</Text>
                                                </Box>
                                            )
                                        }
                                    }) : (
                                        <Flex className={styles.warningWrapper} w="100%">
                                            <Text className={styles.message}>
                                                Curso selecionado, não possui alunos vinculados.
                                            </Text>
                                        </Flex>) : (
                                        <Flex className={styles.infoWrapper} w="100%">
                                            <Text className={styles.message}>
                                                Selecione um Curso para as informações aparecerem aqui.
                                            </Text>
                                        </Flex>)}
                                </Flex>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box>                              
                                <Flex className={styles.boxHeader} w="82vw">
                                    <Text className={styles.headerTitle}>Alunos</Text>
                                </Flex>
                                <Flex className={styles.boxBody} justifyContent="space-between">
                                    {courseIsSelected ? courseHasStudents ? students.map((student) => {
                                        if (student.module_number == 3) {
                                            return (
                                                <Flex key={student.first_name+"ModII"} className={styles.independentTabInfo} padding="1vh 0" pl="1vh" w="32%">
                                                    <Image className={styles.icons} src="/src/assets/student.png"/>
                                                    <Text>{student.first_name+" "+student.last_name}</Text>
                                                </Flex>
                                            )
                                        } else {
                                            return (
                                                <Box key={student.first_name+"ModII Erro"} p="1vw 0" w="100%">
                                                    <Text fontSize="1.5vw" textAlign="center">Nenhum estudante nesse módulo</Text>
                                                </Box>
                                            )
                                        }
                                    }) : (
                                        <Flex className={styles.warningWrapper} w="100%">
                                            <Text className={styles.message}>
                                                Curso selecionado, não possui alunos vinculados.
                                            </Text>
                                        </Flex>) : (
                                        <Flex className={styles.infoWrapper} w="100%">
                                            <Text className={styles.message}>
                                                Selecione um Curso para as informações aparecerem aqui.
                                            </Text>
                                        </Flex>)}
                                </Flex>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Box>
    )
}

export default SummaryTab;