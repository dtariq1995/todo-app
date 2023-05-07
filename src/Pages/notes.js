

export let notesArray = [];   // array to store note objects in

const colorPallete = ["#FFF9B1", "#daf7a1", "#FF9D48", "#FFCEE0", "#b1d3f6", "#8ca0ff",   // color pallete for notes
    "#b485bc", "#6ED8FA", "#eca2c4", "#77ccc7", "#FF5768", "#b6d7a8", "#C9DF56", "#ffc000"
];




export const notesFactory = (title, details) => {   // Factory Function that creates Notes

    return {title, details};
};



const sampleNote = notesFactory("Placeholder Title", "This is where the details would go for the note. :DLKFJDLS:FJ:LDSKFJ:LKFJDS:L");
const sampleNote2 = notesFactory("title", "lorem ipsum dior");

notesArray.push(sampleNote, sampleNote2);

let storedNotes = JSON.parse(localStorage.getItem("notes"));

if (!storedNotes) {
    localStorage.setItem("notes", JSON.stringify(notesArray));
}




const notesDisplay = function() {   // controls notes display

    let displayArea = document.querySelector("#main-area");   // clear display area before displaying notes
    displayArea.innerHTML = "";

    let notesDisplayArea = document.createElement("div");   // create notes display area
    notesDisplayArea.id = "notes-area"; 


    notesArray.forEach(function(note) {   // display all notes from notes array

        let noteCard = document.createElement("div");   // create note card
        noteCard.classList.add("notecard");
        noteCard.style.backgroundColor = colorPallete[(Math.floor(Math.random() * colorPallete.length))];   // choose random color from color pallete for notes

        let noteTitle = document.createElement("div");   // display note title
        noteTitle.textContent = note.title;
        noteTitle.classList.add("note-title");

        let noteDeleteBtn = document.createElement("button");   // add delete button to note
        noteDeleteBtn.textContent = "×";
        noteDeleteBtn.id = "note-delete-btn";
        noteDeleteBtn.addEventListener('click', event => {   // remove note from array and display 
            event.target.parentNode.style.opacity = "0";
            setTimeout(() => event.target.parentNode.remove(), 400);
            notesArray.splice(notesArray.indexOf(note), 1);
            localStorage.setItem("notes", JSON.stringify(notesArray));
            emptyNoteDisplay(notesArray.length);
        });

        let noteDetails = document.createElement("div");   // display note details
        noteDetails.textContent = note.details;
        noteDetails.classList.add("note-details");

        noteCard.append(noteDeleteBtn, noteTitle, noteDetails);   // add delete button, title, and details to notecard
        notesDisplayArea.append(noteCard);   // add notecard to notes display area

    });
    displayArea.append(notesDisplayArea);
}



export const emptyNoteDisplay = function(arrayLength) {

    if (arrayLength == 0) {

    
        let noteArea = document.getElementById("main-area");
        noteArea.innerHTML = "";

        let emptyNoteArea = document.createElement("div");
        emptyNoteArea.id = "empty-project-area";

        let emptyNoteHeading = document.createElement("div");
        emptyNoteHeading.id = "empty-project-heading";
        emptyNoteHeading.textContent = "There's Nothing Here!";

        let emptyNoteText = document.createElement("div");
        emptyNoteText.id = "empty-project-text";
        emptyNoteText.textContent = "Create a new note.";


        emptyNoteArea.append(emptyNoteHeading, emptyNoteText);
        noteArea.append(emptyNoteArea);
    }

    else {
        return;
    }

}


export default notesDisplay;