import * as React from 'react';
import {FC} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';

const TaskEditDialog: FC = function () {
    return (
        <Dialog open={false}>
            <DialogTitle>Создание новой задачи</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Задача"
                    fullWidth
                    multiline
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button>Отмена</Button>
                <Button>Создать</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskEditDialog;