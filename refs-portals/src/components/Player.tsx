import { useState, useRef } from "react";


export default function Player() {
  const playerName = useRef<HTMLInputElement>(null);
  const [enteredPlayerName, setEnteredPlayerName] = useState('');


  function handleClick() {
    if (playerName.current) {
      setEnteredPlayerName(playerName.current.value);
      playerName.current.value = '';
    } else {
      setEnteredPlayerName('');
    }
  }
  return (
    <section id="player">
      <h2 >Welcome {enteredPlayerName ?? 'unknown entity'} </h2>
      <p>
        <input
          ref={playerName}
          type="text"
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
