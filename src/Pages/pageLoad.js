import notesDisplay from "./notes";
import sectionDisplay from "./toDo";
import { toDoArray } from "./toDo";
import { todayToDoArray } from "./toDo";
import { weekToDoArray } from "./toDo";
import { notesArray } from "./notes";
import { notesFactory } from "./notes";
import { toDoFactory } from "./toDo";
import parseISO from "date-fns/parseISO";
import { filterArrays } from "./toDo";
import { projectsArray } from "./projects";
import { projectListDisplay } from "./projects";
import { filterProjects } from "./projects";
import { emptyToDoDisplay } from "./toDo";





const pageLoad = function() {   // initial page load, get local storage, display all todos on home tab

  let storedToDos = JSON.parse(localStorage.getItem("todos"));   // get stored todos if any

  let storedNotes = JSON.parse(localStorage.getItem("notes"));   // get stored notes if any

  let storedProjects = JSON.parse(localStorage.getItem("projects"));   // get stored projects if any

  if (storedToDos) {   // if todos stored, retrieve

    storedToDos.forEach(function(toDo) {
      toDo.date = parseISO(toDo.date);   // parse date so it's readable by date-fns api for filtering todos by date
    })
    toDoArray = storedToDos;   // assign stored todos to the toDoArray
    filterArrays();   // filter todos based off current day and week
  }

  if (storedNotes) {   // if notes found, retrieve
    notesArray = storedNotes;
  }

  if (storedProjects) {   // if projects stored, retrieve 
    projectsArray = storedProjects;
  }

  let content = document.querySelector("#content");
  let container = document.getElementById("dim");

  let header = document.createElement("header");   // header content
  let logo = document.createElement("div");
  logo.id = "logo";

  let sidebarMenu = document.createElement("div");   // hamburger menu for sidebar when screen is smaller
  sidebarMenu.id = "sidebar-menu";
  let bar1 = document.createElement("div");
  let bar2 = document.createElement("div");
  let bar3 = document.createElement("div");
  bar1.classList.add("bar1");
  bar2.classList.add("bar2");
  bar3.classList.add("bar3");
  sidebarMenu.append(bar1, bar2, bar3);
  sidebarMenu.onclick = function() {   // onclick function which animates hamburger menu and shows/hides sidebar
    let sidebar = document.getElementById("nav");
    sidebarMenu.classList.toggle("change");
    
    if (sidebar.classList.length == 0) {
      sidebar.classList.add("show");
    }

    else if (sidebar.classList.contains("hide")) {

      sidebar.classList.remove("hide");
      sidebar.classList.add("show");
    }
    else if (sidebar.classList.contains("show")) {
      sidebar.classList.remove("show");
      sidebar.classList.add("hide");
    } 
  }


  let headerImage = document.createElement("img");
  let headerTitle = document.createElement("div");
  headerImage.src = "Assets/Images/agenda.png";
  headerTitle.textContent = "To-Do List";
  logo.append(headerImage, headerTitle);
  header.append(logo, sidebarMenu);
  container.insertAdjacentElement("afterbegin", header);   // end of header content --


  let footer = document.createElement("footer");  // footer content
  let footerText = document.createElement("p");
  let footerLink = document.createElement("a");
  let footerImg = document.createElement("img");

  footerText.textContent = "Created by:";
  footerImg.src = "Assets/Images/GitHub-Mark-Light-32px.png";
  footerLink.href = "https://github.com/dtariq1995";
  footerLink.textContent = "Daanyaal Tariq";

  footer.append(footerText, footerImg, footerLink);   // end of footer content --

  content.insertAdjacentElement("afterend", footer);

  sidebarLoad();   // load sidebar which includes nav and new item button

  let main = document.createElement("div");   // main content area where todos and notes will appear
  main.id = "main-area";
  content.append(main);
  sectionDisplay(toDoArray);   // display all todos 
  emptyToDoDisplay(toDoArray.length);   // check if no todos and show display based off that
  newItemDisplay();   // add floating add item button
}





