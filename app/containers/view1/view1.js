
import {
  React,
  observer
} from 'globalImports'

import { testStore } from 'stores/testStore'

@observer
class View1 extends React.Component {

  constructor(props) {
    super(props)
  }

  changeMobxStore() {
    testStore.modifyTestString('New VALLL so easy')
  }

  render() {
    return <div>
      <a href="/2">GO to 2</a>
      <button onClick={this.changeMobxStore.bind(this)}>Change mobx store</button>
      <p> test text{testStore.testString}</p>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  }
}

export default View1
