// BOOK CONSTRUCTOR - creating the book object
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI CONSTRUCTOR - set of prototypes methods to do thing like add book to the list, delete, show the alert
function UI(){}

// add book to the list
UI.prototype.addBookToList = function(book){
    console.log(book);
    const list = document.getElementById('book-list');
    // create tr element
    const row = document.createElement('tr');
    const column = document.createElement('td');
    // insert columns
    row.innerHTML = '<td>' +book.title+ 
        '</td><td>' +book.author+ 
        '</td><td>' +book.isbn+ 
        '</td> <td><a href="#" class="delete"> delete</a></td>';
    list.appendChild(row);
}

// delete book from the list
UI.prototype.deleteBookFromList = function(target){
    if(target.className === 'delete'){
        console.log('del');
        target.parentElement.parentElement.remove();
    }
}

// clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// call an alert
UI.prototype.showAlert = function(message, className){
    const div = document.createElement('div');
    div.className = 'alert '+className;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

// event listener for add button
document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // instantiate book
    const book = new Book(title, author, isbn);

    //instantiate UI
    const ui = new UI();

    // validate
    if(title === '' || author === '' ){
        ui.showAlert('please fill in all the fields', 'error');
    }else{
        ui.addBookToList(book);
        ui.showAlert('book added', 'success');
        ui.clearFields();
    }
    

    console.log(title, author, isbn, book);
    e.preventDefault();
});

// event delegation = if we have something that will show up more then onces with the same class or something that it's not there when the page is lowded, but it's dynamicly added, then we will have to use an event delegation

// event listener for delete button
document.getElementById('book-list').addEventListener('click', function(e){
    //instantiate UI
    const ui = new UI();

    ui.deleteBookFromList(e.target);
    ui.showAlert('book removed', 'success');
    
    console.log(e.target);
    e.preventDefault();
});