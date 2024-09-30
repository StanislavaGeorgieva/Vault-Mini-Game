import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Container, Sprite } from '@pixi/react';

const VaultHandle = forwardRef(({ onRotate }, ref) => {
  const handleRef = useRef();

  useImperativeHandle(ref, () => ({
    get rotation() {
      return handleRef.current.rotation;
    },
    set rotation(value) {
      handleRef.current.rotation = value;
    },
  }));

  return (
    <Container ref={handleRef}>
      <Sprite image="/assets/handle.png" x={150} y={150} interactive buttonMode pointerdown={onRotate} />
      <Sprite image="/assets/handleShadow.png" x={150} y={150} />
    </Container>
  );
});

export default VaultHandle;
