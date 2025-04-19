import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App'; // Path to your App component
import DynamicInput from '../components/DynamicInput'; // Path to your DynamicInput component
import '@testing-library/jest-dom'; // Import jest-dom matchers

jest.mock('../components/DynamicInput', () => {
  return function MockDynamicInput({ config, value, onChange, error }) {
    return (
      <div data-testid={`input-${config.name}`}> {/* Add data-testid for easier selection */}
        <label htmlFor={config.name}>{config.label}</label>
        {config.type === 'checkbox' ? (
          <input
            type="checkbox"
            id={config.name}
            name={config.name}
            checked={value}
            onChange={(e) => onChange(e.target.name, e.target.checked)}
          />
        ) : config.type === 'dropdown' ? (
          <select
            id={config.name}
            name={config.name}
            value={value}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          >
            <option value="">Select {config.label}</option>
            {config.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            type={config.type}
            id={config.name}
            name={config.name}
            value={value}
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        )}
        {error && <span className="error">{error}</span>}
      </div>
    );
  };
});

describe('boundary', () => {
  it('AppComponent boundary renders the form with all inputs', () => {
    render(<App />);
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Accept Terms')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('AppComponent boundary submits the form when all required fields are filled', async () => {
    const alertMock = jest.spyOn(window, 'alert');
    render(<App />);

    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '30' } });
    fireEvent.click(screen.getByLabelText('Accept Terms'));
    fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'Male' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Form Submitted');
    });
    alertMock.mockRestore(); // Restore the original alert function
  });

  it('AppComponent boundary handles input changes correctly', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Jane Doe' } });
    expect(screen.getByLabelText('Full Name').value).toBe('Jane Doe');

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane.doe@example.com' } });
    expect(screen.getByLabelText('Email').value).toBe('jane.doe@example.com');

    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    expect(screen.getByLabelText('Age').value).toBe('25');

    fireEvent.click(screen.getByLabelText('Accept Terms'));
    expect(screen.getByLabelText('Accept Terms')).toBeChecked();

    fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'Female' } });
    expect(screen.getByLabelText('Gender').value).toBe('Female');
  });
});