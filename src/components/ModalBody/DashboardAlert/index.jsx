import { Box, Text } from "@chakra-ui/react"

const DashboardAlert = () => {
    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            textAlign="center" 
            gap={"2vh"}
            margin="3vh 0"
        >
            <Text>
                Não é possivel acessar atualmente o Dashboard com a resolução de tela detectada.
            </Text>
            <Text>
                Futuramente implementaremos o acesso por dispositivos móveis, enquanto isso, pedimos encarecidamente que 
                acesse pelo computador. 
            </Text>
            <Text>
                --Equipe Técnica
            </Text>
        </Box>
    )
}

export default DashboardAlert;