import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import Home from '../../../src/client/routes/Home';

describe('Home test suite', () => {
  test('Snapshot test matching', () => {
    const component = renderer.create(
      <Home />,
    );
    const tree = component?.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('DOM rendering', () => {
    const { queryByText } = render(
      <Home />,
    );

    expect(queryByText(/Home Components/i)).toBeTruthy();
  });
});
