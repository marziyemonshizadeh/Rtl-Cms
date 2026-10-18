import { useForm } from "react-hook-form";
import FormField from "@/components/@base/Form/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UserValues } from "./Models/UserModel";
import UserSchema from "./Validation/UserSchema";

interface AddUserProps {
  defaultValues: UserValues;
  onSubmit: (values: UserValues) => Promise<void>;
  onCancel: () => void;
  pending: boolean;
  error?: string | null;
}

export default function AddUser({ defaultValues, onSubmit, onCancel, pending, error }: AddUserProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserValues>({
    defaultValues: {
      customer: defaultValues.customer,
      userName: defaultValues.userName,
      password: defaultValues.password,
      phoneNumber: defaultValues.phoneNumber,
      email: defaultValues.email,
    },
  });
  const busy = pending || isSubmitting;

  return (
    <form noValidate className="min-h-64" aria-busy={busy} onSubmit={handleSubmit(async (values) => {
      try {
        await onSubmit(values);
      } catch {
        return;
      }
    })}>
      <fieldset disabled={busy} className="min-w-0 space-y-4">
        <FormField label="نام و نام خانوادگی" error={errors.customer?.message}>
          <Input required type="text" placeholder="نام و نام خانوادگی را وارد کنید" {...register("customer", UserSchema.customer)} />
        </FormField>
        <FormField label="نام کاربری" error={errors.userName?.message}>
          <Input required type="text" placeholder="نام کاربری را وارد کنید" {...register("userName", UserSchema.userName)} />
        </FormField>
        <FormField label="رمز عبور" error={errors.password?.message}>
          <Input required type="text" placeholder="رمز عبور را وارد کنید" {...register("password", UserSchema.password)} />
        </FormField>
        <FormField label="شماره تماس" error={errors.phoneNumber?.message}>
          <Input required type="text" placeholder="شماره تماس را وارد کنید" {...register("phoneNumber", UserSchema.phoneNumber)} />
        </FormField>
        <FormField label="ایمیل" error={errors.email?.message}>
          <Input required type="text" placeholder="ایمیل را وارد کنید" {...register("email", UserSchema.email)} />
        </FormField>
        <div className="flex flex-wrap justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>انصراف</Button>
          <Button type="submit">{busy ? "در حال ثبت..." : "ثبت اطلاعات جدید"}</Button>
        </div>
      </fieldset>
      {error && <p role="alert" className="mt-4 text-destructive">{error}</p>}
    </form>
  );
}
