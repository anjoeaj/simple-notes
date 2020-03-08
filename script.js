let notes = {} //dictionary to hold the notes
let colors = ["red", "green", "blue", "yellow"];
let autoIncrId = 0;
let selectedColor = "";
let selectedId = 0;

class Note {
    constructor(id, noteTitle, note, noteColor) {
        this.id = id;
        this.title = noteTitle;
        this.note = note;
        this.color = noteColor;
        this.createdTime = Date();
        this.lastUpdatedTime = Date();
    }

    editNote(noteTitle, note, noteColor) {
        this.title = noteTitle;
        this.note = note;
        this.color = noteColor;
        this.lastUpdatedTime = Date();
    }
}

function createNote(id, noteTitle, note, noteColor) {
    let newNote = new Note(id, noteTitle, note, noteColor);
    return newNote;
}

//populateDummyNotes();
renderList(notes);
renderColorGrid();
clearFieldsAndValues();

function populateDummyNotes() {
    //let currentId = autoIncrId;
    let newNode = createNote(autoIncrId, "Hello", "This is a short note", "red");
    notes[autoIncrId] = newNode;
    autoIncrId += 1;

    newNode = createNote(autoIncrId, "Hello Again", "This is a medium note", "blue");
    notes[autoIncrId] = newNode;
    autoIncrId += 1;

    newNode = createNote(autoIncrId, "Heo", "This is a long note", "green");
    notes[autoIncrId] = newNode;
    autoIncrId += 1;
}

let saveBtn = document.getElementById('save');
let deleteBtn = document.getElementById('delete');
let newBtn = document.getElementById('new');

saveBtn.onclick = function(e) {
    let note = notes[selectedId];
    let noteTitle = document.getElementById("noteTitle").value;
    let noteText = document.getElementById("note").value;
    note.editNote(noteTitle, noteText, selectedColor);
    clearFieldsAndValues();
    reloadAndRefresh();
}

function clearFieldsAndValues() {
    selectedColor = "";
    selectedId = "";
    document.getElementById("noteTitle").value = "";
    document.getElementById("note").value = "";
    document.getElementById("note").className = "";

    document.getElementById("save").style.display = "none";
    document.getElementById("delete").style.display = "none";
}

deleteBtn.onclick = function(e) {
    delete notes[selectedId];
    reloadAndRefresh();
    clearFieldsAndValues();
}

newBtn.onclick = function(e) {
    let noteTitle = document.getElementById("noteTitle").value;
    let note = document.getElementById("note").value;

    if (noteTitle) {
        let newNote = new Note(autoIncrId, noteTitle, note, selectedColor);
        notes[autoIncrId] = newNote;
        autoIncrId += 1;
        createAndAppendNewNote(newNote);
        clearFieldsAndValues();
    }


}


function pickColor(e) {
    selectedColor = this.className;
    let note = document.getElementById("note");

    note.className = selectedColor;
}

function renderNote(elem) {
    let noteTitle = document.getElementById("noteTitle");
    let note = document.getElementById("note");

    if (this.id) {
        noteTitle.value = notes[this.id].title;
        note.value = notes[this.id].note;
        selectedColor = notes[this.id].color;
        selectedId = notes[this.id].id;
        note.className = selectedColor;

        document.getElementById("save").style = "";
        document.getElementById("delete").style = "";
    }
}

function reloadAndRefresh() {
    let notesListDiv = document.getElementById('notes');
    notesListDiv.innerHTML = "";
    renderList(notes);
}

function deleteNote(id) {
    delete notes[id];
}

function renderList(notesList) {
    for (let id in notesList) {
        createAndAppendNewNote(notes[id]);
    }
}

function createAndAppendNewNote(note) {
    let notesListDiv = document.getElementById('notes')
    let noteDiv = document.createElement('div');
    let noteTitleElem = document.createElement('h3');
    let noteTextElem = document.createElement('p');

    noteTitleElem.innerText = note.title;
    noteTextElem.innerText = note.note;
    noteDiv.id = note.id;
    noteDiv.className = "noteRow " + note.color;
    noteDiv.appendChild(noteTitleElem);
    noteDiv.appendChild(noteTextElem);
    noteDiv.onclick = renderNote;

    notesListDiv.appendChild(noteDiv);
}

function renderColorGrid() {

    let colorOuterDiv = document.getElementById('colorGrid')

    for (let color of colors) {
        let colorDiv = document.createElement('button');
        colorDiv.className = color;
        colorDiv.onclick = pickColor;
        colorOuterDiv.appendChild(colorDiv);
    }

}