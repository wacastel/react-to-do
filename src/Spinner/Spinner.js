import { useEffect, useState } from 'react';
import './Spinner.css';

const logoSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png";

function Spinner() {
  const MODE_VERY_FAST_REVERSE = -5;
  const MODE_FAST_REVERSE = -4;
  const MODE_MEDIUM_REVERSE = -3;
  const MODE_SLOW_REVERSE = -2;
  const MODE_VERY_SLOW_REVERSE = -1;
  const MODE_STOPPED = 0;
  const MODE_VERY_SLOW = 1;
  const MODE_SLOW = 2;
  const MODE_MEDIUM = 3;
  const MODE_FAST = 4;
  const MODE_VERY_FAST = 5;
  const CLICK_DIRECTION_LEFT = 'CLICK_DIRECTION_LEFT';
  const CLICK_DIRECTION_RIGHT = 'CLICK_DIRECTION_RIGHT';
  const SPINNER_DIRECTION_LEFT = 'SPINNER_DIRECTION_LEFT';
  const SPINNER_DIRECTION_RIGHT = 'SPINNER_DIRECTION_RIGHT';
  const ARROW_LEFT = 'ArrowLeft';
  const ARROW_RIGHT = 'ArrowRight';
  const [value, setValue] = useState("Click to Start");
  const [textField, setTextField] = useState("");
  const [duration, setDuration] = useState(0);
  const [spinnerMode, setSpinnerMode] = useState(MODE_STOPPED);
  const [clickDirection, setClickDirection] = useState(CLICK_DIRECTION_RIGHT);

  useEffect(() => {
    updateAnimation(spinnerMode);
  }, [spinnerMode]);

  useEffect(() => {
    var appLogo = document.getElementById("appLogo");
    appLogo.style.animationDuration = duration + "s";
  }, [duration]);

  const advanceState = () => {
    let newVal = spinnerMode;
    newVal = clickDirection === CLICK_DIRECTION_RIGHT ? newVal + 1 : newVal - 1;
    if (newVal === 5) {
      setClickDirection(CLICK_DIRECTION_LEFT);
    }
    if (newVal === 0) {
      setClickDirection(CLICK_DIRECTION_RIGHT);
    }
    setSpinnerMode(newVal);
  }

  const advanceStateWithArrows = (arrow) => {
    let newVal = spinnerMode;
    newVal = arrow === ARROW_RIGHT ? newVal + 1 : newVal - 1;
    const newDirection = arrow === ARROW_RIGHT ? CLICK_DIRECTION_RIGHT : CLICK_DIRECTION_LEFT;
    if (newVal >= 5) {
        newVal = 5;
    }
    if (newVal <= 0) {
        newVal = 0;
    }
    setClickDirection(newDirection);
    setSpinnerMode(newVal);
  }

  const updateAnimation = (mode) => {
    let directText = '';
    let msg = '';
    let duration = 0;
    switch (mode) {
      case MODE_STOPPED:
        console.log('*** MODE_STOPPED ***');
        directText = '||';
        msg = "Stopped";
        duration = 0;
        break;
      case MODE_VERY_SLOW:
        console.log('*** MODE_VERY_SLOW ***');
        directText = '>';
        msg = "Very Slow";
        duration = 5.5;
        break;
      case MODE_SLOW:
        console.log('*** MODE_SLOW ***');
        directText = '>>';
        msg = "Slow";
        duration = 2;
        break
      case MODE_MEDIUM:
        console.log('*** MODE_MEDIUM ***');
        directText = '>>>';
        msg = "Medium";
        duration = 0.75;
        break
      case MODE_FAST:
        console.log('*** MODE_FAST ***');
        directText = '>>>>';
        msg = "Fast";
        duration = 0.4;
        break;
      case MODE_VERY_FAST:
        console.log('*** MODE_VERY_FAST ***');
        directText = '>>>>>';
        msg = "Very Fast";
        duration = 0.3;
        break;
      default:
        console.log('*** default case ***');
        directText = '-';
        msg = "???";
        duration = 0;
        break;
    }
    setValue(directText);
    setTextField(msg);
    setDuration(duration);
  }

  const onKeyDown = (e) => {
    switch (e.key) {
      case ARROW_RIGHT:
        console.log('*** right arrow ***');
        advanceStateWithArrows(ARROW_RIGHT);
        break;
      case ARROW_LEFT:
        console.log('*** left arrow ***');
        advanceStateWithArrows(ARROW_LEFT);
        break;
    }
  }

  const onClick = () => {
    var element = document.getElementById("colorButton");
    element.style.backgroundColor =
        element.style.backgroundColor === "grey" ? "white" : "grey";
    element.className = "color-button-expanded";
    advanceState();
  };

  return (
    <div className="Spinner">
      <header className="Spinner-header">
          <button 
            id="colorButton"
            className="color-button" 
            onClick={onClick}
            onKeyDown={onKeyDown}
          >
            <img
              src={logoSrc}
              id="appLogo"
              className="App-logo"
              alt="logo"
            />
            <div className="info-text">
              <div><code>{value}</code></div>
              <div>{textField}</div>
            </div>
          </button>
      </header>
    </div>
  );
}

export default Spinner;
