import { useState } from 'react';
import { Container } from '../Container';
import { MainLogo } from '../../components/UI/Icons/MainLogo';
import { useTheme } from '../../hooks/useTheme';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Button } from '../../components/UI/FormElements/Button';
import { SubMenu } from '../../components/UI/SubMenu';
import { logOut } from '../../store/slices/userSlice';
import { Theme } from '../../store/slices/themeSlice';
import { TypedLink } from '../../components/TypedLinks/TypedLink';
import { TypedNavLink } from '../../components/TypedLinks/TypedNavLink';
import s from './header.module.scss';

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const productsAmount = useAppSelector((state) => state.cart.products.length);
  const [theme, setTheme] = useTheme();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const Mock = ['Profile', 'Cart', 'Favorites'];

  return (
    <header className={s.header}>
      <Container>
        <div className={s.header__navigation}>
          <nav className={s.header__nav}>
            <TypedLink
              variant="transparent"
              className={s.header__logo}
              to={isLoggedIn ? '/' : '/signin'}
            >
              <MainLogo className={s['header__logo-icon']} />
            </TypedLink>
            <ul className={s.header__list}>
              <li className={s.header__item}>
                <TypedNavLink className={s.header__link} to="/me">
                  Profile
                </TypedNavLink>
              </li>
              <li className={s.header__item}>
                <TypedNavLink className={s.header__link} to="/cart">
                  Cart
                </TypedNavLink>
              </li>
              <li className={s.header__item}>
                <TypedNavLink className={s.header__link} to="/favorite">
                  Favorites
                </TypedNavLink>
              </li>
            </ul>
          </nav>
          <ul className={s.header__list}>
            <li className={s.header__item}>
              <Button
                // className={s.header__button}
                variant="transparent"
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setIsOpen(false)}
              >
                {/* <ThemeIcon className={s.header__icon} /> */}
                Theme
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
                // className={s.header__button}
                variant="transparent"
                onClick={() => dispatch(logOut())}
              >
                {
                  isLoggedIn ? 'Log out' : 'Log in'
                  // <LogInIcon className={s.header__icon} />
                  // <LogOutIcon className={s.header__icon} />
                }
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
};
