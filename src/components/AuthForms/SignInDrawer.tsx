import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { useFormik } from "formik";
import { useState } from "react";
import { SignIN_ValSchema } from "../../schema/FormSchemas";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authFB } from "../../firebase";
import { Alert, AlertIcon, Spinner, Button, Divider, Input, useToast } from "@chakra-ui/react";
import useCurTheme from "../../hooks/useCurTheme";
import SignupDrawer from "./SignupDrawer";
import useStatusText from "../../hooks/useStatusText";
import DummyAccount from "../DummyAccount";

type SidenavProps = {
  toggleSignin: (action?: boolean) => void;
  isOpen: boolean;
};

const SigninDrawer: React.FC<SidenavProps> = ({ isOpen, toggleSignin }) => {
  const { is800pxBigger, isDarkMode } = useCurTheme();
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const toast = useToast();

  const { setStatus, status } = useStatusText(false, "", false);
  const handleClose = () => toggleSignin(false);
  const handleOpenSignup = () => toggleSignUp(true);

  const toggleSignUp = (action?: boolean) => {
    action !== null ? setShowSignup((prev) => !prev) : setShowSignup(action);
  };
  const handleSignIn = async () => {
    setStatus({ hasError: false, isLoading: true, statusText: "" });
    try {
      const result = await signInWithEmailAndPassword(
        authFB,
        formik.values.SignInEmail,
        formik.values.SignInPassword
      );
      toast({
        description: "Login Successful",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      if (result) setStatus({ hasError: false, isLoading: false, statusText: "Logged In!" });
    } catch (error) {
      setStatus({ hasError: true, isLoading: false, statusText: "Invalid Credentials" });
    }
  };

  const formik = useFormik({
    initialValues: {
      SignInEmail: "",
      SignInPassword: "",
    },
    validationSchema: SignIN_ValSchema,
    onSubmit: handleSignIn,
  });

  const ErrorParagraphStyle = {
    color: "red",
    marginTop: is800pxBigger ? "20px" : "15px",
    marginLeft: "5px",
    fontWeight: isDarkMode ? "bold" : "",
  };
  return (
    <>
      <SignupDrawer isOpen={showSignup} toggleSignup={toggleSignUp} />
      <Drawer isOpen={isOpen} placement='right' size='sm' onClose={handleClose} colorScheme='gray'>
        <DrawerOverlay />
        <DrawerContent backgroundColor={isDarkMode ? "#1a202c" : "white"}>
          <DrawerHeader style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "auto", color: isDarkMode ? "white" : "purple" }}>
              Sign in | Ashera
            </span>
            <Button
              variant='solid'
              onClick={handleClose}
              _hover={{ backgroundColor: isDarkMode ? "#970213" : "#db0921", color: "white" }}
            >
              Close
            </Button>
          </DrawerHeader>
          <DrawerBody>
            <Divider />
            <form onSubmit={formik.handleSubmit}>
              <p style={ErrorParagraphStyle}>
                {formik.touched.SignInEmail && formik.errors.SignInEmail}
              </p>
              <Input
                placeholder='Email'
                id='SignInEmail'
                name='SignInEmail'
                type='email'
                variant='filled'
                value={formik.values.SignInEmail}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <p style={ErrorParagraphStyle}>
                {formik.touched.SignInPassword && formik.errors.SignInPassword}
              </p>
              <Input
                placeholder='Password'
                type='password'
                variant='filled'
                id='SignInPassword'
                name='SignInPassword'
                color='primary'
                value={formik.values.SignInPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <Button
                variant='solid'
                backgroundColor='purple'
                color='white'
                type='submit'
                _hover={{ backgroundColor: "hsl(300, 98%, 30%)" }}
                _active={{ backgroundColor: "purple" }}
                width='100%'
                mt={is800pxBigger ? "4" : "2"}
              >
                Sign in {status.isLoading && <Spinner size='sm' ml='5px' />}
              </Button>
            </form>
            <Button
              variant='outline'
              onClick={handleOpenSignup}
              width='100%'
              mt={is800pxBigger ? "6" : "4"}
            >
              Create Account
            </Button>
            {!status.isLoading && status.statusText !== "" && (
              <Alert status={status.hasError ? "error" : "success"} variant='top-accent' mt={4}>
                <AlertIcon />
                {status.statusText}
              </Alert>
            )}
            <DummyAccount />
          </DrawerBody>
          <DrawerFooter>Made by: Vergara, Mark Matthew</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default SigninDrawer;
