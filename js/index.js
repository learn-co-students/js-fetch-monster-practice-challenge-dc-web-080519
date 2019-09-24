
let url = "http://localhost:3000/monsters/?_limit=50"

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Loaded");


  getMonsters()
  initializeForm()

  backBtn = document.getElementById("back");
  backBtn.addEventListener("click", goBack);

  forwardBtn = document.getElementById("forward");
  forwardBtn.addEventListener("click", goForward);
})
let num = 1;

function goForward(e){
  num += 1;
// debugger
  let newurl = url + `&_page=${num}`

  getMonsters(newurl)
}

function goBack(e){
    num -= 1;

  let newurl = url + `&_page=${num}`

  getMonsters(newurl)
}

function getMonsters(){
  let monsterContainer = document.getElementById("monster-container");
  monsterContainer.innerHTML = '';

  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    data.forEach(function(monster){
      renderMonster(monster)
    })
  })
}


function renderMonster(monster){
  let monsterContainer = document.getElementById("monster-container");

  let div = document.createElement("div");
      div.className = "monster-div";
      div.id = monster.id;

  let h2 = document.createElement("h2")
  h2.className = "monster-name";
  h2.innerText = monster.name;
    div.appendChild(h2);

  let h4 = document.createElement("h4")
  h4.className = "monster-age";
  h4.innerText = monster.age;
    div.appendChild(h4);

  let p = document.createElement("p")
  p.className = "monster-description";
  p.innerText = monster.description;
    div.appendChild(p)


  monsterContainer.appendChild(div);
}

function initializeForm(){
  let form = document.querySelector(".creation-form")
  form.addEventListener("submit", createMonster)
}

function createMonster(e){
  e.preventDefault();
  let subButton = document.querySelector(".sub-monster");

  let formInfo = {
    name: subButton.parentElement.querySelector(".name-input").value,
    age: subButton.parentElement.querySelector(".age-input").value,
    description: subButton.parentElement.querySelector(".description-input").value
  }

  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
    body: JSON.stringify(formInfo)
  })

  .then(res => {
    renderMonster(formInfo);
    })

  }
