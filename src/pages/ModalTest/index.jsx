import { Button, useDisclosure } from "@chakra-ui/react";
import ModalStructure from "../../components/ModalStructure";
import CreateCourse from "../../components/ModalBody/CourseBody/CreateCourse" 

export default function ModalTest() {
    const {isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
            <Button
                onClick={onOpen}
            >
                Abre o Modal
            </Button>
            <ModalStructure
                title="Modal de Cursos" 
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                contentBody={<CreateCourse/>}
            />
        </>
    )
}