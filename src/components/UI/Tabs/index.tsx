import { ReactElement, useState } from 'react';
import s from './tabs.module.scss';

interface TabChild {
  title: string;
  content: ReactElement;
}

interface TabsProps {
  tabs: TabChild[];
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div>
      <div className={s.tabs__buttons}>
        {tabs.map((tab, i) => {
          return (
            <button
              className={`${s.tabs__button} ${
                activeTab === i ? s.tabs__button_active : ''
              }`}
              key={i}
              onClick={() => setActiveTab(i)}
              type="button"
            >
              {tab.title}
            </button>
          );
        })}
      </div>
      <div>
        {tabs.map((tab, i) => {
          return activeTab === i ? <div key={i}>{tab.content}</div> : null;
        })}
      </div>
    </div>
  );
};
