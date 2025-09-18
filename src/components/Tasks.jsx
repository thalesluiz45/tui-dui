import { Box, Separator, Heading } from "@chakra-ui/react";

export default function Tasks() {
  return (
    <Box rounded="md" h={"full"} bgColor={"white"} shadow={"sm"} p={"3"}>
      <Heading size={"2xl"}>Tarefas</Heading>
      <Separator />
    </Box>
  );
}
