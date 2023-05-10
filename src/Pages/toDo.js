import format from "date-fns/format";
import isToday from "date-fns/isToday";
import isThisWeek from "date-fns/isThisWeek";
import { toggle } from "./pageLoad";
import parseISO from "date-fns/parseISO";
import { projectsArray } from "./projects";
import { setActiveButton } from "./pageLoad";
import { filterProjects } from "./projects";
import { getActiveButton } from "./pageLoad";
import { emptyProjectDisplay } from "./projects"; 


export let toDoArray = [];   // holds all todos
export let todayToDoArray = [];   // will hold todos for current day
export let weekToDoArray = [];   // will hold todos for current week





export const filterArrays = function() {   // filter arrays

    todayToDoArray = toDoArray.filter(function(toDo) {   // filter all todos for today's date
        return isToday(toDo.date);
    })

    weekToDoArray = toDoArray.filter(function(toDo) {   // filter all todos for the week
        return isThisWeek(toDo.date);
    })
}





export const toDoFactory = (title, project, priority, date, details, checkedOrNot) => {   //Factory Function that creates toDos

    return {title, project, priority, date, details, checkedOrNot};
};

const sampleToDo = toDoFactory("Title", "Sample Project", "High", new Date(2023, 3, 23), "Finish this", false);
const sampleToDoTwo = toDoFactory("Fix Sink", "House Renovations", "Medium", new Date(2023, 3, 23), "Replace garbage disposal and soap dispenser", false);
const sampleToDoThree = toDoFactory("Fix Shower", "House Renovations", "Low", new Date(2023, 3, 28), "Replace shower head and broken tile", false);
const sampleToDoFour = toDoFactory("Clean up codebase", "To-Do App Fixes", "Medium", new Date(), "The codebase needs to be cleaned up and reorganized", true);
const sampleToDoFive = toDoFactory("Fix project lists", "To-Do App Fixes", "Medium", new Date(), "Project list doesn't load in correctly", true);
const sampleToDoSix = toDoFactory("Add logins", "To-Do App Fixes", "Medium", new Date(+new Date() + 86400000), "Add a way for users to sign up and login and load todos/notes/projects", false);
const sampleToDoSev = toDoFactory("ToDos load weird", "To-Do App Fixes", "Medium", new Date(+new Date() + 86400000), "Fix the weird behavior with todos loading in", false);
const sampleToDoEig = toDoFactory("Get Roof Fixed", "House Renovations", "Medium", new Date(+new Date() + 86400000), "The roof needs to be replaced", false);


toDoArray.push(sampleToDo, sampleToDoTwo, sampleToDoThree, sampleToDoFour, sampleToDoFive, sampleToDoSix, sampleToDoSev, sampleToDoEig);   // add sample todos to todoArray

let storedToDos = JSON.parse(localStorage.getItem("todos"));   // update todoArray with any todos in local storage

if (!storedToDos) {
    localStorage.setItem("todos", JSON.stringify(toDoArray));   // if no local storage, create local storage with sample todos
}

filterArrays();   // filter todos array by day and week





