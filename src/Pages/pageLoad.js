import notesDisplay from "./notes";
import sectionDisplay from "./toDo";
import { toDoArray } from "./toDo";
import { todayToDoArray } from "./toDo";
import { weekToDoArray } from "./toDo";
import { notesArray } from "./notes";
import { notesFactory } from "./notes";






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

  let addItem = document.createElement("div");   // floating add new item button
  addItem.id = "newItem";
  addItem.textContent = "+";
  addItem.addEventListener('click', (e) => {
    console.log("new item button pressed");
    toggle('new-item-form');
  })


  let navContainer = document.createElement("div");   // container for nav items so all nav items stay at top
  navContainer.id = "nav";

  sidebar.append(homeArea, todayArea, weekArea, projectsArea, notesArea);   // sidebar combined in one div
  navContainer.append(sidebar, addItem);   // add sidebar and new item button to container with sidebar
  content.append(navContainer);   // add to main page

}






function setActiveButton(button, btnClass) {   // if button clicked, add active class, if different button clicked, remove active class and add to now clicked button
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
  newItemHeaderText.textContent = "Create new...";
  let newItemExit = document.createElement("button");
  newItemExit.textContent = "×";
  newItemExit.id = "new-item-exit-btn";
  newItemExit.addEventListener('click', () => {   // close form when user clicks on new item form "x"
      toggle('new-item-form');
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
  newItemNavToDoArea.classList.add("active");
  newItemNavToDo.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(newItemNavToDoArea, ".new-item-nav-area");
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

  let newItemMain = document.createElement("div");   // main content area for new item form
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

  let noteDetails = document.createElement("textarea");   // add area for user to enter details
  noteDetails.id = "new-note-details";
  noteDetails.contentEditable = "true";
  noteDetails.placeholder = "Details";
  noteDetails.maxLength = 185;

  let noteSubmit = document.createElement("button");
  noteSubmit.classList.add("new-submit-btn");
  noteSubmit.textContent = "CREATE NOTE";
  noteSubmit.addEventListener("click", () => {
    let newNote = notesFactory(noteTitle.value, noteDetails.value);
    notesArray.push(newNote);
    toggle('new-item-form');
    newNoteDisplay();
    setActiveButton(notesArea, ".sidebar-area");
    notesDisplay();
  });

  newNoteForm.append(noteTitle, noteDetails, noteSubmit);

  newItemFormArea.append(newNoteForm);
}



export default pageLoad;