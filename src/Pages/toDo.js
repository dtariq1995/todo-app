import format from "date-fns/format";
import isToday from "date-fns/isToday";
import isThisWeek from "date-fns/isThisWeek";
import { toggle } from "./pageLoad";
import parseISO from "date-fns/parseISO";


export const toDoArray = [];   // holds all todos
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



export const toDoFactory = (title, project, priority, date, details) => {   //Factory Function that creates toDos

    return {title, project, priority, date, details};
};

const sampleToDo = toDoFactory("Title", "Project", "High", new Date(2023, 3, 23), "Finish this");
const sampleToDoTwo = toDoFactory("Kill Ali", "Daily Tasks", "Medium", new Date(2023, 3, 23), "This needs to be done immediately, by any means necessary");
const sampleToDoThree = toDoFactory("Kill Shams", "Daily Tasks", "Low", new Date(2023, 3, 28), "This idiot can be useful so this can wait");


toDoArray.push(sampleToDo, sampleToDoTwo, sampleToDoThree, sampleToDo, sampleToDoTwo, sampleToDoThree, sampleToDo, sampleToDoTwo, sampleToDoThree, sampleToDo, sampleToDoTwo, sampleToDoThree, sampleToDo, sampleToDoTwo, sampleToDoThree, sampleToDo, sampleToDoTwo, sampleToDoThree);
console.log(toDoArray);

filterArrays();





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

        editArea.addEventListener('click', () => {
            console.log("edit clicked");
            editToDoDisplay(toDo);
        });

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

const editToDoDisplay = function(toDo) {   // brings up display to edit a todo when user clicks edit button

  
    console.log("edit clicked");

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

    let toDoTitle = document.createElement("textarea");
    toDoTitle.id = "new-todo-title";
    toDoTitle.contentEditable = true;
    toDoTitle.placeholder = toDo.title;
    toDoTitle.textContent = toDo.title;
    toDoTitle.maxLength = 25;
    toDoTitle.required = true;

    let toDoDetails = document.createElement("textarea");
    toDoDetails.id = "new-todo-details";
    toDoDetails.contentEditable = "true";
    toDoDetails.placeholder = toDo.details;
    toDoDetails.textContent = toDo.details;
    toDoDetails.maxLength = 200;
    toDoDetails.required = true;

    let toDoDateArea = document.createElement("div");
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

    let toDoPriorityArea = document.createElement("div");
    toDoPriorityArea.id = "new-todo-priority-area";
    let toDoPriorityHeading = document.createElement("div");
    toDoPriorityHeading.id = "new-todo-priority-heading";
    toDoPriorityHeading.classList.add("new-todo-heading");
    toDoPriorityHeading.textContent = "Priority: ";

    let lowPriority = document.createElement("input");
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

    let medPriority = document.createElement("input");
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

    let highPriority = document.createElement("input");
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

    if (toDo.priority == "Low") {
        lowPriority.checked = "checked";
    }
    else if (toDo.priority == "Medium") {
        medPriority.checked = "checked";
    }
    else {
        highPriority.checked = "checked";
    }


    toDoPriorityArea.append(toDoPriorityHeading, lowPriority, lowPriorityLabel, medPriority, medPriorityLabel, highPriority, highPriorityLabel);
    

    let toDoSubmit = document.createElement("button");
    toDoSubmit.type = "submit";
    toDoSubmit.classList.add("new-submit-btn");
    toDoSubmit.textContent = "SAVE CHANGES";
    toDoSubmit.addEventListener("click", () => {

        let prioritySelected = document.querySelector('input[name="new-priority"]:checked');
        console.log(Object.is(prioritySelected, null));

        if (toDoTitle.value == "" || toDoDetails.value == "" || Object.is(prioritySelected, null) || toDoDateSelect.value == "") {   // This ensures all form fields are filled

            return;
        }

        else {

            toDo.title = toDoTitle.value;
            toDo.details = toDoDetails.value;
            toDo.date = parseISO(toDoDateSelect.value)
            toDo.priority = prioritySelected.value;
            filterArrays();
            console.log(toDoArray);
            toggle('edit-form');
            sectionDisplay(toDoArray);
        }

    });
    
    card.append(exitBtn, toDoTitle, toDoDetails, toDoDateArea, toDoPriorityArea, toDoSubmit);

    body.append(card);

    toggle("edit-form");   // dim background and make form visible

}

export default sectionDisplay;


