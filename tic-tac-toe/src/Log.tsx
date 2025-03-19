

export interface Turn {
    player: string; square: { row: number; col: number };
}
interface LogTurns {
    turns: Array<Turn>
}

function Log({ turns }: LogTurns) {
    return (
        <ol id="log">
            {
                turns.map((turn: Turn, index: number) => (
                    <li key={index}>
                        <span className="log-player">{turn.player}</span> selected square <span className="log-square">[{turn.square.row}, {turn.square.col}]</span>
                    </li>
                ))
            }
        </ol>
    );
}

export default Log;
