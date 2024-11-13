// script.js
const addNoteButton = document.getElementById('addNoteButton');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

// Функция для загрузки заметок из localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(noteText => {
        addNoteToList(noteText);
    });
}

// Функция для добавления заметки в список и в localStorage
function addNoteToList(noteText) {
    const li = document.createElement('li');
    li.textContent = noteText;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 0a.5.5 0 0 1 .5.5V1h5V.5a.5.5 0 0 1 1 0V1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h1V.5a.5.5 0 0 1 .5-.5zM1 3h14v1H1V3zm1 2h12v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm2 0v10h8V5H4z"/></svg>'; // Иконка удаления
    deleteButton.addEventListener('click', () => {
        notesList.removeChild(li);
        removeNoteFromStorage(noteText);
    });

    li.appendChild(deleteButton);
    notesList.appendChild(li);
}

// Функция для удаления заметки из localStorage
function removeNoteFromStorage(noteText) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.filter(note => note !== noteText);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
}

// Событие при нажатии кнопки "Добавить заметку"
addNoteButton.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        addNoteToList(noteText);
        saveNoteToStorage(noteText);
        noteInput.value = ''; // Очистить поле ввода
    } else {
        alert('Введите текст заметки!');
    }
});

// Функция для сохранения заметки в localStorage
function saveNoteToStorage(noteText) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Загрузка заметок при загрузке страницы
window.onload = loadNotes;

