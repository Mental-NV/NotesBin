import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import CreateNotesPanel from '../components/CreateNotesPanel';
import { saveNotes } from '../Utils';

function CreateNotes(props) {
    let [content, setContent] = useState(null);
    let [title, setTitle] = useState(null);
    let [redirect, setRedirect] = useState(null);

    useEffect(() => {
        document.title = "NotesBin - Create notes";
    });

    if (redirect) {
        return (<Redirect to={redirect} />);
    }

    return (
        <CreateNotesPanel 
            content={content} 
            title={title} 
            onContentChange={(e) => { setContent(e.target.value); }}
            onTitleChange={(e) => { setTitle(e.target.value); }}
            onClick={() => { 
                if (!title) {
                    alert("Title is required");
                    return;
                }
                if (!content) {
                    alert("Content is required");
                    return;
                }
                let id = saveNotes(title, content);
                if (id) {
                    setRedirect(`/view?id=${id}`);
                }
            }} 
        />
    );
}

export default CreateNotes;