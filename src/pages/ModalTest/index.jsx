import { Button, useDisclosure } from "@chakra-ui/react";
import ModalStructure from "../../components/ModalStructure";
import CreatePeriod from "../../components/ModalBody/PeriodBody/CreatePeriod" 

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
                title="Modal de Construções" 
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                contentBody={<CreatePeriod/>}
            />
        </>
    )
}