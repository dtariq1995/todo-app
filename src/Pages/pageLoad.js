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





const pageLoad = function() {   // add skeleton for header, sidebar, main content, and footer

  let content = document.querySelector("#content");
  let container = document.getElementById("dim");

  let header = document.createElement("header");   // header content
  let logo = document.createElement("div");
  logo.id = "logo";
  let headerImage = document.createElement("img");
  let headerTitle = document.createElement("div");
  headerImage.src = "/src/Assets/Images/agenda.png";
  headerTitle.textContent = "To-Do List";
  logo.append(headerImage, headerTitle);
  header.append(logo);
  container.insertAdjacentElement("afterbegin", header);


  let footer = document.createElement("footer");  // footer content
  let footerText = document.createElement("p");
  let footerLink = document.createElement("a");
  let footerImg = document.createElement("img");

  footerText.textContent = "Created by:";
  footerImg.src = "/src/Assets/Images/GitHub-Mark-Light-32px.png";
  footerLink.href = "https://github.com/dtariq1995";
  footerLink.textContent = "Daanyaal Tariq";

  footer.append(footerText, footerImg, footerLink);

  content.insertAdjacentElement("afterend", footer);

  sidebarLoad();   // load sidebar which includes nav and new item button

  let main = document.createElement("div");   // main content area where todos and notes will appear
  main.id = "main-area";
  content.append(main);
  sectionDisplay(toDoArray);
  newItemDisplay();
}






const sidebarLoad = function() {   // load sidebar content

  let content = document.querySelector("#content");

  let sidebar = document.createElement("div");
  sidebar.id = "sidebar";

  let homeArea = document.createElement("div");   // home button content
  homeArea.classList.add("sidebar-area");
  homeArea.id = "sidebar-todo-area";
  let homeImg = document.createElement("img");
  homeImg.src = "/src/Assets/Images/houseicon.png";
  let homeButton = document.createElement("button");
  homeButton.classList.add("side-button");
  homeButton.textContent = "Home";
  homeArea.append(homeImg, homeButton);
  homeArea.classList.add("active");
  homeButton.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(homeArea, ".sidebar-area");
    sectionDisplay(toDoArray);
  })

  let todayArea = document.createElement("div");   // today button content
  todayArea.classList.add("sidebar-area");
  let todayImg = document.createElement("img");
  todayImg.src = "/src/Assets/Images/dayicon.png";
  let todayButton = document.createElement("button");
  todayButton.classList.add("side-button");
  todayButton.textContent = "Today";
  todayArea.append(todayImg, todayButton);
  todayButton.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(todayArea, ".sidebar-area");
    sectionDisplay(todayToDoArray);
  })

  let weekArea = document.createElement("div");   // week button content
  weekArea.classList.add("sidebar-area");
  let weekImg = document.createElement("img")
  weekImg.src = "/src/Assets/Images/weekicon.png";
  let weekButton = document.createElement("button");
  weekButton.classList.add("side-button");
  weekButton.textContent = "Week";
  weekArea.append(weekImg, weekButton);
  weekButton.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(weekArea, ".sidebar-area");
    sectionDisplay(weekToDoArray);
  })

  let projectsArea = document.createElement("div");   // projects area content
  projectsArea.classList.add("sidebar-area");
  projectsArea.id = "projects-area";
  let projectsImg = document.createElement("img");
  projectsImg.src = "/src/Assets/Images/projectsicon.png";
  let projectsButton = document.createElement("div");
  projectsButton.classList.add("projects-title");
  projectsButton.textContent = "Projects";
  projectsArea.append(projectsImg, projectsButton);

  let notesArea = document.createElement("div");   // notes button content
  notesArea.classList.add("sidebar-area");
  notesArea.id = "sidebar-notes-area";
  let notesImg = document.createElement("img");
  notesImg.src = "/src/Assets/Images/noteicon.png";
  let notesButton = document.createElement("button");
  notesButton.classList.add("side-button");
  notesButton.textContent = "Notes";
  notesArea.append(notesImg, notesButton);
  notesButton.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(notesArea, ".sidebar-area");
    notesDisplay();
  })

  let projectsListArea = document.createElement("div");
  projectsListArea.id = "projects-list";


  let addItem = document.createElement("div");   // floating add new item button
  addItem.id = "newItem";
  addItem.textContent = "+";
  addItem.addEventListener('click', () => {
    console.log("new item button pressed");
    toggle('new-item-form');
    newToDoDisplay();
  })


  let navContainer = document.createElement("div");   // container for nav items so all nav items stay at top
  navContainer.id = "nav";

  sidebar.append(homeArea, todayArea, weekArea, notesArea, projectsArea, projectsListArea);   // sidebar combined in one div
  navContainer.append(sidebar, addItem);   // add sidebar and new item button to container with sidebar
  content.append(navContainer);   // add to main page
  projectListDisplay();

}






