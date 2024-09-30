
import React, { useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { Sprite } from '@pixi/react';
import gsap from 'gsap';

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

  useEffect(() => {
    const handle = handleRef.current;
    let startAngle = 0;
    let dragging = false;

    const onDragStart = (event) => {
      dragging = true;
      event.stopPropagation();
      const { x, y } = event.data.global;
      startAngle = Math.atan2(y - handle.y, x - handle.x) - handle.rotation;
    };

    const onDragMove = (event) => {
      if (dragging) {
        const { x, y } = event.data.global;
        const angle = Math.atan2(y - handle.y, x - handle.x);
        const newRotation = angle - startAngle;

        handle.rotation = newRotation;
        gsap.to(handle, { rotation: newRotation, duration: 0.1 });
      }
    };

    const onDragEnd = () => {
      dragging = false;
      if (onRotate) onRotate(getDirectionFromRotation(handle.rotation));
    };

    handle.interactive = true;
    handle.buttonMode = true;
    handle
      .on('pointerdown', onDragStart)
      .on('pointermove', onDragMove)
      .on('pointerup', onDragEnd)
      .on('pointerupoutside', onDragEnd);

    return () => {
      handle.off('pointerdown', onDragStart);
      handle.off('pointermove', onDragMove);
      handle.off('pointerup', onDragEnd);
      handle.off('pointerupoutside', onDragEnd);
    };
  }, [onRotate]);

  const getDirectionFromRotation = (rotation) => {
    return rotation >= 0 ? 'clockwise' : 'counterclockwise';
  };


  const handleClick = (event) => {
    const handle = handleRef.current;
    const clickPosition = event.data.global.x; 
    const handleCenter = window.innerWidth / 2; 

   
    if (clickPosition > handleCenter) {
      onRotate('clockwise'); 
    } else {
      onRotate('counterclockwise'); 
    }
  };

  return (
    <Sprite
      ref={handleRef}
      image="/assets/handle.png"
      anchor={0.5}
      interactive
      buttonMode
      pointerdown={handleClick} 
    />
  );
});

export default VaultHandle;






