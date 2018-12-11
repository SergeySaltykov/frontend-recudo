import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './styles.less';
import img from '../../www/content/img/test.jpg';

import * as reducers from './reducers';


class App extends React.Component{
    constructor(props) {
        super(props);

        this.controller = new AbortController();
        this.signal = this.controller.signal;

        this.state = {
            data: null,
        }

    }

    componentDidMount() {
        // this.controller.abort();
        // this.controller = new AbortController();
        // this.signal = this.controller.signal;
        const url = '/api/staff-list.json';
        fetch(url, {signal: this.signal})
            .then(data => this.setState({data}))
            .catch(error => {
                if (error.name === 'AbortError') return;
                throw error;
            });
    }


    render() {
        return (
            <React.Fragment>
                {this.state.data ? this.state.data : 'loading'}
            </React.Fragment>
        );
    }
}
// const App = () => {
//     return <React.Fragment>
//         <h1>Hello React!</h1>
//         <div className="row">
//             {/*<div className="col-md-6">*/}
//                 {/*final pack! Yeeeess!*/}
//             {/*</div>*/}
//         </div>
//         {/*<img src={img} alt="test" />*/}
//     </React.Fragment>;
// };

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
const container = document.getElementById('root');


function Index() {

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );

}


ReactDOM.render(<Index />, container);
