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

const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Buy 🕶 (+1 Coolness/1s)";
upgradeButton.disabled = true;

let growthRate = 0;

const updateCounter = () => {
    counterDiv.innerHTML = `Coolness: ${counter.toFixed(2)}`;

    upgradeButton.disabled = counter < 10;
};

button.addEventListener("click", () => {
    counter++;
    updateCounter();
});

upgradeButton.addEventListener("click", () => {
    if(counter >= 10) {
        counter -= 10;
        growthRate += 1;
        updateCounter();
    }
});
// setInterval(() => {
//     counter++;
//     updateCounter();
// }, 1000);

let lastFrame = performance.now();

const incrementCounterPerFrame = (currentTime: number) => {
    const deltaTime = (currentTime - lastFrame) / 1000;
    lastFrame = currentTime;

    const incrementPerSecond = growthRate;
    counter += incrementPerSecond * deltaTime;
    updateCounter();

    requestAnimationFrame(incrementCounterPerFrame);
};

requestAnimationFrame(incrementCounterPerFrame);

app.append(counterDiv);
app.append(upgradeButton);
app.append(button);
