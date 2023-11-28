import { useState } from 'react';

type alertTypes = {
  message: string;
  type?: string;
  onClose: () => void;
};
const Alert = ({ message, type, onClose }: alertTypes) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };
  return (
    <>
      {visible && (
        <>
          <div className='fixed inset-0 bg-cover backdrop-blur-[2px] '></div>
          <div
            className={`fixCenter p-8 mb-4 rounded text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} `}
            role='alert'
          >
            <p className='text-2xl'>{message}</p>

            <button className='btn float-right' onClick={handleClose}>
              Cerrar
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Alert;
