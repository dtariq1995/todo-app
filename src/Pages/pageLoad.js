

const pageLoad = function() {   // add skeleton for header, sidebar, main content, and footer

    let content = document.querySelector("#content");

    let body = document.querySelector("body");
    let header = document.createElement("header");
    header.textContent = "Header";
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
}

export default pageLoad;