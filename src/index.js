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

  // fetchToys()
});


const toyForm=document.querySelector(".add-toy-form")
const toyContainer=document.querySelector("div#toy-collection")

//first deliverable start #GET/read
//fetch all the toys
//  function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys=> {
    toys.forEach((toy) =>{
    turnToyToHtml(toy)
    })

   })


   //create render function
   //creates the elements and appends them to screen
  let turnToyToHtml=(toyObj=> {
   let outterToyDiv=document.createElement("div")
   outterToyDiv.className="card"

    let nameH2=document.createElement("h2") 
    nameH2.innerHTML=toyObj.name
   
    let toyImage=document.createElement("img")
    toyImage.src=toyObj.image
    toyImage.classList.add("toy-avatar")
    
    let likesP=document.createElement("p")
    likesP.innerHTML=`${toyObj.likes} Likes`

    let button=document.createElement("button")
    button.classList.add="like-btn"
    button.innerHTML="Like <3"
    outterToyDiv.append(nameH2, toyImage, likesP,button)
    console.log(toyContainer)
    toyContainer.append(outterToyDiv)







 //this updates the like button #update
    button.addEventListener("click", (evt) =>{
      toyObj.likes += 1
      fetch(`http://localhost:3000/toys/${toyObj.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify ({
          likes: toyObj.likes
        })
      })
        .then(res=>res.json())
        .then((updatedToy)=> {
          likesP.innerHTML= `${updatedToy.likes} Likes`
        })

        //update object in memory
       toyObj.likes=updatedToy.likess

    })


  })







//first deliverable end

  //create toy form
  toyForm.addEventListener("submit", (evt) =>{
    evt.preventDefault()
    let theImage=evt.target.image.value
    let theName=evt.target.name.value
    
    fetch("http://localhost:3000/toys", {
      method: 'POST',
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
      turnToyToHtml(createdToy)
      evt.target.reset()
    })


  })

 