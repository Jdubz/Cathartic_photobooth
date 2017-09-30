import {
  React
} from 'globalImports'

class View1 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return <div>
      <a href="/">Go to 1</a>
      <p>
        View 2
      </p>
    </div>
  }
}

export default View1
