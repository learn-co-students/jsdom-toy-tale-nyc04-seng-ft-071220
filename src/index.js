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

 function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys=> {
    toys.forEach((toy) =>{
    turnToyToHtml(toy)
    })

      // let arrOfNames=toy.name
      // console.log(arrOfNames)
      //   toyContainer.innerHTML += makeNameH2(arrOfNames)
 
   })


  let turnToyToHtml=(toyObj => {
   let outterToyDiv=document.createElement("div")
   outterToyDiv.className="card"

    let nameH2=document.createElement("h2") 
    nameH2.innerHTML=toyObj.name
   
    let toyImage=document.createElement("img")
    toyImage.src=toyObj.image
    toyImage.className="toy-avatar"
    
    let likesP=document.createElement("p")
    likesP.innerHTML=`${toyObj.likes} Likes`

    outterToyDiv.append(nameH2, toyImage, likesP)

    console.log(toyContainer)
    toyContainer.append(outterToyDiv)
  })
}

// function turnToyToHtml(name){
//   return `<h2>${name}</h2>`
// }

// function helperMethod(toy){
//  toy.name.forEach((nameIndex) =>{
//   let toyName=document.createElement("h2")
//   console.log(toyName)
//   toyName.innerHTML+=toy.name
//   toyContainer.append(toyName)

//  })
// }