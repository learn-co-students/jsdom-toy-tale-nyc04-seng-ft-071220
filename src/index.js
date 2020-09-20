let addToy = false;


const toyCollectionDiv = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")


fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(arrayOfToys => {
  arrayOfToys.forEach((singleToy) => {
    turnToyToHTML(singleToy)
  })
})


let turnToyToHTML = (toy) => {
  let toyCardDiv = document.createElement("div")
    toyCardDiv.classList.add("card")

  let toyNameH2 = document.createElement("h2")
    toyNameH2.innerText = toy.name 

  let toyImg = document.createElement("img")
    toyImg.src = toy.image
    toyImg.alt = toy.name
    toyImg.classList.add("toy-avatar")

  let toyLikesP = document.createElement("p")
    toyLikesP.innerText = `${toy.likes} Likes`

  let likeButton = document.createElement("button")
    likeButton.classList.add("like-btn")
    likeButton.innerText = "Like <3"

  toyCardDiv.append(toyNameH2, toyImg, toyLikesP, likeButton)
  toyCollectionDiv.append(toyCardDiv)


  likeButton.addEventListener("click", (evt) => {
    let newLikes = toy.likes + 1

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })

      .then(res => res.json())
      .then(updatedToy => {
        console.log("updated Toy", updatedToy)
        toyLikesP.innerText = `${updatedToy.likes} Likes`
        toy.likes = updatedToy.likes 
    })
  })
}


let newFormHandler = (evt) => {
  evt.preventDefault()
  let theName = evt.target.name.value
  let theImage = evt.target.image.value

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: theName,
      image: theImage,
      likes: 1
    })
  })
    .then(res => res.json())
    .then(createdToy => {
      turnToyToHTML(createdToy)
      evt.target.reset()
    })
}


toyForm.addEventListener("submit", newFormHandler)


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
