import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Divider,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { addNote, editNote } from "../../firebase";
import { Spinner } from "@chakra-ui/react";
interface ModalNoteProps {
  noteId?: string;
  noteTitle?: string;
  noteContent?: string;
  closeModalHandler: Function;
  isOpen: boolean;
}
const ModalNoteForm: React.FC<ModalNoteProps> = ({
  noteContent,
  noteId,
  noteTitle,
  closeModalHandler,
  isOpen,
}) => {
  const [content, setContent] = useState<string>(noteContent || "");
  const [title, setTitle] = useState<string>(noteTitle || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const id = noteId || null;
  const submitNoteHandler = async (e?: React.FormEvent<HTMLDivElement>) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    const noteDetails = {
      noteContent: content,
      noteTitle: title,
    };
    if (id) {
      await editNote(noteDetails, id);
    } else {
      await addNote(noteDetails);
    }
    setIsLoading(false);
    setContent("");
    setTitle("");
    closeModalHandler();
  };
  return (
    <Modal isOpen={isOpen} onClose={() => closeModalHandler()}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody as='form' onSubmit={submitNoteHandler}>
          <h2 style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
            {noteTitle ? `Edit ${noteTitle} Note` : "Add New Note 📝"}{" "}
          </h2>
          <Divider style={{ margin: "0.4em 0em", color: "red" }} />
          <Input
            onChange={(e) => setTitle(e.target.value!)}
            style={{ margin: "0.4em 0em", borderWidth: "2px" }}
            placeholder='Note Title'
            value={title}
          />
          <Textarea
            onChange={(e) => setContent(e.target.value!)}
            style={{ margin: "0.4em 0em", borderWidth: "2px" }}
            placeholder='Note Content'
            value={content}
          />
        </ModalBody>
        <ModalFooter>
          {isLoading ? (
            <Spinner
              thickness='3px'
              speed='0.7s'
              emptyColor='gray.200'
              color='blue.500'
              size='lg'
              mr='2'
            />
          ) : (
            <>
              <Button colorScheme='red' mr={3} onClick={() => closeModalHandler()}>
                Close
              </Button>
              <Button colorScheme='purple' mr={3} onClick={() => submitNoteHandler()}>
                Submit
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalNoteForm;
