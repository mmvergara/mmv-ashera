import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Divider, IconButton } from "@chakra-ui/react";
import { deleteNote } from "../../firebase";
import { noteDetails } from "../../types/NoteTypes";
import { useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import ModalNoteForm from "./ModalNoteForm";
import useCurTheme from "../../hooks/useCurTheme";
interface NoteProps {
  noteDetails: noteDetails;
}

const Note: React.FC<NoteProps> = ({ noteDetails }) => {
  const { isDarkMode } = useCurTheme();
  const [editModalOn, setEditModalOn] = useState<boolean>(false);
  const deleteNoteHandler = async () => deleteNote(noteDetails.noteId);
  const closeModalHandler = () => setEditModalOn(false);
  const openModalHandler = () => setEditModalOn(true);
  return (
    <>
      {editModalOn && (
        <ModalNoteForm
          closeModalHandler={closeModalHandler}
          isOpen={editModalOn}
          noteContent={noteDetails.noteContent}
          noteTitle={noteDetails.noteTitle}
          noteId={noteDetails.noteId}
        />
      )}
      <Box bg='purple.900' minW='300px' maxW='300px' p={4} color='white'>
        <h5 style={{ display: "flex", justifyContent: "space-between" }}>
          <span
            style={{ flexGrow: 1, fontSize: "1.2rem", overflow: "hidden", wordWrap: "break-word" }}
          >
            {noteDetails.noteTitle}
          </span>
          <span style={{ marginLeft: "4px" }}>
            <Menu>
              <MenuButton
                _hover={{ backgroundColor: "none" }}
                _active={{ backgroundColor: "none" }}
                as={IconButton}
                aria-label='Options'
                variant='outline'
              >
                <HamburgerIcon />
              </MenuButton>
              <MenuList color={isDarkMode ? "white" : "black"}>
                <MenuItem onClick={openModalHandler} icon={<EditIcon />}>
                  Edit Note
                </MenuItem>
                <MenuItem onClick={deleteNoteHandler} icon={<DeleteIcon />}>
                  Delete Note
                </MenuItem>
              </MenuList>
            </Menu>
          </span>
        </h5>
        <Divider margin='1em 0em' />
        <p>{noteDetails.noteContent}</p>
      </Box>
    </>
  );
};

export default Note;
