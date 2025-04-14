import React from "react";
import "./Dialog.css";

const Dialog = ({ title, children, onClose }) => {
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2 className="dialog-title">{title}</h2>
          <button className="dialog-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="dialog-body">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
