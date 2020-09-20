let addToy = false;

let toyCollectionDiv = document.querySelector("div#toy-collection")
let newToyForm = document.querySelector(".add-toy-form")

fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(toyArray => {
  toyArray.forEach(toyObj => {
    turnToyToCard(toyObj)
  })
})

let turnToyToCard = (toy) => {
  let toyCard = document.createElement("div")
  toyCard.className = "class"

  let toyName = document.createElement("h2")
  toyName.innerText = toy.name

  let toyImg = document.createElement("img")
  toyImg.className = "toy-avatar"
  toyImg.src = toy.image
  toyImg.alt = `Image of ${toy.name}`

  let toyLikesP = document.createElement("p")
  toyLikesP.innerText = `${toy.likes} Likes`

  let toyLikeButton = document.createElement("button")
  toyLikeButton.className = "like-btn"
  toyLikeButton.innerText = "Like ❤️"

  toyCard.append(toyName, toyImg, toyLikesP, toyLikeButton)
  toyCollectionDiv.append(toyCard)

  toyLikeButton.addEventListener("click", (evt) => {
    let newToyLikes = toy.likes + 1
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: newToyLikes
      })
    })
    .then(res => res.json())
    .then(updatedToyObj => {
      toyLikesP.innerText = `${updatedToyObj.likes} Likes`
      toy.likes = newToyLikes
    })
  })

}

newToyForm.addEventListener("submit", (evt) => {
  //evt.target = toy form
  evt.preventDefault()
  let newToyName = evt.target.name.value
  let newToyImg = evt.target.image.value
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: newToyName,
      image: newToyImg,
      likes: 0
    })
  })
  .then(res => res.json())
  .then(newToyObj => {
    turnToyToCard(newToyObj)
    evt.target.reset()
  })
})


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
});
