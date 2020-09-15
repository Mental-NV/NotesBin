import React from 'react';
import { Typography, Paper } from '@material-ui/core';

import 'fontsource-roboto/300.css';
import './ViewNotesPanel.css';

function ViewNotesPanel(props) {
    let notes = props.notes;
    let formattedDate = null;
    if (notes.created) {
        formattedDate = new Date(notes.created).toLocaleString();
    }
    return (
        <div className='view-notes-container'>
            <Typography variant='h2'>{notes.title || 'No title'}</Typography>
            <Paper className='notes-content' elevation={3}>
                {notes.content || 'No content'}
            </Paper>
            <Typography className='notes-created'>The notes created: {formattedDate || 'No date'}</Typography>
        </div>
    );
}

export default ViewNotesPanel;