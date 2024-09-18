import { Box, Flex, Text, Input, Select, Textarea, Button, FormControl, useToast } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import api from "../../../../api"

const UpdateBuilding = () => {
    const [buildings, setBuildings] = useState("")
    const [buildingId, setBuildingId] = useState("")
    const [buildingName, setBuildingName] = useState("")
    const [buildingDescription, setBuildingDescription] = useState("")
    const toast = useToast()

    const getBuildings = useCallback(async () => {
        try {
            const buildingsData = await api.get("/buildings")
            setBuildings(buildingsData.data);
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
    }, [toast])

    const handleSubmit = async () => {
        const data = {buildingId, buildingName, buildingDescription}
        try {
            await api.put("/buildings", data)
            toast({
                title: "Construção Atualizada com sucesso!!",
                status: "sucess",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro ao atualizar construção.";
            toast({
                title: "Erro ao atualizar construção.",
                description: errorMessage,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    }

    useEffect(() => {
        getBuildings();
    }, [getBuildings])

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
                    Atualize as construções de sua instituição
                </Text>
                <Box>
                    <Text>
                        Selecione uma construção para ser atualizada:
                    </Text>
                    <Select
                        onChange={(e) => setBuildingId(e.target.value)}
                    >
                        <option value={-1}>Selecione uma construção</option>
                            {buildings.length > 0 ? (
                                buildings.map(building => (
                                    <option
                                        key={building.name+building.building_id}
                                        value={building.building_id}>
                                            {building.building_name}
                                        </option>
                                ))) : <option>Nenhuma Construção Disponivel</option>
                            }
                    </Select>
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
                        mb={3}
                        bg={"main.100"}
                        _hover={{
                            cursor: "pointer"
                        }}
                    >
                        Atualizar Construção
                    </Button>
                </Flex>
            </FormControl>
        </Box>
    )
}

export default UpdateBuilding;