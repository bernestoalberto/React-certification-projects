import Player from "./Player";
import GameBoard from "./GameBoard";
import { useState } from "react";
import Log from "./Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./GameOver";

const PLAYERS = {
  X: { name: 'Player 1', symbol: 'X' },
  O: { name: 'Player 2', symbol: 'O' }
};
const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveWinner(gameBoard: any, players: any) {
  let winner = null;


  for (const combination of WINNING_COMBINATIONS) {
    const firstCombination = gameBoard[combination[0].row][combination[0].column];
    const secondCombination = gameBoard[combination[1].row][combination[1].column];
    const thirdCombination = gameBoard[combination[2].row][combination[2].column];
    if (firstCombination && firstCombination === secondCombination && firstCombination === thirdCombination) {
      winner = players[firstCombination]?.name || firstCombination;
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns: any[]){
  const gameBoard = [...INITIAL_GAMEBOARD].map(row => [...row]); // deep copy of the initial game board

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);


  function deriveActivePlayer(gameTurns: any[]) {
    let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = 'O';
    }
    return currentPlayer
  }
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rownIndex: number, colIndex: number) {

    setGameTurns((prevTurns: any) => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rownIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns
    });
  }
  function handleRestartGame() {
    setGameTurns([]);
  }

  function handleChangePlayerName(player: string, newName: string) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [player]: { ...prevPlayers[player], name: newName }
    }));
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X.name} symbol={PLAYERS.X.symbol}
            isActive={activePlayer === 'X'} onNameChange={handleChangePlayerName} />
          <Player initialName={PLAYERS.O.name} symbol={PLAYERS.O.symbol}
 isActive={activePlayer === 'O'} onNameChange={handleChangePlayerName} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestartGame} />}
        <GameBoard onSelecetSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
