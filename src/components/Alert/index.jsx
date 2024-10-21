import { useState } from "react";
import { AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogFooter, AlertDialogContent, AlertDialogBody, Button } from "@chakra-ui/react";
import React from "react";
//Hook customizado para tratar alerts de confirmação

const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resolvePromise, setResolvePromise] = useState(null);
  const cancelRef = React.useRef();

  const openConfirmDialog = () => {
    setIsOpen(true);
    return new Promise((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const closeConfirmDialog = (result) => {
    setIsOpen(false);
    console.log('Modal fechado com resultado:', result);
    if (resolvePromise) {
      resolvePromise(result);
    }
  };

  const ConfirmDialog = () => (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => closeConfirmDialog(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Deletar Item
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza? Essa ação não pode ser desfeita.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => closeConfirmDialog(false)}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={() => closeConfirmDialog(true)} ml={3}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return { ConfirmDialog, openConfirmDialog };
};

export default useConfirmDialog;
