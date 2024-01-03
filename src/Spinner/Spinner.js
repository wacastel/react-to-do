import React from 'react';
import './Spinner.css';

const logoSrc =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png";

function Spinner() {
    const MODE_STOPPED = 0;
    const MODE_SLOW = 1;
    const MODE_MEDIUM = 2;
    const MODE_FAST = 3;
    const MODE_VERY_FAST = 4;
    const DIRECTION_LEFT = 0;
    const DIRECTION_RIGHT = 1;
    const [value, setValue] = React.useState("Click to Start");
    const [textField, setTextField] = React.useState("");
    const [spinnerMode, setSpinnerMode] = React.useState(MODE_STOPPED);
    const [direction, setDirection] = React.useState(DIRECTION_RIGHT);

    const advanceState = () => {
        let newVal = spinnerMode;
        newVal = direction === DIRECTION_RIGHT ? newVal + 1 : newVal - 1;
        if (newVal > 4) {
            setDirection(DIRECTION_LEFT);
            newVal = 3;
        }
        if (newVal < 0) {
            setDirection(DIRECTION_RIGHT);
            newVal = 1;
        }
        console.log('*** new spinner mode: ', newVal);
        setSpinnerMode(newVal);
    }

    const updateAnimation = () => {
        let directText = '';
        let msg = '';
        let duration = 0;
        switch (spinnerMode) {
            case MODE_STOPPED:
                directText = direction === DIRECTION_RIGHT ? '>' : '<';
                msg = "Very Slow";
                duration = 5.5;
                break;
            case MODE_SLOW:
                directText = direction === DIRECTION_RIGHT ? '>>' : '<<';
                msg = "Slow";
                duration = 2;
                break
            case MODE_MEDIUM:
                directText = direction === DIRECTION_RIGHT ? '>>>' : '<<<';
                msg = "Medium";
                duration = 0.75;
                break
            case MODE_FAST:
                directText = direction === DIRECTION_RIGHT ? '>>>>' : '<<<<';
                msg = "Fast";
                duration = 0.4;
                break;
            case MODE_VERY_FAST:
                directText = direction === DIRECTION_RIGHT ? '>>>>>' : '<<<<<';
                msg = "Very Fast";
                duration = 0.3;
                break;
            default:
                duration = 0;
                break;
        }
        setValue(directText);
        setTextField(msg);
        return duration;
    }

    const onClick = () => {
        var element = document.getElementById("colorButton");
        element.style.backgroundColor =
            element.style.backgroundColor === "grey" ? "white" : "grey";
        element.className = "color-button-expanded";
        var appLogo = document.getElementById("appLogo");
        appLogo.className = direction === DIRECTION_RIGHT ? 'App-logo' : 'App-logo-reverse';
        advanceState();
        const duration = updateAnimation() + "s";
        appLogo.style.animationDuration = duration;
    };
    return (
        <div className="Spinner">
            <header className="Spinner-header">
                <button id="colorButton" className="color-button" onClick={onClick}>
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
