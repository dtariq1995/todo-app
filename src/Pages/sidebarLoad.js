
const sidebarLoad = function() {

    let content = document.querySelector("#content");

    let sidebar = document.createElement("div");
    sidebar.id = "sidebar";

    let homeButton = document.createElement("button");
    homeButton.textContent = "Home";

    let todayButton = document.createElement("button");
    todayButton.textContent = "Today";

    let weekButton = document.createElement("button");
    weekButton.textContent = "Week";

    let projectsButton = document.createElement("button");
    projectsButton.textContent = "Projects";

    let notesButton = document.createElement("button");
    notesButton.textContent = "Notes";

    sidebar.append(homeButton, todayButton, weekButton, projectsButton, notesButton);
    content.append(sidebar);

}

export default sidebarLoad;