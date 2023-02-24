/**
 * This function gets the list of books from local storage
 */
function getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  
  /**
   * This function adds a book to the list and saves it in local storage
   */
  function addBook(book) {
    const books = getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  /**
   * This function removes a book from the list and updates local storage
   */
  function removeBook(isbn) {
    const books = getBooks();
    books.forEach(function(book, index){
     if(book.isbn === isbn) {
      books.splice(index, 1);
     }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  /**
   * This function displays the list of books in the UI
   */
  function displayBooks() {
    const books = getBooks();
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    books.forEach(function(book){
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete" data-isbn="${book.isbn}">X</a></td>
      `;
      bookList.appendChild(row);
    });
  }
  
  /**
   * This event listener adds a book when the form is submitted
   */
  document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    
    const book = {
      title: title,
      author: author,
      isbn: isbn
    }
    
    addBook(book);
    
    displayBooks();
    
    e.preventDefault();
  });
  
  /**
   * This event listener removes a book when the delete button is clicked
   */
  document.getElementById('book-list').addEventListener('click', function(e){
    if(e.target.className === 'delete') {
      const isbn = e.target.getAttribute('data-isbn');
      removeBook(isbn);
      displayBooks();
    }
  });
  