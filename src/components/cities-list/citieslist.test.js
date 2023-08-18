import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitiesList from './citiesilist';
import {City} from '../../const';


describe(`Test CitiesList`, () => {
  it(`CitiesList should render correctly`, () => {
    render(
        <CitiesList
          cities={Object.values(City)}
          activeCity={City.PARIS}
          onClick={jest.fn()}
        />
    );

    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Cologne/i)).toBeInTheDocument();
    expect(screen.getByText(/Brussels/i)).toBeInTheDocument();
  });

  it(`When user click 'city name' should be change active city`, () => {
    const clickHandle = jest.fn();

    render(
        <CitiesList
          cities={Object.values(City)}
          activeCity={City.PARIS}
          onClick={clickHandle}
        />
    );

    userEvent.click(screen.getByText(/Cologne/i));

    expect(clickHandle).toBeCalled();
  });
});
