import React from 'react';

function Modal({ children, onClose }) {
    return (
        <div onClick={onClose} style={fullScreenModalStyle}>
            <div style={contentStyle}>
                {children}
            </div>
        </div>
    );
}

const fullScreenModalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
};

const contentStyle = {
    maxWidth: '90%',  // Max width as a percentage of the viewport width
    maxHeight: '90%', // Max height as a percentage of the viewport height
    overflow: 'auto', // Adds scrollbars if content is larger than the modal
    margin: 'auto'
};

export default Modal;
