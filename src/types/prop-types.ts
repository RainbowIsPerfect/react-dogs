import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ComponentProps, ReactNode, ReactElement } from 'react';
import { Prettify } from './utility-types';

type Children = ReactNode | ReactElement | ReactElement[] | keyof ReactNode;

type ReactSpecificAttributes = {
  defaultChecked?: boolean | undefined;
  defaultValue?: string | number | ReadonlyArray<string> | undefined;
  suppressContentEditableWarning?: boolean | undefined;
  suppressHydrationWarning?: boolean | undefined;
};

type ComponentWithoutChildren<T extends keyof JSX.IntrinsicElements> = Omit<
  ComponentProps<T>,
  'children' | keyof ReactSpecificAttributes
>;

export interface DefaultProps {
  className?: string;
}

export interface ComponentWithChildren<T extends Children = ReactNode> {
  children: T;
}

export type DefaultPropsWithChildren<T extends Children = ReactNode> = Prettify<
  ComponentWithChildren<T> & DefaultProps
>;

export type HTMLButtonProps = ComponentWithoutChildren<'button'>;
export type HTMLInputProps = ComponentWithoutChildren<'input'>;
export type HTMLSVGProps = ComponentWithoutChildren<'svg'>;
export type HTMLOptionProps = ComponentWithoutChildren<'option'>;
export type HTMLSelectProps = ComponentWithoutChildren<'select'>;
export type HTMLTextAreaProps = ComponentWithoutChildren<'textarea'>;

export type ErrorType = FetchBaseQueryError | SerializedError | undefined;
