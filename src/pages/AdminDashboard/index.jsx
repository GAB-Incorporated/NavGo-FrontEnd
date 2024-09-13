import { useState } from "react";
import { Box, Button, SimpleGrid, Text, Divider, AbsoluteCenter,useDisclosure } from "@chakra-ui/react";
import styles from "./adminDashboard.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ModalStructure from "../../components/ModalStructure";
import CreateSubjectBody from '../../components/ModalBody/SubjectBody/CreateSubject'
import CourseBody from "../../components/ModalBody/CourseBody";
import CreateLocationBody from '../../components/ModalBody/LocationBody/CreateLocation'
import UpdateSubject from '../../components/ModalBody/SubjectBody/UpdateSubject'
import { DeleteIcon } from "@chakra-ui/icons";

  const AdminDashboard = () => {
      const { isOpen, onOpen, onClose } = useDisclosure();
      const [modalContent, setModalContent] = useState(null);
  
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
                  <Box p={5} shadow="md" borderWidth="1px">
                      <Text fontSize="xl" as="h3">Matérias</Text>
                      
                      {/* TESTE DE LISTAGEM  */}
                      <Box as="article">
                        <Box as="section">
                            <Text as="p">Enginnering 101 <DeleteIcon _hover={{color: 'black', cursor: 'pointer'}} mb={1}/></Text>
                        </Box>
                        <Box as="section">
                            <Text as="p">Biochemistry 101 <DeleteIcon _hover={{color: 'black', cursor: 'pointer'}} mb={1}/></Text>
                        </Box>
                        <Box as="section">
                            <Text as="p">Capoeira Avançada <DeleteIcon _hover={{color: 'black', cursor: 'pointer'}} mb={1}/></Text>
                        </Box>
                      </Box>
                      <Box as="article">
                        <Box as="section">
                            <Text as="p">Enginnering 101 <DeleteIcon _hover={{color: 'black', cursor: 'pointer'}} mb={1}/></Text>
                        </Box>
                        <Box as="section">
                            <Text as="p">Biochemistry 202 <DeleteIcon _hover={{color: 'black', cursor: 'pointer'}} mb={1}/></Text>
                        </Box>
                        <Box as="section">
                            <Text as="p">Capoeira Avançada <DeleteIcon _hover={{color: 'black', cursor: 'pointer'}} mb={1}/></Text>
                        </Box>
                      </Box>
                      <Box as="article">
                        <Box as="section">
                            <Text as="p">Enginnering 101 <DeleteIcon _hover={{color: 'black', cursor: 'pointer'}} mb={1}/></Text>
                        </Box>
                        <Box as="section">
                            <Text as="p">Biochemistry 203 <DeleteIcon _hover={{color: 'black', cursor: 'pointer'}} mb={1}/></Text>
                        </Box>
                        <Box as="section">
                            <Text as="p">Capoeira Avançada <DeleteIcon _hover={{color: 'black', cursor: 'pointer'}} mb={1}/></Text>
                        </Box>
                      </Box>

                      <Button
                          onClick={() => openModal(<CreateSubjectBody />)}
                          mt={10}
                          display={'block'}
                          bg={'main.200'}
                          border={'1px solid #000'}
                      >
                          Adicionar Matéria
                      </Button>
                  </Box>
  
                  <Box p={5} shadow="md" borderWidth="1px">
                      <Text fontSize="xl" as="h3">Locais</Text>
                      <Button
                          onClick={() => openModal(<CreateLocationBody />)} 
                          mt={4}
                          bg={'main.200'}
                          border={'1px solid #000'}
                      >
                          Adicionar Local
                      </Button>
                  </Box>
  
                  <Box p={5} shadow="md" borderWidth="1px">
                      <Text fontSize="xl" as="h3">Prédios</Text>
                      <Button
                          onClick={() => openModal(<UpdateSubject/>)}  
                          mt={4}
                          bg={'main.200'}
                          border={'1px solid #000'}
                      >
                          Adicionar Prédio
                      </Button>
                  </Box>

                  <Box p={5} shadow="md" borderWidth="1px">
                      <Text fontSize="xl" as="h3">Cursos</Text>
                      <Button
                          onClick={() => openModal(<CourseBody />)}  
                          mt={4}
                          bg={'main.200'}
                          border={'1px solid #000'}
                      >
                          Adicionar Curso
                      </Button>
                  </Box>
                  <Box p={5} shadow="md" borderWidth="1px">
                      <Text fontSize="xl" as="h3">Cursos</Text>
                      <Button
                          onClick={() => openModal(<CourseBody />)}  
                          mt={4}
                          bg={'main.200'}
                          border={'1px solid #000'}
                      >
                          Adicionar Curso
                      </Button>
                  </Box>
                  <Box p={5} shadow="md" borderWidth="1px">
                      <Text fontSize="xl" as="h3">Cursos</Text>
                      <Button
                          onClick={() => openModal(<CourseBody />)}  
                          mt={4}
                          bg={'main.200'}
                          border={'1px solid #000'}
                      >
                          Adicionar Curso
                      </Button>
                  </Box>
                  <Box p={5} shadow="md" borderWidth="1px">
                      <Text fontSize="xl" as="h3">Cursos</Text>
                      <Button
                          onClick={() => openModal(<CourseBody />)}  
                          mt={4}
                          bg={'main.200'}
                          border={'1px solid #000'}
                      >
                          Adicionar Curso
                      </Button>
                  </Box>
                  <Box p={5} shadow="md" borderWidth="1px">
                      <Text fontSize="xl" as="h3">Cursos</Text>
                      <Button
                          onClick={() => openModal(<CourseBody />)}  
                          mt={4}
                          bg={'main.200'}
                          border={'1px solid #000'}
                      >
                          Adicionar Curso
                      </Button>
                  </Box>
                  <Box p={5} shadow="md" borderWidth="1px">
                      <Text fontSize="xl" as="h3">Cursos</Text>
                      <Button
                          onClick={() => openModal(<CourseBody />)}  
                          mt={4}
                          bg={'main.200'}
                          border={'1px solid #000'}
                      >
                          Adicionar Curso
                      </Button>
                  </Box>
                </SimpleGrid>
                <Footer />
          </Box>
      );
  };
  
  export default AdminDashboard;
  