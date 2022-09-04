import {fireEvent, render, screen} from '@testing-library/react';
import * as React from 'react';
import {ITask} from '../../types';
import TaskEditDialog from '../../components/TaskEditDialog';

describe('TaskEditDialog', () => {
    const TASKS: ITask[] = [
        {text: 'task1', createdAt: 1},
        {text: 'task2', createdAt: 2},
        {text: 'task3', createdAt: 3},
        {text: 'task4', createdAt: 5, editedAt: 20},
        {text: 'task5', createdAt: 6, editedAt: 30},
    ];

    const NEW_TASK: ITask = {text: 'newTask', createdAt: 8};
    const EXISTING_TASK: ITask = {text: 'task1', createdAt: 1};

    const setTasks = jest.fn();
    const setTask = jest.fn();

    function renderTaskEditDialog(task: ITask) {
        render(<TaskEditDialog tasks={TASKS} setTasks={setTasks} task={task} setTask={setTask}/>);
    }

    test('check correspond view in create mode', () => {
        renderTaskEditDialog(NEW_TASK);

        expect(screen.queryByText('Создание новой задачи')).toBeInTheDocument();
        expect(screen.queryByText('Создать')).toBeInTheDocument();
    });

    test('check correspond view in edit mode', () => {
        renderTaskEditDialog(EXISTING_TASK);

        expect(screen.queryByText('Редактирование задачи')).toBeInTheDocument();
        expect(screen.queryByText('Сохранить')).toBeInTheDocument();
    });

    test('check close', () => {
        renderTaskEditDialog(EXISTING_TASK);
        fireEvent.click(screen.getByText('Отмена'));

        expect(setTask).toBeCalledTimes(1);
        expect(setTask).lastCalledWith(null);
    });

    test('check create process', () => {
        renderTaskEditDialog(NEW_TASK);
        fireEvent.click(screen.getByText('Создать'));

        expect(setTasks).toBeCalledTimes(1);
        expect(setTasks).toBeCalledWith([...TASKS, NEW_TASK]);
    });

    test('check edit process', () => {
        const NEW_EDITED_AT = 200;
        jest.spyOn(Date, 'now').mockReturnValue(NEW_EDITED_AT);

        renderTaskEditDialog(EXISTING_TASK);
        fireEvent.click(screen.getByText('Сохранить'));

        expect(setTasks).toBeCalledTimes(1);
        expect(setTasks).toBeCalledWith([
            ...TASKS.filter(t => t.createdAt !== EXISTING_TASK.createdAt),
            {
                ...EXISTING_TASK,
                editedAt: NEW_EDITED_AT,
            }
        ]);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });
});