import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Flex,
  Box
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import styles from './muralDrawer.module.css';
import api from '../../api.js';

const MuralDrawer = ({ userId, onClassSelect }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      if (userId) {
        try {
          const response = await api.get(`/classes/user/${userId}`);
          setClasses(response.data);
        } catch (error) {
          console.log('Erro ao buscar classes: ' + error);
        }
      } else {
        console.log('Token não encontrado ou inválido');
      }
    };
    fetchClasses();
  }, [userId]);

  const handleClassClick = (classId) => {
    onClassSelect(classId);
    onClose();
  };

  return (
    <Box className={styles.ButtonDrawer}>
      <Button as='button' bg='#2274ac' borderRadius={0} onClick={onOpen} height={100}>
        <ArrowBackIcon color='#fff' height={20} width={12} />
      </Button>
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent className={styles.DrawerText}>
          <DrawerHeader bg='#2274ac' color='#fff' justifyContent='center' alignItems={'center'} fontSize='xx-large' borderBottomWidth='1px'>Suas Turmas</DrawerHeader>
          <DrawerBody as='ul'>
            <Flex wrap="wrap" mb={4}>
              {classes.map((classItem) => (
                <Button
                  key={classItem.class_id}
                  onClick={() => handleClassClick(classItem.class_id)}
                  m={2}
                >
                  {classItem.class_id}
                </Button>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MuralDrawer;