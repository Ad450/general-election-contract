import { Flex, Text, Button, HStack } from "@chakra-ui/react";
import { MouseEvent, useState } from "react";

export const Voting = () => {
  const [party, setParty] = useState("");
  const [error, setError] = useState("");

  // const vote = async (e: MouseEvent) => {
  //   try {
  //     setParty(e.currentTarget.innerHTML.toString());
  //     await voteForParty(party);
  //   } catch (error) {
  //     setError((error as Object).toString());
  //   }
  // };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" bg="gray.900" p={12} rounded={6}>
        <Text mb={4}> Vote for a party by clicking one of these </Text>
        <HStack>
          <Button size="sm">Party A</Button>
          <Button size="sm">Party B</Button>
          <Button size="sm">Party C</Button>
        </HStack>

        <Text>{error}</Text>
      </Flex>
    </Flex>
  );
};
