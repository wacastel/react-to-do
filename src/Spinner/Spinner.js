import React from 'react';
import './Spinner.css';

const logoSrc =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png";

function Spinner() {
    const MODE_STOPPED = 0;
    const MODE_VERY_SLOW = 1;
    const MODE_SLOW = 2;
    const MODE_MEDIUM = 3;
    const MODE_FAST = 4;
    const MODE_VERY_FAST = 5;
    const DIRECTION_LEFT = 0;
    const DIRECTION_RIGHT = 1;
    const ARROW_LEFT = 'ArrowLeft';
    const ARROW_RIGHT = 'ArrowRight';
    const [value, setValue] = React.useState("Click to Start");
    const [textField, setTextField] = React.useState("");
    const [duration, setDuration] = React.useState(0);
    const [spinnerMode, setSpinnerMode] = React.useState(MODE_STOPPED);
    const [direction, setDirection] = React.useState(DIRECTION_RIGHT);

    const advanceState = () => {
        let newVal = spinnerMode;
        newVal = direction === DIRECTION_RIGHT ? newVal + 1 : newVal - 1;
        if (newVal === 5) {
            setDirection(DIRECTION_LEFT);
        }
        if (newVal === 0) {
            setDirection(DIRECTION_RIGHT);
        }
        //console.log('*** new spinner mode: ', newVal);
        setSpinnerMode(newVal);
        return updateAnimation(newVal);
    }

    const advanceStateWithArrows = (arrow) => {
      let newVal = spinnerMode;
      newVal = arrow === ARROW_RIGHT ? newVal + 1 : newVal - 1;
      //const newDirection = arrow === ARROW_RIGHT ? DIRECTION_RIGHT : DIRECTION_LEFT;
      if (newVal >= 5) {
          newVal = 5;
      }
      if (newVal <= 0) {
          newVal = 0;
      }
      //setDirection(newDirection);
      setSpinnerMode(newVal);
      return updateAnimation(newVal);
  }

    const updateAnimation = (mode) => {
        let directText = '';
        let msg = '';
        let duration = 0;
        //console.log('*** updateAnimation - mode: ', mode);
        switch (mode) {
            case MODE_STOPPED:
                console.log('*** MODE_STOPPED ***');
                directText = '||';
                msg = "Stopped";
                duration = 0;
                break;
            case MODE_VERY_SLOW:
                console.log('*** MODE_VERY_SLOW ***');
                directText = direction === DIRECTION_RIGHT ? '>' : '<';
                msg = "Very Slow";
                duration = 5.5;
                break;
            case MODE_SLOW:
                console.log('*** MODE_SLOW ***');
                directText = direction === DIRECTION_RIGHT ? '>>' : '<<';
                msg = "Slow";
                duration = 2;
                break
            case MODE_MEDIUM:
                console.log('*** MODE_MEDIUM ***');
                directText = direction === DIRECTION_RIGHT ? '>>>' : '<<<';
                msg = "Medium";
                duration = 0.75;
                break
            case MODE_FAST:
                console.log('*** MODE_FAST ***');
                directText = direction === DIRECTION_RIGHT ? '>>>>' : '<<<<';
                msg = "Fast";
                duration = 0.4;
                break;
            case MODE_VERY_FAST:
                console.log('*** MODE_VERY_FAST ***');
                directText = direction === DIRECTION_RIGHT ? '>>>>>' : '<<<<<';
                msg = "Very Fast";
                duration = 0.3;
                break;
            default:
                console.log('*** default case ***');
                duration = 0;
                break;
        }
        setValue(directText);
        setTextField(msg);
        setDuration(duration);
        return duration;
    }

    const onKeyDown = (e) => {
      let dur = 0;
      switch (e.key) {
        case ARROW_RIGHT:
          console.log('*** right arrow ***');
          dur = advanceStateWithArrows(ARROW_RIGHT);
          break;
        case ARROW_LEFT:
          console.log('*** left arrow ***');
          dur = advanceStateWithArrows(ARROW_LEFT);
          break;
      }
      var appLogo = document.getElementById("appLogo");
      appLogo.style.animationDuration = dur + "s";
    }

    const onClick = () => {
        var element = document.getElementById("colorButton");
        element.style.backgroundColor =
            element.style.backgroundColor === "grey" ? "white" : "grey";
        element.className = "color-button-expanded";
        var appLogo = document.getElementById("appLogo");
        appLogo.className = direction === DIRECTION_RIGHT ? 'App-logo' : 'App-logo-reverse';
        const dur = advanceState();
        appLogo.style.animationDuration = dur + "s";
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
