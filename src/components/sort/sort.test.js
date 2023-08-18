import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sort from './sort';
import {SortType} from '../../const';

describe(`Test Sort`, () => {
  it(`Sort should render correctly`, () => {
    render(
        <Sort
          sortTypes={Object.values(SortType)}
          activeSortType={SortType.PUPULAR}
          onClick={jest.fn()}
        />
    );

    expect(screen.getByText(/Price: low to high/i)).toBeInTheDocument();
    expect(screen.getByText(/Price: high to low/i)).toBeInTheDocument();
  });

  it(`When user click 'sort type' should be change sort type`, () => {
    const clickHandle = jest.fn();

    render(
        <Sort
          sortTypes={Object.values(SortType)}
          activeSortType={SortType.PUPULAR}
          onClick={clickHandle}
        />
    );

    userEvent.click(screen.getByText(/Price: high to low/i));

    expect(clickHandle).toBeCalled();
  });
});
