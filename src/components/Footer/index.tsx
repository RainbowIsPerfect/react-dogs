import s from './footer.module.scss';

export const Footer = () => {
  return <footer className={s.footer}>{new Date().getFullYear()}</footer>;
};
