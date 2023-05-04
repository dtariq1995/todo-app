import { setActiveButton } from "./pageLoad";


export const projectsArray = [];   // holds projects


let sampleProject = "Sample Project";
let sampleProjectTwo = "House Renovations";

projectsArray.push(sampleProject, sampleProjectTwo, sampleProject, sampleProjectTwo, sampleProject, sampleProjectTwo);



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
            console.log("display tasks for this project");
        });

        projectListArea.appendChild(projectTitle);

    });
};