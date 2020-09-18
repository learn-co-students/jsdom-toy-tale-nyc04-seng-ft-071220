let addToy = false;
let url = "http://localhost:3000/toys"
let toyCollection = document.querySelector("#toy-collection");


document.addEventListener("DOMContentLoaded", () => {
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

  
  fetch(url)
  .then(res => res.json())
  .then((toys) => {
    toys.forEach(toy=>{
      // create div tag, add class to it
      let cardObj = document.createElement("div");
      cardObj.className = "card";
      let toyName = document.createElement("h2");
      toyName.innerText = toy.name;
      let toyImg = document.createElement("img");
      toyImg.src = toy.image
      toyImg.className = "toy-avatar"
      let toyLikes = document.createElement("p");
      // toyLikes.inner = `${counter} Likes`
      let toyButton = document.createElement("button");
      toyButton.className = "like-btn"

      // append the parent
      toyCollection.append(cardObj);
    })
  })



});
