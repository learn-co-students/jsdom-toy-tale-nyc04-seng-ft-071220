let addToy = false;
let url = "http://localhost:3000/toys"
let toyCollection = document.querySelector("#toy-collection");
let addToyForm = document.querySelector(".add-toy-form")


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

  let turnToyObjectToDiv = (toy) => {
    let toyDiv = document.createElement("div")
    toyDiv.className = "card"
    let toyName = document.createElement("h2");
    toyName.innerText = toy.name;
    let toyImg = document.createElement("img");
    toyImg.src = toy.image
    toyImg.className = "toy-avatar"
    let toyLikes = document.createElement("p");
    toyLikes.className = "toyLikes"
    toyLikes.innerText = `${toy.likes} Likes`
    let toyButton = document.createElement("button");
    toyButton.className = "like-btn"
    toyButton.innerText = "Like <3"

    toyCollection.append(toyDiv);
    toyDiv.append(toyName, toyImg, toyLikes, toyButton)

    let likeButton = toyDiv.querySelector(".like-btn")
    likeButton.addEventListener("click", (evt) => {
      let newLikesAmount = toy.likes + 1
      console.log(toy.likes)
      console.log(newLikesAmount)
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: newLikesAmount
        })
      })
        .then(res => res.json)
        .then((updateToyObject) => {
          console.log("updated toy object", updateToyObject.likes);
          toy.likes = updateToyObject.likes 
          console.log("After Toy's 'Likes' has been updated", toy)
          let toyLikes = document.querySelector(".toyLikes")
          toyLikes.innerText = updateToyObject.likes
          
        })
    })

  }

  
  fetch(url)
  .then(res => res.json())
  .then((toys) => {
    toys.forEach(toy=>{
      // create div tag, add class to it
      turnToyObjectToDiv(toy)

      // append the parent
     
    })
  })


  addToyForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let nameOfToy = evt.target.name.value
    let imageOfToy = evt.target.image.value 
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameOfToy,
        image: imageOfToy
      })
    })
    .then(res => res.json())
    .then(createdToyObject => {
      turnToyObjectToDiv(createdToyObject)
      evt.target.reset()
    })
  });


  
})