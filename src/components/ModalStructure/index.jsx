import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import PropTypes from "prop-types"

const ModalStructure =(
    {
        size = "xl",
        title = "Modal",
        isOpen, 
        onClose,
        contentBody,
        contentFooter = null
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
                    bg={"main.200"} 
                    h={"1vw"} 
                    borderTopRadius={"20px"}
                    p="0.8vw 0vw 0.4vw 0vw"
                >
                    {title}
                </ModalHeader>
                <ModalCloseButton/>
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

ModalStructure.propTypes = {
    size: PropTypes.string,
    title: PropTypes.string,
    isOpen: PropTypes.bool.isRequired, 
    onClose: PropTypes.bool.isRequired,
    contentBody: PropTypes.node.isRequired,
    contentFooter: PropTypes.node,
}

export default ModalStructure