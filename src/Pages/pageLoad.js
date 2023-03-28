import notesDisplay from "./notes";
import homeDisplay from "./toDo";
import { toDoArray } from "./toDo";

const pageLoad = function() {   // add skeleton for header, sidebar, main content, and footer

  let content = document.querySelector("#content");
  let body = document.querySelector("body");

  let header = document.createElement("header");   // header content
  let logo = document.createElement("div");
  logo.id = "logo";
  let headerImage = document.createElement("img");
  let headerTitle = document.createElement("div");
  headerImage.src = "/src/Assets/Images/agenda.png";
  headerTitle.textContent = "To-Do List";
  logo.append(headerImage, headerTitle);
  header.append(logo);
  body.insertAdjacentElement("afterbegin", header);


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

  sidebarLoad();

  let main = document.createElement("div");  
  main.id = "main-area";
  main.textContent = "Main";
  content.append(main);
  homeDisplay(toDoArray);

}

const sidebarLoad = function() {

  let content = document.querySelector("#content");

  let sidebar = document.createElement("div");
  sidebar.id = "sidebar";

  let homeArea = document.createElement("div");
  let homeImg = document.createElement("img");
  homeImg.src = "/src/Assets/Images/houseicon.png";
  let homeButton = document.createElement("button");
  homeButton.classList.add("side-button", "active");
  homeButton.textContent = "Home";
  homeArea.append(homeImg, homeButton);
  homeButton.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(homeButton);
    homeDisplay(toDoArray);
  })

  let todayArea = document.createElement("div");
  let todayImg = document.createElement("img");
  todayImg.src = "/src/Assets/Images/dayicon.png";
  let todayButton = document.createElement("button");
  todayButton.classList.add("side-button");
  todayButton.textContent = "Today";
  todayArea.append(todayImg, todayButton);
  todayButton.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(todayButton);
    homeDisplay(toDoArray);
  })

  let weekArea = document.createElement("div");
  let weekImg = document.createElement("img")
  weekImg.src = "/src/Assets/Images/weekicon.png";
  let weekButton = document.createElement("button");
  weekButton.classList.add("side-button");
  weekButton.textContent = "Week";
  weekArea.append(weekImg, weekButton);
  weekButton.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(weekButton);
    homeDisplay(toDoArray);
  })

  let projectsArea = document.createElement("div");
  let projectsImg = document.createElement("img");
  projectsImg.src = "/src/Assets/Images/projectsicon.png";
  let projectsButton = document.createElement("button");
  projectsButton.classList.add("side-button");
  projectsButton.textContent = "Projects";
  projectsArea.append(projectsImg, projectsButton);

  let notesArea = document.createElement("div");
  let notesImg = document.createElement("img");
  notesImg.src = "/src/Assets/Images/noteicon.png";
  let notesButton = document.createElement("button");
  notesButton.classList.add("side-button");
  notesButton.textContent = "Notes";
  notesArea.append(notesImg, notesButton);
  notesButton.addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) return;
    setActiveButton(notesButton);
    notesDisplay();
  })

  sidebar.append(homeArea, todayArea, weekArea, projectsArea, notesArea);
  content.append(sidebar);

}

function setActiveButton(button) {
  const buttons = document.querySelectorAll(".side-button");

  buttons.forEach((button) => {
    if (button !== this) {
      button.classList.remove("active");
    }
  });

  button.classList.add("active");
}

export default pageLoad;