import { useState } from "react";
import { MenuList, Text, useToast } from "@chakra-ui/react";
import { Avatar, IconButton, Icon, Menu, MenuButton, MenuItem } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { HiLogout } from "react-icons/hi";
import { authFB } from "../../firebase";
import { signOut } from "firebase/auth";
import { HeaderNav } from "../../styles/StyledComponents";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useCurTheme from "../../hooks/useCurTheme";
import SigninDrawer from "../AuthForms/SignInDrawer";
import Menus from "./Menus";
const Navbar: React.FC = () => {
  const { changeTheme, is800pxBigger, isDarkMode } = useCurTheme();
  const [showSignin, setShowSignin] = useState<boolean>(false);
  const auth = useAuth();
  const toggleDarkLightMode = () => changeTheme();
  const toggleSignin = (action?: boolean) => {
    action !== null ? setShowSignin((prev) => !prev) : setShowSignin(action);
  };
  const navigate = useNavigate();
  const toast = useToast();
  const signOutHandler = () => {
    toggleSignin(false);
    signOut(authFB);
    toast({
      description: "Logged Out",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <>
      {!auth && showSignin && <SigninDrawer isOpen={showSignin} toggleSignin={toggleSignin} />}
      <HeaderNav style={{ backgroundColor: isDarkMode ? "#390e3e" : "#d7d7d7" }}>
        {AsheraText(is800pxBigger, isDarkMode)}
        {auth && <Menus />}
        <div style={{ display: "flex", alignItems: "center" }}>
          {(is800pxBigger || !auth) && (
            <IconButton
              aria-label='Toggle Dark/Light mode'
              icon={isDarkMode ? <SunIcon /> : <MoonIcon color='black' />}
              fontSize='2xl'
              onClick={toggleDarkLightMode}
              variant='link'
              marginRight='2'
            />
          )}
          {auth ? (
            <Menu>
              <MenuButton>
                <Avatar
                  name='User'
                  size='sm'
                  src={authFB.currentUser?.photoURL || ""}
                  cursor='pointer'
                />
              </MenuButton>
              <MenuList opacity='1'>
                {!is800pxBigger && (
                  <MenuItem onClick={toggleDarkLightMode}>
                    Toggle Theme
                    <IconButton
                      aria-label='Toggle Dark/Light mode'
                      icon={isDarkMode ? <SunIcon /> : <MoonIcon color='black' />}
                      fontSize='2xl'
                      variant='link'
                      marginRight='2'
                    />
                  </MenuItem>
                )}
                <MenuItem onClick={signOutHandler}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <IconButton
              aria-label='Toggle Dark/Light mode'
              icon={<Icon as={HiLogout} />}
              fontSize={is800pxBigger ? "4xl" : "2xl"}
              onClick={() => toggleSignin()}
              variant='link'
              marginLeft={is800pxBigger ? "5" : "2"}
            />
          )}
        </div>
      </HeaderNav>
    </>
  );
};

export default Navbar;

function AsheraText(is800pxBigger: boolean, isDarkMode: boolean) {
  return (
    <div>
      <Text
        fontSize={is800pxBigger ? 30 : 20}
        fontWeight='bold'
        marginLeft={is800pxBigger ? "0.5em" : "0em"}
        color={isDarkMode ? "white" : "purple"}
      >
        Ashera
      </Text>
    </div>
  );
}
