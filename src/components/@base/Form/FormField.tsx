import { cloneElement, useId, type InputHTMLAttributes, type ReactElement } from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactElement<InputHTMLAttributes<HTMLInputElement>>;
}

export default function FormField({ label, error, children }: FormFieldProps) {
  const generatedId = useId();
  const inputId = children.props.id ?? generatedId;
  const errorId = `${inputId}-error`;
  const describedBy = [children.props["aria-describedby"], error ? errorId : undefined]
    .filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex min-w-0 flex-col">
      <label htmlFor={inputId} className="text-start text-xs font-medium text-foreground">
        {label}
      </label>
      {cloneElement(children, {
        id: inputId,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {error && <p id={errorId} role="alert" className="text-start text-xs leading-6 text-destructive">{error}</p>}
    </div>
  );
}
