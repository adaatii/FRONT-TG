import React, { useState, useEffect } from 'react';
import style from './modal.module.scss';

interface IModal {
 open: boolean;
 onClose: () => void;
 setOpen: React.Dispatch<React.SetStateAction<boolean>>;
 children: React.ReactNode;
}

function Modal({ open, onClose, setOpen, children }: IModal) {
 const [show, setShow] = useState(open);

 useEffect(() => {
    setShow(open);
 }, [open]);

 const handleClose = () => {
    setShow(false);
    setOpen(false);
    onClose();
 };

 return (
    <div className={show ? style.modal : style.modalHidden}>
      <div className={style.modalContent}>
        <span className={style.close} onClick={handleClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
 );
}

export default Modal;