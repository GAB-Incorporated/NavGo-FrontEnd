import { useState, useEffect } from 'react';
import { Box, Heading, Button, FormControl, FormLabel, Input, useToast, Select } from '@chakra-ui/react';
import api from '../../api'
import styles from '../ModalLocations/modalLocation.module.css';

function AddLocationModal(){
    const [campus, setCampus] = useState('');
    const [building, setBuilding] = useState('');
    const [floorNumber, setFloorNumber] = useState('');
    const [locationTypeId, setLocationTypeId] = useState('');
    const [locationName, setLocationName] = useState('')
    const [description, setDescription] = useState('');
    const [locationTypes, setLocationTypes] = useState([]);

    const toast = useToast();

    useEffect(() => {

        api.get('/location_types')
            .then(response => {
                setLocationTypes(response.data);
            })
            .catch(error => {
                console.error(error);
                toast({
                    title: "Error fetching location types",
                    description: "Unable to load location types.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    }, []);

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
        if(locationName.length > 50) {
            toast({
                title: 'Nome inválido',
                description: 'O nome do campus não pode conter mais que 50 caracteres',
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
}
export default AddLocationModal;
