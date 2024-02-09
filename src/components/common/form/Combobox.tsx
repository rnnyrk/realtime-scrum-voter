'use client';

import { useState } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

import { cn } from 'utils';
import CheckSvg from 'vectors/check.svg';
import ChevronsUpDownSvg from 'vectors/chevronupdown.svg';
import { Button } from 'common/interaction/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from 'common/interaction/Command';
import { Popover, PopoverContent, PopoverTrigger } from 'common/interaction/Popover';

import { FormDescription, FormItem, FormLabel, FormMessage } from './Form';

function Combobox({ enableSearch = false, options, value, setValue }: ComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-12 justify-between font-normal"
        >
          {value ? options.find((options) => options.value === value)?.label : 'Maak een keuze...'}
          <ChevronsUpDownSvg className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          {enableSearch && <CommandInput placeholder="Doorzoek opties..." />}
          <CommandEmpty>Geen opties gevonden.</CommandEmpty>
          <CommandGroup>
            {options.map((options) => (
              <CommandItem
                key={options.value}
                value={options.value}
                className={cn({
                  'text-primary': value === options.value,
                })}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? undefined : currentValue);
                  setOpen(false);
                }}
              >
                <CheckSvg
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === options.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {options.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type ComboboxProps = {
  options: { value: string; label: string }[];
  enableSearch?: boolean;
  value?: string;
  setValue: (value: string | undefined) => void;
};

function ComboboxForm<T extends FieldValues, K extends Path<T> = any>({
  className,
  description,
  enableSearch,
  label,
  field,
  options,
}: ComboboxFormProps<T, K>) {
  return (
    <FormItem className={cn('flex flex-col', className)}>
      {label && <FormLabel>{label}</FormLabel>}
      <Combobox
        enableSearch={enableSearch}
        options={options}
        value={field.value}
        setValue={field.onChange}
      />
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

type ComboboxFormProps<T extends FieldValues, K extends Path<T>> = Pick<
  ComboboxProps,
  'options' | 'enableSearch'
> & {
  className?: string;
  description?: string;
  label?: string;
  field: ControllerRenderProps<T, K>;
};

export { ComboboxForm, Combobox };
