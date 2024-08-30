import { useState } from "react";
import { Text, Box, Input, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import api from "../../../../api.js";

const UpdateSubjectBody = () => {
    const [subjectId, setSubjectId] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const toast = useToast();

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
                <Input
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    placeholder="Digite o ID da matéria"
                    mb={4}
                />
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
