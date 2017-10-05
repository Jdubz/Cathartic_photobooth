import {
  React,
} from 'globalImports';



const launchIntoFullscreen = () => {
  const element = document.getElementById('fullscreen');

  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};

const Menu = ({ btnPress, fullscreen }) => {
  return (
    <div className="menu">
      <button
        onClick={() => btnPress('1')}
      >Yes</button>
      <button
        onClick={() => btnPress('2')}
      >No</button>
      <button
        onClick={() => {
          launchIntoFullscreen(fullscreen);
        }}
      >Fullscreen</button>
    </div>
  )
};

export default Menu;
