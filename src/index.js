let addToy = false;

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


//On the index.html page, there is a div with the id "toy-collection."
//When the page loads, make a 'GET' request to fetch all the toy objects.
// With the response data, make a <div class="card"> for each toy and
// add it to the toy-collection div.

//1. grab the toy collection div
//2. create a div element with class = card(unstable element)
 //h2 tag with the toy's name
//img tag with the src of the toy's image attribute and the class name "toy-avatar"

  let toyDiv = document.querySelector("div#toy-collection") //stable element

    fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then((toyObj) => {
        toyObj.forEach((toys) => {
        addToyToCollection(toys)})
      })

      let addToyToCollection = (toyPOJO) => {

        let newToyDiv = document.createElement("div")
        newToyDiv.className = "card"
        toyDiv.append(newToyDiv)
        // console.log(newToyDiv)
          

        let toyName = document.createElement("h2")
        toyName.innerText = toyPOJO.name
        newToyDiv.append(toyName)
        // console.log(newToyDiv)

        let toyImg = document.createElement("img")
        toyImg.className = "toy-avatar"
        toyImg.src = toyPOJO.image
        newToyDiv.append(toyImg)
        // console.log(toyDiv)

        let toyLikes = document.createElement("p")
        toyLikes.innerText = `Likes: ${toyPOJO.likes}`
        newToyDiv.append(toyLikes)


        let toyButton = document.createElement("button")
        toyButton.className = "like-btn"
        toyButton.innerText = "Like <3"
        newToyDiv.append(toyButton)
        console.log(toyDiv)

        }
      


//p tag with how many likes that toy has
//button tag with a class "like-btn"
    
      






