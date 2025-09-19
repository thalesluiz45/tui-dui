import {
  Box,
  Button,
  Field,
  HStack,
  Input,
  Select,
  Portal,
  createListCollection,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

export default function AddTask({ onAdd }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:8080/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      if (onAdd) onAdd();
    } else {
      alert("Erro ao cadastrar tarefa");
    }
    console.log(data);
  };

  return (
    <Box
      rounded="md"
      h={"full"}
      bgColor={"white"}
      overflow={"hidden"}
      shadow={"0px 2px 6px gray"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" p={4} gap={1}>
          <Field.Root invalid={!!errors.tituloDaTarefa}>
            <Field.Label fontSize={"md"}>Título da tarefa</Field.Label>
            <Input
              {...register("tituloDaTarefa", { required: true })}
              color={"black"}
              border={"1px solid gray"}
              rounded={"xl"}
              required
            />
            <Field.ErrorText>{errors.tituloDaTarefa?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.descricaoDaTarefa}>
            <Field.Label fontSize={"md"}>Descrição da tarefa</Field.Label>
            <Textarea
              {...register("descricaoDaTarefa", { required: true })}
              color={"black"}
              resize="none"
              border={"1px solid gray"}
              rounded={"xl"}
              required
            />
            <Field.ErrorText>
              {errors.descricaoDaTarefa?.message}
            </Field.ErrorText>
          </Field.Root>

          <HStack align="end" gapX={5}>
            <Field.Root invalid={!!errors.prioridade} flex="1">
              <Field.Label fontSize={"md"}>Prioridade</Field.Label>
              <Controller
                control={control}
                name="prioridade"
                render={({ field }) => (
                  <Select.Root
                    {...register("prioridade", { required: true })}
                    color={"black"}
                    name={field.name}
                    value={field.value ? [field.value] : []}
                    onValueChange={({ value }) => field.onChange(value[0])}
                    onInteractOutside={() => field.onBlur()}
                    collection={prioridades}
                    highlightedValue
                    required
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger
                        border={"1px solid gray"}
                        rounded={"xl"}
                        cursor={"pointer"}
                      >
                        <Select.ValueText
                          placeholder="Selecione"
                          color={"gray"}
                        />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content
                          rounded={"xl"}
                          bgColor={"white"}
                          color={"black"}
                        >
                          {prioridades.items.map((prioridade) => (
                            <Select.Item
                              item={prioridade}
                              key={parseInt(prioridade.value)}
                              _hover={{ bg: "#609398" }}
                              rounded={"md"}
                            >
                              {prioridade.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                )}
              />
              <Field.ErrorText>{errors.prioridades?.message}</Field.ErrorText>
            </Field.Root>
            <Button
              type="submit"
              rounded={"xl"}
              bgColor={"#609398"}
              color={"white"}
              flexShrink={0}
              w={"10vw"}
              fontSize={"lg"}
            >
              Adicionar
            </Button>
          </HStack>
        </Flex>
      </form>
    </Box>
  );
}
const prioridades = createListCollection({
  items: [
    { label: "🔴 Pra ontem", value: "1" },
    { label: "🟡 Quando der", value: "2" },
    { label: "🟢 Sem pressa", value: "3" },
  ],
});