const sidebarLoad = function() {   // load sidebar content

  let content = document.querySelector("#content");

  let sidebar = document.createElement("div");
  sidebar.id = "sidebar";

  let homeArea = document.createElement("div");   // home button icon and text 
  homeArea.classList.add("sidebar-area");
  homeArea.id = "sidebar-todo-area";
  let homeImg = document.createElement("img");
  homeImg.src = "Assets/Images/houseicon.png";
  let homeButton = document.createElement("button");
  homeButton.classList.add("side-button");
  homeButton.textContent = "Home";
  homeArea.append(homeImg, homeButton);
  homeArea.classList.add("active");
  homeButton.addEventListener("click", (e) => {
    if (e.target.parentNode.classList.contains("active")) return;   // don't load if already active
    setActiveButton(homeArea, ".sidebar-area");   // set home to active button
    sectionDisplay(toDoArray);   // display all todos
    emptyToDoDisplay(toDoArray);   // unless empty, then load empty display
  })

  let todayArea = document.createElement("div");   // today button icon and text
  todayArea.classList.add("sidebar-area");
  todayArea.id = "sidebar-today-area";
  let todayImg = document.createElement("img");
  todayImg.src = "Assets/Images/dayicon.png";
  let todayButton = document.createElement("button");
  todayButton.classList.add("side-button");
  todayButton.textContent = "Today";
  todayArea.append(todayImg, todayButton);
  todayButton.addEventListener("click", (e) => {
    if (e.target.parentNode.classList.contains("active")) return;   // don't load if already active
    setActiveButton(todayArea, ".sidebar-area");   // set today button to active
    sectionDisplay(todayToDoArray);   // display todos due current day
    emptyToDoDisplay(todayToDoArray);  // check if empty
  })

  let weekArea = document.createElement("div");   // week button icon and text
  weekArea.classList.add("sidebar-area");
  weekArea.id = "sidebar-week-area";
  let weekImg = document.createElement("img")
  weekImg.src = "Assets/Images/weekicon.png";
  let weekButton = document.createElement("button");
  weekButton.classList.add("side-button");
  weekButton.textContent = "Week";
  weekArea.append(weekImg, weekButton);
  weekButton.addEventListener("click", (e) => {   
    if (e.target.parentNode.classList.contains("active")) return;   // don't load if already active
    setActiveButton(weekArea, ".sidebar-area");   // set week button to active
    sectionDisplay(weekToDoArray);   // display todos due current week
    emptyToDoDisplay(weekToDoArray);   // show empty display if no todos
  })

  let projectsArea = document.createElement("div");   // projects area icon and text
  projectsArea.classList.add("sidebar-area");
  projectsArea.id = "projects-area";
  let projectsImg = document.createElement("img");
  projectsImg.src = "Assets/Images/projectsicon.png";
  let projectsButton = document.createElement("div");
  projectsButton.classList.add("projects-title");
  projectsButton.textContent = "Projects";
  projectsArea.append(projectsImg, projectsButton);

  let notesArea = document.createElement("div");   // notes button icon and text
  notesArea.classList.add("sidebar-area");
  notesArea.id = "sidebar-notes-area";
  let notesImg = document.createElement("img");
  notesImg.src = "Assets/Images/noteicon.png";
  let notesButton = document.createElement("button");
  notesButton.classList.add("side-button");
  notesButton.textContent = "Notes";
  notesArea.append(notesImg, notesButton);
  notesButton.addEventListener("click", (e) => {   
    if (e.target.parentNode.classList.contains("active")) return;   // don't reload if already selected
    setActiveButton(notesArea, ".sidebar-area");   // set notes button as active button
    notesDisplay();   // display the notes
  })

  let projectsListArea = document.createElement("div");
  projectsListArea.id = "projects-list";


  let addItem = document.createElement("div");   // floating add new item button
  addItem.id = "newItem";
  addItem.textContent = "+";
  addItem.addEventListener('click', () => {
    toggle('new-item-form');   // display new item form on click
    newToDoDisplay();   // preload the todo form on initial click
  })

  let navContainer = document.createElement("div");   // container for nav items so all nav items stay at top
  navContainer.id = "nav";

  sidebar.append(homeArea, todayArea, weekArea, projectsArea, projectsListArea, notesArea);   // sidebar combined in one div
  navContainer.append(sidebar, addItem);   // add sidebar and new item button to container with sidebar
  content.append(navContainer);   // add to main page
  projectListDisplay();   // display the list of projects under project button
}





