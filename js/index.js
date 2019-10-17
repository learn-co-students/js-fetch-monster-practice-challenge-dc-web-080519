const url = "http://localhost:3000/monsters"
let pageNum = 20

const monsterIndex = document.getElementById('monster-container');
const monsterForm = document.getElementById("monster-form");
const forwardBtn = document.getElementById('forward');
const backBtn = document.getElementById('back');

document.addEventListener("DOMContentLoaded", () => {

  fetch50Monsters()
  monsterForm.addEventListener("submit", handleCreateSubmit)
  forwardBtn.addEventListener("click", moveForward)
  backBtn.addEventListener("click", moveBack)
})

//Fetch Monsters
function fetch50Monsters() {
  fetch(url + "?_limit=50" + `&_page=${pageNum}`)
  .then(response => response.json())
  .then(monsters => {
    monsters.sort(function(a,b){return b.id - a.id}).forEach(monster => {
      renderMonster(monster)
      })
    })
    .catch(error => {
      alert("Don't look behind you! Server's down!")
      console.log('There has been a problem with your fetch operation: ', error.message);
    })
}

function renderMonster(monster) {
  let div = document.createElement("div");
  let nameTag = document.createElement("h2");
  nameTag.innerText = monster.name
  div.appendChild(nameTag);
  let ageTag = document.createElement("h4");
  ageTag.innerText = `Age: ${monster.age}`
  div.appendChild(ageTag);
  let bioTag = document.createElement("p");
  bioTag.innerText = `Bio: ${monster.description}`
  div.appendChild(bioTag);

  monsterIndex.appendChild(div)
}

//Submit & Create Monster
function handleCreateSubmit(e) {
  e.preventDefault()

  let formData = {
    name: e.target.name.value,
    age: e.target.age.value,
    description: e.target.description.value
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    debugger
    renderMonster(formData)
  })
  .catch(error => {
    alert("Don't look behind you! Server's down!")
    console.log('There has been a problem with your fetch operation: ', error.message);
  })
  e.target.reset()
}

//Forward Back Buttons
function moveForward() {
  ++pageNum
  monsterIndex.innerHTML = '';
  fetch50Monsters()
}

function moveBack() {
  if (pageNum > 1){
    --pageNum
  }
  else {
    pageNum = 1
  }
  monsterIndex.innerHTML = '';
  fetch50Monsters()
}
