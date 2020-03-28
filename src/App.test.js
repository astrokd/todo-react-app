import React from 'react';
import { render } from '@testing-library/react';
import {shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock-jest';
import waitForExpect from 'wait-for-expect';
import renderer from 'react-test-renderer'

import App from './App';
import Interface from './components/interface';

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
    expect(component.find('Interface')).toExist()
    expect(component.find('ToDoList')).toExist()
  })
})
describe('<Interface/> (enzyme test)', () => {
  beforeEach(() => {
    fetchMock.restore() //so test don't interfere with each other
  })
  it('Interface is alive, submit input exists', () => {
    let interfaceInput = shallow(<Interface />)
    expect(interfaceInput.find({ children: 'To Do:' }).exists()).toBeTruthy()
    expect(interfaceInput.find({ name: 'description' }).exists()).toBeTruthy()
    expect(interfaceInput.find({ name: 'difficulty' }).exists()).toBeTruthy()
    expect(interfaceInput.find({ value: 'Add to do item' }).exists()).toBeTruthy()
  })

  xit('the Add to do item button adds ', async () => {
    const testRESTy =
      [
        { name: 'test 1 RESTy get from api', url: 'http://example.com/1' },
        { name: 'test 2 RESTy get from api', url: 'http://example.com/2' }
      ]
    fetchMock.getAny(JSON.stringify(testRESTy))
    const app = mount(<App />)
    const button = app.find({ children: 'RUN' })
    button.simulate('click')
    await waitForExpect(() => {
      expect(app.state('results')).toEqual(JSON.stringify(testRESTy))
    })
  })
})