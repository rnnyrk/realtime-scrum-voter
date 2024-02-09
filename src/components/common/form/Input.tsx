import { forwardRef } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

import { cn } from 'utils';

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './Form';

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full rounded-md border border-gray-800 bg-gray-700 px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {};

Input.displayName = 'Input';

function InputForm<T extends FieldValues, K extends Path<T> = any>({
  description,
  className,
  label,
  field,
  placeholder,
}: InputFormProps<T, K>) {
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          placeholder={placeholder}
          {...field}
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

InputForm.displayName = 'InputForm';

type InputFormProps<T extends FieldValues, K extends Path<T>> = {
  description?: string;
  className?: string;
  label: string;
  placeholder?: string;
  field: ControllerRenderProps<T, K>;
};

export { Input, InputForm };
