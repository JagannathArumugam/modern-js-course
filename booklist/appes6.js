class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // Add book
  addBookToList(book) {
    const list = document.querySelector('#book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
  }

  // Show alert message
  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const containerDiv = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    containerDiv.insertBefore(div, form);
    // Timeout after 3 seconds
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  // Delete book
  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  // Clear Fields
  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Local storage class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book) {
      const ui = new UI;

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function(book, index) {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for adding the book
document.querySelector('#book-form').addEventListener('submit', function(e) {
  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Instantiate a book
  const book = new Book(title, author, isbn);

  // Instantiate the UI
  const ui = new UI();

  // Validation
  if(title === '' || author === '' || isbn === '') {
    // Error alert message
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Add book to LS
    Store.addBook(book);
    // Success alert message
    ui.showAlert('Book added!', 'success');
    // Clear the fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for deleting the book
document.querySelector('#book-list').addEventListener('click', function(e) {

  // Instantiate the UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showAlert('Book removed!', 'success');

  e.preventDefault();
});