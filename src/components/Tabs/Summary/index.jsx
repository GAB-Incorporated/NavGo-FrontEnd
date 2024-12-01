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
    const [teachers, setTeachers] = useState([])
    const [courseIsSelected, setCourseIsSelected] = useState(false)
    const [courseHasSubjects, setCourseHasSubjects] = useState(Boolean)
    const [courseHasStudents, setCourseHasStudents] = useState(Boolean)
    const [courseHasTeachers, setCourseHasTeachers] = useState(Boolean)
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
        fetchCourseTeachers(courseId)
        fetchCourseSubjects(courseId)
    }

    const fetchCourseSubjects = async (courseId) => {
        try {
            setSubjects([]);
            const subjectArr = [];
            let subjectData = await api.get('/subjects');
            subjectData.data.forEach((subject) => {
                if (subject.course_id == courseId) {
                    subjectArr.push(subject);
                }
            });
    
            setCourseHasSubjects(subjectArr.length > 0);
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
    };

    const fetchCourseTeachers = async (courseId) => {
        try {
            let teacherData = await api.get('/courses/teachers/'+courseId)

            console.log((teacherData))

            if (teacherData.data.modules.length > 0) setCourseHasTeachers(true)

            setTeachers(teacherData.data.modules);
        } catch (error) {
            setCourseHasTeachers(false)
            toast({
                title: 'Falha ao carregar os Professores',
                description: error.response.data,
                status: 'error',
                duration: 10000,
                isClosable: true,
            });
        }
    }

    const fetchCourseStudents = async (courseName) => {
        try {
            setStudents([]);
            const studentArr = [];
            let studentData = await api.get('/users/students');
            studentData.data.forEach((student) => {
                if (student.course_name == courseName) {
                    studentArr.push(student);
                }
            });
    
            setCourseHasStudents(studentArr.length > 0);
            setStudents(studentArr);
        } catch (error) {
            toast({
                title: 'Falha ao carregar os Alunos',
                description: error.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            });
        }
    };

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
                                    <Image key={course.course_name+"Image"} className={styles.independent_icons} src="images/course_coordinator.png"/>
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
                                    onClick={() => openModal(<Buildings 
                                        buildingID={building.building_id}
                                        buildingName={building.building_name}/>, "Lista de Locais")}
                                >
                                    <Image className={styles.independent_icons} src="images/locations.png"/>
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
                        {courseIsSelected ? courseHasTeachers ? teachers.map((teacher) => (
                            <Flex key={teacher} className={styles.independentTabInfo}>
                                <Image className={styles.icons} src="images/professor.png"/>
                                <Box>
                                    <Text>{teacher.first_name} {teacher.last_name}</Text>
                                    <Text className={styles.independent_small}>{teacher.email}</Text>
                                </Box>
                            </Flex>
                        )) : (
                            <Flex className={styles.warningWrapper}>
                                <Text className={styles.message}>
                                    Curso selecionado, não possui professores vinculados.
                                </Text>
                            </Flex>) : (
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
                                        <Image className={styles.icons} src="images/materia.png"/>
                                    <Box>
                                        <Text>{subject.subject_name}</Text>
                                        <Text className={styles.independent_small}>Módulo 1</Text>
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
                                <Flex className={styles.studentBody} justifyContent="flex-start">
                                    {courseIsSelected ? courseHasStudents ? (
                                        students.some((student) => student.module_number === 1) ? (
                                            students.map((student) => {
                                                if (student.module_number === 1) {
                                                    return (
                                                        <Flex key={student.first_name + "ModI"} className={styles.independentStudentTabInfo} padding="1vh 0" pl="1vh" w="32%">
                                                            <Image className={styles.icons} src="images/student.png" />
                                                            <Text>{student.first_name + " " + student.last_name}</Text>
                                                        </Flex>
                                                    );
                                                }
                                            })
                                        ) : (
                                            <Box p="1vw 0" w="100%">
                                                <Text fontSize="1.5vw" textAlign="center">Nenhum estudante nesse módulo</Text>
                                            </Box>
                                        )
                                    ) : (
                                        <Flex className={styles.warningWrapper} w="100%">
                                            <Text className={styles.message}>Curso selecionado, não possui alunos vinculados.</Text>
                                        </Flex>
                                    ) : (
                                        <Flex className={styles.infoWrapper} w="100%">
                                            <Text className={styles.message}>Selecione um Curso para as informações aparecerem aqui.</Text>
                                        </Flex>
                                    )}
                                </Flex>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box>
                                <Flex className={styles.boxHeader} w="82vw">
                                    <Text className={styles.headerTitle}>Alunos</Text>
                                </Flex>
                                <Flex className={styles.studentBody} justifyContent="flex-start">
                                    {courseIsSelected ? courseHasStudents ? (
                                        students.some((student) => student.module_number === 2) ? (
                                            students.map((student) => {
                                                if (student.module_number === 2) {
                                                    return (
                                                        <Flex key={student.first_name + "ModI"} className={styles.independentStudentTabInfo} padding="1vh 0" pl="1vh" w="32%">
                                                            <Image className={styles.icons} src="images/student.png" />
                                                            <Text>{student.first_name + " " + student.last_name}</Text>
                                                        </Flex>
                                                    );
                                                }
                                            })
                                        ) : (
                                            <Box p="1vw 0" w="100%">
                                                <Text fontSize="1.5vw" textAlign="center">Nenhum estudante nesse módulo</Text>
                                            </Box>
                                        )
                                    ) : (
                                        <Flex className={styles.warningWrapper} w="100%">
                                            <Text className={styles.message}>Curso selecionado, não possui alunos vinculados.</Text>
                                        </Flex>
                                    ) : (
                                        <Flex className={styles.infoWrapper} w="100%">
                                            <Text className={styles.message}>Selecione um Curso para as informações aparecerem aqui.</Text>
                                        </Flex>
                                    )}
                                </Flex>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box>
                                <Flex className={styles.boxHeader} w="82vw">
                                    <Text className={styles.headerTitle}>Alunos</Text>
                                </Flex>
                                <Flex className={styles.studentBody} justifyContent="flex-start">
                                    {courseIsSelected ? courseHasStudents ? (
                                        students.some((student) => student.module_number === 3) ? (
                                            students.map((student) => {
                                                if (student.module_number === 3) {
                                                    return (
                                                        <Flex key={student.first_name + "ModI"} className={styles.independentStudentTabInfo} padding="1vh 0" pl="1vh" w="32%">
                                                            <Image className={styles.icons} src="images/student.png" />
                                                            <Text>{student.first_name + " " + student.last_name}</Text>
                                                        </Flex>
                                                    );
                                                }
                                            })
                                        ) : (
                                            <Box p="1vw 0" w="100%">
                                                <Text fontSize="1.5vw" textAlign="center">Nenhum estudante nesse módulo</Text>
                                            </Box>
                                        )
                                    ) : (
                                        <Flex className={styles.warningWrapper} w="100%">
                                            <Text className={styles.message}>Curso selecionado, não possui alunos vinculados.</Text>
                                        </Flex>
                                    ) : (
                                        <Flex className={styles.infoWrapper} w="100%">
                                            <Text className={styles.message}>Selecione um Curso para as informações aparecerem aqui.</Text>
                                        </Flex>
                                    )}
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