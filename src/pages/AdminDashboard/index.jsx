import { useState, useEffect } from "react";
import api from "../../api";
import { Box, Button, SimpleGrid, Text, Divider, AbsoluteCenter,useDisclosure, useToast } from "@chakra-ui/react";
import styles from "./adminDashboard.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useConfirmDialog from "../../components/Alert";
import ModalStructure from "../../components/ModalStructure";
import CreateSubjectBody from '../../components/ModalBody/SubjectBody/CreateSubject'
import CreateCourseBody from "../../components/ModalBody/CourseBody/CreateCourse";
import CreateLocationBody from '../../components/ModalBody/LocationBody/CreateLocation'
import CreateBuilding from "../../components/ModalBody/BuildingBody/CreateBuilding";
import CreateLocalTypeBody from "../../components/ModalBody/LocalTypeBody/CreateLocalType";
import { DeleteIcon } from "@chakra-ui/icons";

    const AdminDashboard = () => {
        const toast = useToast();
        const { isOpen, onOpen, onClose } = useDisclosure();
        const [modalContent, setModalContent] = useState(null);

        const [subjects, setSubjects] = useState([]);
        const [courses, setCourses] = useState([]);
        const [buildings, setBuildings] = useState([]);
        const [locations, setLocations] = useState([]);
        const [localTypes, setLocalTypes] = useState([]);

        const [isDeleting, setIsDeleting] = useState(false);
        const { ConfirmDialog, openConfirmDialog } = useConfirmDialog();

        const fetchAll = async () => {
            try {
                //Realiza simultaneamente todas as requisições, mais rápido pois são muitas e menos verboso
                const [subjectsResponse, coursesResponse, buildingsResponse, locationsResponse, localTypeResponse] = await Promise.all([
                    api.get('/subjects'),
                    api.get('/courses'),
                    api.get('/buildings'),
                    api.get('/locations'),
                    api.get('/local-type')
                ]);
                setSubjects(subjectsResponse.data);
                setCourses(coursesResponse.data.message);
                setBuildings(buildingsResponse.data);
                setLocations(locationsResponse.data);
                setLocalTypes(localTypeResponse.data);

            } catch (error) {
                toast({
                    title: 'Falha ao carregar os dados',
                    description: error.message,
                    status: 'error',
                    duration: 10000,
                    isClosable: true,
                  });
            }
        };
    
        useEffect(() => {
            fetchAll();
        }, []);          

        const deleteItem = async (id, table) => {
            if (isDeleting) return; // Evita múltiplas deleções simultâneas
            setIsDeleting(true);

            try {
                const confirmed = await openConfirmDialog();
                if (!confirmed) {
                    setIsDeleting(false); 
                    return;
                }
                await api.delete(`/${table}/${id}`);
                
                fetchAll();
                toast({
                    title: 'Item deletado',
                    description: 'O item foi removido com sucesso.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }   catch (error) {
                    toast({
                        title: 'Erro ao deletar',
                        description: error.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }   finally {
                setIsDeleting(false); 
                }
        };
          
        const openModal = (content) => {
            setModalContent(content);
            onOpen();
        };
      
        return (
            <Box className={styles.content}>
                <Header />

              <ModalStructure
                  isOpen={isOpen}
                  onClose={onClose}
                  title="ADICIONAR NOVO ITEM"
                  contentBody={modalContent}
              />
                <Text as="h2">PAINEL ADMINISTRATIVO</Text>
                <Box position='relative' padding='10'>
                    <Divider/>
                    <AbsoluteCenter fontSize='1.5em' bg='white'>
                        Controle os dados da sua Instituição 
                    </AbsoluteCenter>
                </Box>
                <SimpleGrid columns={[1, 2, 3]} spacing={8} mt={8} mb={20} ml={5} mr={5}>
                    <Box p={5} shadow="md" borderWidth="1px" className={styles.contentBox}>
                        <Text fontSize="xl" as="h3">Matérias</Text>
                        
                        {subjects.map((row) => (
                        <Box key={row.subject_id} as="section">
                            <Text as="p">
                            {row.subject_name}
                            <DeleteIcon _hover={{ color: 'black', cursor: 'pointer' }} ml={1} mb={1} onClick={() => deleteItem(row.subject_id, 'subjects')}/>
                            </Text>
                        </Box>
                        ))}

                        <Button onClick={() => openModal(<CreateSubjectBody />)}>
                            Adicionar Matéria
                        </Button>
                    </Box>
  
                    <Box p={5} shadow="md" borderWidth="1px" className={styles.contentBox}>
                        <Text fontSize="xl" as="h3">Cursos</Text>
                        
                            {courses?.length > 0 ? courses.map((row) => (
                            <Box key={row.course_id} as="section">
                                <Text as="p">{row.course_name}
                                <DeleteIcon _hover={{ color: 'black', cursor: 'pointer' }} ml={1} mb={1} onClick={() => deleteItem(row.course_id, 'courses')}/>
                                </Text>
                            </Box>
                            )) : <Text>Nenhum curso disponível</Text>}


                        <Button mt={'auto'} onClick={() => openModal(<CreateCourseBody/>)}>
                            Adicionar Curso
                        </Button>
                    </Box>
    
                    <Box p={5} shadow="md" borderWidth="1px" className={styles.contentBox}>
                        <Text fontSize="xl" as="h3">Prédios</Text>

                        {buildings.map((row) => (
                        <Box key={row.building_id} as="section">
                            <Text as="p">
                                {row.building_name}
                                <DeleteIcon _hover={{ color: 'black', cursor: 'pointer' }} ml={1} mb={1} onClick={() => deleteItem(row.building_id, 'buildings')}/>
                            </Text>
                        </Box>
                        ))}

                        <Button onClick={() => openModal(<CreateBuilding/>)}>
                            Adicionar Prédio
                        </Button>
                    </Box>

                    <Box p={5} shadow="md" borderWidth="1px" className={styles.contentBox}>
                        <Text fontSize="xl" as="h3">Locais</Text>

                        {locations.map((row) => (
                        <Box key={row.location_id} as="section">
                            <Text as="p">
                                {row.location_name}
                                <DeleteIcon _hover={{ color: 'black', cursor: 'pointer' }} ml={1} mb={1} onClick={() => deleteItem(row.location_id, 'locations')}/>
                            </Text>
                        </Box>
                        ))}

                        <Button onClick={() => openModal(<CreateLocationBody/>)} >
                            Adicionar Locais
                        </Button>
                    </Box>
                    <Box p={5} shadow="md" borderWidth="1px" className={styles.contentBox}>
                        <Text fontSize="xl" as="h3">Tipos de locais</Text>
                        
                        {localTypes.map((row) => (
                        <Box key={row.type_id} as="section">
                            <Text as="p">
                                {row.type_name}
                                <DeleteIcon _hover={{ color: 'black', cursor: 'pointer' }} ml={1} mb={1} onClick={() => deleteItem(row.type_id, 'local-type')}/>
                            </Text>
                        </Box>
                        ))}

                        <Button onClick={() => openModal(<CreateLocalTypeBody/>)}> 
                            Adicionar Tipos de Locais
                        </Button>
                    </Box>
                </SimpleGrid>
                <Footer />
                <ConfirmDialog />
          </Box>
      );
  };
  
  export default AdminDashboard;
  