import { Box, Text, Image, AccordionItem, Accordion, AccordionButton, AccordionIcon, AccordionPanel} from "@chakra-ui/react"

const MapBody = () => {

    return (
        <Accordion allowToggle bgColor={'main.300'} margin="1vw" borderRadius='20px'>
            <AccordionItem borderTop={'hidden'}>
                <h2>
                <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                        Caso esteja logado:
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Text>
                        A funcionalidade do mapa irá automaticamente sincronizar as
                        informações da sua classe e turma de acordo com seu login.
                    </Text>
                    <br/>
                    <Text>
                        Posteriormente você irá conseguir visualizar as informações 
                        das suas aulas e rotas selecionando na direita inferior do mapa.
                    </Text>
                    <Image src="images/rota-advice.jpeg" aria-label="Imagem da página mapa, mostrando a parte para seleção de rotas e aulas"/>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem borderBottom={'hidden'}>
                <h2>
                <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                        Caso não esteja logado:
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4} display={'flex'} flexDirection={'column'}>
                    <Text>
                        Será necessário informar as suas informações de turma e módulo no 
                        modal do canto inferior esquerdo.
                    </Text>
                    <Image src="images/rota-advice2.png" aria-label="Imagem da página mapa, mostrando a parte para seleção de dia da semana e aula"/>
                    <Text>
                        Após isso você poderá seguir para selecionar o dia da semana e a aula 
                        para visualização da localização onde ela irá ocorrer e a sua respectiva 
                        rota no canto inferior direito.
                    </Text>
                    <Image src="images/rota-advice.jpeg" aria-label="Imagem da página mapa, mostrando a parte para seleção de dia da semana e aula"/>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default MapBody;