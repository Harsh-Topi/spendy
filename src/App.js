import React from "react";
import "./App.css";
import InfoGrab from "./components/InfoGrab";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <InfoGrab />
    </ChakraProvider>
  );
}

export default App;
