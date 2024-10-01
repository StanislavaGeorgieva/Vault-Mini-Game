import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import VaultHandle from './VaultHandle';

/**
 * VaultGame component represents a vault game where the player needs to guess the correct combination
 * of numbers and directions to unlock the vault and reveal the treasure.
 *
 * @component
 * @example
 * return (
 *   <VaultGame />
 * )
 *
 * @returns {JSX.Element} The rendered VaultGame component.
 *
 * @function
 * @name VaultGame
 *
 * @description
 * The VaultGame component initializes the game state, generates a secret combination, and provides
 * functions to handle number and direction selections. It checks the player's combination against
 * the secret combination and unlocks the vault if the combination is correct. The game uses GSAP
 * for animations and React hooks for state management.
 *
 * @property {boolean} isUnlocked - State to track if the vault is unlocked.
 * @property {Array} currentCombination - State to track the current combination entered by the player.
 * @property {Array} secretCombination - State to store the generated secret combination.
 * @property {number|null} selectedNumber - State to track the currently selected number.
 * @property {boolean} hasWon - State to track if the player has won the game.
 * @property {object} vaultHandleRef - Ref to the vault handle element.
 * @property {object} doorRef - Ref to the door element.
 * @property {object} treasureRef - Ref to the treasure element.
 *
 * @method
 * @name generateSecretCombination
 * @description Generates a random secret combination of numbers and directions.
 *
 * @method
 * @name startNewGame
 * @description Resets the game state and starts a new game.
 *
 * @method
 * @name handleNumberSelection
 * @description Handles the selection of a number by the player.
 * @param {number} number - The selected number.
 *
 * @method
 * @name handleDirectionSelection
 * @description Handles the selection of a direction by the player.
 * @param {string} direction - The selected direction ('clockwise' or 'counterclockwise').
 *
 * @method
 * @name checkCombination
 * @description Checks the player's combination against the secret combination.
 *
 * @method
 * @name unlockVault
 * @description Unlocks the vault and reveals the treasure if the combination is correct.
 */

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

    gsap.to(doorRef.current.querySelector(".closed-door"), { opacity: 0, duration: 0.5 });
    gsap.to(doorRef.current.querySelector(".open-door"), { opacity: 1, duration: 0.5 });

    gsap.to(vaultHandleRef.current, { opacity: 0, duration: 0.5 });

    gsap.to(doorRef.current, { x: 300, duration: 1.5, ease: 'power2.out' });

    const treasureBlink = gsap.to(treasureRef.current, {
      opacity: 1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      paused: true
    });

    treasureBlink.play();

    setHasWon(true);

    setTimeout(() => {
      gsap.to(doorRef.current, { x: 0, duration: 1.5, ease: 'power2.in' });
      gsap.to(doorRef.current.querySelector(".closed-door"), { opacity: 1, duration: 0 });
      gsap.to(doorRef.current.querySelector(".open-door"), { opacity: 0, duration: 0 });


      gsap.to(vaultHandleRef.current, { opacity: 1, duration: 0 });

      treasureBlink.pause(0);
      gsap.to(treasureRef.current, { opacity: 0, duration: 0.5 });

      startNewGame();
    }, 5000);
  };


  return (
    <div className="App">
      <div className="vault">

        <div ref={doorRef} className="door" style={{ position: 'relative', width: '500px', height: '500px' }}>
          <img
            src="/assets/door.png"
            alt="Vault Door"
            className="closed-door"
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, opacity: 1 }}
          />
          <img
            src="/assets/doorOpen.png"
            alt="Open Vault Door"
            className="open-door"
            style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, opacity: 0 }}
          />

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
          <button onClick={() => handleDirectionSelection('counterclockwise')}>←Counterclockwise</button>
          <button onClick={() => handleDirectionSelection('clockwise')}>→Clockwise</button>



        </div>
        <button className='try-button' onClick={checkCombination}>Try</button>
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














