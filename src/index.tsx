import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import ChakraTheme from "./styles/ChakraTheme";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={ChakraTheme}>
      <AuthProvider>
        <BrowserRouter>
          <ColorModeScript initialColorMode={ChakraTheme.config.initialColorMode} />
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
