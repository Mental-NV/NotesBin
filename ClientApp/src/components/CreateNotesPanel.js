import React from 'react';
import { TextField, Button } from '@material-ui/core';
import './CreateNotesPanel.css'

function CreateNotesPanel(props) {
    return (
        <div className='create-notes-container'>
            <TextField 
                placeholder="Title"
                className='new-title'
                variant='outlined'
                onChange={props.onTitleChange}>
                {props.title}
            </TextField>
            <TextField 
                className='new-notes-content'
                multiline
                placeholder="New notes" 
                variant="outlined" 
                rows={15}
                fullWidth
                onChange={props.onContentChange}>
                {props.content}
            </TextField>
            <Button onClick={props.onClick} variant='outlined'>Create</Button>
        </div>
    );
}

export default CreateNotesPanel;