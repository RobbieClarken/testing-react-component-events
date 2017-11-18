import React from 'react'

export default class AutoSavingInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {currentValue: props.lastSavedValue || ''}
  }
  render() {
    return (
      <input
        ref={(input) => this.input = input}
        value={this.state.currentValue}
        onChange={(e) => this.setState({currentValue: e.target.value})}
        onBlur={() => this.props.onSubmit(this.state.currentValue)}
        onKeyUp={(event) => {
          switch (event.key) {
            case 'Enter':
              this.input.blur()
              break
            case 'Escape': {
              this.setState({currentValue: this.props.lastSavedValue}, () => this.input.blur())
              break
            }
          }
        }}
      />
    )
  }
}