export function setActiveButton(button, btnClass) {   // if button clicked, add active class, if different button clicked, remove active class and add to now clicked button
  
  let buttons = document.querySelectorAll(btnClass);   // get all buttons containing this class

  buttons.forEach((button) => {
    if (button !== this) {
      button.classList.remove("active");   // remove active class if button isn't equivalent to one selected
    }
  });

  button.classList.add("active");   // add active class to specific button on click
}





export function getActiveButton(btnClass) {   // checks which button is the currently active button and returns it
  
  let buttons = document.querySelectorAll(btnClass);   // get all buttons containing this class
  let activeButton;

  buttons.forEach((button) => {
    if (button.classList.contains("active")) {   // check which button is active from these buttons
      activeButton = button.id;
    }
  })
  return activeButton;   // retrieve id of active button
}





export function toggle(elementID) {   // this function dims the background when various modals pop up

  let dim = document.getElementById('dim');   
  dim.classList.toggle('active');
  let form = document.getElementById(elementID);
  form.classList.toggle('active');
}





const newItemDisplay = function() {

  let body = document.body;
  let newItemForm = document.createElement("div");   // body for new item form
  newItemForm.id = "new-item-form";

  let newItemHeader = document.createElement("div");   // header for new item form
  newItemHeader.id = "new-item-header";
  let newItemHeaderText = document.createElement("div");
  newItemHeaderText.textContent = "Create a new...";
  let newItemExit = document.createElement("button");
  newItemExit.textContent = "×";
  newItemExit.id = "new-item-exit-btn";
  newItemExit.addEventListener('click', () => {   // close form when user clicks on new item form "x"
      toggle('new-item-form');
      let newItemNavToDoArea = document.getElementById("new-item-nav-todo-area");
      setActiveButton(newItemNavToDoArea, ".new-item-nav-area");
      let newItemMain = document.getElementById("new-item-main");
      newItemMain.innerHTML = "";
  });
  newItemHeader.append(newItemHeaderText, newItemExit);


  let newItemBody = document.createElement("div");   // body area which holds sidebar and main content
  newItemBody.id = "new-item-body";

  let newItemNav = document.createElement("div");   // sidebar for new item form
  newItemNav.id = "new-item-nav";


  let newItemNavToDoArea = document.createElement("div");   // create todo tab for sidebar
  newItemNavToDoArea.classList.add("new-item-nav-area");
  let newItemNavToDoImg = document.createElement("img"); 
  newItemNavToDoImg.src = "Assets/Images/agenda-dark.png";
  let newItemNavToDo = document.createElement("div");
  newItemNavToDo.classList.add("new-item-nav-button");
  newItemNavToDo.textContent = "To-Do";  
  newItemNavToDoArea.id = "new-item-nav-todo-area";
  newItemNavToDoArea.classList.add("active");
  newItemNavToDo.addEventListener("click", (e) => {
    if (e.target.parentNode.classList.contains("active")) return;   // don't reload if already selected
    setActiveButton(newItemNavToDoArea, ".new-item-nav-area");   // set todo tab to active
    newToDoDisplay();   // show new todo form
  })
  newItemNavToDoArea.append(newItemNavToDoImg, newItemNavToDo);


  let newItemNavProjectArea = document.createElement("div");   // create project tab for sidebar
  newItemNavProjectArea.classList.add("new-item-nav-area");
  let newItemProjectsImg = document.createElement("img");
  newItemProjectsImg.src = "Assets/Images/projectsicon.png";
  let newItemNavProject = document.createElement("div");
  newItemNavProject.classList.add("new-item-nav-button");
  newItemNavProject.textContent = "Project";
  newItemNavProject.addEventListener("click", (e) => {
    if (e.target.parentNode.classList.contains("active")) return;   // don't reload if already selected
    setActiveButton(newItemNavProjectArea, ".new-item-nav-area");   // set new project tab to active
    newProjectDisplay();   // show new project form
  })
  newItemNavProjectArea.append(newItemProjectsImg, newItemNavProject);


  let newItemNavNoteArea = document.createElement("div");   // create note tab for sidebar
  newItemNavNoteArea.classList.add("new-item-nav-area");
  let newItemNotesImg = document.createElement("img");
  newItemNotesImg.src = "Assets/Images/noteicon.png";
  let newItemNavNote = document.createElement("div");
  newItemNavNote.classList.add("new-item-nav-button");
  newItemNavNote.textContent = "Note";
  newItemNavNote.addEventListener("click", (e) => {
    if (e.target.parentNode.classList.contains("active")) return;   // don't reload if already selected
    setActiveButton(newItemNavNoteArea, ".new-item-nav-area");   // set note tab to active
    newNoteDisplay();   // display new note form
  })
  newItemNavNoteArea.append(newItemNotesImg, newItemNavNote);


  newItemNav.append(newItemNavToDoArea, newItemNavProjectArea, newItemNavNoteArea);

  let newItemMain = document.createElement("form");   // main content area for new item form
  newItemMain.setAttribute("onsubmit", "return false");   // this stops page from reloading on submit while still keeping form validation
  newItemMain.id = "new-item-main";

  newItemBody.append(newItemNav, newItemMain);
  newItemForm.append(newItemHeader, newItemBody);
  body.append(newItemForm);
}





