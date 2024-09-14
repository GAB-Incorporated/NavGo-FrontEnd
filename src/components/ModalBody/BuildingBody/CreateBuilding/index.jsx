import { Box, Flex, Button, FormControl, Text, Input, Textarea } from "@chakra-ui/react"
import { useState } from "react"
import api from "../../../../api"

const CreateBuilding = () => {
    const [buildingName, setBuildingName] = useState("")
    const [buildingDescription, setBuildingDescription] = useState("")

    const handleSubmit = () => {
        console.log(buildingName)
        console.log(buildingDescription)
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
                        mb={3}
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