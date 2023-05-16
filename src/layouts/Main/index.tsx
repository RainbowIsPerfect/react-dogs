import { ReactNode } from 'react';
import { Container } from '../Container';
import s from './main.module.scss';

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main className={s.main}>
      <Container>{children}</Container>
    </main>
  );
};
