import * as React from 'react';
import {FC} from 'react';
import {Menu, MenuItem} from '@mui/material';
import {ITask} from '../types';

interface TaskCardMenuProps {
    open: boolean;
    anchorEl: null | HTMLElement;
    onClose: () => void;
    currentTask: null | ITask;
    onClickMenuItem: (action: string, task: ITask) => void;
}

const TaskCardMenu: FC<TaskCardMenuProps> = function ({open, anchorEl, onClose, currentTask, onClickMenuItem}) {
    return (
        <Menu
            id="task-card-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
        >
            <MenuItem onClick={() => onClickMenuItem('edit', currentTask)}>Редактировать</MenuItem>
            <MenuItem onClick={() => onClickMenuItem('remove', currentTask)}>Удалить</MenuItem>
        </Menu>
    );
};

export default TaskCardMenu;