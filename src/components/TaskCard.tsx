import * as React from 'react';
import {Stack} from '@mui/system';
import {IconButton, Paper, Typography} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ITask} from '../types';
import {FC} from 'react';
import {format} from 'date-fns';

interface TaskCardProps {
    task: ITask;
    open: boolean;
    onClickActionButton: (event: React.MouseEvent<HTMLButtonElement>, targetTask: ITask) => void;
}

const TaskCard: FC<TaskCardProps> = function ({task, onClickActionButton, open}) {
    const isEdited = task.editedAt != null;
    const timestamp = isEdited ? task.editedAt : task.createdAt;
    const dateTimeStr = format(timestamp, 'dd.MM.yy kk:mm');

    return (
        <Paper sx={{m: '5px', p: '10px'}}>
            <Stack direction="row" alignItems="flex-start">
                <Typography variant="h5" sx={{flexGrow: 1, mt: '3px'}}>{task.text}</Typography>
                <IconButton
                    aria-controls={open ? 'task-card-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e) => onClickActionButton(e, task)}
                >
                    <MoreVertIcon/>
                </IconButton>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
                <Typography variant="subtitle2" color="text.secondary">
                    {isEdited ? 'ред. ' : ''}{dateTimeStr}
                </Typography>
            </Stack>
        </Paper>
    );
};

export default TaskCard;