const newNoteDisplay = function() {   // display for new note tab

  let notesArea = document.getElementById("sidebar-notes-area");
  let newItemFormArea = document.getElementById("new-item-main");
  newItemFormArea.innerHTML = "";   // clear out any content before adding new note display
  let newNoteForm = document.createElement("div");
  newNoteForm.id = "new-note-area";

  let noteTitle = document.createElement("textarea");   // add area for user to enter title 
  noteTitle.id = "new-note-title";
  noteTitle.contentEditable = "true";
  noteTitle.placeholder = "Title";
  noteTitle.maxLength = 20;
  noteTitle.required = true;

  let noteDetails = document.createElement("textarea");   // add area for user to enter details
  noteDetails.id = "new-note-details";
  noteDetails.contentEditable = "true";
  noteDetails.placeholder = "Details";
  noteDetails.maxLength = 185;
  noteDetails.required = true;

  let noteSubmit = document.createElement("button");   // add button to submit new note
  noteSubmit.classList.add("new-submit-btn");
  noteSubmit.textContent = "CREATE NOTE";
  noteSubmit.addEventListener("click", () => {

    if (noteTitle.value == "" || noteDetails.value == "") {   // don't allow user to submit if note doesn't have title or details value
      return;
    }
    
    else {
      let newNote = notesFactory(noteTitle.value, noteDetails.value);   // call note factory function to create new note
      notesArray.push(newNote);   // add new note to notes array
      localStorage.setItem("notes", JSON.stringify(notesArray));   // reflect change in local storage
      toggle('new-item-form');   // hide the new item form
      let newItemNavToDoArea = document.getElementById("new-item-nav-todo-area");
      setActiveButton(newItemNavToDoArea, ".new-item-nav-area");   // set todo tab as active for when new item form is toggled again
      setActiveButton(notesArea, ".sidebar-area");   // set notes button on sidebar as active button
      notesDisplay();   // display notes
    }
  });

  newNoteForm.append(noteTitle, noteDetails, noteSubmit);

  newItemFormArea.append(newNoteForm);
}





