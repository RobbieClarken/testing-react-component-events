import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import { shallow, mount } from 'enzyme'

import AutoSavingInput from './AutoSavingInput'


function setup () {
  const onSubmit = jest.fn()
  const component = ReactTestUtils.renderIntoDocument(
    <AutoSavingInput lastSavedValue="last-saved-value" onSubmit={onSubmit} />
  )
  const node = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input')
  component.setState({currentValue: 'the-value'})
  return { component, node, onSubmit }
}

describe('<AutoSavingInput />', () => {

  it('submits when the input is defocussed', () => {
    const { node, onSubmit } = setup()
    ReactTestUtils.Simulate.blur(node)
    expect(onSubmit).toHaveBeenCalledWith('the-value')
  })

  // THIS TEST SHOULD PASS BUT IT FAILS
  it('submits when Enter key is pressed', () => {
    const { node, onSubmit } = setup()
    ReactTestUtils.Simulate.keyUp(node, {key: 'Enter'})
    expect(onSubmit).toHaveBeenCalledWith('the-value')
  })

  // THIS TEST SHOULD FAIL BUT IT PASSES
  it('does not submit when Escape key is pressed', () => {
    const { node, onSubmit } = setup()
    ReactTestUtils.Simulate.keyUp(node, {key: 'Escape'})
    expect(onSubmit).toHaveBeenCalledTimes(0)
  })

  it('the currentValue to be reset on Escape key', () => {
    const { component, node, onSubmit } = setup()
    ReactTestUtils.Simulate.keyUp(node, {key: 'Escape'})
    expect(component.state.currentValue).toEqual('last-saved-value')
  })

})


/****************** ENZYME ***********************/

describe('when testing with enzyme', () => {

  describe('using shallow', () => {

    // THIS TEST SHOULD PASS BUT IT FAILS
    it('<AutoSavingInput /> submits when Enter key is pressed', () => {
      const onSubmit = jest.fn()
      const component = shallow(
        <AutoSavingInput lastSavedValue="last-saved-value" onSubmit={onSubmit} />
      )
      component.setState({currentValue: 'the-value'})
      component.find('input').simulate('keyUp', {key: 'Enter'})
      expect(onSubmit).toHaveBeenCalledWith('the-value')
    })

  })

  describe('using mount', () => {

    // THIS TEST SHOULD PASS BUT IT FAILS
    it('<AutoSavingInput /> submits when Enter key is pressed', () => {
      const onSubmit = jest.fn()
      const component = mount(
        <AutoSavingInput lastSavedValue="last-saved-value" onSubmit={onSubmit} />
      )
      component.setState({currentValue: 'the-value'})
      component.find('input').simulate('keyUp', {key: 'Enter'})
      expect(onSubmit).toHaveBeenCalledWith('the-value')
    })

  })

})
