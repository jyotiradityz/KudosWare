import React from 'react';

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 relative w-full max-w-3xl">
                <button
                    className="absolute top-4 right-4 text-black text-xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
