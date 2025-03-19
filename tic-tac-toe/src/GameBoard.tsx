

function GameBoard({ onSelecetSquare, board }: { onSelecetSquare: ((rowIndex: number, colIndex: number) => void), board: any[] }) {
    
    return (
        <ol id="game-board">
            {board.map((row : [], rowIndex: number) => (
                <li key={rowIndex} className="game-row">
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex} className="game-cell">
                                <button className="game-cell-button"
                                    onClick={() => onSelecetSquare(rowIndex, colIndex)} disabled={playerSymbol != null}> {playerSymbol}</button>

                            </li>
                        ))}
                    </ol>
                </li>
            ))
            }
        </ol>

    );
}

export default GameBoard;