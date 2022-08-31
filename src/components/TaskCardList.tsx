import * as React from 'react';
import {FC} from 'react';
import TaskCard from './TaskCard';
import {ITask} from '../types';
import {Box} from '@mui/material';
import TaskCardMenu from './TaskCardMenu';

interface TaskCardListProps {
    tasks: ITask[];
    onClickMenuItem: (action: string, task: ITask) => void;
}

const TaskCardList: FC<TaskCardListProps> = function ({tasks, onClickMenuItem}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [targetTask, setTargetTask] = React.useState<null | ITask>(null);
    const open = Boolean(anchorEl);

    const handleClickActionButton = (event: React.MouseEvent<HTMLButtonElement>, task: ITask) => {
        setTargetTask(task);
        setAnchorEl(event.currentTarget);
    };

    const handleClickMenuItem = function (action: string, task: ITask) {
        handleClose();
        onClickMenuItem(action, task);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            {tasks.map((task) =>
                <TaskCard
                    open={open}
                    onClickActionButton={handleClickActionButton}
                    key={task.createdAt}
                    task={task}
                />
            )}
            <TaskCardMenu
                onClickMenuItem={handleClickMenuItem}
                targetTask={targetTask}
                onClose={handleClose}
                anchorEl={anchorEl}
                open={open}
            />
        </Box>
    );
};

export default TaskCardList;