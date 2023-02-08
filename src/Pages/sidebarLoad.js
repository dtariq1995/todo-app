
const sidebarLoad = function() {

    let content = document.querySelector("#content");

    let sidebar = document.createElement("div");
    sidebar.id = "sidebar";

    let homeArea = document.createElement("div");
    let homeImg = document.createElement("img");
    homeImg.src = "/src/Assets/Images/houseicon.png";
    let homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeArea.append(homeImg, homeButton);

    let todayArea = document.createElement("div");
    let todayImg = document.createElement("img");
    todayImg.src = "/src/Assets/Images/dayicon.png";
    let todayButton = document.createElement("button");
    todayButton.textContent = "Today";
    todayArea.append(todayImg, todayButton);

    let weekArea = document.createElement("div");
    let weekImg = document.createElement("img")
    weekImg.src = "/src/Assets/Images/weekicon.png";
    let weekButton = document.createElement("button");
    weekButton.textContent = "Week";
    weekArea.append(weekImg, weekButton);

    let projectsArea = document.createElement("div");
    let projectsImg = document.createElement("img");
    projectsImg.src = "/src/Assets/Images/projectsicon.png";
    let projectsButton = document.createElement("button");
    projectsButton.textContent = "Projects";
    projectsArea.append(projectsImg, projectsButton);

    let notesArea = document.createElement("div");
    let notesImg = document.createElement("img");
    notesImg.src = "/src/Assets/Images/noteicon.png";
    let notesButton = document.createElement("button");
    notesButton.textContent = "Notes";
    notesArea.append(notesImg, notesButton);

    sidebar.append(homeArea, todayArea, weekArea, projectsArea, notesArea);
    content.append(sidebar);

}

export default sidebarLoad;