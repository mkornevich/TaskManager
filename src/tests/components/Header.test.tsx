import {fireEvent, render, screen} from '@testing-library/react';
import * as React from 'react';
import Header from '../../components/Header';

describe('Header', () => {
    test('create action working', () => {
        const handleCreateClick = jest.fn();

        render(<Header onCreateClick={handleCreateClick}/>);

        fireEvent.click(screen.getByText('Создать'));

        expect(handleCreateClick).toBeCalledTimes(1);
    });
});