import React, { useImperativeHandle, forwardRef, useRef } from 'react';
import gsap from 'gsap';

const VaultHandle = forwardRef((props, ref) => {
  const handleRef = useRef();

  useImperativeHandle(ref, () => ({
    rotate(direction) {
      const rotationAngle = direction === 'clockwise' ? 60 : -60;
      gsap.to(handleRef.current, {
        rotation: `+=${rotationAngle}`,
        duration: 0.5,
        onComplete: props.onUnlock,
      });
    },
  }));

  return (
    <img
      ref={handleRef}
      src="/assets/handle.png"
      alt="Vault Handle"
      style={{ width: '60px', height: '60px', transformOrigin: 'center' }}
    />
  );
});

export default VaultHandle;







