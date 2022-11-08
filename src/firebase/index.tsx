import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  arrayRemove,
  collection,
  doc,
  getFirestore,
  updateDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { firebaseInitializeConfig } from "../Config";

import { noteDetail, noteNoId } from "../types/NoteTypes";
const firebaseConfig = firebaseInitializeConfig;

//Firebase App Initialize

export const appFB = initializeApp(firebaseConfig);

//Services
export const firestoreDB = getFirestore();
export const authFB = getAuth();

//References
export const taskSectionRef = collection(firestoreDB, "TaskSections");
export const notesRef = collection(firestoreDB, "Notes");

// ~~~~~~ TASKS ~~~~~~
export const addNewTaskSection = async (taskSectionName: string) => {
  const userId = authFB.currentUser?.uid!;
  if (!userId) return;
  await addDoc(taskSectionRef, {
    author: userId,
    taskSectionName,
    tasks: [],
    createdAt: serverTimestamp(),
  });
};
export const deleteTaskSection = async (sectionId: string) => {
  const userId = authFB.currentUser?.uid!;
  if (!userId) return;
  return await deleteDoc(doc(taskSectionRef, sectionId));
};
export const addTask = async (taskSectionId: string, taskName: string) => {
  const userId = authFB.currentUser?.uid!;
  if (!userId) return;
  return await updateDoc(doc(firestoreDB, "TaskSections", taskSectionId), {
    tasks: arrayUnion(taskName),
  });
};

export const deleteTask = async (taskSectionId: string, taskName: string) => {
  return await updateDoc(doc(firestoreDB, "TaskSections", taskSectionId), {
    tasks: arrayRemove(taskName),
  });
};
// ~~~~~~ TASKS ~~~~~~

// ~~~~~~ NOTES ~~~~~~
export const addNote = async (noteDetails: noteDetail) => {
  const author = authFB.currentUser?.uid!;
  if (!author) return;
  const noteInfo: noteNoId = { ...noteDetails, noteAuthor: author };
  const result = await addDoc(notesRef, noteInfo);
  return result;
};

export const editNote = async (noteDetails: noteDetail, noteId: string) => {
  const author = authFB.currentUser?.uid!;
  if (!author) return;
  const noteInfo: noteNoId = { ...noteDetails, noteAuthor: author };
  const result = await updateDoc(doc(firestoreDB, "Notes", noteId), { ...noteInfo });
  return result;
};

export const deleteNote = async (noteId: string) => {
  const result = await deleteDoc(doc(notesRef, noteId));
  return result;
};
// ~~~~~~ NOTES ~~~~~~
