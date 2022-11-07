import { Container } from "@chakra-ui/react";
import { onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { notesRef } from "../../firebase";
import { noteDetails } from "../../types/NoteTypes";
import LoadingModal from "../LoadingModal";
import AddNewNote from "./AddNewNote";
import Note from "./Note";

interface NotesContainerProps {}
const NotesContainer: React.FC<NotesContainerProps> = () => {
  const [allNotes, setAllNotes] = useState<noteDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const auth = useAuth();
  useEffect(() => {
    const curUserId = auth?.uid;
    if (!curUserId) return;
    const q = query(notesRef, where("noteAuthor", "==", curUserId));
    onSnapshot(q, (snapshot) => {
      const notes: noteDetails[] = [];
      snapshot.docs.forEach((n) => {
        const note = n.data() as noteDetails;
        notes.push({ ...note, noteId: n.id });
      });
      setAllNotes(notes);
      setIsLoading(false);
    });
  }, [auth]);

  if (isLoading && allNotes.length === 0) return <LoadingModal />;

  return (
    <Container maxW='100%' display='flex' gap='15px' flexWrap='wrap' justifyContent='center'>
      {allNotes.map((n) => {
        return <Note key={n.noteId} noteDetails={n} />;
      })}
      <AddNewNote />
    </Container>
  );
};

export default NotesContainer;
