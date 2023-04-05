/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import s from './modal.module.scss';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (...args: any[]) => any;
}

const modalRoot = document.getElementById('modal') as HTMLDivElement;

export const Modal = ({ children, isOpen, setIsOpen }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={s.modal} onMouseDown={() => setIsOpen(false)}>
      <div className={s.modal__container}>
        <div
          className={s.modal__content}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
};
