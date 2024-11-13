import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast, Select, Text, Textarea } from '@chakra-ui/react';
import api from '../../../../api'
import styles from '../CreateLocation/locationBody.module.css';

const LocationBodyCreate = () => {
    const [campus, setCampus] = useState('');
    const [building, setBuilding] = useState([]);
    const [buildingId, setBuildingId] = useState('')
    const [floorNumber, setFloorNumber] = useState('');
    const [locationTypeId, setLocationTypeId] = useState('');
    const [locationName, setLocationName] = useState('')
    const [description, setDescription] = useState('');
    const [locationTypes, setLocationTypes] = useState([]);

    const toast = useToast();

    useEffect(() => {
        let mounted = true;

        api.get('/local-type')
            .then(response => {
                if(mounted) {
                    setLocationTypes(response.data);
                }
            })
            .catch(error => {
                console.log(error);
                if (mounted) {
                    toast({
                        title: "Erro ao encontrar tipos de locais.",
                        description: error.message,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            });

            api.get('/buildings')
            .then(response => {
                if(mounted) {
                    setBuilding(response.data);
                }
            })
            .catch(error => {
                console.log(error);
                if(mounted){
                    toast({
                        title: "Erro ao carregar os dados dos prédios.",
                        description: error.message,
                        status: "error",
                        duration: 3000,
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

        try{
            const data = {
                campus: campus,
                building_id: buildingId,
                floor_number: Number(floorNumber),
                location_type_id: locationTypeId,
                location_name: locationName,
                description: description,
            };

            const response = await api.post('/locations', data)

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
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro ao atualizar a localização.";
            toast({
                title: 'Erro ao atualizar a localização.',
                description: errorMessage,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <Box margin={"2vw"}>
                <FormControl mb="1em" isRequired>
                    <Text w={"100%"} textAlign={"center"} fontSize="1.5vw" mb={5}>
                        Cadastre os locais de sua instituição:
                    </Text>
                    <FormLabel color="main.500" mb="0.5em" fontWeight="500">Nome do Local</FormLabel>
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
                    <FormLabel color="main.500" mb="0.5em" fontWeight="500">Descrição</FormLabel>
                    <Textarea
                        type="text"
                        placeholder="ex.: Biblioteca de estudos e pesquisas com computadores"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        variant="outline"
                        className={styles.inputField}
                    />
                </FormControl>
                <FormControl mb="1em" isRequired>
                    <FormLabel color="main.500" mb="0.5em" fontWeight="500">Campus</FormLabel>
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
                    <FormLabel color="main.500" mb="0.5em" fontWeight="500">Número do Andar</FormLabel>
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
                    <FormLabel color="main.500" mb="0.5em" fontWeight="500">Prédio</FormLabel>
                    <Select
                        placeholder="Selecione o prédio"
                        value={buildingId}
                         onChange={(e) => setBuildingId(e.target.value)}
                        className={styles.inputField}
                    >
                        {Array.isArray(building) && building.map((type) => (
                            <option key={type.building_id} value={type.building_id}>
                                {type.building_name}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl mb="1em" isRequired>
                    <FormLabel color="main.500" mb="0.5em" fontWeight="500">Tipo de Local</FormLabel>
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
                <Box textAlign="center" mt="2em">
                    <Button colorScheme="orange" bg="main.100" onClick={handleSubmit}>
                        Adicionar Localização
                    </Button>
                </Box>
        </Box>
    );
}

export default LocationBodyCreate;
