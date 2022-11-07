import { useColorMode, useMediaQuery } from "@chakra-ui/react";

const useCurTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [is800pxBigger] = useMediaQuery("(min-width: 800px)");

  const isDarkMode = colorMode === "dark";

  return { isDarkMode, changeTheme: toggleColorMode, is800pxBigger };
};

export default useCurTheme;
