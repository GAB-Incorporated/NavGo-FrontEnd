import api from "../../../../api";
import { useState } from "react";
import { Text, Box, Input, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";
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
        <Box>
            <Text as="header" w={"100%"} textAlign={"center"} mb={4}>
                Cadastre novos tipos de locais:
            </Text>
            <FormControl>
                <FormLabel>Nome do Tipo de Local</FormLabel>
                <Input
                    value={typeName}
                    onChange={(e) => setTypeName(e.target.value)}
                    placeholder="Sala de aula"
                    mb={4}
                />
                <FormLabel display="flex" alignItems="center">
                    Descrição do local 
                    <Tooltip label="Descreva a função e as características deste local." fontSize="sm">
                        <InfoOutlineIcon ml={2} />
                    </Tooltip>
                </FormLabel>
                <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Sala utilizada para aulas teóricas, com projetor e televisão para..."
                    mb={8}
                />
                <Box textAlign={'center'}>
                    <Button
                        onClick={handleSubmit}
                        color={'#fff'} 
                        mb={3} 
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
