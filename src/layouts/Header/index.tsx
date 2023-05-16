import { useState } from 'react';
import { Container } from '../Container';
import { MainLogo } from '../../components/UI/Icons/MainLogo';
import { useTheme } from '../../hooks/useTheme';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Button } from '../../components/UI/FormElements/Button';
import { SubMenu, SubMenuItemProps } from '../../components/UI/SubMenu';
import { logOut } from '../../store/slices/userSlice';
import { TypedLink } from '../../components/TypedLinks/TypedLink';
import { TypedNavLink } from '../../components/TypedLinks/TypedNavLink';
import { RoutesWithoutParams } from '../../types';
import s from './header.module.scss';

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useTheme();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const navLinksMock: { children: string; to: RoutesWithoutParams }[] = [
    { children: 'Profile', to: '/me' },
    { children: 'Cart', to: '/cart' },
    { children: 'Favorites', to: '/favorite' },
  ];
  const subMenuItemsMock: SubMenuItemProps[] = [
    {
      children: 'OS Default',
      value: 'os-default',
      onMouseDown: () => setTheme('os-default'),
    },
    {
      children: 'Dark',
      value: 'dark',
      onMouseDown: () => setTheme('dark'),
    },
    {
      children: 'Light',
      value: 'light',
      onMouseDown: () => setTheme('light'),
    },
  ];

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
              {navLinksMock.map(({ children, to }, i) => (
                <li key={i} className={s.header__item}>
                  <TypedNavLink className={s.header__link} to={to}>
                    {children}
                  </TypedNavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ul className={s.header__list}>
            <li className={s.header__item}>
              <Button
                variant="transparent"
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setIsOpen(false)}
              >
                Theme
              </Button>
              {isOpen && (
                <SubMenu activeButton={theme}>
                  {subMenuItemsMock.map(({ children, value, onMouseDown }) => (
                    <SubMenu.Item
                      key={value}
                      value={value}
                      onMouseDown={onMouseDown}
                    >
                      {children}
                    </SubMenu.Item>
                  ))}
                </SubMenu>
              )}
            </li>
            <li className={s.header__item}>
              <Button variant="transparent" onClick={() => dispatch(logOut())}>
                {isLoggedIn ? 'Log out' : 'Log in'}
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
};
