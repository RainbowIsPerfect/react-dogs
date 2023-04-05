import { Card } from '../Card';
import { CardContainer } from '../CardContainer';
import { Container } from '../Container';
import s from './main.module.scss';

export const Main = () => {
  return (
    <main className={s.main}>
      <Container>
        <CardContainer />
      </Container>
    </main>
  );
};
