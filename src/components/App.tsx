import {Container} from '@mui/material';
import * as React from 'react';
import {ITask} from '../types';
import Header from './Header';
import TaskCardList from './TaskCardList';
import TaskEditDialog from './TaskEditDialog';
import {FC} from 'react';

const App: FC = function() {
    const [taskForEdit, setTaskForEdit] = React.useState<null | ITask>(null);

    const [tasks, setTasksToState] = React.useState<ITask[]>([]);

    const setTasks = function (tasks: ITask[]) {
        setTasksToState(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    React.useEffect(() => {
        const tasksStr = localStorage.getItem('tasks');
        if (tasksStr !== null) {
            setTasksToState(JSON.parse(tasksStr));
        }
    }, []);

    const sortedTasks = React.useMemo<ITask[]>(() => {
        return [...tasks].sort((a, b) => {
            const valA = a.editedAt == null ? a.createdAt : a.editedAt;
            const valB = b.editedAt == null ? b.createdAt : b.editedAt;
            return valB - valA;
        });
    }, [tasks]);

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
        };
        setTaskForEdit(newTask);
    };

    return (
        <Container maxWidth="sm" disableGutters={true}>
            <Header onCreateClick={handleCreateClick}/>
            <TaskCardList onClickMenuItem={handleClickMenuItem} tasks={sortedTasks}/>
            <TaskEditDialog
                task={taskForEdit}
                setTask={setTaskForEdit}
                setTasks={setTasks}
                tasks={tasks}
            />
        </Container>
    );
}

export default App;