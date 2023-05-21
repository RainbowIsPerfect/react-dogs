import { ComponentWithChildren } from '../../types/prop-types';
import s from './container.module.scss';

export const Container = ({ children }: ComponentWithChildren) => {
  return <div className={s.container}>{children}</div>;
};
