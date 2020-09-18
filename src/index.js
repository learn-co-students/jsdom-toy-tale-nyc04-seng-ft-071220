let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const addToyForm = document.querySelector(".add-toy-form")
  const toyDiv = document.querySelector("#toy-collection")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch ("http://localhost:3000/toys")
    .then(res => res.json())
    .then((toysArray) => {
      turnToysIntoObjs(toysArray)
    }
  )

  function turnToysIntoObjs(toysArray) {
      toysArray.forEach((toy) => {

        let toyCard = document.createElement("div")
        toyCard.className = "card"
        let toyH2 = document.createElement("h2")
        toyH2.innerText = toy.name
        let toyImg = document.createElement("img")
        toyImg.src = toy.image
        toyImg.className = "toy-avatar"
        let toyPTag = document.createElement("p")
        toyPTag.innerText = toy.likes
        let likeButton = document.createElement("button")
        likeButton.className = "like-btn"
        let likeButton.innerText = "👍"
        toyCard.append(toyH2, toyImg, toyPTag, likeButton)
        toyDiv.append(toyCard)

        likeButton.addEventListener("click", (event) => {
          let newLike = parseInt(toyPTag.innerText) + 1
          fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              likes: newLike
            })
          })
            .then(res => res.json())
            .then((updatedToyObj) => {
              let updatedLike = updatedToyObj.likes
              console.log(updatedToyObj.likes)
              toyPTag.innerText = updatedToyObj.likes
            })
        })

      })
  }

  function turnToyIntoCard(toy) {
    let toyCard = document.createElement("div")
      toyCard.className = "card"
      let toyH2 = document.createElement("h2")
      toyH2.innerText = toy.name
      let toyImg = document.createElement("img")
      toyImg.src = toy.image
      toyImg.className = "toy-avatar"
      let toyPTag = document.createElement("p")
      toyPTag.innerText = toy.likes
      let likeButton = document.createElement("button")
      likeButton.className = "like-btn"
      toyCard.append(toyH2, toyImg, toyPTag, likeButton)
      toyFormContainer.append(toyCard)

      likeButton.addEventListener("click", (event) => {
        let newLike = toy.likes + 1
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            likes: newLike
          })
        })
          .then(res => res.json())
          .then((updatedToyObj) => {
            toy.likes = updatedToyObj.likes
            toyPTag.innerText = updatedToyObj.likes
          })
      })
      
  }

  addToyForm.addEventListener("submit", (event)=> {
    event.preventDefault()
    let toyName = event.target.name.value 
    let toyURL = event.target.image.value

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyURL,
        likes: 0,
      })
    })
      .then(res => res.json())
      .then((createdToy) => {
        turnToyIntoCard(createdToy)
      })

  })
    
});


