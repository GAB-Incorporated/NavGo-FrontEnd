import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import api from '../../../../api'
import styles from '../CreateLocation/locationBody.module.css';

const LocationBodyCreate = () => {
    const [campus, setCampus] = useState('');
    const [building, setBuilding] = useState('');
    const [floorNumber, setFloorNumber] = useState('');
    const [locationTypeId, setLocationTypeId] = useState('');
    const [locationName, setLocationName] = useState('')
    const [description, setDescription] = useState('');
    const [locationTypes, setLocationTypes] = useState([]);

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        let mounted = true;

        api.get('/location_types')
            .then(response => {
                if(mounted) {
                    setLocationTypes(response.data);
                }
            })
            .catch(error => {
                console.log(error)
                if (mounted) {
                    toast({
                        title: "Erro ao encontrar tipos de locais.",
                        description: "Não foi possível carregar os locais.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            });

            return () => {
                mounted = false;
            };
    }, [toast]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!campus || !building || !floorNumber || !locationTypeId || !locationName) {
            toast({
                title: 'Formulário incompleto',
                description: 'Por favor, preencha todos os campos obrigatórios.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        if(locationName.length > 50 || campus.length > 50) {
            toast({
                title: 'Nome inválido',
                description: 'O nome dos locais não pode conter mais que 50 caracteres',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try{
            const data = {
                campus: campus,
                building: building,
                floor_number: Number(floorNumber),
                location_type_id: locationTypeId,
                location_name: locationName,
                description: description,
                location_types: locationTypes, 
            };

            const response = await api.post('/location', data)

            if(response.status === 201) {
                toast({
                    title: 'Localização adicionada com sucesso.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setCampus('');
                setBuilding('');
                setFloorNumber('');
                setLocationName('');
                setLocationTypeId('');
                setDescription('');
            }
        } catch(error) {
            toast({
                title: 'O serviço de adicionar nova localização falhou.',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return (
        <Box padding="2em">
            <Button onClick={onOpen} variant="solid" bg="main.500" color="white">
                Adicionar nova localização
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                borderRadius="12px"
                border="1px solid #e2e8f0"
                bg="white"
                >
                    <ModalHeader
                        bg="main.200"
                        color="black"
                        borderTopRadius="12px"
                        borderBottomRadius="12px"
                        padding="20px"
                        fontSize="lg"
                        fontWeight=""
                    >
                        Adicionar nova localização
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className={styles.modalBody}>
                        <form onSubmit={handleSubmit}>
                            <FormControl mb="1em" isRequired>
                                <FormLabel color="main.400" mb="0.5em" fontWeight="500">Nome do Local</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="ex.: Laboratório 1, Sala de Aula 06..."
                                    value={locationName}
                                    onChange={(e) => setLocationName(e.target.value)}
                                    variant="outline"
                                    className={styles.inputField}
                                />
                            </FormControl>
                            <FormControl mb="1em" isRequired>
                                <FormLabel color="main.400" mb="0.5em" fontWeight="500">Descrição</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="ex.: Biblioteca de estudos e pesquisas com computadores"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    variant="outline"
                                    className={styles.inputField}
                                />
                            </FormControl>
                            <FormControl mb="1em" isRequired>
                                <FormLabel color="main.400" mb="0.5em" fontWeight="500">Campus</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="ex.: Campus Central, Campus Paulista"
                                    value={campus}
                                    onChange={(e) => setCampus(e.target.value)}
                                    variant="outline"
                                    className={styles.inputField}
                                />
                            </FormControl>
                            <FormControl mb="1em" isRequired>
                                <FormLabel color="main.400" mb="0.5em" fontWeight="500">Prédio</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="ex.: Bloco B, Edifício Administrativo"
                                    value={building}
                                    onChange={(e) => setBuilding(e.target.value)}
                                    variant="outline"
                                    className={styles.inputField}
                                />
                            </FormControl>
                            <FormControl mb="1em" isRequired>
                                <FormLabel color="main.400" mb="0.5em" fontWeight="500">Número do Andar</FormLabel>
                                <Input
                                    type="number"
                                    placeholder="Número do andar"
                                    value={floorNumber}
                                    onChange={(e) => setFloorNumber(e.target.value)}
                                    variant="outline"
                                    className={styles.inputField}
                                />
                            </FormControl>
                            <FormControl mb="1em" isRequired>
                                <FormLabel color="main.400" mb="0.5em" fontWeight="500">Tipo de Local</FormLabel>
                                <Select
                                    placeholder="Selecione o tipo de local"
                                    value={locationTypeId}
                                    onChange={(e) => setLocationTypeId(e.target.value)}
                                    className={styles.selectField}
                                >
                                    {locationTypes.map((type) => (
                                        <option key={type.type_id} value={type.type_id}>
                                            {type.type_name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="orange" bg="main.100" mr={3} onClick={handleSubmit}>
                            Adicionar Localização
                        </Button>
                        <Button colorScheme='blue' bg="main.400" onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default LocationBodyCreate;
