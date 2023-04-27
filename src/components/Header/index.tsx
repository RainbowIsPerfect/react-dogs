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
import { TypedLink } from '../TypedLink';
import { Theme } from '../../store/slices/themeSlice';
import { getCartProductsTotal } from '../../store/slices/cartSlice';
import s from './header.module.scss';

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const productsAmount = useAppSelector((state) => getCartProductsTotal(state));
  const [theme, setTheme] = useTheme();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const navigate = useAppNavigate();

  return (
    <header className={s.header}>
      <Container>
        <nav className={s.header__nav}>
          <TypedLink
            component="NavLink"
            className={s.header__link}
            to={isLoggedIn ? '/' : '/signin'}
          >
            <MainLogo className={`${s.header__icon} ${s.header__logo}`} />
            <span className={s.header__title}>React Dogs</span>
          </TypedLink>
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
              <Button
                className={s.header__button}
                variant="icon"
                onClick={() => navigate('/cart')}
              >
                <span className={s.header__button_cart}>{productsAmount}</span>
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
                <SubMenu<Theme> activeButton={theme}>
                  {[
                    {
                      text: 'OS Default',
                      value: 'os-default',
                      onMouseDown: () => setTheme('os-default'),
                    },
                    {
                      text: 'Dark',
                      value: 'dark',
                      onMouseDown: () => setTheme('dark'),
                    },
                    {
                      text: 'Light',
                      value: 'light',
                      onMouseDown: () => setTheme('light'),
                    },
                  ]}
                </SubMenu>
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
