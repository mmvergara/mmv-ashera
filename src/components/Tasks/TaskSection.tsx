import { TasksMainContainer } from "../../styles/StyledComponents";
import useCurTheme from "../../hooks/useCurTheme";
import styled from "@emotion/styled";
import Task from "./Task";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { IconButton, Input, useToast } from "@chakra-ui/react";
import { addTask, deleteTaskSection } from "../../firebase";
import { DeleteIcon } from "@chakra-ui/icons";
interface TaskSectionProps {
  taskSectionName: string;
  sectionId: string;
  tasks: string[];
}
const TaskSection: React.FC<TaskSectionProps> = ({ sectionId, taskSectionName, tasks }) => {
  const { isDarkMode } = useCurTheme();
  const [valTaskSection, setValTaskSection] = useState("");
  const newTaskSectionRef = useRef<HTMLInputElement | null>(null!);
  const toast = useToast();

  let allTasks: string[] = tasks || [];
  const newTaskHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valTaskSection || valTaskSection.trim().length === 0) return;
    await addTask(sectionId, valTaskSection);
    setValTaskSection('')
    newTaskSectionRef.current?.focus();
  };
  const deleteSectionHandler = async () => {
    await deleteTaskSection(sectionId);
    toast({
      description: `${taskSectionName} Section Deleted`,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };
  const AllTaskContainer = styled.div`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    gap: 7px;
    height: 90%;
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${isDarkMode ? "#65656579" : "#c3c2c2"};
      border-radius: 20px;
    }
  `;
  return (
    <TasksMainContainer style={{ borderColor: isDarkMode ? "#424242" : "#42424272" }}>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "7px" }}>
        {taskSectionName}
        <IconButton
          aria-label='Check'
          icon={<DeleteIcon />}
          size='xs'
          ml='2'
          color='red'
          onClick={deleteSectionHandler}
        />
      </p>

      <AllTaskContainer>
        {allTasks.map((t) => {
          return <Task key={nanoid()} taskName={t} sectionId={sectionId} />;
        })}
        <form onSubmit={newTaskHandler}>
          <Input
            ref={newTaskSectionRef}
            value={valTaskSection}
            onChange={(e) => setValTaskSection(e.target.value)}
            style={{ width: "95%" }}
            placeholder='Add New Task'
            mb='2'
          />
        </form>
      </AllTaskContainer>
    </TasksMainContainer>
  );
};

export default TaskSection;
