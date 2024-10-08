import api from "../../../../api";
import { useState } from "react";
import { Text, Box, Input, Button, FormControl, FormLabel, useToast, Tooltip, Textarea } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const LocalTypeBody = () => {
    const toast = useToast();
    const [typeName, setTypeName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        try {
            await api.post("/local-type", { type_name: typeName, description: description });
            toast({
                title: "Tipo de local cadastrado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro ao cadastrar tipo de local.";
            toast({
                title: "Erro ao cadastrar tipo de local.",
                description: errorMessage,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    };

    return (
        <Box margin={"2vw"}>
            <Text as="header" w={"100%"} fontSize={"1.5vw"} textAlign={"center"} mb={4}>
                Cadastre novos tipos de locais:
            </Text>
            <FormControl>
                <FormLabel>Nome do Tipo de Local</FormLabel>
                <Input
                    value={typeName}
                    onChange={(e) => setTypeName(e.target.value)}
                    placeholder="Nome do tipo de local"
                    mb={4}
                />
                <FormLabel display="flex" alignItems="center">
                    Descrição do local 
                    <Tooltip label="Descreva a função e as características deste tipo de local, como por exemplo as atividades mais realizadas neste local por alunos ou docentes">
                        <InfoOutlineIcon ml={2} />
                    </Tooltip>
                </FormLabel>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição do tipo de local"
                    mb={8}
                />
                <Box textAlign={'center'}>
                    <Button
                        onClick={handleSubmit}
                        color={'#fff'} 
                        bg={'main.100'}
                        _hover={{
                            bg: 'main.200',
                            cursor: 'pointer'
                        }}
                    >
                        Cadastrar Tipo de Local
                    </Button>
                </Box>
            </FormControl>
        </Box>
    );
};

export default LocalTypeBody;
