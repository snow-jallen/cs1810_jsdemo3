import { books } from "./books.js";

// Function to display books in the left pane
function displayBooks() {
  const bookList = document.getElementById("book-list");
  books.books.forEach((book, index) => {
    const bookItem = document.createElement("div");
    bookItem.className = "book draggable";
    bookItem.draggable = true;
    bookItem.dataset.index = index;
    bookItem.innerHTML = `
                    <img src=https://picsum.photos/seed/${
                      index + 1
                    }/150/150 style="margin-right: 1em;" >
                    <div>
                    <h3>${book.title}</h3>
                    <p>Description: ${book.description}</p>
                    <p>Rating: ${renderStars(book.rating)}</p>
                    </div>
                `;
    bookItem.ondragstart = drag;
    bookList.appendChild(bookItem);
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
                <img src=https://picsum.photos/seed/${
                  parseInt(index) + 1
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

// Initialize the page
displayBooks();
