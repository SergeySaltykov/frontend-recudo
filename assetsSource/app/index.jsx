import React from "react";
import ReactDOM from "react-dom";
import './styles.less'

const Index = () => {
    return <div>Hello React!</div>;
};
const container = document.getElementById("root");

ReactDOM.render(<Index />, container);
