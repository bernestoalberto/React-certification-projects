import { Project } from "./NewProject";
import Tasks, { Task } from "../Task/Tasks";

export default function selectedProjectId({ project, tasks, onProjectDelete: onProjectDelete, onAddTask, onDeleteTask }: { project: Project | undefined, tasks: Task[], onProjectDelete: (projectId: string) => void, onAddTask: (task: string) => void, onDeleteTask: (taskId: string) => void }) {

    const formattedDate = new Date(project?.dueDate ?? new Date()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{project?.title}</h1>
                    <button className="text-stone-600 hover:text-stone-950" onClick={() => project?.id && onProjectDelete(project?.id)}>Delete</button>
                </div>
                <p className="mb-4 text-stone-400">{formattedDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{project?.description}</p>
            </header>
            <Tasks tasks={tasks} onAdd={(task)=>onAddTask(task)} onDelete={onDeleteTask} />
        </div>
    );


}