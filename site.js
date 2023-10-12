import { books } from "./books.js";
var changingBooks = [...books]
// Function to display books in the left pane
function displayBooks(bookList) {
  const bookListElement = document.getElementById("book-list");
  bookListElement.innerHTML = "";
  bookList.forEach((book, index) => {
    const bookItem = document.createElement("div");
    bookItem.className = "book draggable";
    bookItem.draggable = true;
    bookItem.dataset.index = index;
    bookItem.innerHTML = `
                    <img src=https://picsum.photos/seed/${index + 1
      }/150/150 style="margin-right: 1em;" >
                    <div>
                    <h3>${book.title}</h3>
                    <p>Description: ${book.description}</p>
                    <p>Rating: ${renderStars(book.rating)}</p>
                    </div>
                `;
    bookItem.ondragstart = drag;
    bookListElement.appendChild(bookItem);
  });
}

// Drag and drop functionality
function drag(event) {
  event.dataTransfer.setData("text/plain", event.target.dataset.index);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const index = event.dataTransfer.getData("text/plain");
  const book = books.books[index];
  const readingList = document.getElementById("reading-list");
  const bookItem = document.createElement("div");
  bookItem.className = "book";
  bookItem.innerHTML = `
                <img src=https://picsum.photos/seed/${parseInt(index) + 1
    }/300/300 style="; margin-right: 1em;" >
                <div>
                <h3>${book.title}</h3>
                <p>Pages: ${book.pages}</p>
                <p>Sold: ${book.number_sold}</p>
                <p>Description: ${book.description}</p>
                <p>Rating: ${renderStars(book.rating)}</p>
                </div>
            `;
  readingList.appendChild(bookItem);
}

function renderStars(rating) {
  if (isNaN(rating) || rating < 0 || rating > 5) {
    return ""; // Invalid rating
  }

  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const emptyStars = totalStars - fullStars;

  let starsHTML = "";

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<span class="star">★</span>'; // Full star (★)
  }

  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<span class="star">☆</span>'; // Empty star (☆)
  }

  return starsHTML;
}



const form = document.getElementById("add-form");
form.addEventListener("submit", AddBook)
const titleInput = document.getElementById('titleInput');
const ratingInput = document.getElementById('rating');
titleInput.addEventListener("input", ValidateTitle)
ratingInput.addEventListener("input", ValidateRating)



function AddBook(event) {
  event.preventDefault();
  const title = document.getElementById('titleInput').value;


  const description = document.getElementById('description').value;
  const rating = document.getElementById('rating').value;

  const titleIsBad = ValidateTitle()
  const ratingIsBad = ValidateRating()

  if(titleIsBad || ratingIsBad)
  {
    return
  }

  const newBook = {
    title,
    description,
    rating: rating,
    number_sold: 1000,
    pages: 2
  }
  changingBooks = [
    newBook,
    ...changingBooks
  ]  
  displayBooks(changingBooks);
}

function ValidateTitle() {
  const title = document.getElementById('titleInput').value;
  console.log(title)
  var alertType = '';

  if (!title) {
    alertType = "No text entered."
  }
  else if(title.length > 10){
    alertType = "Title is too long.";
  }

  const previousDiv = document.getElementById("titleErrorDiv")
  if(previousDiv)
    previousDiv.remove();

  const alertDiv = document.createElement("div");
  alertDiv.id="titleErrorDiv"
  alertDiv.textContent = alertType;
  alertDiv.classList.add('error-text');
  titleInput.parentNode.appendChild(alertDiv);

  return alertType;
}


function ValidateRating() {
  const rating = document.getElementById('rating').value;
  console.log(rating)
  var alertType = '';

  if (rating< 0) {
    alertType = "bad rating"
  }
  else if(rating > 5){
    alertType = "too high";
  }

  const previousDiv = document.getElementById("ratingErrorDiv")
  if(previousDiv)
    previousDiv.remove();

  const alertDiv = document.createElement("div");
  alertDiv.id="ratingErrorDiv"
  alertDiv.textContent = alertType;
  alertDiv.classList.add('error-text');
  ratingInput.parentNode.appendChild(alertDiv);

  return alertType;
}

// Initialize the page
displayBooks(books);
