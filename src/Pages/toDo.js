import format from "date-fns/format";
import isToday from "date-fns/isToday";
import isThisWeek from "date-fns/isThisWeek";
import { toggle } from "./pageLoad";

export const toDoArray = [];   // holds all todos
export let todayToDoArray = [];   // will hold todos for current day
export let weekToDoArray = [];   // will hold todos for current week


const filterArrays = function() {   // filter arrays

    todayToDoArray = toDoArray.filter(function(toDo) {   // filter all todos for today's date
        return isToday(toDo.date);
    })

    weekToDoArray = toDoArray.filter(function(toDo) {   // filter all todos for the week
        return isThisWeek(toDo.date);
    })
}


const toDoFactory = (function() {

    const toDoFactory = (title, project, priority, date, details) => {   //Factory Function that creates toDos

        return {title, project, priority, date, details};
    };

    const sampleToDo = toDoFactory("Title", "Project", "High", new Date(2023, 3, 5), "Finish this");
    const sampleToDoTwo = toDoFactory("Kill Ali", "Daily Tasks", "Medium", new Date(2023, 3, 5), "This needs to be done immediately, by any means necessary");
    const sampleToDoThree = toDoFactory("Kill Shams", "Daily Tasks", "Low", new Date(2023, 3, 7), "This idiot can be useful so this can wait");


    toDoArray.push(sampleToDo, sampleToDoTwo, sampleToDoThree, sampleToDo, sampleToDoTwo, sampleToDoThree);
    console.log(toDoArray);

    filterArrays();

})();



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
        toDoCheck.addEventListener('change', e => {   // checks if todo is checked and style based off of that
            if (toDoCheck.checked) {
                toDoCard.classList.add("checked");
                toDoLeft.classList.add("checked");
                toDoDetails.classList.add("checked");
                toDoDate.classList.add("checked");
                editArea.classList.add("checked");
                deleteArea.classList.add("checked");
            }
            if (!toDoCheck.checked) {
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
        toDoDetails.addEventListener('click', e => {
            console.log("details pressed");
            detailsDisplay(toDo);
        });

        let toDoDate = document.createElement("div");   // add date to todo
        toDoDate.classList.add("todo-date");
        toDoDate.textContent = format(toDo.date, 'LLL do');   // format date to look like "Mar 17"

        let editArea = document.createElement("a");  // used to wrap svg so cursor:pointer works
        editArea.classList.add("todo-icon-wrap");
        let editButton = document.createElement("object");   // add edit button to todos
        editButton.classList.add("todo-icon");
        editButton.type = "image/svg+xml";
        editButton.data = "/src/Assets/Images/edit-button.svg";
        editArea.append(editButton);

        let deleteArea = document.createElement("a");   // wrap svg so cursor:pointer works
        deleteArea.classList.add("todo-icon-wrap");
        let deleteButton = document.createElement("object");   // add delete button to todos
        deleteButton.classList.add("todo-icon");
        deleteButton.type = "image/svg+xml";
        deleteButton.data = "/src/Assets/Images/trash-can.svg";

        deleteArea.addEventListener('click', event => {   // remove note from array and display 
            event.target.parentNode.parentNode.style.opacity = "0";   // transition effect to make todo fade
            setTimeout(() => event.target.parentNode.parentNode.remove(), 400);
            toDoArray.splice(toDoArray.indexOf(toDo), 1);   // remove todo from the array
            filterArrays();   // filter todoArray to get arrays for today and for the week
        });

        deleteArea.append(deleteButton);

        toDoLeft.append(toDoLabel, toDoTitle);   // add label and title to left side
        toDoRight.append(toDoDetails, toDoDate, editArea, deleteArea);   // add date, edit, and del to right side
        toDoCard.append(toDoLeft, toDoRight);  // combine both sides and add to todo card
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
    dateName.textContent = format(todo.date, 'LLL do, yyyy');
    dateArea.append(dateHeading, dateName);

    let detailsArea = document.createElement("div");   // display details 
    detailsArea.classList.add("details-form-section");
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



export default sectionDisplay;


