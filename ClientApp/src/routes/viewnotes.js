import React, { useEffect } from 'react';
import '../components/ViewNotesPanel';
import ViewNotesPanel from '../components/ViewNotesPanel';
import { getUrlParam, loadAllNotes } from '../Utils';
import { Typography } from '@material-ui/core';

function ViewNotes(props) {
    useEffect(() => {
        document.title = "NotesBin - View notes";
    });
    let id = parseInt(getUrlParam("id"));
    let notes;
    if (!isNaN(parseInt(id))) {
        let allNotes = loadAllNotes();
        [notes] = allNotes.filter(x => x.id === id);
    }
    if (!notes) {
        return (
            <Typography>Notes not found</Typography>
        );
    }
    return (
        <ViewNotesPanel notes={notes}  />
    );
}

export default ViewNotes;
