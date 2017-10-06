
import {
  React,
} from 'globalImports'

import apiCalls from 'services/apiCalls';
import Webcam from 'containers/webcam';
import Socket from 'containers/socket';
import Menu from 'containers/menu/menu';
import waiting from 'assets/loading_apple.gif';

class View1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 'ready',
      waiting: false,
      img: null,
      fullscreen: false,
      count: 5,
    };
    this.capTimeout = null;
    this.webcamRef = this.webcamRef.bind(this);
    this.capture = this.capture.bind(this);
    this.print = this.print.bind(this);
    this.btnPress = this.btnPress.bind(this);
    Socket(this.btnPress);
  }

  webcamRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    this.setState({
      state: 'counting',
    });
    this.capTimeout = setInterval((() => {
      if (this.state.count > 1) {
        this.setState({ count: this.state.count - 1 });
      } else {
        const img64 = this.webcam.getScreenshot();
        this.setState({
          img: img64,
          state: 'confirm',
          count: 5,
        });
        clearInterval(this.capTimeout);
      }
    }), 1000);
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
        clearInterval(this.capTimeout);
        this.setState({
          state: 'ready',
          count: 5,
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
      <div id="fullscreen" className="frame">
        {(() => {
          if (this.state.state !== 'confirm') {
            return (
              <Webcam
                className="webCam"
                ref={this.webcamRef}
                videoSource="5ab9f0efd2f21347f5bf3de7f79ee3ff7f0aa96d43ae167b336efcd3ba65fbf8"
                screenshotFormat="image/jpeg"
                audio={false}
                height="1200px"
                width="1920px"
              />
            )
          }
          return (
            <img
              className="webCam"
              src={this.state.img}
              alt=""
            />
          )
        })()}
        <div className="instructions">
          {(() => {
            if (this.state.state === 'ready') {
              return (<h1>PRESS YES WHEN READY</h1>);
            } else if (this.state.state === 'counting') {
              return (<h1 className="counter">{this.state.count}</h1>);
            } else if (this.state.waiting) {
              return (<img src={waiting} alt="" />);
            }
            return (<h1>PRINT? YES / NO</h1>);
          })()}
        </div>
      </div>
      {(() => {
        if (!this.state.fullscreen) {
          return (
            <Menu
              btnPress={this.btnPress}
            />
          );
        }
        return null;
      })()}
    </div>
  }
}

export default View1
