import React from "react";
import ReactDOM from "react-dom";
import './styles.less'

const Index = () => {
    return <div>
        Hello React!
        <img src='/content/img/test.jpg' alt="test" />
    </div>;
};
const container = document.getElementById("root");

ReactDOM.render(<Index />, container);
