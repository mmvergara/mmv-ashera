import { Button, Input } from "@chakra-ui/react";
import { onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { addNewTaskSection, taskSectionRef } from "../../firebase";
import { AllTasksSectionContainer, TasksMainContainer } from "../../styles/StyledComponents";
import { TaskSection as TS } from "../../types/TaskTypes";
import LoadingModal from "../LoadingModal";
import TaskSection from "./TaskSection";

const TaskContainer: React.FC = () => {
  const auth = useAuth();
  const taskSectionNameInpRef = useRef<HTMLInputElement | null>(null!);
  const [allTaskSection, setAllTaskSection] = useState<TS[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const addNewTaskSectionHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sectionName = taskSectionNameInpRef.current?.value;
    if (!sectionName || sectionName.trim().length === 0) return;
    await addNewTaskSection(sectionName);
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
      setAllTaskSection(sections.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds));
    });
  }, [auth]);

  if (isLoading && allTaskSection.length === 0) return <LoadingModal />;
  return (
    <>
      <AllTasksSectionContainer>
        {allTaskSection.map((task) => {
          return (
            <TaskSection
              key={task.id}
              sectionId={task.id}
              taskSectionName={task.taskSectionName}
              tasks={task.tasks}
            />
          );
        })}

        <TasksMainContainer>
          <form onSubmit={addNewTaskSectionHandler}>
            <Input ref={taskSectionNameInpRef} placeholder='Task Section Name' mb='2' />
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
