let addToy = false;
const toyList = document.querySelector("div#toy-collection")
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
  //we moved the addBtn and toyFormContainer variables to lines 3 and 4 above.
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
    .then(response => response.json())
    .then(toyArray => {
        toyArray.forEach(toyObj => {
        turnToyToDiv(toyObj); //helper method goes here!
        })
    })
});

//READ
//helper method
let turnToyToDiv = (toy) => {
  //step 1: Create Element
  let toyDiv = document.createElement("div")
  toyDiv.className = "card"
  //step 2: Fill the contents of the element/Razzmataz!
  toyDiv.innerHTML = `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like ♥️</button>`
    // step 3: SLAP IT ON THE DOM!!!!!
    toyList.append(toyDiv)
}

//CREATE!!!

toyFormContainer.addEventListener("submit", (evt) => {
  evt.preventDefault()
  let nameOfToy = evt.target.input_name.value
  let imageOfToy = evt.target.input_image.value
  fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
     
    body: JSON.stringify({
      "name": nameOfToy,
      "image": imageOfToy,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(toyObj => {
    turnToyToDiv(toyObj)
  })
})