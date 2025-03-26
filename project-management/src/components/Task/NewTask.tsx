import { useRef, useState } from "react";
import Modal from "../Shared/Modal";

export default function NewTask({ onAdd, ...props }: { onAdd: (task: string) => void }) {
    const [enteredTask, setEnteredTask] = useState<string>('');
    const modal = useRef(null);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEnteredTask(event.target.value);
    }

    function handleClick() {
        if (enteredTask.trim() === '') {
            modal.current?.open();
            return;
        }
        onAdd(enteredTask);
        setEnteredTask('');
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Close" {...props} >Close Modal</Modal>
            <div>
                <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" onChange={handleChange} value={enteredTask} onBlur={handleChange} />
                <button className="text-stone-700 hover:text-stone-950" {...props} onClick={handleClick}>Add Task</button>
            </div>
        </>
    );

}