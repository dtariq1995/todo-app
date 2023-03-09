const toDoArray = [];

const toDo = (function() {


    const toDoFactory = (title, project, priority, date, details) => {   //Factory Function that creates toDos

        return {title, project, priority, date, details};
    };

    const sampleToDo = toDoFactory("Title", "Project", "High", "Today", "Finish this");
    const sampleToDoTwo = toDoFactory("Kill Ali", "Daily Tasks", "High", "Today", "This needs to be done immediately, by any means necessary");

    toDoArray.push(sampleToDo, sampleToDoTwo, sampleToDo, sampleToDoTwo);
    console.log(toDoArray);
})();

const homeDisplay = function() {   // display all to-dos

    let displayArea = document.querySelector("#main-area");
    displayArea.innerHTML = "";

    let toDoDisplayArea = document.createElement("div");
    toDoDisplayArea.id = "todo-area"; 


    toDoArray.forEach(function(toDo) {

        let toDoCard = document.createElement("div");
        toDoCard.classList.add("todo-card");

        let toDoTitle = document.createElement("div");
        toDoTitle.textContent = toDo.title;
        toDoTitle.classList.add("todo-title");

        let toDoDetails = document.createElement("div");
        toDoDetails.textContent = toDo.details;
        toDoDetails.classList.add("todo-details");

        toDoCard.append(toDoTitle, toDoDetails);
        toDoDisplayArea.append(toDoCard);

    });

    displayArea.append(toDoDisplayArea);
}




export default homeDisplay;


