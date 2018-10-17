import React from "react";
import ReactDOM from "react-dom";
import './styles.less'
import img from '../../www/content/img/test.jpg';

const Index = () => {
    return <div>
        Hello React!
        <img src={img} alt="test" />
    </div>;
};
const container = document.getElementById("root");

ReactDOM.render(<Index />, container);
