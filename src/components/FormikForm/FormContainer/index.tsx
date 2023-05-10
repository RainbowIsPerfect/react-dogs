import { ComponentWithChildren } from '../../../types/prop-types';
import s from './form-container.module.scss';

export const FormContainer = ({ children }: ComponentWithChildren) => {
  return <div className={s['form-container']}>{children}</div>;
};
