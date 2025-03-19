
import { useState } from "react";

function Player({ initialName, symbol, isActive, onNameChange }: { initialName: string, symbol: string, isActive?: boolean, onNameChange: (player: string, newName: string) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);


    function handleClick() {
        setIsEditing(!isEditing);

        if (isEditing) {
            onNameChange(symbol, playerName);
        }
    }
    function handleChange(event: any) {
        setPlayerName(event.target.value as string);
    }

    let buttonText = "Edit";

    let editablePlayeName = <span className="player-name"> {playerName}</span>;
    if (isEditing) {
        buttonText = "Save";
        editablePlayeName = (<input type="text" required value={playerName} onChange={handleChange} />);
    }

    return (
        <>
            <li className={isActive ? 'active' : undefined}>
                <span className="player">
                    {editablePlayeName}
                    <span className="player-symbol">{symbol} </span>
                </span>
                <button onClick={handleClick}>{buttonText}</button>
            </li>
        </>
    );
}

export default Player;