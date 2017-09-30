
import {
  React,
  observer
} from 'globalImports'

import { testStore } from 'stores/testStore'
import Webcam from 'react-webcam';
import apiCalls from 'services/apiCalls';

@observer
class View1 extends React.Component {
  constructor(props) {
    super(props);
    this.webcamRef = this.webcamRef.bind(this);
    this.capture = this.capture.bind(this);
  }

  changeMobxStore() {
    testStore.modifyTestString('New VALLL so easy')
  }

  webcamRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    console.log(this.webcam.getScreenshot());
  }

  render() {
    return <div>
      <a href="/2">GO to 2</a>
      <button onClick={this.changeMobxStore.bind(this)}>Change mobx store</button>
      <button
        onClick={this.capture}
      >PIC</button>
      <p> test text -{testStore.testString}</p>
      <Webcam
        ref={this.webcamRef}
        screenshotFormat="image/jpeg"
        audio={false}
      />
    </div>
  }
}

export default View1
