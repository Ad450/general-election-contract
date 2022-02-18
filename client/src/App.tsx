import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { VerifyVoter } from "./features/voter_verification/components/verify_voter";
import { Routes, Route } from "react-router-dom";
import { Voting } from "./features/vote/components/voting";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/" element={<VerifyVoter />} />
      <Route path="/voting" element={<Voting />} />
    </Routes>
  </ChakraProvider>
);
