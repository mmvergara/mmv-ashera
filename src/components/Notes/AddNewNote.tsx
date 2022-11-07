import { AddIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import ModalNoteForm from "./ModalNoteForm";

const AddNewNote: React.FC = () => {
  const closeModalHandler = () => setNoteFormOpen(false);
  const [noteFormOpen, setNoteFormOpen] = useState<boolean>(false);

  return (
    <>
      {noteFormOpen && (
        <ModalNoteForm closeModalHandler={closeModalHandler} isOpen={noteFormOpen} />
      )}
      <Box
        cursor='pointer'
        bg='purple.900'
        w='300px'
        p={4}
        color='white'
        onClick={() => setNoteFormOpen(true)}
      >
        <h5 style={{ textAlign: "center" }}>
          Add New Note <AddIcon />
        </h5>
      </Box>
    </>
  );
};

export default AddNewNote;
