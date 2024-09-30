// src/components/VaultHandle.jsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const VaultHandle = ({ onUnlock }) => {
  const handleRef = useRef(null);

  useEffect(() => {
    gsap.set(handleRef.current, { rotation: 0 });
  }, []);

  return (
    <div
      ref={handleRef}
      className="vault-handle"
      style={{
        position: 'absolute',
        width: '150px', 
        height: '150px', 
        backgroundImage: 'url("/assets/handle.png")',
        backgroundSize: 'cover',
        cursor: 'pointer',
        transformOrigin: 'center center', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)', 
      }}
    />
  );
};

export default VaultHandle;







