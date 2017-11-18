import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'

import AutoSavingInput from './AutoSavingInput'


it('submits upon blur', () => {
  const onSubmit = jest.fn()
  const component = ReactTestUtils.renderIntoDocument(<AutoSavingInput onSubmit={onSubmit} />)
  const node = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input')
  component.setState({currentValue: 'the-value'})
  ReactTestUtils.Simulate.blur(node)
  expect(onSubmit).toHaveBeenCalledWith('the-value')
})
