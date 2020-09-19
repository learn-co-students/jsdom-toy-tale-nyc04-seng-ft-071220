let addToy = false;
let toyCollection = document.querySelector("#toy-collection");
let newToyName = document.querySelector(".add-toy-form")

let createNewToyName = (toy) => {

    let toyDiv = document.createElement("div")
    toyDiv.className = "card"
  
    let toyH2 = document.createElement("h2")
    toyH2.innerText = toy.name
  
    let toyImg = document.createElement("img")
    toyImg.src= toy.image
    toyImg.className = "toy-avatar"
  
    let toyP = document.createElement("p")
    toyP.innerText = `${toy.likes} likes` 
  
    let toyButton = document.createElement("button")
    toyButton.innerText = "Like"
    toyButton.className = "link-btn"
  
    toyDiv.append(toyH2, toyImg, toyP, toyButton)
    toyCollection.append(toyDiv)
  
    toyButton.addEventListener("click", (ev) => {
      let newLikes = toy.likes + 1
      
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": newLikes
        })
      })
        .then(res => res.json())
        .then((newToyObj) => {
          toyP.innerText = `${newToyObj.likes} Likes`
  
          toy.likes = newToyObj.likes
        })
    })
}

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }

});

fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => {
    toys.forEach((toy) => {createNewToyName(toy)})
  });

  newToyName.addEventListener("submit", function(evt) {
    evt.preventDefault()
    let newToyName = evt.target.name.value
    let newToyUrl = evt.target.image.value
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": newToyName,
        "image": newToyUrl,
        "likes": 0
      })
    }) 
    .then(res => res.json())
    .then(newToy => {
      createNewToyName(newToy)
      evt.target.reset()
    })
  })

  

