import {Container} from '@mui/material';
import * as React from 'react';
import {ITask} from '../types';
import Header from './Header';
import TaskCardList from './TaskCardList';
import TaskEditDialog from './TaskEditDialog';
import {FC} from 'react';
import useStoredSortedTasks from '../hooks/useStoredSortedTasks';

const App: FC = function () {
    const [taskForEdit, setTaskForEdit] = React.useState<null | ITask>(null);

    const [tasks, sortedTasks, setTasks] = useStoredSortedTasks();

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
};

export default App;