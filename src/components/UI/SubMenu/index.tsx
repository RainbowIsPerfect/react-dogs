import { ButtonHTMLAttributes } from 'react';
import { Button } from '../FormElements/Button';
import s from './submenu.module.scss';

interface ButtonProps<T extends string = string>
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  value: T;
}

interface SubMenuProps<T extends string = string> {
  children: ButtonProps<T>[];
  activeButton: string;
}

export const SubMenu = <T extends string = string>({
  children,
  activeButton,
}: SubMenuProps<T>) => {
  return (
    <ul className={s.submenu}>
      {children.map(({ text, value, ...buttonProps }, i) => {
        return (
          <li key={i} className={s.submenu__item}>
            <Button
              variant="primary"
              className={`${
                value === activeButton ? s.submenu__button_active : ''
              } ${s.submenu__button}`}
              {...buttonProps}
            >
              {text}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};
