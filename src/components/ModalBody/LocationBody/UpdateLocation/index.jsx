import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast, Select } from '@chakra-ui/react';
import api from '../../../../api';
import ModalStructure from '../../../ModalStructure';
import styles from '../UpdateLocation/locationBody.module.css'

const LocationBodyUpdate = ({ locationId }) => {
    const [campus, setCampus] = useState('');
    const [building, setBuilding] = useState('');
    const [floorNumber, setFloorNumber] = useState('');
    const [locationTypeId, setLocationTypeId] = useState('');
    const [locationName, setLocationName] = useState('');
    const [description, setDescription] = useState('');
    const [locationTypes, setLocationTypes] = useState([]);

    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let mounted = true;

        api.get('/location_types')
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
                        description: "Não foi possível carregar os tipos de locais.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            });

        // Carregar dados da localização para edição
        if (locationId) {
            api.get(`/location/${locationId}`)
                .then(response => {
                    if (mounted) {
                        const location = response.data;
                        setCampus(location.campus);
                        setBuilding(location.building);
                        setFloorNumber(location.floor_number);
                        setLocationTypeId(location.location_type_id);
                        setLocationName(location.location_name);
                        setDescription(location.description);
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (mounted) {
                        const errorMessage = error.response?.data?.message || "Erro ao carregar os tipos de locais.";
                        toast({
                            title: "Erro ao carregar localização.",
                            description: errorMessage,
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                        });
                    }
                });
        }

        return () => {
            mounted = false;
        };
    }, [toast, locationId]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const data = {
                campus,
                building,
                floor_number: Number(floorNumber),
                location_type_id: locationTypeId,
                location_name: locationName,
                description,
            };

            const response = await api.put(`/location/${locationId}`, data);

            if (response.status === 200) {
                toast({
                    title: 'Localização atualizada com sucesso.',
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
                setIsOpen(false);
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
    };

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <Box padding="2em">
            <Button onClick={handleOpen} variant="solid" bg="main.500" color="white">
                Editar localização
            </Button>

            <ModalStructure
                size="xl"
                title="Editar localização"
                isOpen={isOpen}
                onClose={handleClose}
                contentBody={
                    <form onSubmit={handleUpdate}>
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
                }
                contentFooter={
                    <>
                        <Button form="update-form" colorScheme="orange" bg="main.100" color="white" onClick={handleUpdate}>
                            Atualizar localização
                        </Button>
                    </>
                }
            />
        </Box>
    );
}

export default LocationBodyUpdate;