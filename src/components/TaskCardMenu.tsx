import * as React from 'react';
import {FC} from 'react';
import {Menu, MenuItem} from '@mui/material';
import {ITask} from '../types';

interface TaskCardMenuProps {
    open: boolean;
    anchorEl: null | HTMLElement;
    onClose: () => void;
    targetTask: null | ITask;
    onClickMenuItem: (action: string, targetTask: ITask) => void;
}

const TaskCardMenu: FC<TaskCardMenuProps> = function ({open, anchorEl, onClose, targetTask, onClickMenuItem}) {
    return (
        <Menu
            id="task-card-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
        >
            <MenuItem onClick={() => onClickMenuItem('edit', targetTask)}>Редактировать</MenuItem>
            <MenuItem onClick={() => onClickMenuItem('remove', targetTask)}>Удалить</MenuItem>
        </Menu>
    );
};

export default TaskCardMenu;