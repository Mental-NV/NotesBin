import React from 'react';
import { CircularProgress, Paper } from '@material-ui/core';
import './LoadingPanel.css'

function LoadingPanel(props) {
    return (
        <Paper className='load-div'>
            <CircularProgress />
        </Paper>
    );
}

export default LoadingPanel;