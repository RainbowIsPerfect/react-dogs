import { Button } from '../Button';
import s from './submenu.module.scss';

interface Mock {
  title: string;
  value: string;
  action: () => void;
}

interface SubMenuProps {
  buttonContent: Mock[];
  activeButton: string;
}

export const SubMenu = ({ buttonContent, activeButton }: SubMenuProps) => {
  return (
    <ul className={s.submenu}>
      {buttonContent.map((content, i) => {
        return (
          <li key={i} className={s.submenu__item}>
            <Button
              variant="primary"
              className={`${
                content.value === activeButton ? s.submenu__button_active : ''
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
