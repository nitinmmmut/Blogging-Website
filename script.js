
// Get the "Add" button element by its ID
const addnew = document.getElementById("addbtn");

// Get the addmore box element by its class name
const addmoreBox = document.querySelector(".addmore-box");

// Get the title element in the addmore box
const addmoreTitle = addmoreBox.querySelector("header p");

// Get the close icon element in the addmore box
const closeIcon = addmoreBox.querySelector("header i");

// Get the title input element in the addmore box form
const titleTag = addmoreBox.querySelector("input");

// Get the description textarea element in the addmore box form
const descTag = addmoreBox.querySelector("textarea");

// Get the publish button element by its class name
const Publish = document.querySelector(".Publish");

// Get the cancel button element by its class name
const Cancel = document.querySelector(".Cancel");

// Get the add box element by its class name
const addBox = document.querySelector(".add-box");

// Add a click event listener to the "Add" button
addnew.addEventListener("click", () => {

    // Update the text of the addmoreTitle element
    addmoreTitle.innerText = "Add a new Note";

    // Update the text of the Publish button
    Publish.innerText = "Publish Post";
    // Update the text of the Cancel button
    Cancel.innerText = "Cancel Post";

    // Add the "show" class to the addmoreBox element
    addmoreBox.classList.add("show");
    // Set the "overflow" style property of the body element to "hidden"
    document.querySelector("body").style.overflow = "hidden";
    // If the window width is greater than 660 pixels, focus on the title input element
    if (window.innerWidth > 660) titleTag.focus();
    // Add a click event listener to the Cancel button that calls the "close" function
    Cancel.addEventListener("click", close);
});

closeIcon.addEventListener("click", close);
function close() {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    addmoreBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
}

Cancel.addEventListener("click", () => {
    if (Cancel.innerText.includes("Cancel")) {
        close();
    } else deleteNote();
});

function deleteNote(noteId) {
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}
function updateNote(noteId, title, filterDesc) {
    let description = filterDesc.replaceAll("<br/>", "\r\n");
    updateId = noteId;
    isUpdate = true;
    addnew.click();
    titleTag.value = title;
    descTag.value = description;
    addmoreTitle.innerText = "Update a Note";
    Publish.innerText = "Save Post";
    Cancel.innerText = "Delete Post";
    Cancel.addEventListener("click", deleteNote);
}

let date = new Date();
let time = date.getHours() + ":" + date.getMinutes() + " PM";
let d = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
let final = "Created At :" + d + " at " + time;
console.log(final);
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
    updateId;

function showNotes() {
    // If notes are not defined or null, return
    if (!notes) return;

    // Remove all existing note elements from the DOM

    document.querySelectorAll(".note").forEach((li) => li.remove());
    // Iterate over each note in the notes array and add a new note element to the DOM
    notes.forEach((note, id) => {
        // Replace all newline characters with a line break HTML tag
        let filterDesc = note.description.replaceAll("\n", "<br/>");
        let liTag = `<li class="note">
                        <div class="details">
                            <h1>${note.title}</h1>
                            <span>${note.description}</span> 
                            <div class='bottom-content'>
                            <div style= "margin-top: 50px" class="menu">
                            
                                    <button style = "width: 150px; height: 40px"  onclick="updateNote(${id}, 
                                        '${note.title}', '${filterDesc}')">
                                        <i class="uil uil-pen"></i>Edit Post</button>

                                    <button style = "width: 150px; height: 40px" onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete Post</button>
                            <span style="margin-left: 600px">${final}</span> 
                                </div>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

Publish.addEventListener("click", (e) => {
    e.preventDefault();
    let title = titleTag.value,
        description = descTag.value;

    if (title || description) {
        let currentDate = new Date(),
            month = currentDate.getMonth(),
            day = currentDate.getDate(),
            year = currentDate.getFullYear();

        let noteInfo = { title, description, date: `${month} ${day}, ${year}` };
        if (!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});