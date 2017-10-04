
import {
  React,
} from 'globalImports'

import apiCalls from 'services/apiCalls';
import Webcam from 'containers/view1/webcam';
import Socket from 'containers/view1/socket';
import Menu from 'containers/menu/menu';
import counter from 'assets/countdown.gif';
import waiting from 'assets/loading_apple.gif';

class View1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 'ready',
      waiting: false,
      img: null,
      fullscreen: false,
    };
    this.capTimeout = null;
    this.webcamRef = this.webcamRef.bind(this);
    this.capture = this.capture.bind(this);
    this.print = this.print.bind(this);
    this.btnPress = this.btnPress.bind(this);
  }

  webcamRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    this.setState({
      state: 'counting',
    });
    this.capTimeout = setTimeout(() => {
      const img64 = this.webcam.getScreenshot();
      this.setState({
        img: img64,
      });
    }, 5000);
  }

  print() {
    this.setState({
      waiting: true,
    });
    apiCalls.postPhoto(this.state.img)
      .then((res) => {
        this.setState({
          waiting: false,
          img: null,
          state: 'ready',
        });
      });
  }

  btnPress(btn) {
    if (this.state.state === 'ready') {
      if (btn === '1') {
        this.capture();
      }
    } else if (this.state.state === 'counting') {
      if (btn === '2') {
        clearTimeout(this.capTimeout);
        this.setState({
          state: 'ready',
        });
      }
    } else if (this.state.state === 'confirm') {
      if (btn === '1') {
        this.print();
      } else if (btn === '2') {
        this.setState({
          state: 'ready',
          img: null,
        });
      }
    }
  }

  render() {
    return <div>
      <Socket
        btnPress={this.btnPress}
      />
      <div id="fullscreen">
        {(() => {
          if (this.state.state !== 'confirm') {
            return (
              <Webcam
                ref={this.webcamRef}
                screenshotFormat="image/jpeg"
                audio={false}
                height="auto"
                width="100%"
              />
            )
          }
          return (
            <img
              src={this.state.img}
              alt=""
            />
          )
        })()}
        <div className="instructions">
          {(() => {
            if (this.state.state === 'ready') {
              return (<h2>PRESS YES WHEN READY</h2>);
            } else if (this.state.state === 'counting') {
              return (<img src={counter} alt="" />);
            }
            if (this.state.waiting) {
              return (<img src={waiting} alt="" />);
            }
            return (<h2>PRINT? YES / NO</h2>);
          })()}
        </div>
      </div>
      {(() => {
        if (!this.state.fullscreen) {
          return (<Menu />);
        }
        return null;
      })()}
    </div>
  }
}

export default View1
