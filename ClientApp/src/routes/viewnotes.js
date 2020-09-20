import React, { useState, useEffect } from 'react';
import ViewNotesPanel from '../components/ViewNotesPanel';
import { Typography } from '@material-ui/core';
import LoadingPanel from '../components/LoadingPanel';
import { getUrlParam } from '../Utils';

function ViewNotes(props) {
    useEffect(() => {
        document.title = "NotesBin - View notes";
    }, []);

    let [notes, setNotes] = useState(null);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        let id = parseInt(getUrlParam("id"));
        if (isNaN(parseInt(id))) {
            setLoading(false);
            return;
        }
        fetch(`/api/notes/${id}`)
            .then(r => {
                if (r.ok) {
                    return r.json();
                }
                throw new Error(r.statusText);
            })
            .then(notes => {
                setNotes(notes);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingPanel />;
    }
    if (!notes) {
        return (
            <Typography variant='h2'>The notes not found</Typography>
        );
    }
    return (
        <ViewNotesPanel notes={notes}  />
    );
}

export default ViewNotes;
