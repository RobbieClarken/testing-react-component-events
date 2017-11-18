import React from 'react'

export default class AutoSavingInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {currentValue: props.lastSavedValue || ''}
  }
  handleBlur = () => {
    this.props.onSubmit(this.state.currentValue)
  }
  render() {
    return (
      <input
        value={this.state.currentValue}
        onChange={(e) => this.setState({currentValue: e.target.value})}
        onBlur={this.handleBlur}
      />
    )
  }
}
