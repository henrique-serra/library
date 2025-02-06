const myLibrary = [
    new Book("1984", "George Orwell", 1949, "Ficção"),
    new Book("To Kill a Mockingbird", "Harper Lee", 1960, "Ficção"),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925, "Fantasia")
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
const main = document.querySelector("main");
const table = document.querySelector("table");

let currentRow;
let editingBook = false;

// Book constructor
function Book(title, author, year, genre) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
};

// Show modal when addBookBtn is clicked
addBookBtn.addEventListener("click", () => {
    form.reset();
    dialog.showModal();
});

confirmButton.addEventListener("click", function(event) {
    event.preventDefault();
    let returnValue = [];
    inputs.forEach(input => {
        returnValue.push(input.value);
    });
    let newBook = new Book(...returnValue);
    if (editingBook) {
        myLibrary.splice(currentRow.id, 1, newBook);
    } else {
        myLibrary.push(newBook);
    }
    editingBook = false;
    dialog.close(returnValue);
    appendBookRowsToTBody(myLibrary);
});

// "Close" button closes the dialog
closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
      });
});

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
    editButton.addEventListener("click", function(e) {
        editingBook = true;
        currentRow = this.closest("tr");
        let [titleTD, authorTD, yearTD, genreTD] = currentRow.querySelectorAll("td");
        // Update form according to the values of the row
        [titleInput.value, authorInput.value, yearInput.value, genreInput.value] = [titleTD.textContent, authorTD.textContent, yearTD.textContent, genreTD.textContent];
        dialog.showModal();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add("btn-danger");
    deleteButton.addEventListener("click", function(e) {
        let clickedRowIndex = this.closest("tr").id;
        if (confirm("Confirm deletion?")) {
            myLibrary.splice(clickedRowIndex, 1);
            appendBookRowsToTBody(myLibrary);
        }
        return
    });

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);
    actionsTd.appendChild(actionsDiv);
    tr.appendChild(actionsTd);

    return tr;
}

function appendBookRowsToTBody(library) {
    const tbody = document.querySelector("tbody");
    const table = tbody.parentNode;
    tbody.remove();
    const newTBody = document.createElement("tbody");
    library.forEach(book => {
        const bookRow = generateBookRow(book);
        newTBody.appendChild(bookRow);
    });
    table.appendChild(newTBody);
    newTBody.querySelectorAll("tr").forEach((row, index) => {
        row.id = index;
    });
}

window.addEventListener("DOMContentLoaded", e => {
    appendBookRowsToTBody(myLibrary);
})