import notesDisplay from "./notes";
import sectionDisplay from "./toDo";
import { toDoArray } from "./toDo";
import { todayToDoArray } from "./toDo";
import { weekToDoArray } from "./toDo";

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
  main.textContent = "Main";
  content.append(main);
  sectionDisplay(toDoArray);
  newItemDisplay();

}

const sidebarLoad = function() {   // load sidebar content

  let content = document.querySelector("#content");

  let sidebar = document.createElement("div");
  sidebar.id = "sidebar";

  let homeArea = document.createElement("div");   // home button content
  let homeImg = document.createElement("img");
  homeImg.src = "/src/Assets/Images/houseicon.png";
  let homeButton = document.createElement("button");
  homeButton.classList.add("side-button", "active");
  homeButton.textContent = "Home";
  homeArea.append(homeImg, homeButton);
  homeButton.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(homeButton, ".side-button");
    sectionDisplay(toDoArray);
  })

  let todayArea = document.createElement("div");   // today button content
  let todayImg = document.createElement("img");
  todayImg.src = "/src/Assets/Images/dayicon.png";
  let todayButton = document.createElement("button");
  todayButton.classList.add("side-button");
  todayButton.textContent = "Today";
  todayArea.append(todayImg, todayButton);
  todayButton.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(todayButton, ".side-button");
    sectionDisplay(todayToDoArray);
  })

  let weekArea = document.createElement("div");   // week button content
  let weekImg = document.createElement("img")
  weekImg.src = "/src/Assets/Images/weekicon.png";
  let weekButton = document.createElement("button");
  weekButton.classList.add("side-button");
  weekButton.textContent = "Week";
  weekArea.append(weekImg, weekButton);
  weekButton.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(weekButton, ".side-button");
    sectionDisplay(weekToDoArray);
  })

  let projectsArea = document.createElement("div");   // projects area content
  let projectsImg = document.createElement("img");
  projectsImg.src = "/src/Assets/Images/projectsicon.png";
  let projectsButton = document.createElement("div");
  projectsButton.classList.add("projects-title");
  projectsButton.textContent = "Projects";
  projectsArea.append(projectsImg, projectsButton);

  let notesArea = document.createElement("div");   // notes button content
  let notesImg = document.createElement("img");
  notesImg.src = "/src/Assets/Images/noteicon.png";
  let notesButton = document.createElement("button");
  notesButton.classList.add("side-button");
  notesButton.textContent = "Notes";
  notesArea.append(notesImg, notesButton);
  notesButton.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(notesButton, ".side-button");
    notesDisplay();
  })

  let addItem = document.createElement("div");   // floating add new item button
  addItem.id = "newItem";
  addItem.textContent = "+";
  addItem.addEventListener('click', (e) => {
    console.log("new item button pressed");
    toggle();
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


function toggle() {   // this function dims the background when various modals pop up
  let dim = document.getElementById('dim');
  dim.classList.toggle('active');
  let form = document.getElementById('new-item-form');
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
  newItemExit.addEventListener('click', event => {   // close form when user clicks on new item form "x"
      toggle();
  });
  newItemHeader.append(newItemHeaderText, newItemExit);


  let newItemBody = document.createElement("div");   // body area which holds sidebar and main content
  newItemBody.id = "new-item-body";

  let newItemNav = document.createElement("div");   // sidebar for new item form
  newItemNav.id = "new-item-nav";

  let newItemNavToDo = document.createElement("button");
  newItemNavToDo.classList.add("new-item-nav-button", "active");
  newItemNavToDo.textContent = "To-Do";
  newItemNavToDo.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(newItemNavToDo, ".new-item-nav-button");
  })

  let newItemNavProject = document.createElement("button");
  newItemNavProject.classList.add("new-item-nav-button");
  newItemNavProject.textContent = "Project";
  newItemNavProject.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(newItemNavProject, ".new-item-nav-button");
  })

  let newItemNavNote = document.createElement("button");
  newItemNavNote.classList.add("new-item-nav-button");
  newItemNavNote.textContent = "Note";
  newItemNavNote.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(newItemNavNote, ".new-item-nav-button");
  })

  newItemNav.append(newItemNavToDo, newItemNavProject, newItemNavNote);

  let newItemMain = document.createElement("div");   // main content area for new item form
  newItemMain.id = "new-item-main";

  newItemBody.append(newItemNav, newItemMain);
  newItemForm.append(newItemHeader, newItemBody);
  body.append(newItemForm);
}

export default pageLoad;