export function setActiveButton(button, btnClass) {   // if button clicked, add active class, if different button clicked, remove active class and add to now clicked button
  let buttons = document.querySelectorAll(btnClass);

  buttons.forEach((button) => {
    if (button !== this) {
      button.classList.remove("active");
    }
  });

  button.classList.add("active");
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
  newItemNavToDoImg.src = "/src/Assets/Images/agenda-dark.png";
  let newItemNavToDo = document.createElement("div");
  newItemNavToDo.classList.add("new-item-nav-button");
  newItemNavToDo.textContent = "To-Do";  
  newItemNavToDoArea.id = "new-item-nav-todo-area";
  newItemNavToDoArea.classList.add("active");
  newItemNavToDo.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(newItemNavToDoArea, ".new-item-nav-area");
    newToDoDisplay();
  })
  newItemNavToDoArea.append(newItemNavToDoImg, newItemNavToDo);


  let newItemNavProjectArea = document.createElement("div");   // create project tab for sidebar
  newItemNavProjectArea.classList.add("new-item-nav-area");
  let newItemProjectsImg = document.createElement("img");
  newItemProjectsImg.src = "/src/Assets/Images/projectsicon.png";
  let newItemNavProject = document.createElement("div");
  newItemNavProject.classList.add("new-item-nav-button");
  newItemNavProject.textContent = "Project";
  newItemNavProject.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(newItemNavProjectArea, ".new-item-nav-area");
    newProjectDisplay();
  })
  newItemNavProjectArea.append(newItemProjectsImg, newItemNavProject);

  let newItemNavNoteArea = document.createElement("div");   // create note tab for sidebar
  newItemNavNoteArea.classList.add("new-item-nav-area");
  let newItemNotesImg = document.createElement("img");
  newItemNotesImg.src = "/src/Assets/Images/noteicon.png";
  let newItemNavNote = document.createElement("div");
  newItemNavNote.classList.add("new-item-nav-button");
  newItemNavNote.textContent = "Note";
  newItemNavNote.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(newItemNavNoteArea, ".new-item-nav-area");
    newNoteDisplay();
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

  let noteSubmit = document.createElement("button");
  noteSubmit.classList.add("new-submit-btn");
  noteSubmit.textContent = "CREATE NOTE";
  noteSubmit.addEventListener("click", () => {
    let newNote = notesFactory(noteTitle.value, noteDetails.value);
    notesArray.push(newNote);
    toggle('new-item-form');
    let newItemNavToDoArea = document.getElementById("new-item-nav-todo-area");
    setActiveButton(newItemNavToDoArea, ".new-item-nav-area");
    setActiveButton(notesArea, ".sidebar-area");
    notesDisplay();
  });

  newNoteForm.append(noteTitle, noteDetails, noteSubmit);

  newItemFormArea.append(newNoteForm);
}






const newToDoDisplay = function() {   // display for new todo tab
  
  console.log("newtododisplay function");
  let toDoArea = document.getElementById("sidebar-todo-area");
  let newItemFormArea = document.getElementById("new-item-main");
  newItemFormArea.innerHTML = "";   // clear out any content before adding new todo display
  let newToDoForm = document.createElement("div");
  newToDoForm.id = "new-todo-area";

  let toDoTitle = document.createElement("textarea");
  toDoTitle.id = "new-todo-title";
  toDoTitle.contentEditable = true;
  toDoTitle.placeholder = "Title: Fix Sink";
  toDoTitle.maxLength = 25;
  toDoTitle.required = true;

  let toDoDetails = document.createElement("textarea");
  toDoDetails.id = "new-todo-details";
  toDoDetails.contentEditable = "true";
  toDoDetails.placeholder = "Details: Replace soap dispenser and garbage disposal.";
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
  medPriority.checked = "checked";
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

  toDoPriorityArea.append(toDoPriorityHeading, lowPriority, lowPriorityLabel, medPriority, medPriorityLabel, highPriority, highPriorityLabel);
  

  let toDoSubmit = document.createElement("button");
  toDoSubmit.type = "submit";
  toDoSubmit.classList.add("new-submit-btn");
  toDoSubmit.textContent = "CREATE TO-DO";
  toDoSubmit.addEventListener("click", () => {

    let prioritySelected = document.querySelector('input[name="new-priority"]:checked');
    console.log(Object.is(prioritySelected, null));

    if (toDoTitle.value == "" || toDoDetails.value == "" || Object.is(prioritySelected, null) || toDoDateSelect.value == "") {

      return;
    }
    
    else {
      let newToDo = toDoFactory(toDoTitle.value, "None", prioritySelected.value, parseISO(toDoDateSelect.value), toDoDetails.value);
      toDoArray.push(newToDo);
      filterArrays();
      console.log(toDoArray);
      toggle('new-item-form');
      let newItemMain = document.getElementById("new-item-main");
      newItemMain.innerHTML = "";
      let newItemNavToDoArea = document.getElementById("new-item-nav-todo-area");
      setActiveButton(newItemNavToDoArea, ".new-item-nav-area");
      setActiveButton(toDoArea, ".sidebar-area");
      sectionDisplay(toDoArray);
    }

  });

  newToDoForm.append(toDoTitle, toDoDetails, toDoDateArea, toDoPriorityArea, toDoSubmit);

  newItemFormArea.append(newToDoForm);
}





const newProjectDisplay = function() {   // display for new project tab

  console.log("newtododisplay function");
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

  let projectSubmit = document.createElement("button");
  projectSubmit.classList.add("new-submit-btn");
  projectSubmit.textContent = "CREATE PROJECT";
  projectSubmit.addEventListener("click", () => {

    projectsArray.push(projectTitle.value);
    console.log(projectsArray);
    toggle('new-item-form');
    let newItemNavToDoArea = document.getElementById("new-item-nav-todo-area");
    setActiveButton(newItemNavToDoArea, ".new-item-nav-area");
    setActiveButton(projectArea, ".sidebar-area");
    projectListDisplay();
  });

  newProjectForm.append(projectTitle, projectSubmit);
  newItemFormArea.append(newProjectForm);

}


export default pageLoad;