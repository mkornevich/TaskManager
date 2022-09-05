import * as React from 'react';
import {FC} from 'react';
import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

interface HeaderProps {
    onCreateClick: () => void;
}

const Header: FC<HeaderProps> = function ({onCreateClick}) {
    return (
        <AppBar position="static">
            <Toolbar>
                <TaskAltIcon/>
                <Typography variant="h6" component="div" sx={{flexGrow: 1, ml: '10px'}}>
                    Task manager
                </Typography>
                <Button onClick={onCreateClick} color="inherit" data-testid='header-create-btn'>Создать</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;