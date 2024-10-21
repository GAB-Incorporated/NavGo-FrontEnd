import { useState, useEffect } from "react";
import { Text, Box, Input, Button, FormControl, FormLabel, Select, useToast } from "@chakra-ui/react";
import api from "../../../../api.js";

const UpdateSubjectBody = () => {
    const [subjects, setSubjects] = useState([]);
    const [subjectId, setSubjectId] = useState(""); 
    const [subjectName, setSubjectName] = useState(""); 
    const [courses, setCourses] = useState([]); 
    const [courseId, setCourseId] = useState(""); 
    const toast = useToast();

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await api.get("/subjects"); 
                setSubjects(response.data);
            } catch (error) {
                toast({
                    title: "Erro ao carregar matérias.",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
        };        
        fetchSubjects();
    }, [toast]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get("/courses"); 
                setCourses(response.data.message);
            } catch (error) {
                toast({
                    title: "Erro ao carregar cursos.",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
        };        
        fetchCourses();
    }, [toast]);

    const handleSubmit = async () => {
        try {
            await api.put(`/subjects/${subjectId}`, { 
                subject_name: subjectName,
                course_id: courseId 
            });

            toast({
                title: "Matéria atualizada com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro ao atualizar matéria.";
            toast({
                title: "Erro ao atualizar matéria.",
                description: errorMessage,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    };

    return (
        <Box>
            <Text w={"100%"} textAlign={"center"} mb={4}>
                Atualize a matéria de sua instituição:
            </Text>
            <FormControl>
                <FormLabel>Escolha a matéria</FormLabel>
                <Select
                    placeholder="Selecione a matéria"
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    mb={4}
                >
                    {subjects.map(subject => (
                        <option key={subject.subject_id} value={subject.subject_id}>
                            {subject.subject_name} 
                        </option>
                    ))}
                </Select>

                <FormLabel>Novo nome da matéria</FormLabel>
                <Input
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="Digite o novo nome da matéria"
                    mb={8}
                />
                <FormLabel>Escolha o curso</FormLabel>
                <Select
                    placeholder="Selecione o curso"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    mb={4}
                >
                    {courses.map(course => (
                        <option key={course.course_id} value={course.course_id}>
                            {course.course_name} 
                        </option>
                    ))}
                </Select>
                <Box textAlign={'center'}>
                    <Button
                        onClick={handleSubmit}
                        color={'#fff'} 
                        mb={3} 
                        bg={'main.100'}
                        _hover={{
                            bg: '#1A5981',
                            cursor: 'pointer'
                        }}
                    >
                        Atualizar Matéria
                    </Button>
                </Box>
            </FormControl>
        </Box>
    );
};

export default UpdateSubjectBody;
