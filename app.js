const myLibrary = [];

const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".add-book-btn");
const closeButtons = document.querySelectorAll(".close-modal");

// "Show the dialog" button opens the dialog modally
addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        dialog.close();
      });
});

function Book(){

};

function addBookToLibrary() {

};