const newToDoDisplay = function() {   // display for new todo tab
  

  let toDoArea = document.getElementById("sidebar-todo-area");
  let newItemFormArea = document.getElementById("new-item-main");
  newItemFormArea.innerHTML = "";   // clear out any content before adding new todo display
  let newToDoForm = document.createElement("div");
  newToDoForm.id = "new-todo-area";

  let toDoTitle = document.createElement("textarea");   // add area to enter todo title
  toDoTitle.id = "new-todo-title";
  toDoTitle.contentEditable = true;
  toDoTitle.placeholder = "Title: Fix Sink";
  toDoTitle.maxLength = 25;
  toDoTitle.required = true;

  let toDoDetails = document.createElement("textarea");   // add area to enter todo details
  toDoDetails.id = "new-todo-details";
  toDoDetails.contentEditable = "true";
  toDoDetails.placeholder = "Details: Replace soap dispenser and garbage disposal.";
  toDoDetails.maxLength = 200;
  toDoDetails.required = true;

  let toDoProjectArea = document.createElement("div");   // add area where project is selected from dropdown list
  toDoProjectArea.id = "new-todo-project-area";
  let toDoProjectHeading = document.createElement("div");
  toDoProjectHeading.id = "new-todo-project-heading";
  toDoProjectHeading.classList.add("new-todo-heading");
  toDoProjectHeading.textContent = "Project: ";
  let toDoProjectSelect = document.createElement("select");
  toDoProjectSelect.id = "project-select";
  let noProjectOption = document.createElement("option");   // add "None" as first value in dropdown
  noProjectOption.value = "None";   
  noProjectOption.textContent = "None";
  toDoProjectSelect.append(noProjectOption);
  projectsArray.forEach(function(project) {   // add every project from projects array as an option
    let projectOption = document.createElement("option");
    projectOption.value = project;
    projectOption.textContent = project;
    toDoProjectSelect.append(projectOption);
  });
  toDoProjectArea.append(toDoProjectHeading, toDoProjectSelect);

  let toDoDateArea = document.createElement("div");   // add area to select todo due date
  toDoDateArea.id = "new-todo-date-area";
  let toDoDateHeading = document.createElement("div");
  toDoDateHeading.classList.add("new-todo-heading");
  toDoDateHeading.textContent = "Due Date: ";
  let toDoDateSelect = document.createElement("input");
  toDoDateSelect.classList.add("new-todo-date");
  toDoDateSelect.type = "date";
  toDoDateSelect.required = true;
  toDoDateArea.append(toDoDateHeading, toDoDateSelect);

  let toDoPriorityArea = document.createElement("div");   // add area to select todo priority
  toDoPriorityArea.id = "new-todo-priority-area";
  let toDoPriorityHeading = document.createElement("div");
  toDoPriorityHeading.id = "new-todo-priority-heading";
  toDoPriorityHeading.classList.add("new-todo-heading");
  toDoPriorityHeading.textContent = "Priority: ";

  let lowPriority = document.createElement("input");   // add low priority button
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

  let medPriority = document.createElement("input");   // add medium priority button
  medPriority.classList.add("new-todo-priority-btn");
  medPriority.name = "new-priority";
  medPriority.type = "radio";
  medPriority.value = "Medium";
  medPriority.id = "new-todo-med";
  medPriority.checked = "checked";
  medPriority.required = true;
  let medPriorityLabel = document.createElement("label");
  medPriorityLabel.setAttribute("for", "new-todo-med");
  medPriorityLabel.id = "new-todo-med-label";
  medPriorityLabel.textContent = "Medium";

  let highPriority = document.createElement("input");   // add high priority button
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

  toDoPriorityArea.append(toDoPriorityHeading, lowPriority, lowPriorityLabel, medPriority, medPriorityLabel, highPriority, highPriorityLabel);
  

  let toDoSubmit = document.createElement("button");   // add new todo sumbit button
  toDoSubmit.type = "submit";
  toDoSubmit.classList.add("new-submit-btn");
  toDoSubmit.textContent = "CREATE TO-DO";
  toDoSubmit.addEventListener("click", () => {

    let prioritySelected = document.querySelector('input[name="new-priority"]:checked');   // get selected priority by checking which button/label is checked

    let selectedProject = toDoProjectSelect.options[toDoProjectSelect.selectedIndex].text;   // get selected project by getting text of chosen option from dropdown

    if (toDoTitle.value == "" || toDoDetails.value == "" || Object.is(prioritySelected, null) || toDoDateSelect.value == "") {   // if anything isn't selected, the form won't submit

      return;
    }
    
    else {
      let newToDo = toDoFactory(toDoTitle.value, selectedProject, prioritySelected.value, parseISO(toDoDateSelect.value), toDoDetails.value);   // create new todo with entered/selected information
      toDoArray.push(newToDo);   // add new todo to toDoArray
      localStorage.setItem("todos", JSON.stringify(toDoArray));   // reflect change in local storage
      filterArrays();   // filter today and week arrays with new todos
      toggle('new-item-form');   // hide the new item form
      let newItemMain = document.getElementById("new-item-main");
      newItemMain.innerHTML = "";   // clear out the form area
      let newItemNavToDoArea = document.getElementById("new-item-nav-todo-area");
      setActiveButton(newItemNavToDoArea, ".new-item-nav-area");   // set new todo tab as active button for new item form

      
      if (selectedProject == "None") {   // if no project selected

        setActiveButton(toDoArea, ".sidebar-area");   // set home page as active button on sidebar
        sectionDisplay(toDoArray);   // display all todos
      }

      else {   // if project selected

        let activeProject = document.getElementById(selectedProject);   // get selected project
        setActiveButton(activeProject, ".sidebar-area");   // set button for selected project as active on sidebar
        sectionDisplay(filterProjects(selectedProject));   // display all todos for the selected project
      }
    }
  });

  newToDoForm.append(toDoTitle, toDoDetails, toDoProjectArea, toDoDateArea, toDoPriorityArea, toDoSubmit);

  newItemFormArea.append(newToDoForm);
}





