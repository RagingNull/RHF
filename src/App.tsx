import React, { useEffect } from "react";
import {
  useForm,
  useWatch,
  useFieldArray,
  Control,
  UseFormRegister,
} from "react-hook-form";
import "./styles.css";

type FormValues = {
  data: { name: string }[];
};

const ConditionField = ({
  control,
  index,
  register,
}: {
  control: Control<FormValues>;
  index: number;
  register: UseFormRegister<FormValues>;
}) => {
  const output = useWatch({
    name: "data",
    control,
  });

  return (
    <>
      {output[index]?.name === "bill" && (
        <input {...register(`data.${index}.easyConditional` as const)} />
      )}
    </>
  );
};

export default () => {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      data: [{ name: "test" }],
    },
    shouldUnregister: true,
    mode: "onSubmit",
  });
  const { fields, append } = useFieldArray({
    control,
  });

  useEffect(() => {
    append({ name: "bill" });
  }, []);

  return (
    <form onSubmit={handleSubmit((data) => console.log(JSON.stringify(data)))}>
      {fields.map((data, index) => (
        <>
          <input {...register(`data.${index}.name`)} />
          <ConditionField register={register} control={control} index={index} />
        </>
      ))}
      <input type="submit" />
    </form>
  );
};
