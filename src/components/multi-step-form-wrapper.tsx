import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { FormProvider, type FieldValues, type Path, type SubmitHandler, type UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FormStep<TValues extends FieldValues> {
  title: string;
  fields: Path<TValues>[];
}

interface MultiStepFormState {
  currentStep: number;
  titles: string[];
  busy: boolean;
  previousStep: () => void;
}

const MultiStepFormContext = createContext<MultiStepFormState | null>(null);

function useMultiStepForm() {
  const context = useContext(MultiStepFormContext);
  if (!context) throw new Error("Form steps must be inside MultiStepFormWrapper.");
  return context;
}

interface MultiStepFormWrapperProps<TValues extends FieldValues> {
  form: UseFormReturn<TValues>;
  steps: FormStep<TValues>[];
  onComplete: SubmitHandler<TValues>;
  disabled?: boolean;
  children: ReactNode;
}

export function MultiStepFormWrapper<TValues extends FieldValues>({
  form,
  steps,
  onComplete,
  disabled = false,
  children,
}: MultiStepFormWrapperProps<TValues>) {
  const [currentStep, setCurrentStep] = useState(0);
  const [validating, setValidating] = useState(false);
  const [focusTarget, setFocusTarget] = useState<Path<TValues> | null>(null);
  const submitting = useRef(false);
  const busy = disabled || validating || form.formState.isSubmitting;
  const { getFieldState, setFocus } = form;

  useEffect(() => {
    if (focusTarget && !busy) {
      setFocus(focusTarget);
      setFocusTarget(null);
    }
  }, [focusTarget, busy, setFocus]);

  const submit = async () => {
    if (busy || submitting.current) return;
    submitting.current = true;
    setValidating(true);
    try {
      if (currentStep < steps.length - 1) {
        if (await form.trigger(steps[currentStep].fields, { shouldFocus: true })) {
          setCurrentStep(currentStep + 1);
          setFocusTarget(steps[currentStep + 1].fields[0]);
        } else {
          setFocusTarget(steps[currentStep].fields.find((name) => getFieldState(name).invalid) ?? null);
        }
        return;
      }

      await form.handleSubmit(onComplete, () => {
        const invalidStep = steps.findIndex((step) => step.fields.some((name) => getFieldState(name).invalid));
        if (invalidStep >= 0) {
          setCurrentStep(invalidStep);
          setFocusTarget(steps[invalidStep].fields.find((name) => getFieldState(name).invalid) ?? null);
        }
      })();
    } finally {
      submitting.current = false;
      setValidating(false);
    }
  };

  return (
    <FormProvider {...form}>
      <MultiStepFormContext.Provider value={{
        currentStep,
        titles: steps.map((step) => step.title),
        busy,
        previousStep: () => {
          const step = Math.max(0, currentStep - 1);
          setCurrentStep(step);
          setFocusTarget(steps[step].fields[0]);
        },
      }}>
        <form noValidate aria-busy={busy} onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}>
          <fieldset disabled={busy} className="flex min-w-0 flex-col gap-5">
            {children}
          </fieldset>
        </form>
      </MultiStepFormContext.Provider>
    </FormProvider>
  );
}

export function MultiStepFormContent({ children }: { children: ReactNode }) {
  const { currentStep, titles } = useMultiStepForm();

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <ol aria-label="مراحل فرم" className="flex flex-wrap gap-3">
        {titles.map((title, index) => (
          <li
            key={title}
            aria-current={currentStep === index ? "step" : undefined}
            className={cn(
              "flex flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-sm",
              currentStep === index ? "border-primary bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <span aria-hidden="true">{(index + 1).toLocaleString("fa-IR")}</span>
            <span>{title}</span>
          </li>
        ))}
      </ol>
      <p role="status" className="sr-only">
        مرحله {(currentStep + 1).toLocaleString("fa-IR")} از {titles.length.toLocaleString("fa-IR")}: {titles[currentStep]}
      </p>
      {children}
    </div>
  );
}

export function Step({ index, children }: { index: number; children: ReactNode }) {
  const { currentStep, titles } = useMultiStepForm();

  return (
    <section hidden={currentStep !== index} aria-label={titles[index]}>
      {children}
    </section>
  );
}

interface MultiStepFormNavigationProps {
  onCancel: () => void;
  completeButtonText?: string;
}

export function MultiStepFormNavigation({
  onCancel,
  completeButtonText = "ثبت",
}: MultiStepFormNavigationProps) {
  const { currentStep, titles, busy, previousStep } = useMultiStepForm();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
      <Button type="button" variant="outline" onClick={onCancel}>انصراف</Button>
      <div className="flex flex-wrap gap-3">
        {currentStep > 0 && (
          <Button type="button" variant="outline" onClick={previousStep}>قبلی</Button>
        )}
        <Button type="submit">
          {busy ? "در حال بررسی و ثبت..." : currentStep === titles.length - 1 ? completeButtonText : "بعدی"}
        </Button>
      </div>
    </div>
  );
}
