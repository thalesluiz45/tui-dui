import {
  Box,
  Separator,
  Heading,
  Collapsible,
  ScrollArea,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Tasks({ atualizar }) {
  const [dados, setDados] = useState([]);

  const fetchDados = () => {
    fetch("http://localhost:8080/api/form")
      .then((res) => res.json())
      .then((data) => setDados(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchDados();
  }, [atualizar]);

  return (
    <Box
      rounded="md"
      h={"full"}
      bgColor={"white"}
      shadow={"0px 2px 6px gray"}
      p={"3"}
    >
      <Heading size={"2xl"} fontFamily={"Sen"}>
        Tarefas
      </Heading>
      <Separator />

      <ScrollArea.Root h={"62vh"} size={"sm"}>
        <ScrollArea.Viewport>
          <ScrollArea.Content spaceY="4" textStyle="sm">
            {dados.map((item) => (
              <Box key={item.id}>
                <Collapsible.Root
                  unmountOnExit
                  rounded={"xl"}
                  shadow={"xs"}
                  mt={2}
                  mr={3}
                  border={"1px solid #EF7575"}
                >
                  <Collapsible.Trigger
                    paddingY="3"
                    cursor={"pointer"}
                    width={"full"}
                    pl={4}
                    textAlign={"start"}
                  >
                    <strong>{item.tituloDaTarefa}</strong>
                  </Collapsible.Trigger>
                  <Collapsible.Content minW={"10rem"}>
                    <Separator m={1} />
                    <Box
                      padding="4"
                      borderWidth="1px"
                      color={"black"}
                      border={"none"}
                    >
                      <p>{item.descricaoDaTarefa}</p>
                    </Box>
                  </Collapsible.Content>
                </Collapsible.Root>
              </Box>
            ))}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar bg="teal.900">
          <ScrollArea.Thumb bg="teal.600" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </Box>
  );
}
