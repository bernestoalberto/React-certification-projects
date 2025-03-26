import noProjectImage from '../../assets/no-projects.png';
import Button from '../Shared/Button';

// declare module '*.png' {
//     const value: string;
//     export default value;
// }

export default function NoProjectSelected({ onStartAddProject }: { onStartAddProject: () => void }) {

    return (
        <div className="mt-24 text-center w-2/3">
            <img src={noProjectImage} alt="no project" className="w-16 h-16 mx-auto" />
            <h2 className="text-xl font-bold text-stone-500 my-4">No Project Selected </h2>
            <p className="text-stone-500 mb-4">Select a project to get started with a new one.</p>
            <div>
                <Button onClick={onStartAddProject}> Create new project</Button>
            </div>

        </div>

    );
}
