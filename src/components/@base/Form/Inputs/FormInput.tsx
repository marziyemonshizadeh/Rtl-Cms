import type { InputHTMLAttributes } from "react";
import { useFormContext, type FieldValues, type Path, type RegisterOptions } from "react-hook-form";
import FormField from "@/components/@base/Form/FormField";
import { Input } from "@/components/ui/input";

interface FormInputProps<TValues extends FieldValues, TName extends Path<TValues>>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: TName;
  label: string;
  rules?: RegisterOptions<TValues, TName>;
}

export default function FormInput<TValues extends FieldValues, TName extends Path<TValues>>({
  name,
  label,
  rules,
  ...props
}: FormInputProps<TValues, TName>) {
  const { register, getFieldState, formState } = useFormContext<TValues>();
  const { error } = getFieldState(name, formState);

  return (
    <FormField label={label} error={error?.message}>
      <Input {...props} {...register(name, rules)} />
    </FormField>
  );
}
