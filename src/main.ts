import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jake's Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const counterDiv = document.createElement("div");
let counter = 0;
counterDiv.innerHTML = `Coolness: ${counter}`;

const button = document.createElement("button");
button.innerHTML = "😎";

button.addEventListener("click", () => {
    counter++;
    counterDiv.innerHTML = `Coolness: ${counter}`;
});

app.append(counterDiv);
app.append(button);
