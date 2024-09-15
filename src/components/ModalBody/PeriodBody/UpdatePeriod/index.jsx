import { Box, Flex, Text, Input, Select, Button, FormControl, useToast } from "@chakra-ui/react"
import { useCallback, useState } from "react"
import api from "../../../../api"

const UpdatePeriod = () => {
    const [periods, setPeriods] = useState([])
    const [periodId, setPeriodId] = useState(-1)
    const [periodName, setPeriodName] = useState("")
    const [periodStart, setPeriodStart] = useState(null)
    const [periodEnd, setPeriodEnd] = useState(null)
    const toast = useToast()

    const getPeriods = useCallback(async () => {
        try {
            const periodsData = await api.get("/periods")
            setPeriods(periodsData.data)
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
        const data = {periodId, periodName, periodStart, periodEnd}
        try {
            await api.put("/periods", data)
            toast({
                title: "Periodo atualizado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro ao cadastrar periodo.";
            toast({
                title: "Erro ao atualizar periodo.",
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
                    Atualize os periodos de aula
                </Text>
                <Box>
                    <Text>
                        Selecione um periodo:
                    </Text>
                    <Select
                            onChange={(e) => setPeriodId(e.target.value)}
                        >
                        <option value={-1}>Selecione um Periodo</option>
                            {periods.length > 0 ? (
                                periods.map(period => (
                                <option 
                                    key={period.period_name+period.period_id} 
                                    value={period.period_id}
                                >{period.period_name}
                                </option>
                            ))) : <option>Nenhum Periodo Disponivel</option>}
                    </Select>
                </Box>
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

export default UpdatePeriod;