import * as React from 'react';
import {FC} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {ITask} from '../types';

interface TaskEditDialogProps {
    tasks: ITask[];
    setTasks: (tasks: ITask[]) => void;
    task: null | ITask;
    setTask: (task: null | ITask) => void;
}

const TaskEditDialog: FC<TaskEditDialogProps> = function ({tasks, setTasks, task, setTask}) {
    const open = task !== null;

    let mode = 'none';
    if (task !== null) {
        mode = tasks
            .filter((t) => t.createdAt === task.createdAt)
            .length > 0 ? 'edit' : 'create';
    }

    const handleClickCreateOrEdit = function () {
        let newTasks = [...tasks];

        if (mode === 'edit') {
            newTasks = [
                ...tasks.filter(t => t.createdAt !== task.createdAt),
                {
                    ...task,
                    editedAt: Date.now(),
                }
            ];
        }

        if (mode === 'create') {
            newTasks.push(task);
        }

        setTasks(newTasks);
        handleClose();
    };

    const handleClose = function () {
        setTask(null);
    };

    return (
        <Dialog open={open}>
            <DialogTitle>
                {mode === 'edit' ? 'Редактирование задачи' : 'Создание новой задачи'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    value={open ? task.text : ''}
                    onChange={(e) => open ? setTask({...task, text: e.target.value}) : ''}
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