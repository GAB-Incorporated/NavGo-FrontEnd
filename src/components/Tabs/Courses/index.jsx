import { Flex, Box, Text, IconButton, Image, useDisclosure, useToast} from '@chakra-ui/react' 
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react'
import styles from './courses.module.css'
import ModalStructure from '../../ModalStructure';
import CreateCourseBody from "../../ModalBody/CourseBody/CreateCourse";
import api from '../../../api';
import UpdateCourse from '../../ModalBody/CourseBody/UpdateCourse';

const CoursesTab = () => {
    const toast = useToast()
    const [courses, setCourses] = useState([])
    const {isOpen, onOpen, onClose } = useDisclosure()
    const [modalContent, setModalContent] = useState(<></>);
    const [modalTitle, setModalTitle] = useState("")

    const fetchCourses = async () => {
        try {
            let courseData = await api.get('/courses')
            setCourses(courseData.data.message);         
            console.log((courseData));
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

    const openModal = (content, title) => {
        setModalContent(content);
        setModalTitle(title)
        onOpen();
    };

    const deleteCourse = async (id) => {
        await api.delete(`/courses/${id}`)
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <Box className={styles.page}>
            <ModalStructure
                isOpen={isOpen}
                onClose={onClose}
                title={modalTitle}
                contentBody={modalContent}
            />
            <Flex className={styles.boxHeader}>
                <IconButton
                    onClick={() => openModal(<CreateCourseBody/>, "Adicionar Curso")}
                    className={styles.addIcon} 
                    icon= {<AddIcon/>}
                    fontSize={"15px"}
                    boxSize={"1.4vw"}
                    size={"x-sm"}
                />
                <Text className={styles.headerTitle}>Nome</Text>
                <Text className={styles.headerTitle}>Coordenador</Text>
            </Flex>
            <Flex className={styles.boxBody} justifyContent="flex-start">
                {courses.length > 0 ? courses.map((course) => (
                    <Flex className={styles.courseCard} key={course.course_id}>
                        <Image className={styles.icons} src='images/course.png'/>
                        <Text className={styles.courseCard}>{course.course_name}</Text>
                        <Text className={styles.courseCard}>{course.coordinator_first_name} {course.coordinator_last_name}</Text>
                        <Flex className={styles.iconsWrapper}>
                        <IconButton
                            onClick={() => openModal(
                                <UpdateCourse 
                                    coursePropId={course.course_id}
                                    coursePropName={course.course_name}    
                                    coursePropCoordinator={course.coordinator_id}
                                />, "Atualizar Curso")}
                            className={styles.actionIcon} 
                            icon= {<EditIcon/>}
                            fontSize={"35px"}
                            size={"x-sm"}
                        />
                        <IconButton
                            onClick={() => deleteCourse(course.course_id)}
                            className={styles.actionIcon}
                            icon= {<DeleteIcon/>}
                            fontSize={"35px"}
                            size={"x-sm"}
                        />
                        </Flex>
                    </Flex>
                )) : <></>}
                {/* {courseIsSelected ? courseHasStudents ? (
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
                )} */}
            </Flex>
        </Box>
    )
}

export default CoursesTab;