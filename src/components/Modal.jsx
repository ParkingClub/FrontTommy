import React from 'react';
import './DataDisplay.css'; // Reutilizar estilos generales

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="crud-modal-overlay" onClick={onClose}>
      <div className="crud-modal-content" onClick={(e) => e.stopPropagation()}>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
