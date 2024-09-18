import { Box, Flex, Button, FormControl, Text, Input, Textarea, useToast } from "@chakra-ui/react"
import { useState } from "react"
import api from "../../../../api"

const CreateBuilding = () => {
    const [buildingName, setBuildingName] = useState("")
    const [buildingDescription, setBuildingDescription] = useState("")
    const toast = useToast()

    const handleSubmit = async () => {
        const data = {building_name: buildingName, description: buildingDescription}
        try {
            await api.post("/buildings", data)
            toast({
                title: "Construção cadastrada com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro ao cadastrar construção.";
            toast({
                title: "Erro ao cadastrar construção.",
                description: errorMessage,
                status: "error",
                duration: 3000,
                isClosable: false,
                position: "top",
            });
        }
    }

    return(
        <Box
            m="2vw"    
        >
            <FormControl
                display={"flex"}
                flexDirection={"column"}
                gap={"2vw"}
            >
                <Text w="100%" textAlign="center" fontSize="1.5vw"> 
                    Cadastre as construções de sua instituição
                </Text>
                <Box>
                    <Text>
                        Nome da Construção:
                    </Text>
                    <Input
                        placeholder="Digite o nome do curso"
                        value={buildingName}
                        onChange={(e) => setBuildingName(e.target.value)}
                    />
                </Box>
                <Box>
                    <Text>
                        Descrição da Construção:
                    </Text>
                    <Textarea
                        placeholder="Descreva a construção (sua função):"
                        value={buildingDescription}
                        onChange={(e) => setBuildingDescription(e.target.value)}
                    />
                </Box>
                <Flex
                    justifyContent="center"
                >
                    <Button
                        onClick={handleSubmit}
                        color="#fff"
                        bg={"main.100"}
                        _hover={{
                            cursor: "pointer"
                        }}
                    >
                        Cadastrar Construção
                    </Button>
                </Flex>
            </FormControl>
        </Box>
    )
}

export default CreateBuilding;