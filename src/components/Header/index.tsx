import { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useTheme();

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
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setIsOpen(false)}
                className={s.header__button}
                type="button"
              >
                <ThemeIcon className={s.header__icon} />
              </button>
              {isOpen && (
                <ul className={s.modal}>
                  <li className={s.modal__item}>
                    <button
                      className={`${
                        theme === 'os-default' ? s.modal__button_active : ''
                      } ${s.modal__button}`}
                      onMouseDown={() => setTheme('os-default')}
                      type="button"
                    >
                      OS Default
                    </button>
                  </li>
                  <li className={s.modal__item}>
                    <button
                      className={`${
                        theme === 'dark' ? s.modal__button_active : ''
                      } ${s.modal__button}`}
                      onMouseDown={() => setTheme('dark')}
                      type="button"
                    >
                      Dark
                    </button>
                  </li>
                  <li className={s.modal__item}>
                    <button
                      className={`${
                        theme === 'light' ? s.modal__button_active : ''
                      } ${s.modal__button}`}
                      onMouseDown={() => setTheme('light')}
                      type="button"
                    >
                      Light
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
