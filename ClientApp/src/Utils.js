export function loadAllNotes() {
    let json = localStorage.getItem('notes');
    let allNotes = [];
    if (json) {
        allNotes = JSON.parse(json);
    }
    return allNotes;
}

export function saveNotes(title, content) {
    let allNotes = loadAllNotes();
    let created = new Date().toISOString();
    let id = allNotes.length ;
    let notes = { content, title, created, id };
    allNotes.push(notes);
    let json = JSON.stringify(allNotes);
    localStorage.setItem('notes', json);
    return id;
}

export function getUrlParam(paramName) {
    let url = new URL(document.location.href);
    var value = url.searchParams.get(paramName);
    return value;
}