import { useState, useEffect } from "react";
import { Text, Box, Input, Button, FormControl, FormLabel, Select, useToast } from "@chakra-ui/react";
import api from "../../../../api.js";

const UpdateSubjectBody = () => {
    const [subjects, setSubjects] = useState([]);
    const [subjectId, setSubjectId] = useState(""); 
    const [subjectName, setSubjectName] = useState(""); 
    const toast = useToast();

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await api.get("/subjects"); 
                setSubjects(response.data);
            } catch (error) {
                toast({
                    title: "Erro ao carregar matérias.",
                    description: "Não foi possível carregar as matérias.",
                    status: error,
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            }
        };        
        fetchSubjects();
    }, [toast]);

    const handleSubmit = async () => {
        try {
                await api.put(`/subjects/${subjectId}`, { 
                subject_name: subjectName,
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
                    Atualizar Matéria
                </Button>
            </FormControl>
        </Box>
    );
};

export default UpdateSubjectBody;
