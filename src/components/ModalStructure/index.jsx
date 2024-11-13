import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"

const ModalStructure =(
    {
        size = "xl",
        title = "Modal",
        isOpen, 
        onClose,
        contentBody,
        contentFooter = null,
        headerColor = 'black',
        headerBGColor = 'main.200'
    }) => {

    return(
        <Modal
            size={size}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent borderRadius={"20px"}>
                <ModalHeader 
                    textAlign={"center"} 
                    bg={headerBGColor}
                    color={headerColor}
                    h={"1vw"} 
                    borderTopRadius={"20px"}
                    p="0.8vw 0vw 0.4vw 0vw"
                >
                    {title}
                </ModalHeader>
                <ModalCloseButton color={headerColor}/>
                <ModalBody>
                    {contentBody}
                </ModalBody>
                {contentFooter ? (
                    <ModalFooter>
                        {contentFooter}
                    </ModalFooter>
                ) : <></>}
            </ModalContent>
        </Modal>
    )
}

export default ModalStructure