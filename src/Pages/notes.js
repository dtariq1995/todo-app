
const notesArray = [];   // array to store note objects in

const colorPallete = ["#FFF9B1", "#daf7a1", "#FF9D48", "#FFCEE0", "#b1d3f6", "#8ca0ff",   // color pallete for notes
    "#b485bc", "#6ED8FA", "#eca2c4", "#77ccc7", "#ff0000", "#b6d7a8", "#C9DF56", "#ffc000"];

const notes = (function() {


    const notesFactory = (title, details) => {   // Factory Function that creates Notes

        return {title, details};
    };


    const sampleNote = notesFactory("Ali's dumb", "This is where the details would go for the note. :DLKFJDLS:FJ:LDSKFJ:LKFJDS:L");
    const sampleNote2 = notesFactory("title", "lorem ipsum dior");

    notesArray.push(sampleNote);
    notesArray.push(sampleNote2, sampleNote, sampleNote2, sampleNote, sampleNote2, sampleNote);

    console.log(notesArray);

})();


const notesDisplay = function() {   // controls notes display

    let displayArea = document.querySelector("#main-area");
    displayArea.innerHTML = "";

    let notesDisplayArea = document.createElement("div");
    notesDisplayArea.id = "notes-area"; 


    notesArray.forEach(function(note) {

        let noteCard = document.createElement("div");
        noteCard.classList.add("notecard");
        noteCard.style.backgroundColor = colorPallete[(Math.floor(Math.random() * 14))];

        let noteTitle = document.createElement("div");
        noteTitle.textContent = note.title;
        noteTitle.classList.add("note-title");

        let noteDetails = document.createElement("div");
        noteDetails.textContent = note.details;
        noteDetails.classList.add("note-details");

        noteCard.append(noteTitle, noteDetails);
        notesDisplayArea.append(noteCard);

    });

    displayArea.append(notesDisplayArea);


}


export default notesDisplay;