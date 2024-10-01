import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * VaultHandle component represents a handle of a vault that can be rotated.
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {Function} props.onUnlock - Callback function to be called when the vault is unlocked.
 * 
 * @example
 * <VaultHandle onUnlock={handleUnlock} />
 * 
 * @returns {JSX.Element} The rendered vault handle component.
 */

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







