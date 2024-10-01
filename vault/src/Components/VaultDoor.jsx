import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Sprite, Container } from '@pixi/react';

/**
 * VaultDoor component that represents a door in the vault game.
 * 
 * This component uses `forwardRef` to expose a custom ref with `x` property
 * for getting and setting the x-coordinate of the door.
 * 
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {React.Ref} ref - The reference forwarded to the component.
 * 
 * @returns {JSX.Element} The rendered VaultDoor component.
 */

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
