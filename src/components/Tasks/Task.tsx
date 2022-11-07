import { CheckIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { IconButton, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { deleteTask } from "../../firebase";
import { TaskContainer } from "../../styles/StyledComponents";
interface TaskProps {
  taskName: string;
  sectionId: string;
}

const Task: React.FC<TaskProps> = ({ taskName, sectionId }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const toast = useToast();
  const hoverHandler = (e: boolean) => setIsHovered(e);
  const deleteTaskHandler = async () => {
    const result = await deleteTask(sectionId, taskName);
    toast({
      description: `${taskName} Done!`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    return result;
  };

  return (
    <>
      <TaskContainer>
        <span style={{ wordWrap: "normal", margin: "10px" }}>
          <IconButton
            aria-label='Check'
            icon={
              isHovered ? (
                <CheckCircleIcon fontSize='20' color='#c31ba9' />
              ) : (
                <CheckIcon fontSize='20' color='#c31ba9' />
              )
            }
            variant='unstyled'
            size='xs'
            mr='2'
            onMouseEnter={() => hoverHandler(true)}
            onMouseLeave={() => hoverHandler(false)}
            onClick={deleteTaskHandler}
          />
          {taskName}
        </span>
      </TaskContainer>
    </>
  );
};

export default Task;
