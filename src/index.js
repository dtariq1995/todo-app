import './styles.css';
import pageLoad from "./Pages/pageLoad";

let body = document.body;   // add some things onto html body which everything else will be attached to
let container = document.createElement("container");
container.id = "dim";
let content = document.createElement("div");
content.id = "content";
container.append(content);
let form = document.createElement("form");
form.id = "edit-form";
body.append(container, form);

pageLoad();
