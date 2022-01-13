import { forwardRef, PropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";

export interface LabeledTextFieldProps extends PropsWithoutRef<InputProps> {
  /** Field name. */
  name: string;
  /** Field label. */
  label: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number";
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>;
}

export const LabeledTextField = forwardRef<
  HTMLInputElement,
  LabeledTextFieldProps
>(({ label, outerProps, name, ...props }, ref) => {
  const {
    register,
    formState: { isSubmitting, errors }
  } = useFormContext();
  const error = Array.isArray(errors[name])
    ? errors[name].join(", ")
    : errors[name]?.message || errors[name];

  return (
    <div {...outerProps}>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input disabled={isSubmitting} {...register(name)} {...props} />
      </FormControl>

      {error && (
        <div role="alert" style={{ color: "red" }}>
          {error}
        </div>
      )}
    </div>
  );
});

export default LabeledTextField;
