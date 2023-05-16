import { Oval } from 'react-loader-spinner';
import s from './loader.module.scss';

export const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="var(--color-accent)"
      ariaLabel="oval-loading"
      secondaryColor="var(--color-accent)"
      wrapperClass={s.centered}
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
