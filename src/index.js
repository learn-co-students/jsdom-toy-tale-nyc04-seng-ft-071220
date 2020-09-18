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

  fetchToys()
});



const toyContainer=document.querySelector("div#toy-collection")

//first deliverable start
 function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys=> {
    toys.forEach((toy) =>{
    turnToyToHtml(toy)
    })

   })

  let turnToyToHtml=(toyObj=> {
   let outterToyDiv=document.createElement("div")
   outterToyDiv.className="card"

    let nameH2=document.createElement("h2") 
    nameH2.innerHTML=toyObj.name
   
    let toyImage=document.createElement("img")
    toyImage.src=toyObj.image
    toyImage.className="toy-avatar"
    
    let likesP=document.createElement("p")
    likesP.innerHTML=`${toyObj.likes} Likes`

    let button=document.createElement("btn")
    button.className="like-btn"
    button.innerHTML="Like <3"

    outterToyDiv.append(nameH2, toyImage, likesP,button)

    console.log(toyContainer)
    toyContainer.append(outterToyDiv)


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


    })







  })
}

//first deliverable end

