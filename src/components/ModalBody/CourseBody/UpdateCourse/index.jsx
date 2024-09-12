import { Box, Flex, Text, Input, Select, Button, FormControl, useToast } from "@chakra-ui/react"
import styles from "./updateCourse.module.css"
import { useEffect, useState } from "react"
import api from "../../../../api.js";


const UpdateCourse = () => {
    const [courses, setCourses] = useState([])
    const [coordinators, setCoordinators] = useState([])
    const [courseId, setCourseId] = useState(0)
    const [courseName, setCourseName] = useState("")
    const [coordinatorId, setCoordinatorId] = useState(0)
    const toast = useToast()
    
    const getCourses = async () => {
        try {
            const coursesData = await api.get("/courses")
            setCourses(coursesData.data.message)
        } catch (error) {
            toast({
                title: "Erro!",
                description: error,
                status: "error",
                duration: 3000,
                isClosable: false,
                position: "top",
            });
        }
    }

    const getCoordinators = async () => {
        try {
            const coordinatorsData = await api.get("/user/coordinators")
            setCoordinators(coordinatorsData.data);
        } catch (error) {
            toast({
                title: "Erro!",
                description: error,
                status: "error",
                duration: 3000,
                isClosable: false,
                position: "top",
            });
        }
    }
    
    const handleSubmit = async () => {
        const data = {courseId, courseName, coordinatorId}
        try {
            await api.put("/courses", data);
            toast({
                title: "Curso atualizado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro ao atualizar curso.";
            toast({
                title: "Erro ao atualizar curso.",
                description: errorMessage,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    }

    useEffect(() => {
        getCourses()
        getCoordinators()
    }, [])

    return (
        <Box
            margin={"2vw"}
        >
            <FormControl
                display={"flex"}
                flexDirection={"column"}
                gap={"2vw"}
            >
                <Text w={"100%"} textAlign={"center"}>
                    Atualize os cursos de sua instituição:
                </Text>
                <Box>
                    <Text>
                        Selecione um curso para ser atualizado:
                    </Text>
                    <Select
                            onChange={(e) => setCourseId(e.target.value)}
                        >
                        <option value={-1}>Selecione um Curso</option>
                            {courses.length > 0 ? (
                                courses.map(course => (
                                <option 
                                    key={course.course_name+course.course_id} 
                                    value={course.course_id}
                                >{course.course_name}
                                </option>
                            ))) : <option>Nenhum Curso Disponivel</option>}
                    </Select>
                    <Text className={styles.labelCourseName}>
                        Nome do Curso:
                    </Text>
                    <Input 
                        placeholder="Digite o nome do curso"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                </Box>
                <Box>
                    <Text>
                        Selecione um coordenador para o curso:
                    </Text>
                    <Select
                        onChange={(e) => setCoordinatorId(e.target.value)}
                    >
                    <option value={-1}>Selecione um Coordenador</option>
                        {coordinators.length > 0 ? (
                            coordinators.map(coordinator => (
                            <option 
                                key={coordinator.first_name+coordinator.user_id} 
                                value={coordinator.user_id}
                            >{coordinator.first_name+" "+coordinator.last_name}
                            </option>
                        ))) : <option>Nenhum Coordenador Disponivel</option>}
                    </Select>
                </Box>
                <Flex
                    justifyContent={"center"}
                >
                    <Button
                        onClick={handleSubmit}
                        color={'#fff'} 
                        mb={3} 
                        bg={'#2274A5'}
                        _hover={{
                            bg: '#1A5981',
                            cursor: 'pointer'
                        }}
                    >
                        Atualizar Curso
                    </Button>
                </Flex>
            </FormControl>
        </Box>
    )
}

export default UpdateCourse;