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

//1. grab the toy collection div
//2. create a div element with class = card(unstable element)
 //h2 tag with the toy's name
//img tag with the src of the toy's image attribute and the class name "toy-avatar"

  let toyDiv = document.querySelector("div#toy-collection") //stable element
  // console.log(likeButton)

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
        // console.log(toyDiv)




        toyButton.addEventListener('click', (evt) => {
          let numberOfLikes = toyPOJO.likes + 1;

          fetch(`http://localhost:3000/toys/${toyPOJO.id}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify( {
              likes: numberOfLikes
            })
          })
  
          .then(res => res.json())
          .then((updatedToyObject) => {

            toyPOJO.likes = updatedToyObject.likes
            toyLikes.innerText =`Likes: ${updatedToyObject.likes}`  
            })
        })

        // learn.co suggested this 

        // PATCH http://localhost:3000/toys/:id
        // headers: 
        // {
        //   "Content-Type": "application/json",
        //   Accept: "application/json"
        // }
         
        // body: JSON.stringify({
        //   "likes": <new number>
        // })


      }
      //p tag with how many likes that toy has
      //button tag with a class "like-btn"



        // FORM SUBMISSION TO ADD NEW TOY 

        let toyForm = document.querySelector('.add-toy-form')
        // console.log(toyForm)
      
        toyForm.addEventListener('submit', (evt) => {
          evt.preventDefault()

          let theNameOfToyInput = evt.target.name.value
          let theImageOfToyInput = evt.target.image.value

          // console.log(theNameOfToyInput)

        fetch("http://localhost:3000/toys", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify( {
            name: theNameOfToyInput,
            image: theImageOfToyInput,
            likes: 0
          })
        })

        .then(res => res.json())
        .then((newToyAdded) => {

          addToyToCollection(newToyAdded)

            // console.log(newToyAdded)
          })
        
        })



    
        


      


