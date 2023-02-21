
const notesLoad = function() {

    let displayArea = document.querySelector("#main-area");
    displayArea.innerHTML = "";

    let title = document.createElement("div");
    title.textContent = "Notes";
    displayArea.append(title);
}


export default notesLoad;