let addToy = false;
const toyCollectionDiv = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")

fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then((arrayOfToys) => {

    arrayOfToys.forEach((singleToy) => {
      turnToyToHTML(singleToy)
    })

})



// TEAM #WAVYMANNY
// const toyList = document.querySelector("div#toy-collection")
// const addBtn = document.querySelector("#new-toy-btn");
// const toyFormContainer = document.querySelector(".container");



// document.addEventListener("DOMContentLoaded", () => {
//   //we moved the addBtn and toyFormContainer variables to lines 3 and 4 above.
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
//   fetch("http://localhost:3000/toys")
//     .then(response => response.json())
//     .then(toyArray => {
//         toyArray.forEach(toyObj => {
//         turnToyToDiv(toyObj); //helper method goes here!
//         })
//     })
// });

//READ
//helper method
// let turnToyToDiv = (toy) => {
//   //step 1: Create Element
//   let toyDiv = document.createElement("div")
//   toyDiv.className = "card"
//   //step 2: Fill the contents of the element/Razzmataz!
//   toyDiv.innerHTML = `<h2>${toy.name}</h2>
//     <img src=${toy.image} class="toy-avatar" />
//     <p>${toy.likes} Likes </p>
//     <button class="like-btn">Like ♥️</button>`
//     // step 3: SLAP IT ON THE DOM!!!!!
//     toyList.append(toyDiv)
// }

//CREATE!!!

// toyFormContainer.addEventListener("submit", (evt) => {
//   evt.preventDefault()
//   let nameOfToy = evt.target.input_name.value
//   let imageOfToy = evt.target.input_image.value
//   fetch("http://localhost:3000/toys", {
//     method: "POST", 
//     headers: 
//     {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
     
//     body: JSON.stringify({
//       "name": nameOfToy,
//       "image": imageOfToy,
//       "likes": 0
//     })
//   })
//   .then(response => response.json())
//   .then(toyObj => {
//     turnToyToDiv(toyObj)
//   })
// })

// Lecture Solution
// {} -> <li></li>
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
    likeButton.innerText = "Like ♥️"


  toyCardDiv.append(toyNameH2, toyImg, toyLikesP, likeButton)
  toyCollectionDiv.append(toyCardDiv)


  likeButton.addEventListener("click", (evt) => {
    let theNewLikes = toy.likes + 1
    
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: theNewLikes
      })
    })
      .then(res => res.json())
      .then((updatedToy) => {
        toyLikesP.innerText = `${updatedToy.likes} Likes`

        toy.likes = updatedToy.likes
      })

  })


}
// turnToyToHTML func ends


toyForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  let theImage = evt.target.image.value
  let theName = evt.target.name.value
  
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
  .then((createdToy) => {
    turnToyToHTML(createdToy);
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
