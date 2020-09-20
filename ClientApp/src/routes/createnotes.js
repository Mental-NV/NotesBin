import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import CreateNotesPanel from '../components/CreateNotesPanel';
import LoadingPanel from '../components/LoadingPanel';

function CreateNotes(props) {
    let [content, setContent] = useState(null);
    let [title, setTitle] = useState(null);
    let [redirect, setRedirect] = useState(null);
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "NotesBin - Create notes";
    }, []);

    if (redirect) {
        return (<Redirect to={redirect} />);
    }

    if (loading) {
        return <LoadingPanel />;
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

                setLoading(true);

                fetch(`/api/notes`, {
                    method: 'POST',
                    body: JSON.stringify({ title, content }),
                    headers: {
                        'Content-Type': 'application/json',
                    }})
                    .then(r => {
                        if (!r.ok) {
                            throw new Error(r.statusText);
                        }
                        return r.json();
                    })
                    .then(result => {
                        setLoading(false);
                        setRedirect(`/view?id=${result.id}`);
                    })
                    .catch(error => {
                        throw new Error(error);
                    });
            }} 
        />
    );
}

export default CreateNotes;