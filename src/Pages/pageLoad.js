import homeLoad from "./homeLoad";
import sidebarLoad from "./sidebarLoad";

const pageLoad = function() {   // add skeleton for header, sidebar, main content, and footer

    let content = document.querySelector("#content");

    let body = document.querySelector("body");
    let header = document.createElement("header");
    let headerImage = document.createElement("img");
    let headerTitle = document.createElement("div");
    headerImage.src = "/src/Assets/Images/agenda.png";
    headerTitle.textContent = "To-Do List";
    header.append(headerImage, headerTitle);
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

}

export default pageLoad;