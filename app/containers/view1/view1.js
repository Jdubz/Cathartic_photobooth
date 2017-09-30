
import {
  React,
  observer
} from 'globalImports'

import { testStore } from 'stores/testStore'
import Webcam from 'react-webcam';

@observer
class View1 extends React.Component {

  constructor(props) {
    super(props)
  }

  changeMobxStore() {
    testStore.modifyTestString('New VALLL so easy')
  }

  render() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
      });
    }
    return <div>
      <a href="/2">GO to 2</a>
      <button onClick={this.changeMobxStore.bind(this)}>Change mobx store</button>
      <p> test text -{testStore.testString}</p>
      <Webcam
        audio={false}
      />
    </div>
  }
}

export default View1
