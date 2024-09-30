// src/components/VaultGame.jsx
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import VaultHandle from './VaultHandle';

const VaultGame = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentCombination, setCurrentCombination] = useState([]);
  const [secretCombination, setSecretCombination] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [hasWon, setHasWon] = useState(false);
  const vaultHandleRef = useRef(null);
  const doorRef = useRef(null);
  const treasureRef = useRef(null);

  useEffect(() => {
    startNewGame();
  }, []);

  const generateSecretCombination = () => {
    const combination = [];
    for (let i = 0; i < 3; i++) {
      const number = Math.floor(Math.random() * 9) + 1;
      const direction = Math.random() > 0.5 ? 'clockwise' : 'counterclockwise';
      combination.push({ number, direction });
    }
    return combination;
  };

  const startNewGame = () => {
    setIsUnlocked(false);
    setCurrentCombination([]);
    setSelectedNumber(null);
    setHasWon(false);
    const newSecretCombination = generateSecretCombination();
    setSecretCombination(newSecretCombination);

    console.log('Generated Secret Combination:', newSecretCombination);

    gsap.set(vaultHandleRef.current, { rotation: 0 });
    gsap.set(doorRef.current, { x: 0 });
    gsap.set(treasureRef.current, { opacity: 0 });
  };

  const handleNumberSelection = (number) => {
    setSelectedNumber(number);
  };

  const handleDirectionSelection = (direction) => {
    if (selectedNumber === null) {
      alert("Please select a number first.");
      return;
    }

    const rotationAngle = direction === 'clockwise' ? 60 * selectedNumber : -60 * selectedNumber;
    gsap.to(vaultHandleRef.current, {
      rotation: `+=${rotationAngle}`,
      duration: 0.5,
    });

    setCurrentCombination((prev) => [...prev, { number: selectedNumber, direction }]);
    setSelectedNumber(null);
  };

  const checkCombination = () => {
    if (currentCombination.length === 3) {
      const isCorrect = currentCombination.every((entry, index) =>
        entry.number === secretCombination[index].number &&
        entry.direction === secretCombination[index].direction
      );

      if (isCorrect) {
        unlockVault();
      } else {
        alert('Wrong combination! Try again.');
        startNewGame();
      }
    } else {
      alert("You need to enter 3 number-direction combinations first.");
    }
  };

  const unlockVault = () => {
    setIsUnlocked(true);
    gsap.to(doorRef.current, { x: -300, duration: 1.5, ease: 'power2.out' });
    gsap.to(treasureRef.current, { opacity: 1, duration: 1.5, repeat: -1, yoyo: true });

    setHasWon(true);


    setTimeout(() => {
      gsap.to(doorRef.current, { x: 0, duration: 1.5, ease: 'power2.in' }); 
      startNewGame();
    }, 5000);
  };

  const handlePlayAgain = () => {
    startNewGame();
  };

  return (
    <div className="App">
      <div className="vault">

        <div ref={doorRef} className="door" style={{ position: 'relative', width: '500px', height: '500px' }}>
          <img src="/assets/door.png" alt="Vault Door" style={{ width: '100%', height: '100%' }} />
          {isUnlocked && (
            <img
              src="/assets/doorOpen.png"
              alt="Open Vault Door"
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            />
          )}

          <div ref={vaultHandleRef} className="handle">
            <VaultHandle onUnlock={unlockVault} />
          </div>
        </div>
 
        <img
          ref={treasureRef}
          className="treasure"
          src="/assets/blink.png"
          alt="Treasure"
          style={{ width: '150px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0 }}
        />
      </div>
      

      <div className="vault-console">
        <div className="numbers">
          <h3>Select a Number:</h3>
          {Array.from({ length: 9 }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handleNumberSelection(i + 1)}
              disabled={selectedNumber !== null}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="directions">
          <h3>Select a Direction:</h3>
          <button onClick={() => handleDirectionSelection('clockwise')}>Clockwise</button>
          <button onClick={() => handleDirectionSelection('counterclockwise')}>Counterclockwise</button>
        </div>
        <button onClick={checkCombination}>Try</button>
      </div>


      <div className="current-combination">
        <h3>Current Combination:</h3>
        {currentCombination.map((entry, index) => (
          <div key={index}>{`${entry.number} ${entry.direction}`}</div>
        ))}
      </div>


      {hasWon && (
        <div className="win-message">
          <h2>Congratulations, You Opened the Vault!</h2>
        </div>
      )}
    </div>
  );
};

export default VaultGame;













