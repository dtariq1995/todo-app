import { setActiveButton } from "./pageLoad";
import sectionDisplay from "./toDo";
import { toDoArray } from "./toDo";


export const projectsArray = [];   // holds projects
export let filteredProjectToDoArray = [];   // holds project filtered todo array


let sampleProject = "Sample Project";
let sampleProjectTwo = "House Renovations";

projectsArray.push(sampleProject, sampleProjectTwo);



export const projectListDisplay = function() {

    let projectListArea = document.getElementById("projects-list");
    projectListArea.innerHTML = "";

    projectsArray.forEach(function(project) {

        let projectTitle = document.createElement("div");
        projectTitle.textContent = project;
        projectTitle.id = project;
        projectTitle.classList.add("projects-list-titles", "sidebar-area");
        projectTitle.addEventListener("click", (e) => {
            if (e.target.classList.contains("active")) return;
            setActiveButton(projectTitle, ".sidebar-area");
            sectionDisplay(filterProjects(projectTitle.textContent));
            emptyProjectDisplay(filterProjects(projectTitle.textContent).length, projectTitle.textContent);

        });
        projectListArea.appendChild(projectTitle);
    });
}


export const filterProjects = function(projectName) {   // filter arrays

    filteredProjectToDoArray = toDoArray.filter(function(toDo) {   // filter all todos based off project name

        return projectName == toDo.project;
    })
    return filteredProjectToDoArray;
}


export const emptyProjectDisplay = function(filteredArrayLength, projectTitle) {

    if (filteredArrayLength == 0) {

        
        let toDoArea = document.getElementById("main-area");
        toDoArea.innerHTML = "";

        let emptyProjectArea = document.createElement("div");
        emptyProjectArea.id = "empty-project-area";

        let emptyProjectHeading = document.createElement("div");
        emptyProjectHeading.id = "empty-project-heading";
        emptyProjectHeading.textContent = "Empty Project!";

        let emptyProjectText = document.createElement("div");
        emptyProjectText.id = "empty-project-text";
        emptyProjectText.textContent = "Create a new to-do item or delete project.";

        let emptyProjectDelete = document.createElement("button");
        emptyProjectDelete.classList.add("new-submit-btn", "empty-project-del-btn");
        emptyProjectDelete.textContent = "DELETE PROJECT";
        emptyProjectDelete.addEventListener("click", () => {
      
            projectsArray.splice(projectsArray.indexOf(projectTitle), 1);
            projectListDisplay();
            let homeTab = document.getElementById("sidebar-todo-area");
            setActiveButton(homeTab, ".sidebar-area");
            sectionDisplay(toDoArray);
        });

        emptyProjectArea.append(emptyProjectHeading, emptyProjectText, emptyProjectDelete);
        toDoArea.append(emptyProjectArea);
    }

    else {
        return;
    }

}