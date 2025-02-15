import React, { Component } from "react";
import { render } from "react-dom";
//const loadSomeComponent = () => import('./SomeComponent');

import Homepage from './HomePage';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="center"
            style={{
                background: 'linear-gradient(rgb(6, 72, 195) 0%, rgb(216, 14, 155) 100%)',
                maxHeight:"77%",
                maxWidth:"77%",
                borderRadius:"16px"
            }}>
                <Homepage />
            </div>
            
        );

    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

