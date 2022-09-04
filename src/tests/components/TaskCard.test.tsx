import {fireEvent, render, screen} from '@testing-library/react';
import {ITask} from '../../types';
import * as React from 'react';
import TaskCard from '../../components/TaskCard';

describe('TaskCard', () => {
    const CREATED_AT = (new Date(2022, 8, 3, 12, 0, 0, 0)).getTime();
    const CREATED_AT_STR = '03.09.22 12:00';

    const EDITED_AT = (new Date(2022, 9, 4, 13, 0, 0, 0)).getTime();
    const EDITED_AT_STR = '04.10.22 13:00';

    const EDITED = 'ред.';

    test('click to action button', () => {
        const task: ITask = {text: 'Тестовая задача', createdAt: Date.now()};
        const handleClickActionButton = jest.fn();

        render(<TaskCard open={true} task={task} onClickActionButton={handleClickActionButton}/>);

        fireEvent.click(screen.getByTestId('action-button'));

        expect(handleClickActionButton).toBeCalledTimes(1);
    });

    test('check display date on NOT edited task', () => {
        const notEditedTask: ITask = {text: 'Тестовая задача', createdAt: CREATED_AT};

        render(<TaskCard open={true} task={notEditedTask} onClickActionButton={() => null}/>);

        expect(screen.queryByText(CREATED_AT_STR)).toBeInTheDocument();
    });

    test('check display date on edited task', () => {
        const editedTask: ITask = {text: 'Тестовая задача', createdAt: CREATED_AT, editedAt: EDITED_AT};

        render(<TaskCard open={true} task={editedTask} onClickActionButton={() => null}/>);

        expect(screen.queryByText(EDITED + ' ' + EDITED_AT_STR)).toBeInTheDocument();
    });
});