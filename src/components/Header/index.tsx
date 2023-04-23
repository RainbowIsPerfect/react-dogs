import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../Container';
import { MainLogo } from '../UI/Icons/MainLogo';
import { ProfileIcon } from '../UI/Icons/ProfileIcon';
import { CartIcon } from '../UI/Icons/CartIcon';
import { ThemeIcon } from '../UI/Icons/ThemeIcon';
import { useTheme } from '../../hooks/useTheme';
import { LogOutIcon } from '../UI/Icons/LogOutIcon';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { LogInIcon } from '../UI/Icons/LogInIcon';
import { Button } from '../UI/Button';
import { SubMenu } from '../UI/SubMenu';
import { logOut } from '../../store/slices/userSlice';
import { useAppNavigate } from '../../hooks/useAppNavigate';
import s from './header.module.scss';
import { getPath } from '../../utils/getPath';
import { TypedLink } from '../TypedLink';

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useTheme();
  const dispatch = useAppDispatch();
  const { isLoggedIn, userData } = useAppSelector((state) => state.user);
  const navigate = useAppNavigate();

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
          <TypedLink
            className={s.header__link}
            to={isLoggedIn ? '/' : '/signin'}
          >
            <MainLogo className={`${s.header__icon} ${s.header__logo}`} />
            <span className={s.header__title}>React Dogs</span>
          </TypedLink>
          <ul className={s.header__list}>
            <li className={s.header__item}>
              {/* <NavLink to={Routes.UserProfile}>Profile</NavLink> */}
              <Button
                className={s.header__button}
                variant="icon"
                onClick={() => navigate('/me')}
              >
                <ProfileIcon className={s.header__icon} />
              </Button>
            </li>
            <li className={s.header__item}>
              {/* <NavLink to={Routes.Cart}>Cart</NavLink> */}
              <Button
                className={s.header__button}
                variant="icon"
                onClick={() => navigate('/cart')}
              >
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
              {isOpen && (
                <SubMenu buttonContent={themeButtons} activeButton={theme} />
              )}
            </li>
            <li className={s.header__item}>
              <Button
                className={s.header__button}
                variant="icon"
                onClick={() => dispatch(logOut())}
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
