

function GameOver({ winner, onRestart }: { winner: any, onRestart: () => void }) {

    return (
  <div id="game-over">
         <h2>Game Over!</h2>
         {winner && <p>{winner} won!</p>}
         {!winner && <p>{winner} It's a draw!</p>}
         <p>
            <button onClick={onRestart}>Rematch!</button>
         </p>
  </div>

    );
}

export default GameOver;