import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import NewReview from './new-review';

const mockStore = configureStore({});

describe(`New review form test`, () => {
  it(`New review form render correctly`, () => {
    render(
        <Provider store={mockStore({})}>
          <NewReview />
        </Provider>
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByText(`Submit`)).toBeInTheDocument();
  });

  it(`New review rating test`, () => {
    render(
        <Provider store={mockStore({})}>
          <NewReview />
        </Provider>
    );

    expect(screen.getByTestId(`radio-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`radio-1`)).not.toBeChecked();
    userEvent.click(screen.getByTestId(`radio-1`));
    expect(screen.getByTestId(`radio-1`)).toBeChecked();
  });

  it(`New review textarea test`, () => {
    render(
        <Provider store={mockStore({})}>
          <NewReview />
        </Provider>
    );

    expect(screen.getByRole(`textbox`)).toBeInTheDocument();
    userEvent.type(screen.getByRole(`textbox`), `best place`);
    expect(screen.getByDisplayValue(/best place/i)).toBeInTheDocument();
  });
});