const sectionDisplay = function(arrayToDisplay) {   // display all to-dos

    let displayArea = document.querySelector("#main-area");   // clear all content before adding todos
    displayArea.innerHTML = "";

    let toDoDisplayArea = document.createElement("div");
    toDoDisplayArea.id = "todo-area"; 


    arrayToDisplay.forEach(function(toDo) {   // display todos, will be all, daily, or weeks based on which array pushed

        let toDoCard = document.createElement("div");   // card for todo
        toDoCard.classList.add("todo-card");

        if (toDo.priority === "High") {   // color left border based on priority of todo
            toDoCard.style.borderLeft = "5px solid red";
        }
        else if (toDo.priority === "Medium") {
            toDoCard.style.borderLeft = "5px solid orange";
        }
        else {
            toDoCard.style.borderLeft = "5px solid green";
        }
        let toDoLabel = document.createElement("label");   // add checkbox to todos
        let toDoCheck = document.createElement("input");
        toDoCheck.setAttribute("type", "checkbox");

        toDoCheck.addEventListener('change', () => {   // checks if todo is checked and style based off of that

            if (toDoCheck.checked) {
                toDo.checkedOrNot = true;
                localStorage.setItem("todos", JSON.stringify(toDoArray));
                toDoCard.classList.add("checked");
                toDoLeft.classList.add("checked");
                toDoDetails.classList.add("checked");
                toDoDate.classList.add("checked");
                editArea.classList.add("checked");
                deleteArea.classList.add("checked");
            }
            if (!toDoCheck.checked) {
                toDo.checkedOrNot = false;
                localStorage.setItem("todos", JSON.stringify(toDoArray));
                toDoCard.classList.remove("checked");
                toDoLeft.classList.remove("checked");
                toDoDetails.classList.remove("checked");
                toDoDate.classList.remove("checked");
                editArea.classList.remove("checked");
                deleteArea.classList.remove("checked");
            }
        })

        let toDoSpan = document.createElement("span");
        toDoLabel.append(toDoCheck, toDoSpan);


        let toDoTitle = document.createElement("div");   // display todos title
        toDoTitle.classList.add("todo-title");
        toDoTitle.textContent = toDo.title;

        let toDoLeft = document.createElement("div");   // separate checkbox and title for left side of todo
        toDoLeft.classList.add("todo-left");
        let toDoRight = document.createElement("div");   // details, date, icons will be on right
        toDoRight.classList.add("todo-right");

        let toDoDetails = document.createElement("button");   // add details button to todos 
        toDoDetails.classList.add("todo-details");
        toDoDetails.textContent = "DETAILS";
        toDoDetails.addEventListener('click', () => {
            detailsDisplay(toDo);   // show details for todo
        });

        let toDoDate = document.createElement("div");   // add date to todo
        toDoDate.classList.add("todo-date");
        toDoDate.textContent = format(toDo.date, 'LLL do');   // format date to look like "Mar 17"

        let editArea = document.createElement("a");  // used to wrap svg so cursor:pointer works
        editArea.classList.add("todo-icon-wrap");
        let editButton = document.createElement("object");   // add edit button to todos
        editButton.classList.add("todo-icon");
        editButton.type = "image/svg+xml";
        editButton.data = "/dist/Assets/Images/edit-button.svg";

        editArea.addEventListener('click', () => {
            editToDoDisplay(toDo);   // show form to edit todos
        });

        editArea.append(editButton);

        let deleteArea = document.createElement("a");   // wrap svg so cursor:pointer works
        deleteArea.classList.add("todo-icon-wrap");
        let deleteButton = document.createElement("object");   // add delete button to todos
        deleteButton.classList.add("todo-icon");
        deleteButton.type = "image/svg+xml";
        deleteButton.data = "/dist/Assets/Images/trash-can.svg";

        deleteArea.addEventListener('click', event => {   // remove note from array and display 
            event.target.parentNode.parentNode.style.opacity = "0";   // transition effect to make todo fade
            setTimeout(() => event.target.parentNode.parentNode.remove(), 400);
            toDoArray.splice(toDoArray.indexOf(toDo), 1);   // remove todo from the array
            localStorage.setItem("todos", JSON.stringify(toDoArray));   // relect change in local storage
            filterArrays();   // filter todoArray to get arrays for today and for the week

            let activeButton = getActiveButton(".sidebar-area");   // get currently active sidebar button

            if (projectsArray.indexOf(activeButton) != -1) {
                emptyProjectDisplay(filterProjects(activeButton).length, activeButton);   // if active button is project, check if empty project when todo is deleted
            }
            if (activeButton == "sidebar-todo-area") {   
                emptyToDoDisplay(toDoArray.length);   // if active button is home, check if toDoArray is empty on todo deletion
            }
            else if (activeButton == "sidebar-today-area") {
                emptyToDoDisplay(todayToDoArray.length);   // if active button is today, check if todayToDoArray is empty on todo deletion
            }
            else if (activeButton == "sidebar-week-area") {
                emptyToDoDisplay(weekToDoArray.length);   // if active button is week, check if weekToDoArray is empty on todo deletion
            }
        });

        deleteArea.append(deleteButton);

        toDoLeft.append(toDoLabel, toDoTitle);   // add label and title to left side
        toDoRight.append(toDoDetails, toDoDate, editArea, deleteArea);   // add date, edit, and del to right side
        toDoCard.append(toDoLeft, toDoRight);  // combine both sides and add to todo card

        if (toDo.checkedOrNot == true) {   // check if todo was stored as being checked and display based off of that
            toDoCheck.checked = true;
            toDoCard.classList.add("checked");
            toDoLeft.classList.add("checked");
            toDoDetails.classList.add("checked");
            toDoDate.classList.add("checked");
            editArea.classList.add("checked");
            deleteArea.classList.add("checked");
        }
        else if (toDo.checkedOrNot == false) {
            toDoCheck.checked = false;
            toDoCard.classList.remove("checked");
            toDoLeft.classList.remove("checked");
            toDoDetails.classList.remove("checked");
            toDoDate.classList.remove("checked");
            editArea.classList.remove("checked");
            deleteArea.classList.remove("checked");
        }

        toDoDisplayArea.append(toDoCard);   // display todo in display area in main

    });

    displayArea.append(toDoDisplayArea);
}





