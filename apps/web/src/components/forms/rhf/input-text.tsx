'use client';

import * as React from 'react';
import {
  type Control,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Props<T extends FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    control: Control<T>;
    label?: string;
    name: Path<T>;
    mandatory?: boolean;
    inputClassName?: string;
  };

export function InputText<T extends FieldValues>({
  control,
  label,
  name,
  placeholder,
  disabled,
  mandatory,
  inputClassName,
  ...props
}: Props<T>) {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<any>
  ) => {
    field.onChange(e.target.value);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {mandatory && <span className='text-red-600'>*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              placeholder={disabled ? undefined : placeholder || label}
              {...props}
              {...field}
              className={inputClassName}
              onChange={(e) => onChange(e, field)}
            />
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
