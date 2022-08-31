import * as React from 'react';
import {FC} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {ITask} from '../types';

interface TaskEditDialogProps {
    tasks: ITask[];
    setTasks: (tasks: ITask[]) => void;
    currentTask: null | ITask;
    setCurrentTask: (task: null | ITask) => void;
}

const TaskEditDialog: FC<TaskEditDialogProps> = function ({tasks, setTasks, currentTask, setCurrentTask}) {
    const open = currentTask !== null;

    let mode = 'none';
    if (currentTask !== null) {
        mode = tasks
            .filter((task) => task.createdAt === currentTask.createdAt)
            .length > 0 ? 'edit' : 'create';
    }

    const handleClickCreateOrEdit = function () {
        let newTasks = [...tasks];

        if (mode === 'edit') {
            const oldTask = tasks.find(task => task.createdAt === currentTask.createdAt)
            const oldTaskPos = tasks.indexOf(oldTask);
            newTasks[oldTaskPos] = {
                ...currentTask,
                editedAt: Date.now(),
            }
        }

        if (mode === 'create') {
            newTasks.push(currentTask);
        }

        setTasks(newTasks);
        handleClose()
    };

    const handleClose = function () {
        setCurrentTask(null);
    }

    return (
        <Dialog open={open}>
            <DialogTitle>
                {mode === 'edit' ? 'Редактирование задачи' : 'Создание новой задачи'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    value={open ? currentTask.text : ''}
                    onChange={(e) => open ? setCurrentTask({...currentTask, text: e.target.value}) : ''}
                    autoFocus
                    margin="dense"
                    label="Задача"
                    fullWidth
                    multiline
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={handleClickCreateOrEdit}>{mode === 'edit' ? 'Сохранить' : 'Создать'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskEditDialog;