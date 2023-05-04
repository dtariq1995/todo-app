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
        projectTitle.classList.add("projects-list-titles", "sidebar-area");
        projectTitle.addEventListener("click", (e) => {
            if (e.target.classList.contains("active")) return;
            setActiveButton(projectTitle, ".sidebar-area");
            sectionDisplay(filterProjects(projectTitle.textContent));

        });
        projectListArea.appendChild(projectTitle);
    });
}



const filterProjects = function(projectName) {   // filter arrays

    filteredProjectToDoArray = toDoArray.filter(function(toDo) {   // filter all todos based off project name

        return projectName == toDo.project;
    })

    return filteredProjectToDoArray;
}
