import React, { useState } from 'react';

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
