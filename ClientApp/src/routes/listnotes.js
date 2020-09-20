import React, { useState, useEffect } from 'react';
import NotesTable from '../components/notestable';
import LoadingPanel from '../components/LoadingPanel';

function ListNotes(props) {
    useEffect(() => {
        document.title = "NotesBin";
    }, []);

    let [notesList, setNotesList] = useState(null);

    useEffect(() => {
        fetch("/api/notes")
            .then(r => r.json())
            .then(notes => setNotesList(notes));
    }, []);

    if (!notesList) {
        return <LoadingPanel />;
    }

    return (
        <NotesTable notesList={notesList} />
    );
}

export default ListNotes;
