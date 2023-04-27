import {
  ReactNode,
  SelectHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  OptionHTMLAttributes,
} from 'react';
import { Routes } from '../../types';

interface Option extends OptionHTMLAttributes<HTMLOptionElement> {
  value: string;
  text: string;
}

type As = 'input' | 'textarea' | 'select';

type Attributes =
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
  | SelectHTMLAttributes<HTMLSelectElement>;

type BaseFieldProps<T extends As, U extends Attributes> = {
  as: T;
  name: string;
  labelText: string;
} & U;

type InputField = BaseFieldProps<
  'input',
  InputHTMLAttributes<HTMLInputElement>
> & { options?: never };

type TextareaField = BaseFieldProps<
  'textarea',
  TextareaHTMLAttributes<HTMLTextAreaElement>
> & { options?: never };

export type SelectField = BaseFieldProps<
  'select',
  SelectHTMLAttributes<HTMLSelectElement>
> & { options: Option[] };

export type FormInput = InputField | TextareaField | SelectField;

export interface RedirectLink {
  linkText: string;
  linkPath: Routes;
}

export interface FormProps {
  formHeading: string;
  submitButton?: ReactNode;
}
