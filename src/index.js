let addToy = false;
const toyCollectionDiv = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")
// index.html stable element (line 48: '<div id="toy-collection" ...)

fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then((arrayOfToys) => {

    arrayOfToys.forEach((singleToy) => {
      turnToyToHTML(singleToy)
    })

  })


// html looks like this: 
//html
  //<div class="card">
    //<h2>Woody</h2>
    //<img src=toy_image_url class="toy-avatar" />
    //<p>4 Likes </p>
    //<button class="like-btn">Like <3</button>
  //</div>


//create helper function (generate 5 elements)
// {} -> <li></li>

let turnToyToHTML = (toy) => {
  let toyCardDiv = document.createElement("div")
    toyCardDiv.classList.add("card")

  let toyNameH2 = document.createElement("h2")
    toyNameH2.innerText = toy.name

  let toyImg = document.createElement("img")
    toyImg.src = toy.image
    toyImg.alt = toy.name  //alt = what we show if image fails to load
    toyImg.classList.add("toy-avatar")

  let toyLikesP = document.createElement("p")
    toyLikesP.innerText = `${toy.likes} Likes`

  let likeButton = document.createElement("button")
    likeButton.classList.add("like-button")
    likeButton.innerText = "Like <3"

  toyCardDiv.append(toyNameH2, toyImg, toyLikesP, likeButton)
  toyCollectionDiv.append(toyCardDiv)

  likeButton.addEventListener("click", (evt) => {
    let theNewLikes = toy.likes + 1
    

// sending a path request below - copy headers from ReadMe

    fetch(`http:/localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",  // describes the type of request (the body) of what we're sending
        Accept: "application/json" // 'Accept' tells us we want json back (this is a MIME type)
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
