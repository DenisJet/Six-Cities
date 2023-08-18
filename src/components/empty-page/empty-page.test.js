import React from 'react';
import {render} from '@testing-library/react';
import EmptyPage from './empty-page';

it(`EmptyPage should render correctly`, () => {
  const {getByText} = render(
      <EmptyPage />
  );
  const statusElement = getByText(`No places to stay available`);
  const descriptionElement = getByText(`We could not find any property available at the moment`);

  expect(statusElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});
