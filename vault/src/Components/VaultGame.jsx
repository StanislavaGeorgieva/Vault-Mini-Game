// src/components/VaultGame.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Stage, Container, Sprite } from '@pixi/react';
import gsap from 'gsap';
import VaultHandle from './VaultHandle';
import VaultDoor from './VaultDoor';
import VaultConsole from './VaultConsole';

const VaultGame = () => {
  const [secretCombination, setSecretCombination] = useState([]);
  const [currentCombination, setCurrentCombination] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const vaultHandleRef = useRef(null);
  const vaultDoorRef = useRef(null);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const combination = generateSecretCombination();
    console.log("Secret Combination: ", combination);
    setSecretCombination(combination);
    setCurrentCombination([]);
    setIsGameActive(true);

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
        entry.number === currentCombination[index].number &&
        entry.direction === currentCombination[index].direction
      );

      if (isMatch) {
        unlockVault();
      } else {
        resetGame();
      }
    }
  };

  const handleConsoleInput = (number, direction) => {
    if (!isGameActive) return;

    const angle = direction === 'clockwise' ? 60 * number : -60 * number;
    const newRotation = (vaultHandleRef.current.rotation || 0) + angle * (Math.PI / 180);

    gsap.to(vaultHandleRef.current, {
      rotation: newRotation,
      duration: 0.5,
      onComplete: checkCombination,
    });

    const newCombination = [...currentCombination, { number, direction }];
    setCurrentCombination(newCombination);
  };

  const unlockVault = () => {
    setIsGameActive(false);

    if (vaultDoorRef.current) {
      gsap.to(vaultDoorRef.current, { x: 300, duration: 2, ease: 'power1.out' });
    }

    gsap.fromTo("#treasure", { alpha: 0 }, { alpha: 1, duration: 1.5, repeat: -1, yoyo: true });
    alert('Congratulations! You have unlocked the vault!');
  };

  const resetGame = () => {
    alert('Wrong combination! Try again.');
    setCurrentCombination([]);

    if (vaultHandleRef.current) {
      gsap.to(vaultHandleRef.current, { rotation: 0, duration: 0.5 });
    }

    startNewGame();
  };

  return (
    <div className="App">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        options={{ backgroundColor: 0x000000 }}
      >
        <Container x={window.innerWidth / 2} y={window.innerHeight / 2}>
          <VaultDoor ref={vaultDoorRef} />
          <VaultHandle ref={vaultHandleRef} onRotate={() => {}} />
          <Sprite id="treasure" image="/assets/blink.png" x={-50} y={-50} alpha={0} />
        </Container>
      </Stage>
      <VaultConsole onInput={handleConsoleInput} />
    </div>
  );
};

export default VaultGame;







