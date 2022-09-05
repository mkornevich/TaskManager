import {fireEvent, render, screen} from '@testing-library/react';
import * as React from 'react';
import {ITask} from '../../types';
import TaskCardList from '../../components/TaskCardList';

describe('TaskCardList', () => {
    const TASKS: ITask[] = [
        {text: 'task1', createdAt: 1},
        {text: 'task2', createdAt: 2},
        {text: 'task3', createdAt: 3},
        {text: 'task4', createdAt: 5, editedAt: 20},
        {text: 'task5', createdAt: 6, editedAt: 30},
    ];

    const TEST_TASK_INDEX = 3;
    const TEST_TASK: ITask = {...TASKS[TEST_TASK_INDEX]};

    const handleClickMenuItem = jest.fn();

    test('display tasks', () => {
        render(<TaskCardList tasks={TASKS} onClickMenuItem={handleClickMenuItem}/>);
        TASKS.map(t => t.text)
            .forEach(text =>
                expect(screen.getByText(text))
                    .toBeInTheDocument()
            );
    });

    test('card edit action', () => {
        testCardAction('edit', 'Редактировать');
    });

    test('card remove action', () => {
        testCardAction('remove', 'Удалить');
    });

    function testCardAction(action: string, menuText: string) {
        render(<TaskCardList tasks={TASKS} onClickMenuItem={handleClickMenuItem}/>);
        fireEvent.click(screen.queryAllByTestId('action-button')[TEST_TASK_INDEX]);
        fireEvent.click(screen.getByText(menuText));

        expect(handleClickMenuItem).toBeCalledTimes(1);
        expect(handleClickMenuItem).lastCalledWith(action, TEST_TASK);
    }

    afterEach(() => {
        jest.clearAllMocks();
    });
});