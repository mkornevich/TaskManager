import {fireEvent, render, screen} from '@testing-library/react';
import * as React from 'react';
import {ITask} from '../../types';
import App from '../../components/App';

describe('App', () => {
    const TASKS: ITask[] = [
        {text: 'task1', createdAt: 1},
        {text: 'task2', createdAt: 2},
        {text: 'task3', createdAt: 3},
        {text: 'task4', createdAt: 5, editedAt: 20},
        {text: 'task5', createdAt: 6, editedAt: 30},
    ];

    let localStore: { [key: string]: string } = {};

    test('create task', () => {
        const CREATED_AT = 9;
        const NEW_TASK_INDEX = TASKS.length;
        localStore['tasks'] = JSON.stringify(TASKS);
        render(<App/>);
        jest.spyOn(Date, 'now').mockReturnValue(CREATED_AT);
        fireEvent.click(screen.getByTestId('header-create-btn'));
        fireEvent.change(screen.getByLabelText('Задача'), {target: {value: 'taskNew'}});
        fireEvent.click(screen.getByTestId('dialog-positive-btn'));

        const tasksInStorage = JSON.parse(localStore['tasks']) as ITask[];
        expect(tasksInStorage[NEW_TASK_INDEX]).toEqual({text: 'taskNew', createdAt: CREATED_AT});
    });

    test('edit task', () => {
        const EDITED_AT = 40;
        const EDIT_TASK_INDEX = 3;
        localStore['tasks'] = JSON.stringify(TASKS);
        render(<App/>);
        jest.spyOn(Date, 'now').mockReturnValue(EDITED_AT);
        fireEvent.click(screen.getAllByTestId('action-button')[EDIT_TASK_INDEX]);
        fireEvent.click(screen.getByText('Редактировать'));
        fireEvent.change(screen.getByLabelText('Задача'), {target: {value: 'taskEdit'}});
        fireEvent.click(screen.getByTestId('dialog-positive-btn'));

        const tasksInStorage = JSON.parse(localStore['tasks']) as ITask[];
        expect(tasksInStorage.filter(t => t.text === 'taskEdit').length > 0).toBeTruthy();
    });

    test('remove task', () => {
        const REMOVE_TASK_INDEX = 3;
        localStore['tasks'] = JSON.stringify(TASKS);
        render(<App/>);
        fireEvent.click(screen.getAllByTestId('action-button')[REMOVE_TASK_INDEX]);
        fireEvent.click(screen.getByText('Удалить'));

        const tasksInStorage = JSON.parse(localStore['tasks']) as ITask[];
        expect(TASKS.length - tasksInStorage.length === 1).toBeTruthy();
    });

    beforeEach(() => {
        jest.clearAllMocks();

        global.Storage.prototype.getItem = jest.fn((key: string) =>
            key in localStore ? localStore[key] : null
        );

        global.Storage.prototype.setItem = jest.fn(
            (key: string, value) => (localStore[key] = value + '')
        );

        global.Storage.prototype.clear = jest.fn(() => (localStore = {}));
    });
});