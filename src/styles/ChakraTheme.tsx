import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const ChakraTheme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: true,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("#efefef", "#1a202c")(props),
      },
    }),
  },
});

export default ChakraTheme;
