// ↓ dont look at that pls ↓
//  DocumentObjectModel Variables ( connection variables)
const packagesDeliveredP = document.querySelector("#packages-delivered-div");
const packagesDeliveredBtn = document.querySelector("#deliver-package-btn");
const hogButtons = document.querySelector("#hog-buttons");
const savingButton = document.querySelector("#saving-button");
const clearGameButton = document.querySelector("#clearing-game-button");
const packagesPerSecondP = document.querySelector(
  "#packages-delivered-per-second"
);

// beautyfunction
function beautify(num) {
  return num > 100000 ? num.toExponential(2) : num;
}

// ↓ Game Variables ( variables used in the game duh) ↓
let packagesDelivered = 0;
let packagesPerSecond = 0;

// saving stuffs
const saveGame = () => {
  const gameSave = {
    packagesDelivered,
    hogTypes: hogTypes.map((hog) => ({ amount: hog.amount })),
  };
  localStorage.setItem("Hogs of Gods", btoa(JSON.stringify(gameSave)));
};
function loadSave() {
  var saveData = localStorage.getItem("Hogs of Gods");
  //console.log(saveData);
  if (!saveData) return;
  //console.log(saveData);

  const gameSave = JSON.parse(atob(localStorage["Hogs of Gods"]));
  packagesDelivered = gameSave.packagesDelivered;
  for (const hogId in gameSave.hogTypes)
    hogTypes[hogId].amount = gameSave.hogTypes[hogId].amount;
}

savingButton.addEventListener("click", () => {
  saveGame();
});

clearGameButton.addEventListener("click", () => {
  clearGame();
});

const clearGame = () => {
  localStorage.clear();
  location.reload();
};
// hog type OOP shit
const hogTypes = [];

class HogType {
  /**
   * A type of a hog, which produces the previous generation of the hog.
   * @param {string} name Name of the hog
   * @param {number} cost The cost of the hog
   */
  constructor(name) {
    this.id = hogTypes.length;
    // Initialize some stuff
    this.name = name;
    this.cost = 5 * 30 ** this.id;
    this.amount = 0;
    // Append self to body
    this.buyButton = document.createElement("button");
    this.buyButton.classList.add("hog-button");
    this.buyButton.addEventListener("click", () => this.buy());
    hogButtons.appendChild(this.buyButton);
    hogTypes.push(this);
  }
  updateUI() {
    this.buyButton.innerText = `${this.name}: ${beautify(this.cost)}
    Amount bought: ${beautify(this.amount)}`;
  }
  buy() {
    if (packagesDelivered < this.cost) return;
    packagesDelivered -= this.cost;
    this.amount++;
    this.cost = Math.round(this.cost * 1.15);
  }
  applyGains() {
    if (this.id === 0) packagesDelivered += this.amount;
    else hogTypes[this.id - 1].amount += this.amount;
  }
}

// Functions
const autoPackageDeliver = () => {
  for (const hogType of hogTypes) hogType.applyGains();
};

const updateUI = () => {
  packagesDeliveredP.innerHTML = `Packages delivered: ${beautify(
    packagesDelivered
  )}`;
  packagesPerSecondP.innerHTML = `Packages delivered per second: ${beautify(
    hogTypes[0].amount
  )}`;
  for (const hogType of hogTypes) hogType.updateUI();
};

// Event listener
packagesDeliveredBtn.addEventListener("click", () => {
  packagesDelivered += 1;
});

new HogType("First Hog");
new HogType("Second Hog");
new HogType("Third Hog");
new HogType("Fourth Hog");
new HogType("Fifth Hog");
new HogType("Sixth Hog");
new HogType("Seventh Hog");
new HogType("Eighth Hog");
new HogType("1 H0G 2 rul dem aLL!1!");
// Game Loop
window.setInterval(() => {
  autoPackageDeliver();
}, 1000);
window.setInterval(() => {
  saveGame();
}, 15000);

window.setInterval(() => {
  updateUI();
}, 20);
loadSave();
