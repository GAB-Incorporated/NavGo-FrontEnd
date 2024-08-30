import { Button, useDisclosure } from "@chakra-ui/react";
import ModalStructure from "../../components/ModalStructure";
import CreateSubjectBody from "../../components/ModalBody/SubjectBody/CreateSubject";
import UpdateSubjectBody from "../../components/ModalBody/SubjectBody/UpdateSubject";

function ModalSubject() {
    const {
        isOpen: isCreateOpen,
        onOpen: onCreateOpen,
        onClose: onCreateClose
    } = useDisclosure();

    const {
        isOpen: isUpdateOpen,
        onOpen: onUpdateOpen,
        onClose: onUpdateClose
    } = useDisclosure();

    const subjectId = 1;
    const initialSubjectName = "Matemática"; 

    return (
        <>
            <Button
                onClick={onCreateOpen}
                mb={4} 
            >
                Inserir nova Matéria
            </Button>

            <ModalStructure
                title="Inserir Nova Matéria"
                isOpen={isCreateOpen}
                onClose={onCreateClose}
                contentBody={<CreateSubjectBody />}
            />

            <Button
                onClick={onUpdateOpen}
                mb={4}
            >
                Atualizar Matéria
            </Button>

            <ModalStructure
                title="Atualizar Matéria"
                isOpen={isUpdateOpen}
                onClose={onUpdateClose}
                contentBody={
                    <UpdateSubjectBody
                        subjectId={subjectId}
                        initialSubjectName={initialSubjectName}
                    />
                }
            />
        </>
    );
}

export default ModalSubject;
