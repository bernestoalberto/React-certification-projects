import NewTask from "./NewTask";

export type Task = {
    id: string;
    title: string;
    description?: string;
    isCompleted?: boolean;
    dueDate?: Date;
}

export default function Tasks({ tasks, onAdd, onDelete }: { tasks: Task[], onAdd: (task: string) => void, onDelete: (id: string) => void }) {
    return <section>
        <h2 className="text-2xl font-bold text-stone-600 mb-4">Tasks</h2>
        <NewTask onAdd={(task) => onAdd(task)} />
        {tasks.length === 0 &&
            <p className="text-stone-800 my-4">This project does not have aby tasks yet.</p>}
        {tasks.length > 0 &&
            <ul className="p-4 mt-8 rounded-md bg-stone-100">
                {
                    tasks.map((task: Task) => (

                        <li key={task.id} className="flex justify-between my-4">
                            <span>{task.title}</span>
                            <button onClick={() => onDelete(task.id)} className="text-stone-700 hover:text-red-500">Clear</button>
                        </li>
                    ))
                }
            </ul>}
    </section>
}