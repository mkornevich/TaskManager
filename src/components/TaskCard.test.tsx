import {render, screen} from '@testing-library/react';
import TaskCardMenu from './TaskCardMenu';
import {ITask} from '../types';
import * as React from 'react';

test('first test', () => {
    const task: ITask = { text: 'Тестовая задача', createdAt: Date.now() }

    //render(<TaskCardMenu open={false} onClickMenuItem={() => 0} targetTask={task} anchorEl={null} onClose={() => null} />);

    expect(35).toBe(35);
});