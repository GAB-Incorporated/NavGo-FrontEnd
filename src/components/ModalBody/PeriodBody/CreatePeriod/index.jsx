import { Box, Flex, Text, Input, Select, Button, FormControl, useToast } from "@chakra-ui/react"
import { useState } from "react"
import api from "../../../../api"

const CreatePeriod = () => {
    const [periodName, setPeriodName] = useState("")
    const [periodStart, setPeriodStart] = useState(null)
    const [periodEnd, setPeriodEnd] = useState(null)
    const toast = useToast()

    const handleSubmit = async () => {
        const data = {periodName, periodStart, periodEnd}
        try {
            await api.post("/periods", data)
            toast({
                title: "Periodo cadastrado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro ao cadastrar periodo.";
            toast({
                title: "Erro ao cadastrar periodo.",
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
            margin={"2vw"}
        >
            <FormControl
                display={"flex"}
                flexDirection={"column"}
                gap={"2vw"}
            >
                <Text w={"100%"} textAlign={"center"} fontSize="1.5vw">
                    Cadastre os periodos de aula
                </Text>
                <Box>
                    <Text>
                        Nome do Periodo:
                    </Text>
                    <Input
                        placeholder="Digite o nome periodo"
                        value={periodName}
                        onChange={(e) => setPeriodName(e.target.value)}
                    >
                    </Input>
                </Box>
                <Flex gap={"2vw"} fontSize={"1vw"} w="inherit">
                    <Box w="50%">
                        <Text>
                            Horário de inicio:
                        </Text>
                        <Input
                            type="time"
                            value={periodStart}
                            onChange={(e) => setPeriodStart(e.target.value)}
                        />
                    </Box>
                    <Box w="50%">
                        <Text>
                            Horário de finalização:
                        </Text>
                        <Input
                            type="time"
                            value={periodEnd}
                            onChange={(e) => setPeriodEnd(e.target.value)}
                        />
                    </Box>
                </Flex>
                <Flex
                    justifyContent={"center"}
                >
                    <Button
                        onClick={handleSubmit}
                        color={'#fff'} 
                        mb={3} 
                        bg={'main.100'}
                        _hover={{
                            cursor: 'pointer'
                        }}  
                    >
                        Cadastrar Periodo
                    </Button>
                </Flex>
            </FormControl>
        </Box>
    )
}

export default CreatePeriod;