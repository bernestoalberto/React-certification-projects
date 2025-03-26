import { useState } from "react";
import NoProjectSelected from "./components/Views/NoProjectSelected";
import ProjectSideBar from "./components/Views/ProjectSideBar";
import NewPorject, { Project } from "./components/Views/NewProject";
import SelectedProject from "./components/Views/SelectedProject";
import { Task } from "./components/Task/Tasks";



function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined as string | undefined | null,
    projects: [] as Project[],
    tasks: [] as Task[]
  });
  function handleCreateProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null

      }
    });
  }
  function handleCreateTask(task: string) {
    setProjectState((prevState) => {
      const newTask = {
        id: Math.random().toString(),
        projectId: prevState.selectedProjectId as string,
        title: task,
      }
      return {
        ...prevState,
        selectedProjectId: null,
        tasks: [...prevState.tasks, newTask]
      }
    });
  }
  function handleDeleteTask(id: string) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    });

  }
  function handleCancelProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined

      }
    });
  }
  function handleSelectedProject(projectId: string) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: projectId

      }
    });
  }
  function handleDeletedProject(projectId: string) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
        projects: prevState.projects.filter((project) => project.id !== projectId)

      }
    });
  }

  const pID = projectState.selectedProjectId;
  const project = projectState.projects.find((project) => project.id === pID);
  let content = <SelectedProject
    project={project}
    tasks={projectState.tasks}
    onAddTask={handleCreateTask}
    onDeleteTask={handleDeleteTask}
    onProjectDelete={handleDeletedProject} />;

  if (projectState.selectedProjectId === null) {
    content = <NewPorject onAdd={handleAppProject} onCancel={handleCancelProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleCreateProject} />;
  }

  function handleAppProject(projectData: Omit<Project, 'id'>) {
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random().toString()
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    });
    content = <NoProjectSelected onStartAddProject={handleCreateProject} />
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSideBar
        onStartAddProject={handleCreateProject}
        onSelectedProject={handleSelectedProject}
        selectedProjectId={projectState.selectedProjectId}
        projects={projectState.projects}
      />
      {content}
    </main>
  );
}

export default App;
