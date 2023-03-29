import format from "date-fns/format";
import isToday from "date-fns/isToday";
import isThisWeek from "date-fns/isThisWeek";

export const toDoArray = [];
export let todayToDoArray = [];
export let weekToDoArray = [];

const toDoFactory = (function() {


    const toDoFactory = (title, project, priority, date, details) => {   //Factory Function that creates toDos

        return {title, project, priority, date, details};
    };

    const sampleToDo = toDoFactory("Title", "Project", "High", new Date(2023, 2, 20), "Finish this");
    const sampleToDoTwo = toDoFactory("Kill Ali", "Daily Tasks", "Medium", new Date(2023, 2, 27), "This needs to be done immediately, by any means necessary");
    const sampleToDoThree = toDoFactory("Kill Shams", "Daily Tasks", "Easy", new Date(2023, 2, 29), "This idiot can be useful so this can wait");


    toDoArray.push(sampleToDo, sampleToDoTwo, sampleToDoThree, sampleToDo, sampleToDoTwo, sampleToDoThree);
    console.log(toDoArray);

    todayToDoArray = toDoArray.filter(function(toDo) {   // filter all todos for today's date
        return isToday(toDo.date);
    })

    weekToDoArray = toDoArray.filter(function(toDo) {   // filter all todos for the week
        return isThisWeek(toDo.date);
    })


})();

const sectionDisplay = function(arrayToDisplay) {   // display all to-dos

    let displayArea = document.querySelector("#main-area");
    displayArea.innerHTML = "";

    let toDoDisplayArea = document.createElement("div");
    toDoDisplayArea.id = "todo-area"; 


    arrayToDisplay.forEach(function(toDo) {

        let toDoCard = document.createElement("div");
        toDoCard.classList.add("todo-card");

        if (toDo.priority === "High") {
            toDoCard.style.borderLeft = "3px solid red";
        }
        else if (toDo.priority === "Medium") {
            toDoCard.style.borderLeft = "3px solid orange";
        }
        else {
            toDoCard.style.borderLeft = "3px solid green";
        }
        let toDoLabel = document.createElement("label");
        let toDoCheck = document.createElement("input");
        toDoCheck.setAttribute("type", "checkbox");
        let toDoSpan = document.createElement("span");
        toDoLabel.append(toDoCheck, toDoSpan);

        let toDoTitle = document.createElement("div");
        toDoTitle.textContent = toDo.title;
        toDoTitle.classList.add("todo-title");

        let toDoLeft = document.createElement("div");
        toDoLeft.classList.add("todo-right");
        let toDoRight = document.createElement("div");
        toDoRight.classList.add("todo-right");

        let toDoDate = document.createElement("div");
        toDoDate.classList.add("todo-date");
        toDoDate.textContent = format(toDo.date, 'LLL do');

        let editButton = document.createElement("object");
        editButton.type = "image/svg+xml";
        editButton.data = "/src/Assets/Images/edit-button.svg";
        editButton.classList.add("todo-icon");

        let deleteButton = document.createElement("object");
        deleteButton.type = "image/svg+xml";
        deleteButton.data = "/src/Assets/Images/trash-can.svg";
        deleteButton.classList.add("todo-icon");

        toDoLeft.append(toDoLabel, toDoTitle);
        toDoRight.append(toDoDate, editButton, deleteButton);
        toDoCard.append(toDoLeft, toDoRight);
        toDoDisplayArea.append(toDoCard);

    });

    displayArea.append(toDoDisplayArea);
}




export default sectionDisplay;


