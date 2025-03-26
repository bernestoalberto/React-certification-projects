import { useRef } from "react";
import Input from "../Shared/Input";
import Modal from "../Shared/Modal";


export type Project = {
    id?: string
    title: string;
    description: string;
    dueDate: string;
}

type ModalHandle = {
    open: () => void;
    close: () => void;
}

export default function NewPorject({ onAdd, onCancel }: { onAdd: (project: Project) => void, onCancel: () => void }) {
    const modal = useRef<ModalHandle>(null);
    const title = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const dueDate = useRef<HTMLInputElement>(null);

    function handleSave() {

        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if (
            enteredTitle.trim() === '' ||
            enteredDescription.trim() === '' ||
            enteredDueDate.trim() === ''
        ) {
            modal?.current.open();
            return;
        }
        //...validation
        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });

    }

    function handleCancel() {
        onCancel();
    }


    return (
        <>
            <Modal buttonCaption="Close" ref={modal}>
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">Ooops ... looks like you forgot to tneter a value</p>
                <p className="text-stone-600 mb-4">Please make srue you provide a valid value for every input field.</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li><button className="text-stone-800 hover:text-stone-950" onClick={handleCancel}>Cancel</button></li>
                    <li><button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                        onClick={handleSave}>Save</button></li>
                </menu>
                <div>
                    <Input type="text" label="Title" isTextArea={false} ref={title} />
                    <Input label="Description" isTextArea={true} ref={description} />
                    <Input type="date" label="Due Date" isTextArea={false} ref={dueDate} />
                </div>
            </div>
        </>


    );

}