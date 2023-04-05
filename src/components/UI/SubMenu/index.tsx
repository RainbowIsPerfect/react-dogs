import { useState } from 'react';
import { Button } from '../Button';
import s from './submenu.module.scss';

interface Mock {
  title: string;
  value: string;
  action: () => void;
}

interface SubMenuProps {
  buttonContent: Mock[];
}

export const SubMenu = ({ buttonContent }: SubMenuProps) => {
  // const [active, setActive] = useState<T>(init);

  return (
    <ul className={s.submenu}>
      {buttonContent.map((content, i) => {
        return (
          <li key={i} className={s.submenu__item}>
            <Button
              variant="primary"
              className={`${
                content.value === 'os-default' ? s.submenu__button_active : ''
              } ${s.submenu__button}`}
              onMouseDown={content.action}
            >
              {content.title}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};