const detailsDisplay = function(todo) {   // displays details for a specific todo

    let body = document.body;

    let form = document.createElement("div");   // create card that details will display on
    form.id = "details-form";

    let header = document.createElement("div");   // details header which contains x button
    header.id = "details-form-header";

    let exitBtn = document.createElement("button");   // add x button to close form
    exitBtn.textContent = "×";
    exitBtn.id = "details-form-exit-button";
    exitBtn.addEventListener('click', () => {   // close form when user clicks on form "x"
        toggle('details-form');   // remove form from screen and undim background when x clicked
        body.removeChild(form);   // remove form from the body rather than just hiding it
    })

    header.append(exitBtn);

    let title = document.createElement("div");   // display title of details
    title.id = "details-form-title";
    title.textContent = todo.title;

    let projectArea = document.createElement("div");   // display project name
    projectArea.classList.add("details-form-section");
    let projectHeading = document.createElement("div");
    projectHeading.classList.add("details-form-area-heading");
    let projectName = document.createElement("div");
    projectName.classList.add("details-form-area-name");
    projectHeading.textContent = "Project: ";
    projectName.textContent = todo.project;
    projectArea.append(projectHeading, projectName);

    let priorityArea = document.createElement("div");   // display priority
    priorityArea.classList.add("details-form-section");
    let priorityHeading = document.createElement("div");
    priorityHeading.classList.add("details-form-area-heading");
    let priorityName = document.createElement("div");
    priorityName.classList.add("details-form-area-name");
    priorityHeading.textContent = "Priority: ";
    priorityName.textContent = todo.priority;
    priorityArea.append(priorityHeading, priorityName);

    let dateArea = document.createElement("div");   // display due date 
    dateArea.classList.add("details-form-section");
    let dateHeading = document.createElement("div");
    dateHeading.classList.add("details-form-area-heading");
    let dateName = document.createElement("div");
    dateName.classList.add("details-form-area-name");
    dateHeading.textContent = "Due Date: ";
    dateName.textContent = format(todo.date, 'LLL do, yyyy');   // format date ex. "May 7th, 2003"
    dateArea.append(dateHeading, dateName);

    let detailsArea = document.createElement("div");   // display details 
    detailsArea.classList.add("details-form-section", "details-overflow");
    let detailsHeading = document.createElement("div");
    detailsHeading.classList.add("details-form-area-heading");
    let detailsName = document.createElement("div");
    detailsName.classList.add("details-form-area-name");
    detailsHeading.textContent = "Details: ";
    detailsName.textContent = todo.details;
    detailsArea.append(detailsHeading, detailsName);


    form.append(header, title, projectArea, priorityArea, dateArea, detailsArea);   // add all to card
    body.append(form);   // add card to body

    toggle("details-form");   // dim background and make form visible
    
}

