import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../Container';
import { Input } from '../UI/Input';
import { MainLogo } from '../UI/Icons/MainLogo';
import { ProfileIcon } from '../UI/Icons/ProfileIcon';
import { LikeIcon } from '../UI/Icons/LikeIcon';
import { CartIcon } from '../UI/Icons/CartIcon';
import { ThemeIcon } from '../UI/Icons/ThemeIcon';
import { useTheme } from '../../hooks/useTheme';
import { LogOutIcon } from '../UI/Icons/LogOutIcon';
import { useAuth } from '../../hooks/useAuth';
import { useAppSelector } from '../../hooks/reduxHooks';
import { LogInIcon } from '../UI/Icons/LogInIcon';
import { SearchIcon } from '../UI/Icons/SearchIcon';
import s from './header.module.scss';
import { Button } from '../UI/Button';
import { SubMenu } from '../UI/SubMenu';

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useTheme();
  const [logInUser, result, logOutUser] = useAuth();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const themeButtons = [
    {
      title: 'OS Default',
      value: 'os-default',
      action: () => setTheme('os-default'),
    },
    { title: 'Dark', value: 'dark', action: () => setTheme('dark') },
    { title: 'Light', value: 'light', action: () => setTheme('light') },
  ];

  return (
    <header className={s.header}>
      <Container>
        <nav className={s.header__nav}>
          <Link className={s.header__link} to={isLoggedIn ? 'products' : '/'}>
            <MainLogo className={`${s.header__icon} ${s.header__logo}`} />
            <span className={s.header__title}>React Dogs</span>
          </Link>
          <ul className={s.header__list}>
            <li className={s.header__item}>
              <Button
                className={s.header__button}
                variant="icon"
                onClick={() => navigate('/me')}
              >
                <ProfileIcon className={s.header__icon} />
              </Button>
            </li>
            <li className={s.header__item}>
              <Button className={s.header__button} variant="icon">
                <LikeIcon className={s.header__icon} />
              </Button>
            </li>
            <li className={s.header__item}>
              <Button className={s.header__button} variant="icon">
                <CartIcon className={s.header__icon} />
              </Button>
            </li>
            <li className={s.header__item}>
              <Button
                className={s.header__button}
                variant="icon"
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setIsOpen(false)}
              >
                <ThemeIcon className={s.header__icon} />
              </Button>
              {isOpen && <SubMenu buttonContent={themeButtons} />}
            </li>
            <li className={s.header__item}>
              <Button
                className={s.header__button}
                variant="icon"
                onClick={() => (isLoggedIn ? logOutUser() : navigate('/'))}
              >
                {isLoggedIn ? (
                  <LogOutIcon className={s.header__icon} />
                ) : (
                  <LogInIcon className={s.header__icon} />
                )}
              </Button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
