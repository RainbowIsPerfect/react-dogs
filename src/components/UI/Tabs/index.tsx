import {
  createContext,
  Dispatch,
  ReactElement,
  ReactFragment,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  ComponentWithChildren,
  DefaultPropsWithChildren,
} from '../../../types/prop-types';
import { Button } from '../FormElements/Button';
import s from './tabs.module.scss';

interface Context {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

interface TabsProps extends DefaultPropsWithChildren {
  initial: string;
}

interface TabElementProps<T extends ReactNode | ReactElement = ReactNode>
  extends ComponentWithChildren<T> {
  label: string;
}

const TabContext = createContext<Context | null>(null);

const useTabs = () => {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error(`Component can't be used outside Tabs`);
  }

  return context;
};

export const Tabs = ({ children, initial }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(initial);

  const memoizedContext = useMemo(
    () => ({
      activeTab,
      setActiveTab,
    }),
    [activeTab, setActiveTab]
  );

  return (
    <TabContext.Provider value={memoizedContext}>
      <div>{children}</div>
    </TabContext.Provider>
  );
};

const Switcher = ({ children, label }: TabElementProps) => {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <Button
      className={`${s.tabs__button} ${
        activeTab === label ? s.tabs__button_active : ''
      }`}
      onClick={() => setActiveTab(label)}
    >
      {children}
    </Button>
  );
};

const TabSwitchers = ({ children }: ComponentWithChildren) => {
  return <div className={s.tabs__buttons}>{children}</div>;
};

const Content = ({ children, label }: TabElementProps<ReactElement>) => {
  const { activeTab } = useTabs();
  return activeTab === label ? children : null;
};

Tabs.Switcher = Switcher;
Tabs.TabSwitchers = TabSwitchers;
Tabs.TabContent = Content;

/* 
  @ deprecated
*/

// interface TabChild {
//   title: string;
//   content: ReactNode;
// }

// interface TabsProps {
//   tabs: TabChild[];
// }

// export const Tabs = ({ tabs }: TabsProps) => {
//   const [activeTab, setActiveTab] = useState<number>(0);

//   return (
//     <>
//       <div className={s.tabs__buttons}>
//         {tabs.map((tab, i) => {
//           return (
//             <Button
//               key={i}
//               className={`${s.tabs__button} ${
//                 activeTab === i ? s.tabs__button_active : ''
//               }`}
//               onClick={() => setActiveTab(i)}
//             >
//               {tab.title}
//             </Button>
//           );
//         })}
//       </div>
//       <div>
//         {tabs.map((tab, i) => {
//           return activeTab === i ? <div key={i}>{tab.content}</div> : null;
//         })}
//       </div>
//     </>
//   );
// };
