let addToy = false;

function addToyInfo(toyObj){
  // code for the parent div
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  //code for the h2 element
  const h2Tag = document.createElement("h2");
  h2Tag.innerText = `${toyObj.name}`;

  //code for the img tag
  const imgTag = document.createElement("img");
  imgTag.src = `${toyObj.image}`;
  imgTag.className = "toy-avatar";

  //code for p tag
  const pTag = document.createElement("p");
  pTag.innerText = `${toyObj.likes} Likes`;

  //code for button element
  const button = document.createElement("button");
  button.className = "like-btn";
  button.innerText = "Like <3";

  //append all children to parent div
  cardDiv.append(h2Tag,imgTag,pTag,button);
  return cardDiv;
}


document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(data => {
      //Iterate over returned data from fetch with forEach array method
      data.forEach((toyObj) =>{
        //Store output from addToyInfo function to a variable
        const toyInfoForDom = addToyInfo(toyObj);

        // Get access the DOM element that we will be putting our toys into
        const toyCollection = document.querySelector("#toy-collection")

        // Append result from addToyInfo() to the DOM element abaove
        toyCollection.append(toyInfoForDom);
      });

    });



  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
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
