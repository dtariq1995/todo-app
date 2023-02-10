
const homeLoad = function() {

    let displayArea = document.querySelector("#main-area");
    displayArea.innerHTML = "";

    let title = document.createElement("div");
    title.textContent = "Home";
    displayArea.append(title);
}


export default homeLoad;