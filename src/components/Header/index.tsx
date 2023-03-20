import { Container } from '../Container';
import { Input } from '../UI/Input';
import { MainLogo } from '../UI/Icons/MainLogo';
import { ProfileIcon } from '../UI/Icons/ProfileIcon';
import { LikeIcon } from '../UI/Icons/LikeIcon';
import { CartIcon } from '../UI/Icons/CartIcon';
import { ThemeIcon } from '../UI/Icons/ThemeIcon';
import { useTheme } from '../../hooks/useTheme';
import s from './header.module.scss';

export const Header = () => {
  const [, setScheme] = useTheme();

  return (
    <header className={s.header}>
      <Container>
        <nav className={s.header__nav}>
          <a className={s.header__link} href="/">
            <MainLogo className={`${s.header__icon} ${s.header__logo}`} />
            <span className={s.header__title}>React Dogs</span>
          </a>
          <Input />
          <ul className={s.header__list}>
            <li className={s.header__item}>
              <button className={s.header__button} type="button">
                <ProfileIcon className={s.header__icon} />
              </button>
            </li>
            <li className={s.header__item}>
              <button className={s.header__button} type="button">
                <LikeIcon className={s.header__icon} />
              </button>
            </li>
            <li className={s.header__item}>
              <button className={s.header__button} type="button">
                <CartIcon className={s.header__icon} />
              </button>
            </li>
            <li className={s.header__item}>
              <button
                onClick={() => setScheme()}
                className={s.header__button}
                type="button"
              >
                <ThemeIcon className={s.header__icon} />
              </button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
