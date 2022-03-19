import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import View from '../view';

describe('Dashboard',() => {
  test('Click counter button should go up', async () => {
    const props = {
      counter: 9
    };
    render(<View {...props} />);
    const button = document.getElementsByClassName('CounterBtn')[0];
    fireEvent.click(button);
    expect(button.textContent).toBe('10');
  });
});