import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/modal";
import { Alert, AlertIcon, Spinner, Button, Divider, Input, useToast } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { SignUP_ValSchema } from "../../schema/FormSchemas";
import { FirebaseError } from "firebase/app";
import { useFormik } from "formik";
import { authFB } from "../../firebase";
import { useState } from "react";
import useCurTheme from "../../hooks/useCurTheme";

type SidenavProps = {
  toggleSignup: (action?: boolean) => void;
  isOpen: boolean;
};

const SignupDrawer: React.FC<SidenavProps> = ({ isOpen, toggleSignup }) => {
  const { is800pxBigger, isDarkMode } = useCurTheme();
  const [status, setStatus] = useState({ statusText: "", isShown: false, isLoading: false });
  const [error, setError] = useState({ hasError: false, errorText: "" });
  const toast = useToast();
  const handleClose = () => toggleSignup(false);
  const handleSignUp = async () => {
    let currentUser;
    setStatus({ isLoading: true, isShown: true, statusText: "Creating Account..." });
    setError({ hasError: false, errorText: "" });
    try {
      const result = await createUserWithEmailAndPassword(
        authFB,
        formik.values.SignUpEmail,
        formik.values.SignUpPassword
      );
      currentUser = result;
      setStatus({ isLoading: true, isShown: true, statusText: "Updating Username..." });
      await updateProfile(currentUser.user, { displayName: formik.values.SignUpUsername });
      setStatus({ isLoading: false, isShown: false, statusText: "" });
      toast({
        description: "Account Created Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      formik.resetForm();
      handleClose();
    } catch (error) {
      const err = error as FirebaseError;
      if (currentUser) {
        setError({
          hasError: true,
          errorText: "The Account was created but the username was not set - " + err.message,
        });
        toast({
          description: "The Account was created but the username was not set",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
        formik.resetForm();
        handleClose();
      } else {
        setError({ hasError: true, errorText: err.message });
      }
      setStatus({ isLoading: false, isShown: false, statusText: "" });
    }
  };
  const formik = useFormik({
    initialValues: {
      SignUpEmail: "",
      SignUpPassword: "",
      SignUpUsername: "",
    },
    validationSchema: SignUP_ValSchema,
    onSubmit: handleSignUp,
  });

  const ErrorParagraphStyle = {
    color: "red",
    marginTop: is800pxBigger ? "20px" : "15px",
    marginLeft: "5px",
    fontWeight: isDarkMode ? "bold" : "",
  };
  return (
    <>
      <Drawer isOpen={isOpen} placement='right' size='sm' onClose={handleClose} colorScheme='gray'>
        <DrawerOverlay />
        <DrawerContent backgroundColor={isDarkMode ? "#1a202c" : "white"}>
          <DrawerHeader style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "auto", color: isDarkMode ? "white" : "purple" }}>Create Account | Ashera</span>
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
              <p style={ErrorParagraphStyle}>{formik.touched.SignUpUsername && formik.errors.SignUpUsername}</p>
              <Input
                placeholder='Username'
                type='text'
                variant='filled'
                id='SignUpUsername'
                name='SignUpUsername'
                color='primary'
                value={formik.values.SignUpUsername}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <p style={ErrorParagraphStyle}>{formik.touched.SignUpEmail && formik.errors.SignUpEmail}</p>
              <Input
                placeholder='Email'
                id='SignUpEmail'
                name='SignUpEmail'
                type='email'
                variant='filled'
                value={formik.values.SignUpEmail}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <p style={ErrorParagraphStyle}>{formik.touched.SignUpPassword && formik.errors.SignUpPassword}</p>
              <Input
                placeholder='Password'
                type='password'
                variant='filled'
                id='SignUpPassword'
                name='SignUpPassword'
                color='primary'
                value={formik.values.SignUpPassword}
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
                Create Account
              </Button>
            </form>
            <Button variant='outline' width='100%' mt={is800pxBigger ? "6" : "4"} onClick={handleClose}>
              I Already have an account
            </Button>
            {status.isShown && (
              <Alert status='success' variant='top-accent' mt={4}>
                {status.isLoading ? <Spinner style={{ marginRight: "7px" }} /> : <AlertIcon />}
                {status.statusText}
              </Alert>
            )}

            {error.hasError && (
              <Alert
                status={
                  error.errorText.includes("The Account was created but the username was not set") ? "warning" : "error"
                }
                variant='top-accent'
                mt={4}
              >
                <AlertIcon />
                {error.errorText}
              </Alert>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default SignupDrawer;
