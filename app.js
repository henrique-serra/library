const myLibrary = [
    new Book("1984", "George Orwell", 1949, "Dystopian"),
    new Book("To Kill a Mockingbird", "Harper Lee", 1960, "Fiction"),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925, "Classic")
];

const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".add-book-btn");
const closeButtons = document.querySelectorAll(".close-modal");
const confirmButton = document.querySelector(".confirm-btn");
const form = document.querySelector("#bookForm");
const inputs = document.querySelectorAll(".input");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const yearInput = document.querySelector("#year");
const genreInput = document.querySelector("#genre");
const table = document.querySelector("table");

// "Show the dialog" button opens the dialog modally
addBookBtn.addEventListener("click", () => {
    form.reset();
    dialog.showModal();
});

confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    let returnValue = [];
    inputs.forEach(input => {
        returnValue.push(input.value);
    });
    let newBook = new Book(...returnValue);
    myLibrary.push(newBook);
    let newBookRow = generateBookRow(newBook);
    console.log(newBookRow);
    table.appendChild(newBookRow);
    dialog.close(returnValue);
});

// dialog.addEventListener("close", (e) => {
//     console.log(dialog.returnValue);
// });

// "Close" button closes the dialog
closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
      });
});

function Book(title, author, year, genre) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
};

function generateBookRow(book) {  
    const tr = document.createElement("tr");

    // Create td for each property
    ["title", "author", "year", "genre"].forEach(prop => {
        const td = document.createElement("td");
        td.textContent = book[prop];
        tr.appendChild(td);
    });

    const actionsTd = document.createElement("td");
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("btn-primary");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add("btn-danger");

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);
    actionsTd.appendChild(actionsDiv);
    tr.appendChild(actionsTd);

    return tr;
}

window.addEventListener("load", e => {
    if (myLibrary) {
        myLibrary.forEach(book => {
            const bookRow = generateBookRow(book);
            table.appendChild(bookRow);
        });
    };
})