import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import * as React from 'react';

function App() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <TaskAltIcon />

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: '10px' }}>
                        Task manager
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default App;