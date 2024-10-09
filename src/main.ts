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

const updateCounter = () => {
    counterDiv.innerHTML = `Coolness: ${counter.toFixed(2)}`;
};

button.addEventListener("click", () => {
    counter++;
    updateCounter();
});

// setInterval(() => {
//     counter++;
//     updateCounter();
// }, 1000);

let lastFrame = performance.now();

const incrementCounterPerFrame = (currentTime: number) => {
    const deltaTime = (currentTime - lastFrame) / 1000;
    lastFrame = currentTime;

    const incrementPerSecond = 1;
    counter += incrementPerSecond * deltaTime;
    updateCounter();

    requestAnimationFrame(incrementCounterPerFrame);
};

requestAnimationFrame(incrementCounterPerFrame);

app.append(counterDiv);
app.append(button);
