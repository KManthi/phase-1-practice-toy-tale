let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector('.add-toy-form')
  const baseURL = 'http://localhost:3000/toys'
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = toyForm.querySelector('#name').value;
    const img = toyForm.querySelector('#image').value;

    const newToy = {
      name: name,
      image: img,
      likes: 0 
    };

    fetch(baseURL, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
          Accept: "application/json"
        },
           body: JSON.stringify(newToy)
          })
          .then(res => res.json())
          .then(newToy => {
              displayToys(newToy);
              toyForm.reset();
            })
            .catch(error => console.error('Error adding new toy:', error));
          })

          fetchToys();
        });

        
const baseURL = 'http://localhost:3000/toys'

function fetchToys () {
  fetch(`${baseURL}`)
  .then(res => res.json())
  .then (toys => {
    displayToys(toys);
  })
  .catch(error => console.error('Error fetching toys:', error));
}

function displayToys(toys) {
  const toyCollection = document.getElementById('toy-collection');
  
  toys.forEach( toy => {

    const card = document.createElement('div');
    card.className = 'card';
    
    const name = document.createElement('h2');
    name.textContent = toy.name;

    const img = document.createElement('img')
    img.src = toy.image;
    img.className = 'toy-avatar';

    const likes = document.createElement('p')
    likes.textContent = `${toy.likes} likes`;

    const likeBtn = document.createElement('button')
    likeBtn.className = 'like-btn';
    likeBtn.id = 'toy.id';
    likeBtn.textContent = 'Like ❤️';
    likeBtn.addEventListener('click', () => {
      likeToy(toy.id, likes);
    })

    card.appendChild(name);
    card.appendChild(img);
    card.appendChild(likes);
    card.appendChild(likeBtn);

    toyCollection.appendChild(card);
  })
}

function likeToy(toyId, likesElement) {
  const likeCount = parseInt(likesElement.textContent) + 1;
  
  fetch(`${baseURL}/${toyId}`, {
  method: 'PATCH',
  headers:
  {
    'Content-Type' : 'application/json',
    Accept: 'application/json'
  }, 

  body: JSON.stringify({
    'likes': likeCount
  })
  })
  .then(res => res.json())
  .then(updatedToy => {
    likesElement.textContent = `${updatedToy.likes} likes`;
  })
  .catch(error => console.error('Error liking toy:', error));
}