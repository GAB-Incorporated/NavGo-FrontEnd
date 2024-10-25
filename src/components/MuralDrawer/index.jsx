import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Flex,
  Box,
  Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import DrawerClasses from './DrawerClasses/index.jsx';
import styles from './muralDrawer.module.css';
import api from '../../api.js';

const MuralDrawer = ({ userId, onClassSelect, selectedClass }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [classes, setClasses] = useState([]);
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    const fetchClassesWithLastFile = async () => {
      if (userId) {
        try {
          const classesResponse = await api.get(`/classes/user/${userId}`);
          const classesWithFiles = await Promise.all(classesResponse.data.map(async (classItem) => {
            const lastFileResponse = await api.get(`/files/${classItem.class_id}/lastFile`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
            return {
              ...classItem,
              lastFileName: lastFileResponse.data.lastFileName,
              lastFileTime: lastFileResponse.data.lastFileTime,
            };
          }));
          setClasses(classesWithFiles);
        } catch (error) {
          console.log('Erro ao buscar classes: ' + error);
        }
      }
    };
    fetchClassesWithLastFile();
  }, [userId]);

  // Compara os dois objetos e encontra a turma
  useEffect(() => {
    const selectedClassData = classes.find((classItem) => classItem.class_id === selectedClass.class_id);
    if (selectedClassData) {
      setSubjectName(selectedClassData.subject_name);
    }
  }, [selectedClass, classes]);

  const handleClassClick = (classId) => {
    onClassSelect(classId);
    onClose(); 
  };

  return (
    <Box>
      <Flex>
        <Button as='button' className={styles.button} onClick={onOpen}>
          <ArrowBackIcon color='#000' height={12} width={6}/>
        </Button>
        <Text className={styles.subjectName}>{subjectName}</Text>
      </Flex>
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen} size={'full'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader className={styles.header}>Suas Turmas</DrawerHeader>
          <DrawerBody className={styles.content}>
            {classes.map((classItem) => (
              <DrawerClasses
                key={classItem.class_id}
                classItem={classItem}
                handler={() => handleClassClick(classItem.class_id)}
              />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MuralDrawer;
