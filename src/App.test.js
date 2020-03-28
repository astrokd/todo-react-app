import React from 'react';
import { render } from '@testing-library/react';
import {shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock-jest';
import waitForExpect from 'wait-for-expect';
import renderer from 'react-test-renderer'

import App from './App';

import { configure } from 'enzyme';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders correctly', () => {
    const todo = renderer.create(<App />).toJSON()
    expect(todo).toMatchSnapshot()
  })

  it('is alive at application start', () => {
    const component = shallow(<App />)
    expect(component.find('span')).toExist()
  })
})