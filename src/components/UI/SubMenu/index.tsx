import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  ComponentWithChildren,
  HTMLButtonProps,
} from '../../../types/prop-types';
import { Button } from '../FormElements/Button';
import s from './submenu.module.scss';

export interface SubMenuItemProps
  extends HTMLButtonProps,
    ComponentWithChildren {
  value: string;
  onMouseDown: () => void;
}

interface SubMenuProps extends ComponentWithChildren {
  activeButton: string;
}

const SubMenuContext = createContext<{
  activeOption: string;
  setActiveOption: Dispatch<SetStateAction<string>>;
} | null>(null);

const useSubMenuContext = () => {
  const context = useContext(SubMenuContext);

  if (!context) {
    throw new Error(`Can't be used outside SubMenu`);
  }
  return context;
};

export const SubMenu = ({ children, activeButton }: SubMenuProps) => {
  const [activeOption, setActiveOption] = useState<string>(activeButton);

  const memoizedContext = useMemo(
    () => ({ setActiveOption, activeOption }),
    [activeOption]
  );

  return (
    <SubMenuContext.Provider value={memoizedContext}>
      <ul className={s.submenu}>{children}</ul>
    </SubMenuContext.Provider>
  );
};

const Item = ({ children, value, onMouseDown, ...props }: SubMenuItemProps) => {
  const { activeOption, setActiveOption } = useSubMenuContext();

  return (
    <li className={s.submenu__item}>
      <Button
        variant="primary"
        className={`${value === activeOption ? s.submenu__button_active : ''} ${
          s.submenu__button
        }`}
        onMouseDown={() => {
          setActiveOption(value);
          onMouseDown();
        }}
        {...props}
      >
        {children}
      </Button>
    </li>
  );
};

SubMenu.Item = Item;
