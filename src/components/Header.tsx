import * as React from 'react';
import {FC} from 'react';
import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Header : FC = function () {
    return (
        <AppBar position="static">
            <Toolbar>
                <TaskAltIcon />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: '10px' }}>
                    Task manager
                </Typography>
                <Button color="inherit">Добавить</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;