import * as React from 'react';
import {ITask} from '../types';

const useStoredSortedTasks = function (): [ITask[], ITask[], (tasks: ITask[]) => void] {
    const [tasks, setTasks] = React.useState<ITask[]>([]);

    const setTasksToStorageAndState = function (tasks: ITask[]) {
        setTasks(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    React.useEffect(() => {
        const tasksStr = localStorage.getItem('tasks');
        if (tasksStr !== null) {
            setTasks(JSON.parse(tasksStr));
        }
    }, []);

    const sortedTasks = React.useMemo<ITask[]>(() => {
        return [...tasks].sort((a, b) => {
            const valA = a.editedAt == null ? a.createdAt : a.editedAt;
            const valB = b.editedAt == null ? b.createdAt : b.editedAt;
            return valB - valA;
        });
    }, [tasks]);

    return [tasks, sortedTasks, setTasksToStorageAndState];
}

export default useStoredSortedTasks;