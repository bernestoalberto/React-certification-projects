import Button from "../Shared/Button";
import { Project } from "./NewProject";



export default function ProjectSideBar({
    onStartAddProject,
    onSelectedProject,
    selectedProjectId,
    projects
}: {
    onStartAddProject: () => void,
    onSelectedProject: (id: string) => void,
    selectedProjectId: string | undefined | null,
    projects: Project[]
}) {
    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md-:text-xl text-stone-200">Your Projects</h2>
            <Button onClick={onStartAddProject}>+Add Project</Button>
            <ul className="mt-8">
                {
                    projects?.map((project: Project) => {
                        let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800";

                        if (project.id === selectedProjectId) {
                            cssClasses += " bg-stone-800 text-stone-200";
                        } else {
                            cssClasses += " text-stone-400";
                        }
                        return (
                            <li key={project.id}>
                                <button className={cssClasses} onClick={() => project.id && onSelectedProject(project.id)}>{project.title}</button>
                            </li>
                        );
                    }






                    )
                }
            </ul>

        </aside>

    );
}