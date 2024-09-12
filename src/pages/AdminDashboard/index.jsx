import { useState } from "react";
import { Box, Button, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import styles from "./adminDashboard.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ModalStructure from "../../components/ModalStructure";
import CreateSubjectBody from '../../components/ModalBody/SubjectBody/CreateSubject'
import CourseBody from "../../components/ModalBody/CourseBody";
import CreateLocationBody from '../../components/ModalBody/LocationBody/CreateLocation'
import UpdateSubject from '../../components/ModalBody/SubjectBody/UpdateSubject'

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

              <SimpleGrid columns={[1, 2, 3]} spacing={10} mt={8} mb={20}>
                  <Box p={5} shadow="md" borderWidth="1px">
                      <Text fontSize="xl">Matérias</Text>
                      <Button
                          onClick={() => openModal(<CreateSubjectBody />)}
                          mt={4}
                          bg={'main.200'}
                      >
                          Adicionar Matéria
                      </Button>
                  </Box>
  
                  <Box p={5} shadow="md" borderWidth="1px">
                      <Text fontSize="xl">Locais</Text>
                      <Button
                          onClick={() => openModal(<CreateLocationBody />)}  // Implementação semelhante para Professores
                          mt={4}
                          bg={'main.200'}
                      >
                          Adicionar Local
                      </Button>
                  </Box>
  
                  <Box p={5} shadow="md" borderWidth="1px">
                      <Text fontSize="xl">Prédios</Text>
                      <Button
                          onClick={() => openModal(<UpdateSubject/>)}  // Implementação semelhante para Alunos
                          mt={4}
                          bg={'main.200'}
                      >
                          Adicionar Prédio
                      </Button>
                  </Box>

                  <Box p={5} shadow="md" borderWidth="1px">
                      <Text fontSize="xl">Cursos</Text>
                      <Button
                          onClick={() => openModal(<CourseBody />)}  // Implementação semelhante para Alunos
                          mt={4}
                          bg={'main.200'}
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
  