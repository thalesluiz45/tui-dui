import { Box, Heading, Separator } from "@chakra-ui/react";

export default function Done() {
  return (
    <Box rounded="md" h={"full"} bgColor={"white"} shadow={"sm"} p={"3"}>
      <Heading size={"2xl"}>Concluídas</Heading>
      <Separator />
    </Box>
  );
}
