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
  const ARROW_UP = 'ArrowUp';
  const ARROW_DOWN = 'ArrowDown';
  const MAX_MODE = MODE_VERY_FAST;
  const MIN_MODE = MODE_VERY_FAST_REVERSE;
  const [value, setValue] = useState("Click to Start");
  const [textField, setTextField] = useState("");
  const [duration, setDuration] = useState(0);
  const [spinnerMode, setSpinnerMode] = useState(MODE_STOPPED);
  const [spinnerDirection, setSpinnerDirection] = useState(SPINNER_DIRECTION_RIGHT);
  const [clickDirection, setClickDirection] = useState(CLICK_DIRECTION_RIGHT);

  useEffect(() => {
    updateAnimation(spinnerMode);
  }, [spinnerMode]);

  useEffect(() => {
    var appLogo = document.getElementById("appLogo");
    appLogo.style.animationDuration = duration + "s";
    appLogo.className = spinnerDirection === SPINNER_DIRECTION_RIGHT ? 'App-logo' : 'App-logo-reverse';
  }, [duration, spinnerDirection]);

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
    if (newVal >= MAX_MODE) {
        newVal = MAX_MODE;
    }
    if (newVal <= MIN_MODE) {
        newVal = MIN_MODE;
    }
    setClickDirection(newDirection);
    setSpinnerMode(newVal);
  }

  const updateAnimation = (mode) => {
    let directText = '';
    let msg = '';
    let duration = 0;
    let spinnerDir = SPINNER_DIRECTION_RIGHT;
    switch (mode) {
      case MODE_VERY_FAST_REVERSE:
        console.log('*** MODE_VERY_FAST_REVERSE ***');
        directText = '<<<<<';
        msg = "Very Fast (R)";
        spinnerDir = SPINNER_DIRECTION_LEFT;
        duration = 0.3;
        break;
      case MODE_FAST_REVERSE:
        console.log('*** MODE_FAST_REVERSE ***');
        directText = '<<<<';
        msg = "Fast (R)";
        spinnerDir = SPINNER_DIRECTION_LEFT;
        duration = 0.4;
        break;
      case MODE_MEDIUM_REVERSE:
        console.log('*** MODE_MEDIUM_REVERSE ***');
        directText = '<<<';
        msg = "Medium (R)";
        spinnerDir = SPINNER_DIRECTION_LEFT;
        duration = 0.75;
        break
      case MODE_SLOW_REVERSE:
        console.log('*** MODE_SLOW_REVERSE ***');
        directText = '<<';
        msg = "Slow (R)";
        spinnerDir = SPINNER_DIRECTION_LEFT
        duration = 2;
        break
      case MODE_VERY_SLOW_REVERSE:
        console.log('*** MODE_VERY_SLOW_REVERSE ***');
        directText = '<';
        msg = "Very Slow (R)";
        spinnerDir = SPINNER_DIRECTION_LEFT;
        duration = 5.5;
        break;
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
        spinnerDir = SPINNER_DIRECTION_RIGHT;
        duration = 5.5;
        break;
      case MODE_SLOW:
        console.log('*** MODE_SLOW ***');
        directText = '>>';
        msg = "Slow";
        spinnerDir = SPINNER_DIRECTION_RIGHT;
        duration = 2;
        break
      case MODE_MEDIUM:
        console.log('*** MODE_MEDIUM ***');
        directText = '>>>';
        msg = "Medium";
        spinnerDir = SPINNER_DIRECTION_RIGHT;
        duration = 0.75;
        break
      case MODE_FAST:
        console.log('*** MODE_FAST ***');
        directText = '>>>>';
        msg = "Fast";
        spinnerDir = SPINNER_DIRECTION_RIGHT;
        duration = 0.4;
        break;
      case MODE_VERY_FAST:
        console.log('*** MODE_VERY_FAST ***');
        directText = '>>>>>';
        msg = "Very Fast";
        spinnerDir = SPINNER_DIRECTION_RIGHT;
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
    setSpinnerDirection(spinnerDir);
  }

  const onKeyDown = (e) => {
    var element = document.getElementById("colorButton");
    switch (e.key) {
      case ARROW_RIGHT:
        console.log('*** right arrow ***');
        advanceStateWithArrows(ARROW_RIGHT);
        element.className = "color-button";
        break;
      case ARROW_LEFT:
        console.log('*** left arrow ***');
        advanceStateWithArrows(ARROW_LEFT);
        element.className = "color-button";
        break;
      case ARROW_UP:
        console.log('*** up arrow ***');
        e.preventDefault();
        element.style.backgroundColor = element.style.backgroundColor === "grey" ? "white" : "grey";
        element.className = "color-button color-button-nudge-up";
        break;
      case ARROW_DOWN:
        console.log('*** down arrow ***');
        e.preventDefault();
        element.style.backgroundColor = element.style.backgroundColor === "grey" ? "white" : "grey";
        element.className = "color-button color-button-nudge-down";
        break;
    }
  }

  const onClick = () => {
    var element = document.getElementById("colorButton");
    element.style.backgroundColor =
        element.style.backgroundColor === "grey" ? "white" : "grey";
    //element.className = "color-button-expanded";
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
