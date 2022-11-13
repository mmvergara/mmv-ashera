import { Box, Button, Container, Stack } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import TasksPage from "./TasksPage";
import { Text } from "@chakra-ui/react";
import SigninDrawer from "../components/AuthForms/SignInDrawer";
const HomePage: React.FC = () => {
  const auth = useAuth();
  const [showSignin, setShowSignin] = useState<boolean>(false);
  const toggleSignin = (action?: boolean) => {
    action !== null ? setShowSignin((prev) => !prev) : setShowSignin(action);
  };
  return (
    <>
      {auth ? (
        <TasksPage />
      ) : (
        <>
          {!auth && showSignin && <SigninDrawer isOpen={showSignin} toggleSignin={toggleSignin} />}
          <Container>
            <Box
              backgroundColor='#390e3e'
              style={{
                padding: "1em",
                boxShadow: `rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px,rgb(0 0 0 / 12%) 0px 1px 10px 0px`,
              }}
            >
              <Stack spacing={3}>
                <Text fontSize='4xl' textAlign='center' color='white' fontWeight='bold'>
                  Ashera Notes
                </Text>
                <Text fontSize='3xl' textAlign='center' color='white'>
                  lightweight app that can manage your tasks and notes, yep That's it!
                </Text>
                <Button onClick={() => toggleSignin(true)}>Get Started</Button>
                <a
                  href='https://mmv-docs.vercel.app/'
                  style={{ width: "100%", textAlign: "center" }}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Button style={{ width: "100%" }}>Developer Docs</Button>
                </a>
              </Stack>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default HomePage;
