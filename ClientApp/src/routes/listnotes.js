import React, { useEffect } from 'react';
import NotesTable from '../components/notestable';
import { loadAllNotes } from '../Utils';

function ListNotes(props) {
    useEffect(() => {
        document.title = "NotesBin";
    });
    let notesList = loadAllNotes();
    return (
        <NotesTable notesList={notesList} />
    );
}

export default ListNotes;
