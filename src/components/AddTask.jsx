import {
  Box,
  Button,
  Field,
  HStack,
  Input,
  Select,
  Stack,
  Portal,
  createListCollection,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

export default function AddTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (data) => {
    /*Alterar para enviar os dados para o back.*/
    console.log(data);
  };

  return (
    <Box
      rounded="md"
      h={"full"}
      bgColor={"white"}
      overflow={"hidden"}
      shadow={"sm"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" p={4} gap={1}>
          <Field.Root invalid={!!errors.tituloDaTarefa}>
            <Field.Label>Título da tarefa</Field.Label>
            <Input
              {...register("tituloDaTarefa", { required: true })}
              color={"black"}
              required
            />
            <Field.ErrorText>{errors.tituloDaTarefa?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.descricaoDaTarefa}>
            <Field.Label>Descrição da tarefa</Field.Label>
            <Textarea
              {...register("descricaoDaTarefa", { required: true })}
              color={"black"}
              resize="none"
              required
            />
            <Field.ErrorText>
              {errors.descricaoDaTarefa?.message}
            </Field.ErrorText>
          </Field.Root>

          <HStack align="end">
            <Field.Root invalid={!!errors.prioridade} flex="1">
              <Field.Label>Prioridade</Field.Label>
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
                    required
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText
                          placeholder="Selecione"
                          color={"black"}
                        />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content
                          colorPalette={"red"}
                          bgColor={"white"}
                          color={"black"}
                        >
                          {prioridades.items.map((prioridade) => (
                            <Select.Item
                              item={prioridade}
                              key={prioridade.value}
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
            <Button type="submit" colorPalette={"teal"} flexShrink={0}>
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
    { label: "Pra ontem", value: 1 },
    { label: "Quando der", value: 2 },
    { label: "Sem pressa", value: 3 },
  ],
});
