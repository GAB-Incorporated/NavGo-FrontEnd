import { Box, Text, Image } from "@chakra-ui/react"

const MuralBody = () => {

    return (
        <Box>
            <Box bgColor={'main.300'} m="1vw" pl={5} pt={4} pr={5} pb={4} borderRadius='20px'>
                <Text>
                    No mural será possivel visualizar os arquivos enviados 
                    por professores referentes a diferentes aulas.
                </Text>
                <Text>
                    Para essa funcionalidade funcionar corretamente, atualmente 
                    é necessário você ter um login na ferramenta, justamente para 
                    vincularmos seu usuário ao mural do seu respectivo curso.
                </Text>
                <Text>
                    Posteriormente, na barra lateral você poderá selecionar seu curso, 
                    a materia do mesmo e visualizar os materiais enviados pelo professor da matéria.
                </Text>
                <Image src="imagemManeira.jpg" aria-label="Imagem da barra lateral, mostrando os murais de cada materia."/>
            </Box>
        </Box>
    )
}

export default MuralBody;