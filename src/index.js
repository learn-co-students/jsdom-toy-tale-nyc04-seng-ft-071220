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
    toyLikes.innerText = `${toy.likes} likes`
    let toyDislikes = document.createElement("button");
    toyDislikes.className = "toyDislikes"
    toyDislikes.innerText = "👎"
    let toyButton = document.createElement("button");
    toyButton.className = "like-btn"
    toyButton.innerText = "👍"
    let deleteButton = document.createElement("button");
    deleteButton.className = 'delete-btn'
    deleteButton.innerText="delete"

    toyCollection.append(toyDiv);
    toyDiv.append(toyName, toyImg, toyLikes, toyButton, toyDislikes, deleteButton)

    let likeButton = toyDiv.querySelector(".like-btn");
    let toyyLikes = toyDiv.querySelector(".toyLikes");
// /######################### event listener #######################
    likeButton.addEventListener("click", (evt) => {
      let newLikesAmount = toy.likes+1

      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: newLikesAmount
        })
      })
        .then(res => res.json())
        .then((updateToyObject) => {
          // console.log(toyLikes);
          // console.log("updated toy object", updateToyObject);
          toy.likes = updateToyObject.likes
          // console.log("After Toy's 'Likes' has been updated", updateToyObject)
          // console.log(toyLikes);
          toyyLikes.innerText = `${updateToyObject.likes} likes`;
        })
    })
// ###################### Event Listener ############################
      let DislikeButton = toyDiv.querySelector(".toyDislikes");
      DislikeButton.addEventListener("click", (evt) => {
      let newLikesAmount = toy.likes-1
      // console.log(DislikeButton)
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: newLikesAmount
        })
      })
        .then(res => res.json())
        .then((updateToyObject) => {
          // console.log(toyLikes);
          // console.log("updated toy object", updateToyObject);
          toy.likes = updateToyObject.likes
          // console.log("After Toy's 'Likes' has been updated", updateToyObject)
          // console.log(toyLikes);
          toyyLikes.innerText = `${updateToyObject.likes} likes`;
        })
    })


    deleteButton.addEventListener("click", () => {
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then((emptyObject) => {
            // emptyObject -> {}
            toyDiv.remove()
        })
    })
    

  }


  fetch(url)
  .then(res => res.json())
  .then((toys) => {
    toys.forEach(toy=>{
      turnToyObjectToDiv(toy)
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
      createdToyObject.likes = 0
      turnToyObjectToDiv(createdToyObject)
      console.log(createdToyObject)
      evt.target.reset()
    })
  });
})