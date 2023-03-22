import { useRef } from 'react';
import { ClearIcon } from '../Icons/ClearIcon';
import s from './input.module.scss';

export const Input = () => {
  const input = useRef<HTMLInputElement | null>(null);

  const clearInput = () => {
    if (input.current) {
      input.current.focus();
      input.current.value = '';
    }
  };

  return (
    <div className={s.container}>
      <input ref={input} className={s.input} placeholder="Search" />
      <button onClick={clearInput} className={s.button} type="button">
        <ClearIcon className={s.icon} />
      </button>
    </div>
  );
};