const newProjectDisplay = function() {   // display for new project tab

  let projectArea = document.getElementById("sidebar-todo-area");
  let newItemFormArea = document.getElementById("new-item-main");
  newItemFormArea.innerHTML = "";   // clear out any content before adding new todo display
  let newProjectForm = document.createElement("div");
  newProjectForm.id = "new-project-area";

  let projectTitle = document.createElement("textarea");   // add area for user to enter title 
  projectTitle.id = "new-project-title";
  projectTitle.contentEditable = "true";
  projectTitle.placeholder = "Project: House Renovations";
  projectTitle.maxLength = 20;
  projectTitle.required = true;

  let projectSubmit = document.createElement("button");   // add button to submit new project
  projectSubmit.classList.add("new-submit-btn");
  projectSubmit.textContent = "CREATE PROJECT";
  projectSubmit.addEventListener("click", () => {

    if (projectTitle.value == "")  return;   // prevent user from submitting project with no title

    else {
      projectsArray.push(projectTitle.value);   // add new project to projects array
      localStorage.setItem("projects", JSON.stringify(projectsArray));   // reflect change in projects array
      toggle('new-item-form');   // hide the new item form
      let newItemNavToDoArea = document.getElementById("new-item-nav-todo-area");
      setActiveButton(newItemNavToDoArea, ".new-item-nav-area");   // set todo tab as active in new item form
      setActiveButton(projectArea, ".sidebar-area");   // display home button on sidebar as active
      projectListDisplay();   // reload the projects and redisplay them
    }
  });

  newProjectForm.append(projectTitle, projectSubmit);
  newItemFormArea.append(newProjectForm);

}


export default pageLoad;