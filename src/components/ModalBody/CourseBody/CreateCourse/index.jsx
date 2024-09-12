import { Box, Flex, Text, Input, Select, Button, FormControl, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import api from "../../../../api.js";


const CreateCourse = () => {
    const [courseName, setCourseName] = useState("")
    const [coordinatorId, setCoordinatorId] = useState(0)
    const [coordinators, setCoordinators] = useState([])
    const toast = useToast()
    
    const getCoordinators = async () => {
        try {
            const coordinatorsData = await api.get("/user/coordinators")
            setCoordinators(coordinatorsData.data);
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
    }
    
    const handleSubmit = async () => {
        const data = {courseName, coordinatorId}
        try {
            await api.post("/courses", data);
            toast({
                title: "Curso cadastrado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro ao cadastrar curso.";
            toast({
                title: "Erro ao cadastrar curso.",
                description: errorMessage,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    }

    useEffect(() => {
        getCoordinators()
    }, [])

    return (
        <Box
            margin={"2vw"}
        >
            <FormControl
                display={"flex"}
                flexDirection={"column"}
                gap={"2vw"}
            >
                <Text w={"100%"} textAlign={"center"}>
                    Cadastre os cursos de sua instituição:
                </Text>
                <Box>
                    <Text className={styles.labelCourseName}>
                        Nome do Curso:
                    </Text>
                    <Input 
                        placeholder="Digite o nome do curso"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                </Box>
                <Box>
                    <Text>
                        Selecione um coordenador para o curso:
                    </Text>
                    <Select
                        onChange={(e) => setCoordinatorId(e.target.value)}
                    >
                    <option value={-1}>Selecione um Coordenador</option>
                        {coordinators.length > 0 ? (
                            coordinators.map(coordinator => (
                            <option 
                                key={coordinator.first_name+coordinator.user_id} 
                                value={coordinator.user_id}
                            >{coordinator.first_name+" "+coordinator.last_name}
                            </option>
                        ))) : <option>Nenhum Coordenador Disponivel</option>}
                    </Select>
                </Box>
                <Flex
                    justifyContent={"center"}
                >
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
                        Cadastrar Curso
                    </Button>
                </Flex>
            </FormControl>
        </Box>
    )
}

export default CreateCourse;