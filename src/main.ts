import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jake's Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "😎";

button.addEventListener("click", () => {
  alert("Button clicked!");
});

app.append(button);