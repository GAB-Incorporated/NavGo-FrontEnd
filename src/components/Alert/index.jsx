import { Button, AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogFooter, AlertDialogContent, AlertDialogBody } from "@chakra-ui/react"

const AlertDialog = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
  
    return (
      <>
        <Button colorScheme='red' onClick={onOpen}>
          Delete Customer
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete Customer
                </AlertDialogHeader>
  
                <AlertDialogBody>
                    Tem certeza? Essa ação não pode ser desfeita
                </AlertDialogBody>
  
                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    Cancelar
                </Button>
                <Button colorScheme='red' onClick={onClose} ml={3}>
                    Deletar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  export default AlertDialog;