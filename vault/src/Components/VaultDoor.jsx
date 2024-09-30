import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Sprite, Container } from '@pixi/react';

const VaultDoor = forwardRef((props, ref) => {
  const doorRef = useRef();

  useImperativeHandle(ref, () => ({
    set x(value) {
      doorRef.current.x = value;
    },
    get x() {
      return doorRef.current.x;
    },
  }));

  return (
    <Container ref={doorRef}>
      <Sprite image="/assets/door.png" />
      <Sprite image="/assets/doorOpen.png" x={0} y={0} />
      <Sprite image="/assets/doorOpenShadow.png" />
    </Container>
  );
});

export default VaultDoor;
