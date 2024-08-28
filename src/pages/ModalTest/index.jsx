import { Button, useDisclosure } from "@chakra-ui/react";
import ModalStructure from "../../components/ModalStructure";
import CourseBody from "../../components/ModalBody/CourseBody"

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
                title="Modal de Teste" 
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                contentBody={<CourseBody/>}
            />
        </>
    )
}