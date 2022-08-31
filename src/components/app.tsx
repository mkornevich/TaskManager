import { AppBar, Box, Button, Card, CardContent, Checkbox, Container, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as React from 'react';
import { Stack } from '@mui/system';
import { ITask } from '../types';
import TaskCard from './TaskCard';
import Header from './Header';
import TaskCardList from './TaskCardList';
import TaskEditDialog from './TaskEditDialog';

function App() {
    const [tasks, setTasks] = React.useState<ITask[]>([
        {text: "Сходить на улицу и погулять с собаками.", createdAt: Date.now()},
        {text: "Заработать игровые очки.", createdAt: Date.now() + 1000000},
        {text: "Сделать сложную домашнюю работу.", createdAt: Date.now() + 25, editedAt: Date.now() + 1000000},
        {text: "Убрать рюкзак в шкаф.", createdAt: Date.now() + 3000000},
    ])

    const handleClickMenuItem = function(action: string, currentTask: ITask) {
        if (action === 'remove') {
            setTasks(tasks.filter((task) => task.createdAt !== currentTask.createdAt));
        }
    }

    return (
        <Container maxWidth="sm" disableGutters={true}>
            <Header />
            <TaskCardList onClickMenuItem={handleClickMenuItem} tasks={tasks} />
            <TaskEditDialog />
        </Container>
    );
}
export default App;