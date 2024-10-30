import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
  count: number;
}

const gameName = "A Cool Game";
document.title = gameName;

const availableItems: Item[] = [
  {
    name: "🕶",
    cost: 10,
    rate: 0.1,
    description: "Shades make you look cool. (0.1C/s)",
    count: 0
  },
  {
    name: "🎩",
    cost: 100,
    rate: 2,
    description: "A hat is cooler than shades. (2C/s)",
    count: 0
  },
  {
    name: "💰",
    cost: 1000,
    rate: 50,
    description: "Cash makes you super cool! (50C/s)",
    count: 0
  },
  {
    name: "🚗",
    cost: 5000,
    rate: 200,
    description: "Driving a car is so much cooler. (200C/s)",
    count: 0
  },
  {
    name: "🏆",
    cost: 10000,
    rate: 1000,
    description: "Winning an award is the coolest! (1000C/s)",
    count: 0
  },
];

const appContainer: HTMLDivElement = document.querySelector("#app")!;

const header = document.createElement("h1");
header.innerHTML = gameName;
appContainer.append(header);

const counterDiv = document.createElement("div");
let counter = 0;
counterDiv.innerHTML = `Coolness: ${counter}`;

const growthDiv = document.createElement("div");
let growthRate = 0;
growthDiv.innerHTML = `${growthRate} Coolness/s`;

const mainButtonContainer = document.createElement("div");
mainButtonContainer.classList.add("main-button-container");

const bottomContainer = document.createElement("div");
bottomContainer.classList.add("bottom-container");

const mainButton = document.createElement("button");
mainButton.innerHTML = "😎";
mainButton.classList.add("main-button");

const itemCounterContainer = document.createElement("div");
itemCounterContainer.classList.add("item-counter-container");

mainButtonContainer.append(mainButton);
mainButtonContainer.append(itemCounterContainer);

appContainer.append(mainButtonContainer);
appContainer.append(bottomContainer);

appContainer.append(counterDiv);
appContainer.append(growthDiv);

const upgradeButtons: HTMLButtonElement[] = [];

const updateItemCounters = () => {
  itemCounterContainer.innerHTML = "";
  availableItems.forEach(item => {
    const itemCounter = document.createElement("div");
    itemCounter.classList.add("item-counter");
    itemCounter.innerText = `${item.name}: ${item.count}`;
    itemCounterContainer.append(itemCounter);
  });
};

const updateCounter = () => {
  counterDiv.innerHTML = `Coolness: ${counter.toFixed(2)}`;

  availableItems.forEach((item, index) => {
    upgradeButtons[index].disabled = counter < item.cost;
  });
};

const updateGrowthRate = () => {
  growthDiv.innerHTML = `${growthRate.toFixed(1)} Coolness/s`;
};

mainButton.addEventListener("click", () => {
  counter++;
  updateCounter();
});

const itemCost_Scale = 1.15;

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
      item.cost *= itemCost_Scale;
      item.count++;
      updateCounter();
      updateGrowthRate();
      updateItemCounters();
      upgradeButton.innerHTML = `Buy ${item.name} (${item.cost.toFixed(2)} Coolness)`;
    }
  });

  upgradeButtons.push(upgradeButton);
  appContainer.append(upgradeButton);
  appContainer.append(descriptionText);
});

updateItemCounters();

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
