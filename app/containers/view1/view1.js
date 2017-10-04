
import {
  React,
} from 'globalImports'

import apiCalls from 'services/apiCalls';
import Webcam from 'containers/view1/webcam';
import Socket from 'containers/view1/socket';

class View1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 'ready',
      waiting: false,
    };
    this.webcamRef = this.webcamRef.bind(this);
    this.capture = this.capture.bind(this);
  }

  webcamRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    const img64 = this.webcam.getScreenshot();
    apiCalls.postPhoto(img64)
      .then((res) => {
        console.log(res);
      });
  }

  btnPress(btn) {
    if (btn === '1' && this.state.state === 'Ready') {
      this.capture();
    }
  }

  render() {
    return <div>
      <Socket
        btnPress={this.btnPress}
      />
      <Webcam
        ref={this.webcamRef}
        screenshotFormat="image/jpeg"
        audio={false}
        height="auto"
        width="100%"
      />
    </div>
  }
}

export default View1
