import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "A Cool Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const counterDiv = document.createElement("div");
let counter = 0;
counterDiv.innerHTML = `Coolness: ${counter}`;

const growth = document.createElement("div");
let growthRate = 0;
growth.innerHTML = `${growthRate} Coolness/s`;

const button = document.createElement("button");
button.innerHTML = "😎";
button.classList.add("main-button");

app.append(counterDiv);
app.append(growth);

app.append(button);

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  { name: "🕶", cost: 10, rate: 0.1, description: "Shades make you look cool. (0.1C/s)"},
  { name: "🎩", cost: 100, rate: 2, description: "A hat is cooler than shades. (2C/s)"},
  { name: "💰", cost: 1000, rate: 50, description: "Cash makes you super cool! (50C/s)"},
  { name: "🚗", cost: 5000, rate: 200, description: "Driving a car is so much cooler. (200C/s)"},
  { name: "🏆", cost: 10000, rate: 1000, description: "Winning an award is the coolest! (1000C/s)"},
];

const upgradeButtons: HTMLButtonElement[] = [];

// let upgrade1Cost = 10;
// const upgrade1Button = document.createElement("button");
// upgrade1Button.innerHTML = "Buy 🕶 (+0.1 Coolness/s)";
// upgrade1Button.disabled = true;

// let upgrade2Cost = 100;
// const upgrade2Button = document.createElement("button");
// upgrade2Button.innerHTML = "Buy 🎩 (+2 Coolness/s)";
// upgrade2Button.disabled = true;

// let upgrade3Cost = 1000;
// const upgrade3Button = document.createElement("button");
// upgrade3Button.innerHTML = "Buy 💰 (+50 Coolness/s)";
// upgrade3Button.disabled = true;

const updateCounter = () => {
  counterDiv.innerHTML = `Coolness: ${counter.toFixed(2)}`;

  availableItems.forEach((item, index) => {
    upgradeButtons[index].disabled = counter < item.cost;
  });

  // upgrade1Button.disabled = counter < upgrade1Cost;
  // upgrade2Button.disabled = counter < upgrade2Cost;
  // upgrade3Button.disabled = counter < upgrade3Cost;
};

const updateGrowthRate = () => {
  growth.innerHTML = `${growthRate.toFixed(1)} Coolness/s`;
};

button.addEventListener("click", () => {
  counter++;
  updateCounter();
});

availableItems.forEach((item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Buy ${item.name} (${item.cost} Coolness)`;
  upgradeButton.disabled = true;

  const descriptionText = document.createElement("p");
  descriptionText.innerText = item.description;

  upgradeButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;
      item.cost *= 1.15;
      updateCounter();
      updateGrowthRate();
      upgradeButton.innerHTML = `Buy ${item.name} (${item.cost.toFixed(2)} Coolness)`;
    }
  });

  upgradeButtons.push(upgradeButton);
  app.append(upgradeButton);
  app.append(descriptionText);
});

// upgrade1Button.addEventListener("click", () => {
//     if(counter >= upgrade1Cost) {
//         counter -= upgrade1Cost;
//         growthRate += 0.1;
//         upgrade1Cost *= 1.15;
//         updateCounter();
//         updateGrowthRate();
//     }
// });

// upgrade2Button.addEventListener("click", () => {
//     if(counter >= upgrade2Cost) {
//         counter -= upgrade2Cost;
//         growthRate += 2;
//         upgrade2Cost *= 1.15;
//         updateCounter();
//         updateGrowthRate();
//     }
// });

// upgrade3Button.addEventListener("click", () => {
//     if(counter >= upgrade3Cost) {
//         counter -= upgrade3Cost;
//         growthRate += 50;
//         upgrade3Cost *= 1.15;
//         updateCounter();
//         updateGrowthRate();
//     }
// });

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

// app.append(upgrade1Button);
// app.append(upgrade2Button);
// app.append(upgrade3Button);
