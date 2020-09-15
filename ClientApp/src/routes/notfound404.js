import React, { useEffect } from 'react';

function NotFound404(props) {
    useEffect(() => {
        document.title = "NotesBin - Page not found";
    });
    return (
        <div>
            <h1>Page not found</h1>
        </div>
    );
}

export default NotFound404;