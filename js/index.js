// HTML page elements as constants
const createMonster = document.querySelector('#create-monster');
const monsterContainer = document.querySelector('#monster-container');
const backButton = document.querySelector('#back');
const bottomBackButton = document.querySelector('#bottom-back');
const forwardButton = document.querySelector('#forward');
const bottomForwardButton = document.querySelector('#bottom-forward');
const monstersURL = "http://localhost:3000/monsters";
const newMonsterForm = document.querySelector('#new-monster-form')
let currentPage = 1;
let maxPages = setMaxPages();

// Set max number of pages assuming 50 results per page
function setMaxPages() {
  fetch(monstersURL)
  .then(rsp => rsp.json())
  .then(monsters => {
    maxPages = monsters.length/50;
  })
}

// Show first 50 monsters when page loads
document.addEventListener('DOMContentLoaded', displayMonsters(currentPage));

// Get 50 monsters from the specified API page
function getMonsters(pageNum) {
  fetch(`${monstersURL}?_limit=50&_page=${pageNum}`)
  .then(rsp => rsp.json())
  .then(monsters => {
    for(const monster of monsters) {
      createEntry(monster)
    }
  })
}

// Clear page and render new monsters
function displayMonsters(pageNum) {
  monsterContainer.innerHTML = ""
  getMonsters(pageNum)
}

// Populate a monster card and add it to the page
function createEntry(monster) {
  const monsterCard = document.createElement('div');
  const nameHeader = document.createElement('h3');
  nameHeader.innerText = monster.name;
  const ageHeader = document.createElement('h4');
  ageHeader.innerText = `Age: ${monster.age}`;
  const description = document.createElement('p');
  const line = document.createElement('hr');
  description.innerText = monster.description;
  monsterCard.appendChild(nameHeader);
  monsterCard.appendChild(ageHeader);
  monsterCard.appendChild(description);
  monsterCard.appendChild(line);
  monsterContainer.appendChild(monsterCard)
}

// Trigger events on button clicks
forwardButton.addEventListener('click', nextPage)
bottomForwardButton.addEventListener('click', nextPage)
backButton.addEventListener('click', previousPage)
bottomBackButton.addEventListener('click', previousPage)

// Increment current page & update accordingly
function nextPage() {
  if (currentPage < maxPages) {
    currentPage++;
    displayMonsters(currentPage)
  }
}

// Decrement current page & update accordingly
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayMonsters(currentPage)
  }
}

// Create new monster entry on form submit
newMonsterForm.addEventListener('submit', addNewMonster);

function addNewMonster(e) {
  e.preventDefault()
  const formData = {
    "name": e.target.name.value,
    "age": e.target.age.value,
    "description": e.target.description.value
  }
  const dbConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }
  fetch(monstersURL, dbConfig)
  .then(resp => resp.json())
  .then(monster => {
    e.target.reset();
    displayMonsters(currentPage);
    // e.preventDefault();
  })
}