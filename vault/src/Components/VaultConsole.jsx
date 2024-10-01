import React, { useState } from 'react';

/**
 * VaultConsole component allows users to input a number and a direction.
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {function} props.onInput - Callback function to handle the input of number and direction.
 * 
 * @example
 * <VaultConsole onInput={(number, direction) => console.log(number, direction)} />
 * 
 * @returns {JSX.Element} The rendered VaultConsole component.
 */

const VaultConsole = ({ onInput }) => {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [currentDirection, setCurrentDirection] = useState(null);

  const handleNumberClick = (number) => {
    setCurrentNumber(number);
  };

  const handleDirectionClick = (direction) => {
    if (currentNumber !== null) {
      setCurrentDirection(direction);
      onInput(currentNumber, direction);
      setCurrentNumber(null);
      setCurrentDirection(null);
    } else {
      alert("Please select a number first.");
    }
  };

  return (
    <div className="vault-console">
      <div className="numbers">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button key={number} onClick={() => handleNumberClick(number)}>
            {number}
          </button>
        ))}
      </div>
      <div className="directions">
        <button onClick={() => handleDirectionClick("clockwise")}>→ Clockwise</button>
        <button onClick={() => handleDirectionClick("counterclockwise")}>← Counterclockwise</button>
      </div>
    </div>
  );
};

export default VaultConsole;
