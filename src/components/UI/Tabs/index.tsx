import { ReactNode, useState } from 'react';
import { Button } from '../Button';
import s from './tabs.module.scss';

interface TabChild {
  title: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabChild[];
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <div className={s.tabs__buttons}>
        {tabs.map((tab, i) => {
          return (
            <Button
              key={i}
              className={`${s.tabs__button} ${
                activeTab === i ? s.tabs__button_active : ''
              }`}
              onClick={() => setActiveTab(i)}
            >
              {tab.title}
            </Button>
          );
        })}
      </div>
      <div>
        {tabs.map((tab, i) => {
          return activeTab === i ? <div key={i}>{tab.content}</div> : null;
        })}
      </div>
    </>
  );
};
