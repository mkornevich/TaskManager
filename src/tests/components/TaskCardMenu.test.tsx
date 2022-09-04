import {fireEvent, render, screen} from '@testing-library/react';
import * as React from 'react';
import {ITask} from '../../types';
import TaskCardMenu from '../../components/TaskCardMenu';

describe('TaskCardMenu', () => {
    const TASKS: ITask[] = [
        {text: 'task1', createdAt: 1},
        {text: 'task2', createdAt: 2},
        {text: 'task3', createdAt: 3},
        {text: 'task4', createdAt: 5, editedAt: 20},
        {text: 'task5', createdAt: 6, editedAt: 30},
    ];

    const TARGET_TASK: ITask = {...TASKS[0]};
    const handleClickMenuItem = jest.fn();

    function renderTaskCardMenu() {
        render(<TaskCardMenu
            targetTask={TARGET_TASK}
            onClose={() => null}
            open={true}
            onClickMenuItem={handleClickMenuItem}
            anchorEl={null}
        />);
    }

    test('edit action', () => {
        renderTaskCardMenu();
        fireEvent.click(screen.getByText('Редактировать'));

        expect(handleClickMenuItem).lastCalledWith('edit', TARGET_TASK);
    });

    test('remove action', () => {
        renderTaskCardMenu();
        fireEvent.click(screen.getByText('Удалить'));

        expect(handleClickMenuItem).lastCalledWith('remove', TARGET_TASK);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});