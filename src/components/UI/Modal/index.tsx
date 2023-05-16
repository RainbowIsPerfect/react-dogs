import { Dispatch, ReactElement, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { ComponentWithChildren } from '../../../types/prop-types';
import s from './modal.module.scss';

interface ModalProps extends ComponentWithChildren<ReactElement> {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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
