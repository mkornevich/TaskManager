import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Container,
    IconButton,
    Paper,
    Toolbar,
    Typography
} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as React from 'react';
import {Stack} from '@mui/system';
import {ITask} from '../types';
import TaskCard from './TaskCard';
import Header from './Header';
import TaskCardList from './TaskCardList';
import TaskEditDialog from './TaskEditDialog';
import {useEffect} from 'react';

function App() {
    const [taskForEdit, setTaskForEdit] = React.useState<null | ITask>(null);

    const [tasks, setTasksToState] = React.useState<ITask[]>([]);

    const setTasks = function (tasks: ITask[]) {
        setTasksToState(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    React.useEffect(() => {
        const tasksStr = localStorage.getItem('tasks');
        if (tasksStr !== null) {
            setTasksToState(JSON.parse(tasksStr));
        }
    }, []);

    const handleClickMenuItem = function (action: string, currentTask: ITask) {
        if (action === 'remove') {
            setTasks(tasks.filter((task) => task.createdAt !== currentTask.createdAt));
        }

        if (action === 'edit') {
            setTaskForEdit(currentTask);
        }
    };

    const handleCreateClick = function () {
        const newTask: ITask = {
            text: '',
            createdAt: Date.now(),
        }
        setTaskForEdit(newTask);
    };

    return (
        <Container maxWidth="sm" disableGutters={true}>
            <Header onCreateClick={handleCreateClick}/>
            <TaskCardList onClickMenuItem={handleClickMenuItem} tasks={tasks}/>
            <TaskEditDialog
                currentTask={taskForEdit}
                setCurrentTask={setTaskForEdit}
                setTasks={setTasks}
                tasks={tasks}
            />
        </Container>
    );
}

export default App;