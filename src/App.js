import React from 'react'
import AutoSavingInput from './AutoSavingInput'

class App extends React.Component {
  constructor () {
    super()
    this.state = {savedValue: ''}
  }
  render() {
    return (
      <div>
        <p>Enter a value then hit Enter or click outside the box to save.</p>
        <p>
          <AutoSavingInput
            lastSavedValue={this.state.savedValue}
            onSubmit={(v) => this.setState({savedValue: v})}
          />
        </p>
        <p>The last saved value was "{this.state.savedValue}".</p>
      </div>
    )
  }
}

export default App
