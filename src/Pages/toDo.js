

const toDo = (function() {


    const toDoFactory = (toDoTitle, toDoProject, toDoPriority, toDoDate, toDoDetails) => {   //Factory Function that creates toDos

        return {toDoTitle, toDoProject, toDoPriority, toDoDate, toDoDetails};
    };

    const sampleToDo = toDoFactory("Title", "Project", "High", "Today", "Finish this");

    console.log(sampleToDo);

})();


export default toDo;


