import React, { useEffect, useState, useRef } from 'react';
import { Stage, Container, Sprite } from '@pixi/react';
import gsap from 'gsap';
import VaultHandle from './VaultHandle';
import VaultDoor from './VaultDoor';

const VaultGame = () => {
  const [secretCombination, setSecretCombination] = useState([]);
  const [currentCombination, setCurrentCombination] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [handleRotation, setHandleRotation] = useState(0);
  const vaultHandleRef = useRef();
  const vaultDoorRef = useRef();

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const combination = generateSecretCombination();
    console.log("Secret Combination: ", combination);
    setSecretCombination(combination);
    setCurrentCombination([]);
    setIsGameActive(true);
    setHandleRotation(0);


    if (vaultHandleRef.current) {
      gsap.to(vaultHandleRef.current, { rotation: 0, duration: 0.5 });
    }
  };

  const generateSecretCombination = () => {
    const combination = [];
    for (let i = 0; i < 3; i++) {
      const number = Math.floor(Math.random() * 9) + 1;
      const direction = Math.random() > 0.5 ? "clockwise" : "counterclockwise";
      combination.push({ number, direction });
    }
    return combination;
  };

  const checkCombination = () => {
    if (currentCombination.length === secretCombination.length) {
      const isMatch = secretCombination.every((entry, index) => 
        entry.number === currentCombination[index].number && entry.direction === currentCombination[index].direction
      );

      if (isMatch) {
        unlockVault();
      } else {
        resetGame();
      }
    }
  };

  const handleRotate = (direction) => {
    if (!isGameActive) return;

    const angle = direction === 'clockwise' ? 60 : -60;
    const newRotation = handleRotation + angle;

    if (vaultHandleRef.current) {
      gsap.to(vaultHandleRef.current, {
        rotation: newRotation * (Math.PI / 180),
        duration: 0.5,
        onComplete: checkCombination
      });
    }

    const newCombination = [...currentCombination, { number: Math.abs(newRotation / 60), direction }];
    setCurrentCombination(newCombination);
    setHandleRotation(newRotation);
  };

  const unlockVault = () => {
    setIsGameActive(false);

    if (vaultDoorRef.current) {
      gsap.to(vaultDoorRef.current, { x: 300, duration: 2, ease: 'power1.out' });
    }

    gsap.fromTo("#treasure", { alpha: 0 }, { alpha: 1, duration: 1.5, repeat: -1, yoyo: true });
  };

  const resetGame = () => {
    alert('Incorrect combination! Starting over.');
    setCurrentCombination([]);
    setHandleRotation(0);

    if (vaultHandleRef.current) {
      gsap.to(vaultHandleRef.current, { rotation: 0, duration: 0.5 });
    }

    startNewGame();
  };

  return (
    <div>
      <Stage width={800} height={600} options={{ backgroundColor: 0x333333 }}>
        <Container x={150} y={100}>
          <Sprite image="/assets/bg.png" />
          <VaultDoor ref={vaultDoorRef} />
          <VaultHandle ref={vaultHandleRef} onRotate={handleRotate} />
          <Sprite id="treasure" image="/assets/blink.png" x={250} y={120} alpha={0} />
        </Container>
      </Stage>
      <div id="controls">
        <button onClick={() => handleRotate('clockwise')}>Rotate Clockwise</button>
        <button onClick={() => handleRotate('counterclockwise')}>Rotate Counterclockwise</button>
      </div>
    </div>
  );
};

export default VaultGame;
