import { Box, Grid, Image, GridItem } from "@chakra-ui/react";
import AddTask from "./components/AddTask";
import Done from "./components/Done";
import Tasks from "./components/tasks";

export default function App() {
  return (
    <Box
      color={"#686868"}
      bgColor={"#eef4f3"}
      w={"full"}
      h={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Image src="src/assets/tuiduibg.svg" w="12vw" mt="5" />
      <Grid
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gapX={"2rem"}
        gapY={"1rem"}
        mt="20px"
        h="70vh"
        minW={"80vw"}
      >
        <GridItem rowSpan={2} h={"16rem"}>
          <AddTask />
        </GridItem>
        <GridItem rowSpan={4}>
          <Tasks />
        </GridItem>
        <GridItem rowSpan={2}>
          <Done />
        </GridItem>
      </Grid>
    </Box>
  );
}
