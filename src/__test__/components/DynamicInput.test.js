import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DynamicInput from '../../components/DynamicInput';

describe('boundary', () => {
    const onChangeMock = jest.fn();

    test('DynamicInputComponent boundary renders text input correctly', () => {
        const config = {
            type: 'text',
            label: 'Text Input',
            name: 'textInput',
            required: true,
        };

        render(<DynamicInput config={config} value="" onChange={onChangeMock} error="" />);

        const input = screen.getByLabelText('Text Input');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
        expect(input).toBeRequired();

        fireEvent.change(input, { target: { value: 'test' } });
        expect(onChangeMock).toHaveBeenCalledWith('textInput', 'test');
    });

    test('DynamicInputComponent boundary renders email input correctly', () => {
        const config = {
            type: 'email',
            label: 'Email Input',
            name: 'emailInput',
            required: false,
        };

        render(<DynamicInput config={config} value="" onChange={onChangeMock} error="" />);

        const input = screen.getByLabelText('Email Input');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'email');
        expect(input).not.toBeRequired();

        fireEvent.change(input, { target: { value: 'test@example.com' } });
        expect(onChangeMock).toHaveBeenCalledWith('emailInput', 'test@example.com');
    });

    test('DynamicInputComponent boundary renders number input correctly', () => {
        const config = {
            type: 'number',
            label: 'Number Input',
            name: 'numberInput',
            required: true,
        };

        render(<DynamicInput config={config} value="" onChange={onChangeMock} error="" />);

        const input = screen.getByLabelText('Number Input');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'number');
        expect(input).toBeRequired();

        fireEvent.change(input, { target: { value: '123' } });
        expect(onChangeMock).toHaveBeenCalledWith('numberInput', '123');
    });

    test('DynamicInputComponent boundary renders checkbox correctly', () => {
        const config = {
            type: 'checkbox',
            label: 'Checkbox Input',
            name: 'checkboxInput',
            required: false,
        };

        render(<DynamicInput config={config} value={false} onChange={onChangeMock} error="" />);

        const input = screen.getByLabelText('Checkbox Input');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'checkbox');

        fireEvent.click(input);
        expect(onChangeMock).toHaveBeenCalledWith('checkboxInput', true);
    });

    test('DynamicInputComponent boundary renders dropdown correctly', () => {
        const config = {
            type: 'dropdown',
            label: 'Dropdown Input',
            name: 'dropdownInput',
            options: ['Option 1', 'Option 2', 'Option 3'],
            required: true,
        };

        render(<DynamicInput config={config} value="" onChange={onChangeMock} error="" />);

        const select = screen.getByLabelText('Dropdown Input');
        expect(select).toBeInTheDocument();
        expect(select).toBeRequired();

        fireEvent.change(select, { target: { value: 'Option 1' } });
        expect(onChangeMock).toHaveBeenCalledWith('dropdownInput', 'Option 1');
    });
});