const editToDoDisplay = function(toDo) {   // brings up display to edit a todo when user clicks edit button


    let body = document.body;

    let card = document.getElementById("edit-form");   // create card that details will display on  
    card.setAttribute("onsubmit", "return false");   // this stops page from reloading on submit while still keeping form validation

    card.innerHTML = "";

    let exitBtn = document.createElement("button");   // add x button to close form
    exitBtn.textContent = "×";
    exitBtn.id = "edit-form-exit-button";
    exitBtn.addEventListener('click', () => {   // close form when user clicks on form "x"
        toggle('edit-form');   // remove form from screen and undim background when x clicked
        card.innerHTML = "";   // remove form from the body rather than just hiding it
    })

    let toDoTitle = document.createElement("textarea");   // show title edit area
    toDoTitle.id = "edit-form-title";
    toDoTitle.contentEditable = true;
    toDoTitle.placeholder = toDo.title;
    toDoTitle.textContent = toDo.title;
    toDoTitle.maxLength = 25;
    toDoTitle.required = true;

    let toDoDetails = document.createElement("textarea");   // show details edit area
    toDoDetails.id = "edit-form-details";
    toDoDetails.contentEditable = "true";
    toDoDetails.placeholder = toDo.details;
    toDoDetails.textContent = toDo.details;
    toDoDetails.maxLength = 200;
    toDoDetails.required = true;

    let toDoProjectArea = document.createElement("div");   // show project options
    toDoProjectArea.id = "new-todo-project-area";
    let toDoProjectHeading = document.createElement("div");
    toDoProjectHeading.id = "new-todo-project-heading";
    toDoProjectHeading.classList.add("new-todo-heading");
    toDoProjectHeading.textContent = "Project: ";
    let toDoProjectSelect = document.createElement("select");
    toDoProjectSelect.id = "project-select";
    let noProjectOption = document.createElement("option");
    noProjectOption.value = "None";
    noProjectOption.textContent = "None";
    toDoProjectSelect.append(noProjectOption);
    projectsArray.forEach(function(project) {
      let projectOption = document.createElement("option");
      projectOption.value = project;
      projectOption.textContent = project;
      toDoProjectSelect.append(projectOption);
    });
    toDoProjectArea.append(toDoProjectHeading, toDoProjectSelect);



    let toDoDateArea = document.createElement("div");   // show date select area
    toDoDateArea.id = "new-todo-date-area";
    let toDoDateHeading = document.createElement("div");
    toDoDateHeading.classList.add("new-todo-heading");
    toDoDateHeading.textContent = "Due Date: ";
    let toDoDateSelect = document.createElement("input");
    toDoDateSelect.classList.add("new-todo-date");
    toDoDateSelect.type = "date";
    toDoDateSelect.valueAsDate = toDo.date;
    toDoDateSelect.required = true;
    toDoDateArea.append(toDoDateHeading, toDoDateSelect);

    let toDoPriorityArea = document.createElement("div");   // show priority select area
    toDoPriorityArea.id = "new-todo-priority-area";
    let toDoPriorityHeading = document.createElement("div");
    toDoPriorityHeading.id = "new-todo-priority-heading";
    toDoPriorityHeading.classList.add("new-todo-heading");
    toDoPriorityHeading.textContent = "Priority: ";

    let lowPriority = document.createElement("input");   // show low priority button
    lowPriority.classList.add("new-todo-priority-btn");
    lowPriority.name = "new-priority";
    lowPriority.type = "radio";
    lowPriority.value = "Low";
    lowPriority.id = "new-todo-low";
    lowPriority.required = true;
    let lowPriorityLabel = document.createElement("label");
    lowPriorityLabel.setAttribute("for", "new-todo-low");
    lowPriorityLabel.id = "new-todo-low-label";
    lowPriorityLabel.textContent = "Low";

    let medPriority = document.createElement("input");   // show med priority button
    medPriority.classList.add("new-todo-priority-btn");
    medPriority.name = "new-priority";
    medPriority.type = "radio";
    medPriority.value = "Medium";
    medPriority.id = "new-todo-med";
    medPriority.required = true;
    let medPriorityLabel = document.createElement("label");
    medPriorityLabel.setAttribute("for", "new-todo-med");
    medPriorityLabel.id = "new-todo-med-label";
    medPriorityLabel.textContent = "Medium";

    let highPriority = document.createElement("input");   // show high priority button
    highPriority.classList.add("new-todo-priority-btn");
    highPriority.name = "new-priority";
    highPriority.type = "radio";
    highPriority.value = "High";
    highPriority.id = "new-todo-high";
    highPriority.required = true;
    let highPriorityLabel = document.createElement("label");
    highPriorityLabel.setAttribute("for", "new-todo-high");
    highPriorityLabel.id = "new-todo-high-label";
    highPriorityLabel.textContent = "High";

    if (toDo.priority == "Low") {   // show initial selected priority based off todos initial value
        lowPriority.checked = "checked";
    }
    else if (toDo.priority == "Medium") {
        medPriority.checked = "checked";
    }
    else {
        highPriority.checked = "checked";
    }


    toDoPriorityArea.append(toDoPriorityHeading, lowPriority, lowPriorityLabel, medPriority, medPriorityLabel, highPriority, highPriorityLabel);
    

    let toDoSubmit = document.createElement("button");   // show submit changes button
    toDoSubmit.type = "submit";
    toDoSubmit.classList.add("new-submit-btn");
    toDoSubmit.textContent = "SAVE CHANGES";
    toDoSubmit.addEventListener("click", () => {

        let prioritySelected = document.querySelector('input[name="new-priority"]:checked');   // get value of selected priority

        let selectedProject = toDoProjectSelect.options[toDoProjectSelect.selectedIndex].text;   // get value of selected project

        if (toDoTitle.value == "" || toDoDetails.value == "" || toDoDateSelect.value == "") {   // This ensures all form fields are filled

            return;
        }

        else {

            toDo.title = toDoTitle.value;   // update todos values with edits
            toDo.details = toDoDetails.value;
            toDo.project = selectedProject;
            toDo.date = parseISO(toDoDateSelect.value)
            toDo.priority = prioritySelected.value;
            localStorage.setItem("todos", JSON.stringify(toDoArray));   // reflect changes in local storage
            filterArrays();   // filter and reassign today and week arrays
            toggle('edit-form');   // hide edit form popup


            if (selectedProject == "None") {   // if no project selected, display home tab and all todos

                let toDoArea = document.getElementById("sidebar-todo-area");
                setActiveButton(toDoArea, ".sidebar-area");
                sectionDisplay(toDoArray);
            }


            else {
        
                let activeProject = document.getElementById(selectedProject);   // show tab for selected project
                setActiveButton(activeProject, ".sidebar-area");
                sectionDisplay(filterProjects(selectedProject));
            }
        }
    });
    
    card.append(exitBtn, toDoTitle, toDoDetails, toDoProjectArea, toDoDateArea, toDoPriorityArea, toDoSubmit);

    body.append(card);

    toggle("edit-form");   // dim background and make form visible
}





export const emptyToDoDisplay = function(arrayLength) {   // make display for empty todos is array is empty 

    if (arrayLength == 0) {

    
        let toDoArea = document.getElementById("main-area");
        toDoArea.innerHTML = "";

        let emptyToDoArea = document.createElement("div");
        emptyToDoArea.id = "empty-project-area";

        let emptyToDoHeading = document.createElement("div");   // show "Theres nothing here" header
        emptyToDoHeading.id = "empty-project-heading";
        emptyToDoHeading.textContent = "There's Nothing Here!";

        let emptyToDoText = document.createElement("div");   // show subtext
        emptyToDoText.id = "empty-project-text";
        emptyToDoText.textContent = "Create a new to-do item or project.";


        emptyToDoArea.append(emptyToDoHeading, emptyToDoText);   // add on to display
        toDoArea.append(emptyToDoArea);
    }

    else {
        return;   // if array not empty, do nothing
    }
}


export default sectionDisplay;


