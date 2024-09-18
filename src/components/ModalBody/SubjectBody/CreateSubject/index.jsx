import { useState, useEffect } from "react";
import { Text, Box, Input, Button, FormControl, FormLabel, Select, useToast } from "@chakra-ui/react";
import api from "../../../../api.js";

const CreateSubjectBody = () => {
    const [subjectName, setSubjectName] = useState("");
    const [courseId, setCourseId] = useState("");
    const [courses, setCourses] = useState([]); 
    const toast = useToast();

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
            await api.post("/subjects", { "subject_name": subjectName, "course_id": courseId });
            toast({
                title: "Matéria cadastrada com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro ao cadastrar matéria.";
            toast({
                title: "Erro ao cadastrar matéria.",
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
                Cadastre as matérias de sua instituição:
            </Text>
            <FormControl>
                <FormLabel>Nome da Matéria</FormLabel>
                <Input
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="Digite o nome da matéria"
                    mb={8}
                />
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
                        Cadastrar Matéria
                    </Button>
                </Box>
            </FormControl>
        </Box>
    );
};

export default CreateSubjectBody;
