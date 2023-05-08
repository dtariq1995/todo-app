import { setActiveButton } from "./pageLoad";
import sectionDisplay from "./toDo";
import { toDoArray } from "./toDo";


export let projectsArray = [];   // holds projects
export let filteredProjectToDoArray = [];   // holds project filtered todo array


let sampleProject = "Sample Project";
let sampleProjectTwo = "House Renovations";

projectsArray.push(sampleProject, sampleProjectTwo);

let storedProjects = JSON.parse(localStorage.getItem("projects"));   // retrieve projects list from local storage

if (!storedProjects) {
    localStorage.setItem("projects", JSON.stringify(projectsArray));   // if no local storage, create local storage for projects
}





export const projectListDisplay = function() {   // displays project list in the sidebar

    let projectListArea = document.getElementById("projects-list");
    projectListArea.innerHTML = "";

    projectsArray.forEach(function(project) {

        let projectTitle = document.createElement("div");   // add title to sidebar
        projectTitle.textContent = project;
        projectTitle.id = project;
        projectTitle.classList.add("projects-list-titles", "sidebar-area");

        projectTitle.addEventListener("click", (e) => {
            if (e.target.classList.contains("active")) return;
            setActiveButton(projectTitle, ".sidebar-area");   // highlight current project on sidebar
            sectionDisplay(filterProjects(projectTitle.textContent));   // display array for selected project
            emptyProjectDisplay(filterProjects(projectTitle.textContent).length, projectTitle.textContent);   // show different display if no todos for selected project
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





export const emptyProjectDisplay = function(filteredArrayLength, projectTitle) {   // shows a different display if project is empty

    if (filteredArrayLength == 0) {

        
        let toDoArea = document.getElementById("main-area");   // clear toDoArea before adding anything 
        toDoArea.innerHTML = "";

        let emptyProjectArea = document.createElement("div"); 
        emptyProjectArea.id = "empty-project-area";

        let emptyProjectHeading = document.createElement("div");   // display "Empty Project" heading
        emptyProjectHeading.id = "empty-project-heading";
        emptyProjectHeading.textContent = "Empty Project!";

        let emptyProjectText = document.createElement("div");   // display subtext
        emptyProjectText.id = "empty-project-text";
        emptyProjectText.textContent = "Create a new to-do item or delete project.";

        let emptyProjectDelete = document.createElement("button");   // display a delete button to delete the project if project is empty
        emptyProjectDelete.classList.add("new-submit-btn", "empty-project-del-btn");
        emptyProjectDelete.textContent = "DELETE PROJECT";
        emptyProjectDelete.addEventListener("click", () => {
      
            projectsArray.splice(projectsArray.indexOf(projectTitle), 1);   // remove this project from projects list
            localStorage.setItem("projects", JSON.stringify(projectsArray));   // reflect change in local storage of projects
            projectListDisplay();   // update projects list in sidebar                              
            let homeTab = document.getElementById("sidebar-todo-area");
            setActiveButton(homeTab, ".sidebar-area");   // set home button as active button
            sectionDisplay(toDoArray);   // display all todos
        });

        emptyProjectArea.append(emptyProjectHeading, emptyProjectText, emptyProjectDelete);   // append all on to the display area
        toDoArea.append(emptyProjectArea);
    }

    else {
        return;   // do nothing if array is not empty
    }
}