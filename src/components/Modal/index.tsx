import { ReactNode } from 'react';
import cls from './styles.module.css';

interface ModalProps {
  onClose: () => void;
  children?: ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div
      className={cls.wrapper}
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className={cls.backdrop}></div>

      <div className={cls.fixedBg}>
        <div className={cls.contentWrapper}>
          <div className={cls.content}>
            <div className={cls.children}>
              <div className={cls.buttons}>{children}</div>
            </div>
            <div className={cls.bg}>
              <button type='button' className={cls.cancelBtn} onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
