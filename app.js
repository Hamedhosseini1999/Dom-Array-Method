// Get Variables
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const sortRichestBtn = document.getElementById("sort-richest");
const showMilli = document.getElementById("show-milli");
const totalWealth = document.getElementById("entire-wealth");
const showCase = document.getElementById("showcase");

let users = [];

// Funtions
// Get User
async function getUser() {
  // Fetch api
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();
  // User
  let user = data.results[0].name;

  const userName = {
    name: `${user.first} ${user.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addNewUser(userName);
}

// Add user
function addNewUser(user) {
  users.push(user);
  // populate user in ui
  populatetoUI();
}
function populatetoUI(providedUser = users) {
  // re create show case
  showCase.innerHTML = `
  <div class="persons">
      <h3>Person<span>Wealth</span></h3>
    </div>
  `;
  providedUser.forEach((user) => {
    // Create div
    const divP = document.createElement("div");
    divP.classList.add("persons");
    // create div content
    const divC = document.createElement("div");
    divC.classList.add("person");
    // add users to div
    divC.innerHTML = `
    <span><strong>${user.name}</strong></span>
         <span>${formatMoney(user.money)}</span>
    `;
    // appended to divP
    divP.appendChild(divC);
    // appended to showcase
    showCase.appendChild(divP);
  });
}
// Format Money
function formatMoney(num) {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
//double money
function doubleMoney() {
  users = users.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  populatetoUI();
}
// Functions Sort Richest
function sortRichest() {
  users.sort((a, b) => {
    return b.money - a.money;
  });
  populatetoUI();
}
getUser();
getUser();
// Event Listeners
addUserBtn.addEventListener("click", getUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
sortRichestBtn.addEventListener("click", sortRichest);
