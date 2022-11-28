import { Button, Input } from "@chakra-ui/react";
import { onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { addNewTaskSection, taskSectionRef } from "../../firebase";
import { AllTasksSectionContainer, TasksMainContainer } from "../../styles/StyledComponents";
import { TaskSection as TS } from "../../types/TaskTypes";
import LoadingModal from "../LoadingModal";
import TaskSection from "./TaskSection";

const TaskContainer: React.FC = () => {
  const auth = useAuth();
  const [newTaskSecVal, setNewTaskSecVal] = useState("");
  const [allTaskSection, setAllTaskSection] = useState<TS[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const addNewTaskSectionHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskSecVal || newTaskSecVal.trim().length === 0) return;
    await addNewTaskSection(newTaskSecVal);
    setNewTaskSecVal("");
    return;
  };

  useEffect(() => {
    const curUserId = auth?.uid;
    if (!curUserId) return;
    const q = query(taskSectionRef, where("author", "==", curUserId));
    onSnapshot(q, (snapshot) => {
      const sections: TS[] = [];
      snapshot.docs.forEach((s) => {
        const section = s.data() as TS;
        sections.push({ ...section, id: s.id });
      });
      setIsLoading(false);

      setAllTaskSection(
        sections.sort((a, b) => {
          return a.createdAt.seconds - b.createdAt.seconds;
        })
      );
    });
  }, [auth]);

  if (isLoading && allTaskSection.length === 0) return <LoadingModal />;
  return (
    <>
      <AllTasksSectionContainer>
        {allTaskSection.map((task) => {
          const { id, taskSectionName, tasks } = task;
          return (
            <TaskSection key={id} sectionId={id} taskSectionName={taskSectionName} tasks={tasks} />
          );
        })}

        <TasksMainContainer>
          <form onSubmit={addNewTaskSectionHandler}>
            <Input
              value={newTaskSecVal}
              onChange={(e) => setNewTaskSecVal(e.target.value)}
              placeholder='Task Section Name'
              mb='2'
            />
            <Button type='submit' style={{ width: "100%" }}>
              Add New Task Section
            </Button>
          </form>
        </TasksMainContainer>
      </AllTasksSectionContainer>
    </>
  );
};

export default TaskContainer;
