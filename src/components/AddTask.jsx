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
        <Flex direction="column" p={5} gap={1}>
          <Field.Root invalid={!!errors.tituloDaTarefa}>
            <Field.Label>Título da tarefa</Field.Label>
            <Input
              {...register("tituloDaTarefa", { required: true })}
              color={"black"}
            />
            <Field.ErrorText>{errors.tituloDaTarefa?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.descricaoDaTarefa}>
            <Field.Label>Descrição da tarefa</Field.Label>
            <Input
              {...register("descricaoDaTarefa", { required: true })}
              color={"black"}
            />
            <Field.ErrorText>
              {errors.descricaoDaTarefa?.message}
            </Field.ErrorText>
          </Field.Root>

          <HStack spacing={4} align="end">
            <Field.Root invalid={!!errors.framework} flex="1">
              <Field.Label>Prioridade</Field.Label>
              <Controller
                control={control}
                name="prioridade"
                render={({ field }) => (
                  <Select.Root
                    name={field.name}
                    value={field.value ? [field.value] : []}
                    onValueChange={({ value }) => field.onChange(value[0])}
                    onInteractOutside={() => field.onBlur()}
                    collection={prioridades}
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
                        <Select.Content>
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
              <Field.ErrorText>{errors.framework?.message}</Field.ErrorText>
            </Field.Root>
            <Button type="submit" variant={"subtle"} mt={"26px"} flexShrink={0}>
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
    { label: "Pra ontem", value: "praOntem" },
    { label: "Quando der", value: "quandoDer" },
    { label: "Sem pressa", value: "semPressa" },
  ],
});
