import React from 'react';
import './Spinner.css';

const logoSrc =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png";

function Spinner() {
    let message = "Click me!!";
    const [value, setValue] = React.useState("Click me!");
    const [num, setNum] = React.useState(1);

    const onClick = () => {
        var element = document.getElementById("colorButton");
        element.style.backgroundColor =
            element.style.backgroundColor === "grey" ? "white" : "grey";
        element.className = "color-button-expanded";
        var appLogo = document.getElementById("appLogo");
        appLogo.className =
            appLogo.className === "App-logo" ? "App-logo-reverse" : "App-logo";
        setNum(num + 1);
        setValue("You got clicked: " + num);
        appLogo.style.animationDuration = "0.5s";
    };
    return (
        <div className="Spinner">
            <header className="Spinner-header">
                <button id="colorButton" class="color-button" onClick={onClick}>
                    <img
                        src={logoSrc}
                        id="appLogo"
                        className="App-logo"
                        alt="logo"
                    />
                    <p>
                        <code>{value}</code>
                    </p>
                </button>
            </header>
        </div>
    );
}

export default Spinner;
